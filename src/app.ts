import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import {Image, ServerSideError} from "../types/types";
import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from './db/schema'
import {eq} from "drizzle-orm";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL!,
        ssl: false
    },
    schema
});

app.get("/image/:id", async (req: Request, res: Response<Image | ServerSideError>) => {
    const {id} = req.params;
    const imageId = Number.parseInt(id);

    if (Number.isNaN(imageId)) {
        res
            .status(400)
            .send({
                status: 400,
                msg: 'id needs to be a number'
            });
        return;
    }

    const result = await db.query.images.findFirst({
        where: eq(schema.images.id, imageId),
        with: {
            dimensions: true
        },
    });

    if (result) {
        res.send(result);
    } else {
        res.status(404).send();
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
