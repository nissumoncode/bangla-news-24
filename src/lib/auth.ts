import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

console.log("MONGODB_URL exists:", !!process.env.MONGODB_URL);

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("Bangla-news-24");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
