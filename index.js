// require('dotenv').config()
const express = require('express')
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
const port = 3000


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = "mongodb+srv://My-blog:XrrS0Ry6n8c5jtrJ@cluster0.vabrqqs.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const myBlogCollection = client.db("My-blog").collection("blogs")
    const myProductCollection = client.db("My-blog").collection("product")


    app.get("/blogs", async (req, res) => {
      const result = await myBlogCollection.find().toArray();
      res.send(result);
    })

    app.get("/product", async (req, res) => {
      const result = await myProductCollection.find().toArray();
      res.send(result)
    })

    app.post("/product", async(req, res) =>{
      const data = req.body;
      const result = await myProductCollection.insertOne(data);
      res.send(result);
    })

    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await myBlogCollection.findOne(query);
      res.send(result);
    });

    app.post("/blogs", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await myBlogCollection.insertOne(data);
      res.send(result);
    });


    app.delete("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await myBlogCollection.deleteOne(query)
      res.send(result);
    });
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.error);


app.listen( port, () => {
  console.log(`Example app listening on port ${port}`)
})