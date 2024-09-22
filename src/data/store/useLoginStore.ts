import { create } from "zustand";

interface LoginStore {
  isLogged: boolean
  updateIsLogged: (isLogged: boolean) => void
}

export const useLoginStore = create<LoginStore>((set) => ({
  isLogged: false,
  updateIsLogged: (isLogged: boolean) => set((_) => ({
    isLogged: isLogged
  })),
}));

export const unsubscribeLogin = useLoginStore.subscribe(
  (state) => state.isLogged)

unsubscribeLogin()