import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();
export const dbClient = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL!
    },
    schema
});