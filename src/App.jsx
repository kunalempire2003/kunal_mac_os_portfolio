import {Navbar, Welcome, Dock} from "#components/index.js";
import gsap from "gsap";
import {Draggable} from "gsap/Draggable";
import Terminal from "#components/windows/Terminal.jsx";
gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <Terminal />
        </main>
    )
}
export default App
