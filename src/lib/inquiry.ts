import { create } from "zustand";

type Hint = {
  service: string;
  plan: string;
  seed: string;
  bump: number;
  choose: (hint: { service: string; plan?: string; seed?: string }) => void;
};

export const useInquiry = create<Hint>((set) => ({
  service: "",
  plan: "",
  seed: "",
  bump: 0,
  choose: (hint) =>
    set((state) => ({
      service: hint.service,
      plan: hint.plan ?? "",
      seed: hint.seed ?? "",
      bump: state.bump + 1,
    })),
}));
