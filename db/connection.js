const { MongoClient, ServerApiVersion } = require("mongodb");

const protocoldb = "mongodb+srv"
const usernamedb = "Group19"
const passworddb = "yLDiWPvZzQl18OpMI0qXDWwLEAvRnuSG"
const serverdb = "maincluster.yx3zxsu.mongodb.net"
const optiondb = "?retryWrites=true&w=majority"

const uri = protocoldb + "://" + usernamedb + ":" + passworddb + "@" + serverdb + "/" + optiondb;

const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

function connectDB() { // if unused, delete it

  try {
    client.connect();
    client.db("admin").command({ ping: 1 });

  } catch {

    // something
  }

};

function disconnectDB() { // if unused, delete it

  client.close();
};

async function asyncConnectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

  } catch {

    // something
  }

};

async function asyncDisconnectDB() {

  await client.close();
};