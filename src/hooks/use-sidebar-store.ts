import { create } from "zustand";

type State = {
  expand: boolean;
};

type Action = {
  toggle: () => void;
};

export const useSidebarStore = create<State & Action>((set) => ({
  expand: true,
  toggle: () => set((state) => ({ expand: !state.expand })),
}));
