import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import {reset} from "drizzle-seed";
import {faker} from '@faker-js/faker'
import * as schema from '../../src/config/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    await reset(db, schema);

    for (let i = 0; i < 100; i++) {
        const queryResult = await db.insert(schema.images).values({
            objectId: crypto.randomUUID().toString(),
        }).returning();

        const createdImage = queryResult[0];
        const width =faker.number.int({ min: 1024, max: 2048 });
        const height = faker.number.int({ min: 768, max: 1536 });

        await db.insert(schema.dimensions).values({
            imageId: createdImage.id,
            width: width,
            height: height,
            name: faker.word.sample(),
            href: `https://picsum.photos/seed/${createdImage.objectId}/${width}/${height}`,
        });
    }
}
main();
