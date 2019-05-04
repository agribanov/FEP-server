let mock = require('./mock');
const syncPromise = require('../utils').syncPromise;

function getList(){
    return syncPromise(mock);
}

function getOne(id){
    const item = mock.find(item => item.id == id);

    return item ? syncPromise(item) : syncPromise.reject(null);
}

function update(id, data){
    const index = mock.findIndex(item => item.id == id);

    mock[index] = data;

    return syncPromise(data)
}

function create(data){
    data.id = Date.now();

    mock.push(data);

    return syncPromise(data);
}

function deleteOne(id){
    mock = mock.filter(item => item.id !=id);

    return syncPromise(null);
}

module.exports = {
    getList,
    getOne,
    create,
    update,
    deleteOne
}