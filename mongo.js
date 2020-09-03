"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDal = void 0;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/User_DB";
var collectionName = 'Logins';
var dbName = 'User_DB';
var MongoDal = /** @class */ (function () {
    function MongoDal() {
        //this.CreateCollection();
    }
    MongoDal.prototype.CreateCollection = function () {
        MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            var dbo = db.db(dbName);
            dbo.createCollection(collectionName, function (err, res) {
                if (err)
                    throw err;
                var myobj = { name: "DefaultUser" };
                dbo.collection(collectionName).insertOne(myobj, function (err, res) {
                    if (err)
                        throw err;
                    console.log("1 document inserted");
                });
                db.close();
            });
        });
    };
    MongoDal.prototype.CreateRecord = function () {
        //MongoClient.connect(url, function(err, db) {
        //   if (err) throw err;
        //    var dbo = db.db(dbName);
        //});
    };
    MongoDal.prototype.RecordLogin = function (username) {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    reject(err);
                }
                else {
                    var dbo = db.db(dbName);
                    var myobj = { name: username };
                    dbo.collection(collectionName).insertOne(myobj, function (err, res) {
                        if (err)
                            reject(err);
                        console.log("1 document inserted");
                    });
                    db.close();
                    resolve();
                }
                ;
            });
        });
    };
    MongoDal.prototype.ExecuteQuery = function (query, response) {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    reject(err);
                }
                else {
                    var dbo = db.db(dbName);
                    dbo.collection(collectionName).find(query).toArray(function (err, result) {
                        if (err)
                            throw err;
                        db.close();
                        resolve(result);
                    });
                }
            });
        });
    };
    return MongoDal;
}());
exports.MongoDal = MongoDal;
//# sourceMappingURL=mongo.js.map