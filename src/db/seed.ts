import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import {seed} from "drizzle-seed";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    await seed(db, schema).refine((funcs) => ({
            images: {
                count: 100,
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
