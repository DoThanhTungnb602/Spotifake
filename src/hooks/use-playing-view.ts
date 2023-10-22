import { create } from "zustand";

interface PlayingViewStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePlayingView = create<PlayingViewStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
