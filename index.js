const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.feqszmo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log("Yea, Database Connected");
        const employeeCollection = client.db("store_management").collection("employee");



    }
    finally {

    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Server is Running')
});
app.listen(port, () => {
    console.log('Store Management app Listening on port', port);
})