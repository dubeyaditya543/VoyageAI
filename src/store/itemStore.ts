import { create } from "zustand";
import type { PackingItem } from "../types";
import type { Id } from "../../convex/_generated/dataModel";

type ItemStore = {
  items: PackingItem[];
  addItems: (newItems: PackingItem[]) => void;
  addItemManually: (newItem: PackingItem) => void;
  loading: boolean;
  setLoading: (value: boolean) => void,
  markPacked: (id: Id<"packingItems">) => void;
  clearItems: () => void;
};

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  loading: false,
  setLoading: (value: boolean) => {
    set(() => ({
      loading: value
    }))
  },
  addItems: (newItems: PackingItem[]) => {
    set(() => ({
      loading: false,
      items: newItems,
    }));
  },
  addItemManually: (newItem: PackingItem) => {
    set((state) => {
      const isItemFound = state.items.some(
        (item) => item?.itemName === newItem.itemName,
      );
      if (isItemFound) {
        throw new Error("Item is already present");
      }
      const createdItem: PackingItem = {
        itemName: newItem.itemName,
        category: newItem.category,
        quantity: newItem.quantity,
        reason: newItem.reason,
        packed: newItem.packed,
      };

      return {
        items: [createdItem, ...state.items],
      };
    });
  },
  markPacked: (id: Id<"packingItems">) => {
    set((state) => {
      return {
        items: state.items.map((item: PackingItem) =>
          item._id === id ? { ...item, packed: !item.packed } : item,
        ),
      };
    });
  },
  clearItems: () => {
    set(() => ({
      items: [],
    }));
  },
}));
