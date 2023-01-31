// set up server
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://maruf:YpyVbN5GQ10AgGdp@ieltscluster.eo0oppm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
  try {
    const CambridgePass = client.db("Passages").collection("cambridge11");
    app.get("/", (req, res) => {
      res.send("Server is running");
    });
    
    app.get('/cambridge11', async (req, res) => {
        const query = {};
        const result = await CambridgePass.find(query).toArray();
        res.send(result);
    })
  } catch (error) {}
}

run().catch((error) => console.log(error.message));

app.listen(port)