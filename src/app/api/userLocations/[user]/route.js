
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ben:jd8rgmspcZoFOL2z@moviesreact.wvwftwa.mongodb.net/?retryWrites=true&w=majority&appName=MoviesReact";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    deprecationErrors: true,
  }
});

export async function GET(request, context) {
    const params = await context.params
    const id = params.user
    console.log("User ID: " + id);  
    try{
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("whereToGo").command({ ping: 1 });
    console.log("Pinged.");
    // Ensures that the client will close when you finish/error
    const result = await client.db("whereToGo").collection("userInfo").find({userID: Number(id)}).toArray()
    console.log("api got this:", result)

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            "content-type": "application/json",
        },
    });
    
    } finally {
    await client.close();
  }
}