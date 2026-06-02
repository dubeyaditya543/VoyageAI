import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  trips: defineTable({
    userId: v.id("users"),
    cityName: v.string(),
    aboutCity: v.object({
      id: v.optional(v.number()),
      name: v.string(),
      latitude: v.number(),
      longitude: v.number(),
      elevation: v.optional(v.number()),
      feature_code: v.optional(v.string()),
      country_code: v.string(),
      admin1_id: v.optional(v.number()),
      admin3_id: v.optional(v.number()),
      admin4_id: v.optional(v.number()),
      timezone: v.optional(v.string()),
      population: v.optional(v.number()),
      postcodes: v.optional(v.array(v.string())),
      country_id: v.number(),
      country: v.string(),
      admin1: v.optional(v.string()),
      admin3: v.optional(v.string()),
      admin4: v.optional(v.string()),
    }),
  }).index("by_user", ["userId"]),

  packingItems: defineTable({
    tripId: v.id("trips"),
    itemName: v.string(),
    category: v.union(
      v.literal("clothing"),
      v.literal("electronics"),
      v.literal("toiletries"),
      v.literal("miscellaneous"),
    ),
    reason: v.optional(v.string()),
    quantity: v.number(),
    packed: v.boolean(),
  }).index("by_trip", ["tripId"]),
});

export default schema;
