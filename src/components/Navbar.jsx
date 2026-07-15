import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {navIcons, navLinks} from "#constants/index.js";
import useWindowStore from "#components/store/window.js";
import useUIStore from "#components/store/ui.js";

const Navbar = () => {
    const [now, setNow] = useState(dayjs());
    const {openWindow} = useWindowStore();
    const {toggleControlCenter} = useUIStore();

    useEffect(() => {
        const timer = window.setInterval(() => setNow(dayjs()), 60000);
        return () => window.clearInterval(timer);
    }, []);

    const openFromNav = (type) => {
        if (type === "finder") {
            openWindow("finder", {view: "projects"});
            return;
        }

        if (type === "contact") {
            openWindow("contact");
            return;
        }

        if (type === "resume") {
            openWindow("resume");
        }
    };

    return (
        <nav className="topbar">
            <div className="topbar-left">
                <img src="/images/logo.svg" alt="logo" />
                <p className="font-bold">Kunal's Macfolio</p>

                <ul>
                    {navLinks.map(({id, name, type}) => (
                        <li key={id}>
                            <button type="button" onClick={() => openFromNav(type)}>{name}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="topbar-right">
                <ul>
                    {navIcons.map(({id, img, action}) => (
                        <li key={id}>
                            {action === "control-center" ? (
                                <button type="button" onClick={toggleControlCenter} aria-label="Open control center" className="control-center-trigger">
                                    <img src={img} className="icon-hover" alt="Control center" />
                                </button>
                            ) : (
                                <img src={img} className="icon-hover" alt={`nav-${id}`} />
                            )}
                        </li>
                    ))}
                </ul>
                <time>{now.format("MMMM D, YYYY • h:mm A")}</time>
            </div>
        </nav>
    );
};

export default Navbar;
