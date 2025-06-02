import { redirect } from "next/dist/server/api-utils";
import fs from "fs";
import sharp from "sharp";
import fetch from "node-fetch";

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://ben:jd8rgmspcZoFOL2z@moviesreact.wvwftwa.mongodb.net/?retryWrites=true&w=majority&appName=MoviesReact";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    deprecationErrors: true,
  },
});

export async function GET(context) {
  const uid = context.params;
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("whereToGo").command({ ping: 1 });
    console.log("Pinged.");
    // Ensures that the client will close when you finish/error
    const result = await client
      .db("whereToGo")
      .collection("userInfo")
      .find({ username: uid })
      .toArray();
    console.log(result);

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

//post one user location
//this is used to save a location to the database
export async function POST(request, context) {
  //const { uid } = new ObjectId("682e46f23c2b6a9eb5ba88cd") //hardcoded admin user for testing.
  const body = await request.json();
  console.log(body);
  try {
    await client.connect();
    await client.db("whereToGo").command({ ping: 1 });
    console.log("Pinged.");
    //sharp is used to merge the image with the overlay
    const response = await fetch(body.image);
    const bgBuffer = await response.arrayBuffer();
    const overlayPath = `./public/locations/${body.locationType.replaceAll(
      " ",
      "-"
    )}-location.png`;
    const overlayBuffer = await sharp(overlayPath)
      .resize({ width: 230 }) //about half size of the original image
      .toBuffer();
    const mergedBuffer = await sharp(bgBuffer)
      .composite([{ input: overlayBuffer, top: 120, left: 100 }])
      .png()
      .toBuffer();
    const fileName =
      "/userPhotos/" +
      body.locationType.replaceAll(" ", "-") +
      "/" +
      body.imageString +
      ".png";
    fs.writeFileSync(`./public/${fileName}`, mergedBuffer);
    console.log("File saved successfully");
    //first, check if the user has already submitted a location
    const existingUser = await client
      .db("whereToGo")
      .collection("userInfo")
      .findOneAndUpdate(
        {
          userID: 0,
        },
        {
          $push: {
            userPhotos: {
              urlExtension: body.imageString,
              locationType: body.locationType,
            },
          },
        }
      );
    //redirect to the login page if the user does not exist
    if (!existingUser) {
      console.log("User does not exist");
      return new Response(JSON.stringify({ error: "User does not exist" }), {
        status: 404,
        headers: {
          "content-type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify(existingUser), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } finally {
    await client.close();
  }
}
