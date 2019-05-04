const model = require('./model');

function getList(req, res){
    model.getList()
        .then(data => res.send(data))
        .catch(err => res.status(400).send(err));
}

function getOne(req, res){
    const id = Number(req.params.id);

    console.log('got request for one with id ' + id);
    model.getOne(id)
        .then(data => res.send(data))
        .catch(err => res.status(400).send(err));
}

function update(req, res){
    const id = Number(req.params.id);

    console.log('got update request for one with id ' + id);
    model.update(id, req.body)
        .then(data => res.send(data))
        .catch(err => res.status(400).send(err));
}

function create(req, res){
    console.log('got create request for one');
    model.create(req.body)
        .then(data => res.send(data))
        .catch(err => res.status(400).send(err));
}

function deleteOne(req, res){
    const id = Number(req.params.id);

    console.log('got delete request for one with id ' + id);
    model.deleteOne(id)
        .then(data => res.send(data))
        .catch(err => res.status(400).send(err));
}

module.exports = {
    getList,
    getOne,
    update,
    create,
    deleteOne
}