// require('dotenv').config()
const express = require('express')
const cors = require("cors")
const app = express()
app.use(cors())
const port = 3000


// My-blog
// XrrS0Ry6n8c5jtrJ
const data = require("./data.json");


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://My-blog:XrrS0Ry6n8c5jtrJ@cluster0.vabrqqs.mongodb.net/?retryWrites=true&w=majority";

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
    const myBlogCollection = client.db("My-blog").collection("blogs")


    app.get("/blogs", async (req, res) => {
      const result = await myBlogCollection.find().toArray();
      res.send(result);
    })

    app.post("/blogs", async (req, res) => {
      const data = req.body;
      console.log(data)
      const result = await myBlogCollection.insertOne(data);
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.error);


app.listen( port, () => {
  console.log(`Example app listening on port ${port}`)
})