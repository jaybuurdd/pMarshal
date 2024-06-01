import create from 'zustand'

const useStore = create((set) => ({
    wallets: [],
    addWallet: (wallet) => set((state) => ({
        wallets: [...state.wallets, wallet],
    })),
}))

export default useStore