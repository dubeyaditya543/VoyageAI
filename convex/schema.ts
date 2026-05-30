import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  trips: defineTable({
    userId: v.id("users"),
    cityName: v.string(),
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
