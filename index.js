const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
        const addInventoryCollection = client.db("store_management").collection("addInventory");
        const keyCollection = client.db("store_management").collection("key");
        const departmentCollection = client.db("store_management").collection("department");
        const designationCollection = client.db("store_management").collection("designation");


        //============ Add Inventory =======================
        app.post('/addInventory', async(req,res) =>{
            const newInventory = req.body;
            const result = await addInventoryCollection.insertOne(newInventory);
            res.send(result);
        })
        
        app.get("/addInventory", async(req, res)=>{
          const addInventory = await addInventoryCollection.find().toArray();
          res.send(addInventory)
        })

        app.delete('/addInventory/:id', async(req, res) =>{
          const id = req.params.id;
          const query = {_id: ObjectId(id)};
          const addInventory = await addInventoryCollection.deleteOne(query);
          res.send(addInventory)
        })



        //--------------- key type start method--------------------
        // ---------------key type post method--------------------
        app.post('/key', async(req,res) =>{
            const newKey = req.body;
            const result = await keyCollection.insertOne(newKey);
            res.send(result);
        })
   

        // ---------------key type get method--------------------
        app.get("/key", async(req, res)=>{
            const key = await keyCollection.find().toArray();
            res.send(key)
        })
     
        // ---------------key type delete method--------------------
      app.delete("/key/:id", async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await keyCollection.deleteOne(query);
        res.send(result);
      })
    // ---------------key type Update method--------------------
    app.put('/key/:id', async(req,res) =>{
      const id = req.params.id;
      const key = req.body;
      const filter = {_id: ObjectId(id)};
      const options = {upsert: true};
      const updateDoc = {
        $set: {
          key: key.key,
        }
      };
      const result = await keyCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    // ---------------key type Update show method--------------------
    app.get("/key/:id", async(req, res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await keyCollection.findOne(query)
      res.send(result);
    })

     //--------------- key type end method--------------------  
     //--------------- Department start method--------------------  
      //--------------- Department post method-----------------
      app.post('/department', async(req,res) =>{
        const newDepartment = req.body;
        const result = await departmentCollection.insertOne(newDepartment);
        res.send(result)
      })
      //--------------- Department get method-----------------
      app.get('/department', async(req, res) =>{
        const department = await departmentCollection.find().toArray();
        res.send(department)
      })
      //--------------- Department get method-----------------
      app.delete('/department/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const department = await departmentCollection.deleteOne(query);
        res.send(department)
      })


     //--------------- Department end method--------------------  
     
     //--------------- Designation start method--------------------  
      //--------------- Designation post method-----------------
      app.post('/designation', async(req,res) =>{
        const newDesignation = req.body;
        const result = await designationCollection.insertOne(newDesignation);
        res.send(result)
      })
      //--------------- Designation get method-----------------
      app.get('/designation', async(req, res) =>{
        const designation = await designationCollection.find().toArray();
        res.send(designation)
      })
      //--------------- Designation get method-----------------
      app.delete('/designation/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const designation = await designationCollection.deleteOne(query);
        res.send(designation)
      })
       // ---------------key type Update method--------------------
    app.put('/designation/:id', async(req,res) =>{
      const id = req.params.id;
      const key = req.body;
      const filter = {_id: ObjectId(id)};
      const options = {upsert: true};
      const updateDoc = {
        $set: {
          key: key.key,
        }
      };
      const result = await keyCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    // ---------------key type Update show method--------------------
    app.get("/designation/:id", async(req, res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await designationCollection.findOne(query)
      res.send(result);
    })

     //--------------- Designation end method--------------------  


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