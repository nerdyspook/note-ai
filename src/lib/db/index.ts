import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true; // new connection won't be made after each reload

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not defined");

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);
