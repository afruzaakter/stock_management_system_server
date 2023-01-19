const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');

const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.feqszmo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    console.log("Yea, Database Connected");
    const addInventoryCollection = client.db("store_management").collection("addInventory");
    const employeeCollection = client.db("store_management").collection("employee");
    const userCollection = client.db("store_management").collection("user");
    const keyCollection = client.db("store_management").collection("key");
    const departmentCollection = client.db("store_management").collection("department");
    const designationCollection = client.db("store_management").collection("designation");
    const productKeyCollection = client.db("store_management").collection("productKey");
    const budgetCodeCollection= client.db("store_management").collection("budgetcode");
    const productCollection= client.db("store_management").collection("product");
    const supplierCollection= client.db("store_management").collection("supplier");
    const stockAdjustCollection= client.db("store_management").collection("stockadjust");
    //--------------- key type start method--------------------
    // ---------------key type post method--------------------


    //============ Add Inventory =======================
    app.post('/addInventory', async (req, res) => {
      const newInventory = req.body;
      const result = await addInventoryCollection.insertOne(newInventory);
      res.send(result);
    })

    app.get("/addInventory", async (req, res) => {
      const addInventory = await addInventoryCollection.find().toArray();
      res.send(addInventory)
    })

    app.delete('/addInventory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const addInventory = await addInventoryCollection.deleteOne(query);
      res.send(addInventory)
    })

    // =============== Employee =========================
    app.post('/employee', async (req, res) => {
      const newEmployee = req.body;
      const result = await employeeCollection.insertOne(newEmployee);
      res.send(result);
    })

    app.get("/employee", async (req,res)=>{
      const getEmployee= await employeeCollection.find().toArray();
      res.send(getEmployee)
    })

    // ================= User Management ====================
    app.post('/user', async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    })

    app.get("/user", async (req,res)=>{
      const result= await userCollection.find().toArray();
      res.send(result)
    })


    //====================== key type start method ======================
    // ---------------key type post method--------------------
    app.post('/key', async (req, res) => {
      const newKey = req.body;
      const result = await keyCollection.insertOne(newKey);
      res.send(result);
    })


    // ---------------key type get method--------------------
    app.get("/key", async (req, res) => {
      const key = await keyCollection.find().toArray();
      res.send(key)
    })

    // ---------------key type delete method--------------------
    app.delete("/key/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await keyCollection.deleteOne(query);
      res.send(result);
    })
    // ---------------key type Update method--------------------
    app.put('/key/:id', async (req, res) => {
      const id = req.params.id;
      const key = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          key: key.key,
        }
      };
      const result = await keyCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    // ---------------key type Update show method--------------------
    app.get("/key/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await keyCollection.findOne(query)
      res.send(result);
    })

    
    //====================== Department start method ======================
    //--------------- Department post method-----------------
    app.post('/department', async (req, res) => {
      const newDepartment = req.body;
      const result = await departmentCollection.insertOne(newDepartment);
      res.send(result)
    })

    //-------------- Department put/update data Entry method  ---------------------
    app.put('/department/:id', async (req, res) => {
      const id = req.params.id;
      const state = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: state,
      }
      const result = await departmentCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    //   ----------------------Department Update data show method-------------
  app.get('/department/:id', async(req, res) =>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)}
    const result = await departmentCollection.findOne(query);
    res.send(result);
  })

    //--------------- Department get method-----------------
    app.get('/department', async (req, res) => {
      const department = await departmentCollection.find().toArray();
      res.send(department)
    })

    //--------------- Department get method-----------------
    app.delete('/department/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const department = await departmentCollection.deleteOne(query);
      res.send(department)
    })


   

    //====================== Designation start method ======================
    //--------------- Designation post method-----------------
    app.post('/designation', async (req, res) => {
      const newDesignation = req.body;
      const result = await designationCollection.insertOne(newDesignation);
      res.send(result)
    })
    //--------------- Designation get method-----------------
    app.get('/designation', async (req, res) => {
      const designation = await designationCollection.find().toArray();
      res.send(designation)
    })
    //--------------- Designation get method-----------------
    app.delete('/designation/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const designation = await designationCollection.deleteOne(query);
      res.send(designation)
    })
    // --------------designation Update method--------------------
    app.put('/designation/:id', async (req, res) => {
      const id = req.params.id;
      const state = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: state,
      }
      const result = await designationCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    // ---------------designation Update show method--------------------
    app.get("/designation/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await designationCollection.findOne(query)
      res.send(result);
    })

  
    //====================== Product key  start method ======================
    //--------------- Product key  post method--------------------  
    app.post('/productkey', async (req, res) => {
      const newProductKey = req.body;
      const result = await productKeyCollection.insertOne(newProductKey);
      res.send(result);
    });
    //--------------- Product key  get method-------------------- 
    app.get('/productkey', async (req, res) => {
      const productkey = await productKeyCollection.find().toArray();
      res.send(productkey);
    })
    //--------------- Product key  delete method-------------------- 
    app.delete('/productkey/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const productkey = await productKeyCollection.deleteOne(query);
      res.send(productkey);
    })
    // ---------------Product key type Update show method--------------------
    app.get("/productkey/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productKeyCollection.findOne(query)
      res.send(result);
    })
    // --------------- product key type Update method--------------------
    app.put('/productkey/:id', async (req, res) => {
      const id = req.params.id;
      const productkey = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: productkey,
      };
      const result = await productKeyCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
   

     //====================== Budget Code  start ======================
    //--------------- Budget Code post method --------------------  
    app.post('/budgetcode', async(req, res) =>{
      const newBudgetCode = req.body;
      const result = await budgetCodeCollection.insertOne(newBudgetCode);
      res.send(result)
    })
    //--------------- Budget Code get method --------------------  
    app.get('/budgetcode', async(req, res) =>{
      const budgetcode = await budgetCodeCollection.find().toArray();
      res.send(budgetcode);
    })
    //--------------- Budget Code update method --------------------  
    app.put('/budgetcode/:id', async(req, res) =>{
      const id = req.params.id;
      const budgetCode = req.body;
      const filter = {_id: ObjectId(id)};
      const options = {upsert: true};
      const updateDoc={
        $set:{
          budgetCode: budgetCode.budgetCode,
        }
      };
      const result = await budgetCodeCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })
    
    //--------------- Budget Code delete method --------------------  
    app.delete('/budgetcode/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const budgetcode = await budgetCodeCollection.deleteOne(query);
      res.send(budgetcode);
    })
    //--------------- Budget Code update show method --------------------  
  app.get('/budgetcode/:id', async(req, res) =>{
    const id =req.params.id;
    const query = {_id: ObjectId(id)}
    const result = await budgetCodeCollection.findOne(query);
    res.send(result);
  })
   
    
    //====================== Add Product  start ====================== 
    //--------------- Product Post method--------------------  
    app.post('/product', async(req, res)=>{
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    })
    //--------------- Product Get method--------------------  
    app.get('/product', async(req,res) =>{
      const product = await productCollection.find().toArray();
      res.send(product);
    })
    //--------------- Product Delete method-------------------- 
    app.delete('/product/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const result = await productCollection.deleteOne(query);
      res.send(result);
    }) 
    //--------------- Product Update/ put method--------------------  
      app.put('/product/:id', async(req, res) =>{
        const id = req.params.id;
        const product = req.body;
        const filter = {_id: ObjectId(id)};
        const options = {upsert: true}
        const updateDoc = {
          $set : product,
        }
        const result = await productCollection.updateOne(filter, updateDoc, options);
        res.send(result);
      })
    //--------------- Product Update data show  method--------------
    app.get('/product/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const result = await productCollection.findOne(query);
      res.send(result);
    })

   
    //====================== Suppler  start ====================== 
    //--------------- Suppler  Post method--------------------  
    app.post('/supplier', async(req, res)=>{
      const newSupplier = req.body;
      const result = await supplierCollection.insertOne(newSupplier);
      res.send(result);
    })
    //--------------- Suppler  Get method--------------------  
    app.get('/supplier', async(req,res) =>{
      const supplier = await supplierCollection.find().toArray();
      res.send(supplier);
    })
    //--------------- Suppler Delete method-------------------- 
    app.delete('/supplier/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const result = await supplierCollection.deleteOne(query);
      res.send(result);
    }) 
    //---------------Suppler  Update/ put method--------------------  
      app.put('/supplier/:id', async(req, res) =>{
        const id = req.params.id;
        const supplier = req.body;
        const filter = {_id: ObjectId(id)};
        const options = {upsert: true}
        const updateDoc = {
          $set : supplier,
        }
        const result = await supplierCollection.updateOne(filter, updateDoc, options);
        res.send(result);
      })
    //--------------- Suppler  Update data show  method--------------
    app.get('/supplier/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const result = await supplierCollection.findOne(query);
      res.send(result);
    })

   
    //====================== Stock Adjust start ======================= 
    //--------------- Stock Adjust  Post method--------------------  
    app.post('/stockadjust', async(req, res)=>{
      const newSupplier = req.body;
      const result = await stockAdjustCollection.insertOne(newSupplier);
      res.send(result);
    })
    //--------------- Stock Adjust  Get method--------------------  
    app.get('/stockadjust', async(req,res) =>{
      const stockadjust = await stockAdjustCollection.find().toArray();
      res.send(stockadjust);
    })
    //--------------- Stock Adjust Delete method-------------------- 
    app.delete('/stockadjust/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const result = await stockAdjustCollection.deleteOne(query);
      res.send(result);
    }) 
    //---------------Stock Adjust  Update/ put method--------------------  
      app.put('/stockadjust/:id', async(req, res) =>{
        const id = req.params.id;
        const stockadjust = req.body;
        const filter = {_id: ObjectId(id)};
        const options = {upsert: true}
        const updateDoc = {
          $set : stockadjust,
        }
        const result = await stockAdjustCollection.updateOne(filter, updateDoc, options);
        res.send(result);
      })
    //--------------- Stock Adjust  Update data show  method--------------
    app.get('/stockadjust/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const result = await stockAdjustCollection.findOne(query);
      res.send(result);
    })

   
   


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