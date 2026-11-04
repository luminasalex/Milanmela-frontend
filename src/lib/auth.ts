import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const mongoUri = process.env.MONGODB_URI as string;
const authUrl = process.env.BETTER_AUTH_URL as string;
const authSecret = process.env.BETTER_AUTH_SECRET as string;
const client = new MongoClient(mongoUri);
const db = client.db("Milanmela");

export const auth = betterAuth({
  baseURL: authUrl,
  secret: authSecret,
  database: mongodbAdapter(db, {
    client,
  }),

  plugins: [
    jwt({
      jwt: {
        issuer: authUrl,
        audience: authUrl,
      },
    }),
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string 
    },
  },
});
