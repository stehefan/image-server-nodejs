import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import {reset, seed} from "drizzle-seed";
import * as schema from '../../src/config/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    const randomObjectIds: string[] = []
    for (let i = 0; i < 100; i++) {
        randomObjectIds.push(crypto.randomUUID().toString());
    }

    await reset(db, schema);
    await seed(db, schema).refine((funcs) => ({
            images: {
                count: 100,
                columns: {
                    objectId: funcs.valuesFromArray({values: randomObjectIds})
                },
                with: {
                    dimensions: 10
                }
            },
            dimensions: {
                columns:
                    {
                        width: funcs.int({minValue: 1024, maxValue: 2048, isUnique: false}),
                        height: funcs.int({minValue: 768, maxValue: 1536, isUnique: false}),
                        name: funcs.string({isUnique: false}),
                        href: funcs.string({isUnique: false})
                    }
            }
        })
    );
}

main();
