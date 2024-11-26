import {integer, pgTable, serial, text, timestamp} from 'drizzle-orm/pg-core';
import {relations} from 'drizzle-orm';

export const dimensions = pgTable('dimensions', {
    id: serial('id').primaryKey(),
    name: text().notNull(),
    width: integer().notNull(),
    height: integer().notNull(),
    href: text().notNull(),
    imageId: integer('image_id').references(() => images.id, {onDelete: 'cascade'})
});

export const images = pgTable('images', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', {withTimezone: true}).notNull().defaultNow(),
});

export const imagesRelations = relations(images, ({many}) => ({
    dimensions: many(dimensions),
}));

export const dimensionsRelations = relations(dimensions, ({one}) => ({
    image: one(images, {
        fields: [dimensions.imageId],
        references: [images.id]
    })
}))
