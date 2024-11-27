import * as schema from "../config/schema";
import {eq} from "drizzle-orm";
import {Image} from "../../types/types";
import {dbClient} from "../config/client";

export const getImagesFromDatabase = async (): Promise<Image[] | undefined> => {
    let result = await dbClient.query.images.findMany({
        with: {
            dimensions: true
        },
    });

    return Promise.resolve(result)
}

export const getImageFromDatabase = async (id: number): Promise<Image | undefined> => {
     let result = await dbClient.query.images.findFirst({
        where: eq(schema.images.id, id),
        with: {
            dimensions: true
        },
    });

    return Promise.resolve(result)
}
