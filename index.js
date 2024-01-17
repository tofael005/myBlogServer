const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express()
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tofael6469:5uPH6lDXxh8vzJx3@cluster0.tsm0iem.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const blogsCollection = client.db("allmyblogs").collection.blogsView;


     // College data get 
     app.get("/allBlogs", async (req, res) =>{
        const allBlogs = await blogsCollection.find().toArray()
        res.send(allBlogs)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.listen(3001, () => {
    console.log("Server is running")
})