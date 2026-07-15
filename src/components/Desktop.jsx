import {desktopFolders} from "#constants/index.js";
import useWindowStore from "#components/store/window.js";

const Desktop = () => {
    const {openWindow} = useWindowStore();

    return (
        <section id="home" aria-label="Desktop shortcuts">
            <ul>
                {desktopFolders.map(({id, name, icon, windowKey, data, top, left, right}) => (
                    <li key={id} style={{top, left, right}}>
                        <button
                            type="button"
                            className="desktop-item"
                            onClick={() => openWindow(windowKey, data ?? null)}
                            aria-label={`Open ${name}`}
                        >
                            <img src={icon} alt={name} />
                            <p>{name}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Desktop;
