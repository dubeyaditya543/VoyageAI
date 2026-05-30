import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const addCity = mutation({
  args: { cityName: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    const tripInfo = await ctx.db
      .query("trips")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
    if (tripInfo) {
      const allItems = await ctx.db
        .query("packingItems")
        .withIndex("by_trip", (q) => q.eq("tripId", tripInfo._id))
        .collect();

      await Promise.all(allItems.map((item) => ctx.db.delete(item._id)));

      await ctx.db.delete(tripInfo._id);
    }
    await ctx.db.insert("trips", { userId, cityName: args.cityName });
  },
});

export const list = query({
  args: { tripId: v.id("trips") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const tripInfo = await ctx.db.get(args.tripId);
    if (tripInfo?.userId !== userId) {
      throw new Error("Unauthorized access");
    }
    return await ctx.db
      .query("packingItems")
      .withIndex("by_trip", (q) => q.eq("tripId", args.tripId))
      .collect();
  },
});

export const getTripInfo = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthenticated");
    }
    return await ctx.db
      .query("trips")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
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
    tripId: v.id("trips"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthenticated");
    const tripInfo = await ctx.db.get(args.tripId);
    if (tripInfo?.userId !== userId) {
      throw new Error("Unauthorized access");
    }
    await ctx.db.insert("packingItems", {
      itemName: args.itemName.toLowerCase(),
      category: args.category,
      reason: args.reason,
      quantity: args.quantity,
      packed: false,
      tripId: args.tripId,
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
    tripId: v.id("trips"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const tripInfo = await ctx.db.get(args.tripId);
    if (tripInfo?.userId !== userId) {
      throw new Error("Unauthorized access");
    }
    await Promise.all(
      args.bulkItems.map((item) => {
        return ctx.db.insert("packingItems", {
          packed: false,
          reason: item.reason,
          tripId: args.tripId,
          ...item,
        });
      }),
    );
  },
});

export const checkItem = mutation({
  args: { itemId: v.id("packingItems"), tripId: v.id("trips") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthenticated");
    const tripInfo = await ctx.db.get(args.tripId);
    if (tripInfo?.userId !== userId) {
      throw new Error("Unauthorized access");
    }
    const item = await ctx.db.get(args.itemId);
    if (!item) throw new Error("Item not found");
    await ctx.db.patch("packingItems", args.itemId, { packed: !item.packed });
  },
});
