import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Item = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

type State = {
  items: Item[];
};

type Action = {
  setItems: (items: Item[]) => void;
  addQuantity: (itemId: number) => void;
  subtractQuantity: (itemId: number) => void;
};

export const useCartStore = create<State & Action>()(
  devtools(
    immer((set) => ({
      items: [],
      setItems(items) {
        set((state: State) => {
          state.items = items;
        });
      },
      addQuantity(itemId) {
        set((state: State) => {
          const item = state.items.find((i) => i.id === itemId);
          if (item) {
            item.quantity += 1;
          }
        });
      },
      subtractQuantity(itemId) {
        set((state: State) => {
          const item = state.items.find((i) => i.id === itemId);
          if (item) {
            item.quantity -= 1;
          }
        });
      },
    })),
    {
      enabled: process.env.NODE_ENV === "development",
      store: "CartStore",
    }
  )
);
