import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URL!) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URL!"')
}

const uri = process.env.MONGODB_URL!
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    // @ts-ignore

    global._mongoClientPromise = client.connect()
  }
  // @ts-ignore

  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}


export default clientPromise