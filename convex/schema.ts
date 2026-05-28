import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  packingItems: defineTable({
    userId: v.id("users"),
    itemName: v.string(),
    category: v.union(
      v.literal("clothing"),
      v.literal("electronics"),
      v.literal("toiletries"),
      v.literal("miscellaneous"),
    ),
    reason: v.string(),
    quantity: v.number(),
    packed: v.boolean(),
  }).index("by_user", ["userId"]),

  
});

export default schema;
