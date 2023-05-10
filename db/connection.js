const { MongoClient, ServerApiVersion } = require("mongodb");

const protocoldb = "mongodb+srv"
const usernamedb = "Group19"
const passworddb = "yLDiWPvZzQl18OpMI0qXDWwLEAvRnuSG"
const serverdb = "maincluster.yx3zxsu.mongodb.net"
const optiondb = "?retryWrites=true&w=majority"

// Replace the placeholder with your Atlas connection string
const uri = protocoldb + "://" + usernamedb + ":" + passworddb + "@" + serverdb + "/" + optiondb;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
