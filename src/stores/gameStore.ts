import { Game } from "@/game/Game";
import { create } from "zustand";

export interface GameState {
  gameState: Game;
  setGameState: (game: Game) => void;
  circleSize: number;
  setCircleSize: (circleSize: number) => void;
  inset: number;
  setInset: (inset: number) => void;
  circleCount: number;
  setCircleCount: (circleCount: number) => void;
}

export const useGameStore = create<GameState>()((set) => ({
  gameState: new Game(),
  setGameState: (gameState: Game) => set({ gameState }),
  circleSize: 24,
  setCircleSize: (circleSize: number) => set({ circleSize }),
  inset: 16,
  setInset: (inset: number) => set({ inset }),
  circleCount: 64,
  setCircleCount: (circleCount: number) => set({ circleCount }),
}));
