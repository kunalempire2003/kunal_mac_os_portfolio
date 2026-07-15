import {create} from "zustand";

const getStoredTheme = () => {
    if (typeof window === "undefined") {
        return "dark";
    }

    return window.localStorage.getItem("portfolio-theme") ?? "dark";
};

const useUIStore = create((set) => ({
    theme: getStoredTheme(),
    controlCenterOpen: false,
    wifi: true,
    bluetooth: true,
    brightness: 72,
    volume: 64,
    toggleTheme: () =>
        set((state) => {
            const theme = state.theme === "dark" ? "light" : "dark";
            window.localStorage.setItem("portfolio-theme", theme);
            return {theme};
        }),
    toggleControlCenter: () =>
        set((state) => ({
            controlCenterOpen: !state.controlCenterOpen,
        })),
    closeControlCenter: () => set({controlCenterOpen: false}),
    toggleWifi: () => set((state) => ({wifi: !state.wifi})),
    toggleBluetooth: () => set((state) => ({bluetooth: !state.bluetooth})),
    setBrightness: (brightness) => set({brightness}),
    setVolume: (volume) => set({volume}),
}));

export default useUIStore;
