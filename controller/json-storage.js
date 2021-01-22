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
    var keyarray = []
    storage.keys(function (error, keys) {
        if (error) throw error;

        for (var key of keys)
            keyarray.push(key)
    });

    return keyarray;
}


exports.addNewKey = addNewKey
exports.getAllKeys = getAllKeys
exports.deleteAllKeys = deleteAllKeys