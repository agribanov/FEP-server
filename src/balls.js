module.exports = function (config) {
    const WebSocketServer = new require('ws');

    // подключенные клиенты
    const clients = {};
    const balls = {};
    const actions = {
        setState: setStateAction,
        move: moveAction
    };

    const webSocketServer = new WebSocketServer.Server(config);
    webSocketServer.on('connection', function (ws) {

        const id = Math.random();
        balls[id] = createNewBall(id);
        notifyBallAdded(balls[id]);
        sendExistingBalls(ws);

        clients[id] = ws;
        console.log("новое соединение " + id);

        ws.on('message', function (message) {
            console.log('получено сообщение ' + message);

            parseMessage(id, message);
        });

        ws.on('close', function () {
            console.log('соединение закрыто ' + id);
            delete clients[id];
            delete balls[id];

            notifyBallRemoved(id);
        });

    });

    function parseMessage(ballId, message){
        try{
            const package = JSON.parse(message);

            if (actions[package.action]){
                actions[package.action](ballId, package);
            } else {
                console.log('invalid action', package.action);
            }
        } catch(e){
            console.log('Format error', message);
        }

    }

    function createNewBall(id){
        return {
            id: id,
            radius: 10,
            color: 'white',
            x: 0,
            y: 0
        }
    }

    function broadcastMessage(message){
        message = JSON.stringify(message);
        for (let key in clients) {
            clients[key].send(message);
        }
    }

    function notifyBallAdded(ball){
        broadcastMessage(formatAddMessage(ball));
    }

    function notifyBallRemoved(id){
        broadcastMessage(formatRemoveMessage(id));
    }

    function notifyStateChange(ball){
        broadcastMessage(formatSetStateMessage(ball));
    }

    function notifyMove(ball){
        broadcastMessage(formatMoveMessage(ball));
    }

    function sendExistingBalls(ws){
        for (let key in balls) {
            const message = JSON.stringify(formatAddMessage(balls[key]));
            ws.send(message);
        }
    }

    function formatAddMessage({id, radius, color, x, y}){
        return {
            ballId: id,
            action: 'add',
            payload: { radius, color, x, y }
        }
    }

    function formatRemoveMessage(id){
        return {
            ballId: id,
            action: 'remove'
        }
    }
    
    function formatSetStateMessage({id, radius, color}){
        return {
            ballId: id,
            action: 'setState',
            payload: { radius, color }
        }
    }
    
    function formatMoveMessage({id, x, y }){
        return {
            ballId: id,
            action: 'move',
            payload: { x, y }
        }
    }

    function setStateAction(id, package){
        const ball = balls[id];
        const payload = package.payload;

        ball.color = payload.color;

        if (!isNaN(payload.radius)){
            ball.radius = payload.radius;
        }

        notifyStateChange(ball);
    }

    function moveAction(id, package){
        const ball = balls[id];
        const payload = package.payload;

        if (!isNaN(payload.x)){
            ball.x = payload.x;
        }

        if (!isNaN(payload.y)){
            ball.y = payload.y;
        }

        notifyMove(ball);
    }

}