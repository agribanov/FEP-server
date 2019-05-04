class Utils {
    syncPromise(data){
        return new Promise((resolve) => resolve(data));
    }
}

Utils.prototype.syncPromise.reject = (data) => new Promise((resolve, reject) => reject(data));

module.exports = new Utils;