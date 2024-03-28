import { useLocalStorage } from "../storage/local";

export type Contact = {
  id: number;
  name: string;
  notes?: string;
  avatar?: string;
};