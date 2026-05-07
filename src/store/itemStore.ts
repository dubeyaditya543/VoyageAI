import { create } from "zustand";

type ItemStore = {
  items: PackingCategory[];
  addItems: (newItems: PackingCategory[]) => void;
  addItemManually: (newItem: PackingItem, category: string) => void;
  loading: boolean;
  markPacked: (packedItem: PackingItem, category: string) => void;
  clearItems: () => void;
};

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  loading: false,
  addItems: (newItems: PackingCategory[]) => {
    set(() => ({
      loading: true,
      items: newItems,
    }));
  },
  addItemManually: (newItem: PackingItem, category: string) => {
    set((state) => {
      const isItemFound = state.items.some((item) =>
        item?.items.some((i) => i.name === newItem.name),
      );
      if (isItemFound) {
        throw new Error("Item is already present");
      }
      const createdItem: PackingItem = {
        name: newItem.name,
        quantity: newItem.quantity,
        importance: newItem.importance ? newItem.importance : "Medium",
        reason: newItem.reason ? newItem.reason : "",
        packed: false,
      };

      return {
        items: state.items.map((item: PackingCategory) =>
          item.category === category
            ? { ...item, items: [...item.items, createdItem] }
            : item,
        ),
      };
    });
  },
  markPacked: (packedItem: PackingItem, category: string) => {
    set((state) => {
      return {
        items: state.items.map((item: PackingCategory) =>
          item.category === category
            ? {
                ...item,
                items: item.items.map((i) =>
                  i.name === packedItem.name
                    ? { ...i, packed: !i.packed }
                    : i,
                ),
              }
            : item,
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
