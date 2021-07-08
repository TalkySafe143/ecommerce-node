const { MongoClient, ObjectId } = require('mongodb');
const config = require('../config');

const MONGO_URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`


class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = config.dbName;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect((err, result) => {
                if (err) reject(err);

                console.log('[DATABASE] Conectado correctamente a Mongo!');

                resolve(this.client.db(this.dbName))
            })
        })
    }

    async getAll(collection, query) {
        try {
            const db = await this.connect();
            return db.collection(collection).find(query).toArray();
        } catch(err) {
            console.log(err);
        }
    }

    async get(collection, id){ 
        try {
            const db = await this.connect();
            return db.collection(collection).findOne({ _id: ObjectId(id) })
        } catch(err) {
            console.log(err)
        }
    }

    async create(collection, data){ 

        try {
            const db = await this.connect();
            return db.collection(collection).insertOne(data);
        } catch(err) {
            console.log(err)
        }
    }

    async update(collection, id, data){ 
        try {
            const db = await this.connect();
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data })
        } catch(err) {
            console.log(err)
        }
    }

    async delete(collection, id){ 
        try {
            const db = await this.connect();
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = MongoLib;