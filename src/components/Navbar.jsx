import dayjs  from "dayjs";

import {navIcons, navLinks} from "#constants/index.js";
const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className="font-bold"> Kunal's Macfolio</p>

                <ul>
                    {navLinks.map(({id, name}) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>


            </div>
            <div>
                <ul>
                    {navIcons.map(({id, img}) => (
                        <li key={id}>
                            <img src={img} className="icon-hover" alt={id} />
                        </li>
                    ))}
                </ul>
                <time>{dayjs().format('MMMM D, YYYY')}</time>
            </div>
        </nav>
    )
}

export default Navbar
