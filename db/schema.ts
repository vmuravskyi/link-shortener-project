import { index, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

export const links = pgTable(
    'links',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        userId: text('user_id').notNull(),
        shortCode: text('short_code').notNull(),
        url: text('url').notNull(),
        createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    (table) => [
        uniqueIndex('links_short_code_unique_idx').on(table.shortCode),
        index('links_user_id_idx').on(table.userId),
    ]
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
