import {useEffect} from "react";

const playStartupSound = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
        return;
    }

    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    void context.resume();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(620, context.currentTime);
    gain.gain.setValueAtTime(0.0001, context.currentTime);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();

    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.7);
    oscillator.stop(context.currentTime + 0.72);

    const cleanup = () => {
        context.close();
    };

    oscillator.onended = cleanup;
};

const BootScreen = ({onDone}) => {
    useEffect(() => {
        playStartupSound();
        const timer = window.setTimeout(onDone, 2400);

        return () => window.clearTimeout(timer);
    }, [onDone]);

    return (
        <div className="boot-screen">
            <img src="/images/logo.svg" alt="Apple" className="boot-logo" />
            <div className="boot-loader">
                <span />
            </div>
        </div>
    );
};

export default BootScreen;
