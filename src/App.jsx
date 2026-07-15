import {useEffect, useState} from "react";
import {Navbar, Dock} from "#components/index.js";
import {Finder, Safari, Contact, Gallery, Resume, Terminal} from "#components/windows/index.js";
import Desktop from "#components/Desktop.jsx";
import BootScreen from "#components/BootScreen.jsx";
import ControlCenter from "#components/ControlCenter.jsx";
import useUIStore from "#components/store/ui.js";
import gsap from "gsap";
import {Draggable} from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const App = () => {
    const {theme} = useUIStore();
    const [booting, setBooting] = useState(true);

    useEffect(() => {
        document.body.dataset.theme = theme;
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    useEffect(() => {
        const timer = window.setTimeout(() => setBooting(false), 2400);
        return () => window.clearTimeout(timer);
    }, []);

    return (
        <>
            {booting && <BootScreen onDone={() => setBooting(false)} />}
            <main>
                <Navbar />
                <Desktop />
                <Dock />

                <Finder />
                <Safari />
                <Contact />
                <Gallery />
                <Resume />
                <Terminal />
                <ControlCenter />
            </main>
        </>
    );
};

export default App;
