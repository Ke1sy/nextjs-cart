import { MongoClient, Db, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nextjs-learn.guxu9nu.mongodb.net/?appName=nextjs-learn`;

let cachedClient: MongoClient | null = null;
let cachedDB: Db | null = null;

export const connectToDb = async () => {
  if (cachedClient && cachedDB) {
    return { client: cachedClient, db: cachedDB };
  }
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  // Connect once and cache the client + db for reuse.
  await client.connect();
  try {
    await client.db('e-commerce').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (err) {
    console.error('MongoDB ping failed:', err);
  }

  cachedClient = client;
  cachedDB = client.db('e-commerce');

  return { client: cachedClient, db: cachedDB };
};
