"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dimensionsRelations = exports.imagesRelations = exports.images = exports.dimensions = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.dimensions = (0, pg_core_1.pgTable)('dimensions', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)().notNull(),
    width: (0, pg_core_1.integer)().notNull(),
    height: (0, pg_core_1.integer)().notNull(),
    href: (0, pg_core_1.text)().notNull(),
    imageId: (0, pg_core_1.integer)('image_id').references(() => exports.images.id, { onDelete: 'cascade' })
});
exports.images = (0, pg_core_1.pgTable)('images', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).notNull().defaultNow(),
});
exports.imagesRelations = (0, drizzle_orm_1.relations)(exports.images, ({ many }) => ({
    dimensions: many(exports.dimensions),
}));
exports.dimensionsRelations = (0, drizzle_orm_1.relations)(exports.dimensions, ({ one }) => ({
    image: one(exports.images, {
        fields: [exports.dimensions.imageId],
        references: [exports.images.id]
    })
}));
