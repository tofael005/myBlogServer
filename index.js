const express = require('express')
const cors = require("cors")
const app = express()
app.use(cors())
const port = 3000
const data = require("./data.json");

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/youtube', (req, res) => {
  res.send("Subscribe my channel")
})


app.get('/mealbd', (req, res) => {
  res.send({data})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})