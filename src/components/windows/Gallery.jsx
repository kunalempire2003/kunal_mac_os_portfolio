/* eslint-disable react-refresh/only-export-components */
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {gallery} from "#constants/index.js";
import {WindowControls} from "#components/index.js";

const Gallery = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="photos" />
                <h2>Gallery</h2>
                <div className="w-8" />
            </div>

            <div className="gallery-shell">
                <div className="gallery-collage">
                    {gallery.map((item, index) => (
                        <figure key={item.id} className={`tile tile-${index + 1}`}>
                            <img src={item.img} alt={`Gallery ${index + 1}`} />
                        </figure>
                    ))}
                </div>
            </div>
        </>
    );
};

export default WindowWrapper(Gallery, "photos");
