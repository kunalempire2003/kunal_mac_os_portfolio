/* eslint-disable react-refresh/only-export-components */
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { Mail, PhoneCall, Globe, Link2 } from "lucide-react";
import { WindowControls } from "#components/index.js";

const contactBlocks = [
    {
        id: 1,
        title: "Schedule Call",
        value: "Book a time slot",
        href: "https://cal.com/",
        icon: PhoneCall,
    },
    {
        id: 2,
        title: "Email",
        value: "Send a message",
        href: "https://mail.google.com/mail/?view=cm&fs=1&to=kunalempire12345@gmail.com&su=",
        icon: Mail,
    },
    {
        id: 3,
        title: "Twitter/X",
        value: "Follow updates",
        href: "https://x.com/",
        icon: Globe,
    },
    {
        id: 4,
        title: "LinkedIn",
        value: "Connect professionally",
        href: "https://www.linkedin.com/in/kunal-singh-18a59a2a1/",
        icon: Link2,
    },
];

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
                <div className="w-8" />
            </div>

            <div className="contact-shell">
                <div className="contact-hero">
                    <img src="/images/gal3.png" alt="Profile" />

                    <div>
                        <p>Hello, I'm Kunal.</p>
                        <h3>Let's build something polished.</h3>
                        <span>
              Reach out through any of the quick blocks below.
            </span>
                    </div>
                </div>

                <div className="contact-grid">
                    {contactBlocks.map(({ id, title, value, href, icon: Icon }) => (
                        <a
                            key={id}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-card"
                        >
                            <Icon size={18} />
                            <strong>{title}</strong>
                            <span>{value}</span>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default WindowWrapper(Contact, "contact");