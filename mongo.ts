var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/User_DB";
var collectionName: string = 'Logins';
var dbName: string = 'User_DB';


export class MongoDal { 
    constructor() {
        //this.CreateCollection();
        
    }
    CreateCollection()
    {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            dbo.createCollection(collectionName, function(err, res) {
              if (err) throw err;
              var myobj = { name: "DefaultUser"};
              dbo.collection(collectionName).insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
               
              });
              db.close();
            });
          });
    }
    CreateRecord()
    {
        //MongoClient.connect(url, function(err, db) {
         //   if (err) throw err;
        //    var dbo = db.db(dbName);
          
          //});
    }
    RecordLogin(username: string) : Promise<any>
    {
        return new Promise<any>((resolve, reject) => {
        MongoClient.connect(url, function(err, db) {
            if (err) 
            {
                reject(err);
            }
            else
            {
            var dbo = db.db(dbName);
            var myobj = { name: username};
            dbo.collection(collectionName).insertOne(myobj, function(err, res) {
                if (err) reject(err);
                console.log("1 document inserted");
               
              });
              db.close();
              resolve();
            
            };
        
        });
          });
        }
    
    
    ExecuteQuery(query: any, response: any) : Promise<any>
    {
        return new Promise<any>((resolve, reject) => {
        MongoClient.connect(url, function(err, db) {
            if (err) 
            {
                reject(err);
            }
            else
            {
            var dbo = db.db(dbName);
           
            dbo.collection(collectionName).find(query).toArray(function(err, result) {
              if (err) throw err;
             
              db.close();
              resolve(result);
            
            });
        }
          });
        })
    
    }

}