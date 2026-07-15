import {Bluetooth, MoonStar, SunMedium, Volume2, Wifi, WifiOff, BluetoothOff, Monitor} from "lucide-react";
import useUIStore from "#components/store/ui.js";

const ControlCenter = () => {
    const {
        theme,
        controlCenterOpen,
        closeControlCenter,
        toggleTheme,
        wifi,
        bluetooth,
        toggleWifi,
        toggleBluetooth,
        brightness,
        volume,
        setBrightness,
        setVolume,
    } = useUIStore();

    if (!controlCenterOpen) {
        return null;
    }

    return (
        <section className="control-center" onClick={closeControlCenter}>
            <div className="control-center-panel" onClick={(event) => event.stopPropagation()}>
                <div className="control-center-top">
                    <button type="button" className="theme-card" onClick={toggleTheme}>
                        {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
                        <div>
                            <p>{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
                            <span>Switch appearance</span>
                        </div>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                        <button type="button" className={`mini-card ${wifi ? "active" : ""}`} onClick={toggleWifi}>
                            {wifi ? <Wifi size={16} /> : <WifiOff size={16} />}
                            <span>Wi-Fi</span>
                        </button>
                        <button type="button" className={`mini-card ${bluetooth ? "active" : ""}`} onClick={toggleBluetooth}>
                            {bluetooth ? <Bluetooth size={16} /> : <BluetoothOff size={16} />}
                            <span>Bluetooth</span>
                        </button>
                    </div>
                </div>

                <div className="slider-card">
                    <div className="slider-label">
                        <Monitor size={15} />
                        <span>Display</span>
                    </div>
                    <input type="range" min="20" max="100" value={brightness} onChange={(event) => setBrightness(Number(event.target.value))} />
                </div>

                <div className="slider-card">
                    <div className="slider-label">
                        <Volume2 size={15} />
                        <span>Sound</span>
                    </div>
                    <input type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
                </div>
            </div>
        </section>
    );
};

export default ControlCenter;
