/* eslint-disable react-refresh/only-export-components */
import {useMemo, useState} from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {locations} from "#constants/index.js";
import {ExternalLink, Globe, Newspaper} from "lucide-react";
import {WindowControls} from "#components/index.js";

const DOC_SECTIONS = [
    {
        id: 1,
        title: "Projects Documentation",
        description: "Showcase notes, live links, and visual previews for the projects on this portfolio.",
    },
    {
        id: 2,
        title: "GitHub Profile",
        description: "Embedded web view for the GitHub profile.",
    },
];

const Safari = () => {
    const [activeTab, setActiveTab] = useState("github");
    const docs = useMemo(
        () =>
            locations.projects.children.map((project) => ({
                title: project.name,
                description: project.children.find(({fileType}) => fileType === "txt")?.description?.[0] ?? "",
                image: project.children.find(({fileType}) => fileType === "img")?.imageUrl,
                link: project.children.find(({fileType}) => fileType === "url")?.href,
            })),
        [],
    );

    return (
        <>
            <div id="window-header">
                <WindowControls target="safari" />
                <h2>Safari</h2>
                <div className="w-8" />
            </div>

            <div className="safari-shell">
                <div className="safari-tabs">
                    <button type="button" className={activeTab === "docs" ? "active" : ""} onClick={() => setActiveTab("docs")}>
                        <Newspaper size={15} />
                        Documentation
                    </button>
                    <button type="button" className={activeTab === "github" ? "active" : ""} onClick={() => setActiveTab("github")}>
                        <Globe size={15} />
                        GitHub
                    </button>
                </div>

                {activeTab === "docs" ? (
                    <div className="safari-docs">
                        {DOC_SECTIONS.map((section) => (
                            <article key={section.id}>
                                <p>Section {section.id}</p>
                                <h3>{section.title}</h3>
                                <span>{section.description}</span>
                            </article>
                        ))}

                        <div className="safari-doc-list">
                            {docs.map((doc) => (
                                <a key={doc.title} href={doc.link} target="_blank" rel="noreferrer">
                                    <img src={doc.image} alt={doc.title} />
                                    <div>
                                        <h4>{doc.title}</h4>
                                        <p>{doc.description}</p>
                                    </div>
                                    <ExternalLink size={14} />
                                </a>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="safari-webview">
                        <div className="safari-address">
                            <span>github.com/kunalempire2003</span>
                            <a href="https://github.com/kunalempire2003" target="_blank" rel="noreferrer">
                                Open
                            </a>
                        </div>
                        <iframe src="https://github.com/kunalempire2003" title="GitHub profile" />
                        <p>The GitHub profile is loaded inside the Safari window as a web view.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default WindowWrapper(Safari, "safari");
