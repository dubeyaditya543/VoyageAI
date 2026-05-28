import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query("packingItems")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const addItems = mutation({
  args: {
    itemName: v.string(),
    category: v.union(
      v.literal("clothing"),
      v.literal("electronics"),
      v.literal("toiletries"),
      v.literal("miscellaneous"),
    ),
    reason: v.optional(v.string()),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthenticated");
    await ctx.db.insert("packingItems", {
      userId,
      itemName: args.itemName.toLowerCase(),
      category: args.category,
      reason: args.reason ?? "",
      quantity: args.quantity,
      packed: false,
    });
  },
});

export const addBulk = mutation({
  args: {
    bulkItems: v.array(
      v.object({
        itemName: v.string(),
        category: v.union(
          v.literal("clothing"),
          v.literal("electronics"),
          v.literal("toiletries"),
          v.literal("miscellaneous"),
        ),
        reason: v.optional(v.string()),
        quantity: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    await Promise.all(
      args.bulkItems.map((item) => {
        ctx.db.insert("packingItems", {
          userId,
          packed: false,
          reason: item.reason ?? "",
          ...item,
        });
      }),
    );
  },
});

export const checkItem = mutation({
  args: { itemId: v.id("packingItems") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthenticated");
    const item = await ctx.db.get(args.itemId);
    if (!item) throw new Error("Item not found");
    await ctx.db.patch("packingItems", args.itemId, { packed: !item.packed });
  },
});
