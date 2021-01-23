const storage = require('electron-json-storage')

function deleteAllKeys() {
    storage.keys(function (error, keys) {
        if (error) throw error;

        for (var key of keys) {
            storage.remove(key, function (error) {
                if (error) throw error;
            });
        }
    });
}

function addNewKey(name, object) {
    storage.set(name, object, function (error) {
        if (error) throw error;
    });
}

function getAllKeys() {

    var cryptosObj = {}
    storage.keys(function (error, keys) {
        if (error) throw error;

        for (var key of keys) {
            cryptosObj[`${key}`] = { orders: {} }
        }
    });

    return cryptosObj
}


exports.addNewKey = addNewKey
exports.getAllKeys = getAllKeys
exports.deleteAllKeys = deleteAllKeys