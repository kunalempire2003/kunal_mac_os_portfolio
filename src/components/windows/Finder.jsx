/* eslint-disable react-refresh/only-export-components */
import {useMemo, useState} from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#components/store/window.js";
import {locations} from "#constants/index.js";
import {ArrowRight, ExternalLink, Folder, Globe, FileText, Image as ImageIcon} from "lucide-react";
import {WindowControls} from "#components/index.js";

const FINDER_SECTIONS = [
    {id: "projects", label: "Projects", kind: "folder"},
    {id: "github", label: "GitHub", kind: "web"},
    {id: "leetcode", label: "LeetCode", kind: "web"},
    {id: "resume", label: "Resume", kind: "file"},
];

const WEB_VIEWS = {
    github: "https://github.com/kunalempire2003",
    leetcode: "https://leetcode.com/",
};

const getProjectSummary = (project) => {
    const descriptionFile = project.children.find(({fileType}) => fileType === "txt");
    const imageFile = project.children.find(({fileType}) => fileType === "img");
    const liveLink = project.children.find(({fileType}) => fileType === "url");
    const designLink = project.children.find(({fileType}) => fileType === "fig");

    return {
        title: project.name,
        description: descriptionFile?.description?.[0] ?? "Project documentation",
        imageUrl: imageFile?.imageUrl,
        liveUrl: liveLink?.href,
        designUrl: designLink?.href,
    };
};

const Finder = () => {
    const {windows, openWindow} = useWindowStore();
    const activeView = windows.finder?.data?.view ?? "projects";
    const [selectedProject, setSelectedProject] = useState(locations.projects.children[0]);

    const projectCards = useMemo(() => locations.projects.children.map(getProjectSummary), []);

    const currentWebView = WEB_VIEWS[activeView];

    const openSection = (sectionId) => {
        openWindow("finder", {view: sectionId});
        if (sectionId === "projects") {
            setSelectedProject(locations.projects.children[0]);
        }
    };

    const renderProjectFiles = () => {
        if (!selectedProject) {
            return null;
        }

        return selectedProject.children.map((file) => {
            if (file.fileType === "url" || file.fileType === "fig") {
                return (
                    <button
                        type="button"
                        key={file.id}
                        className="project-file"
                        onClick={() => window.open(file.href, "_blank", "noopener,noreferrer")}
                    >
                        <ExternalLink size={16} />
                        <span>{file.name}</span>
                    </button>
                );
            }

            if (file.fileType === "img") {
                return (
                    <div key={file.id} className="project-file preview">
                        <ImageIcon size={16} />
                        <span>{file.name}</span>
                        <img src={file.imageUrl} alt={file.name} />
                    </div>
                );
            }

            return (
                <div key={file.id} className="project-file">
                    <FileText size={16} />
                    <span>{file.name}</span>
                </div>
            );
        });
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="finder" />
                <h2>Finder</h2>
                <div className="w-8" />
            </div>

            <div className="finder-shell">
                <aside className="finder-sidebar">
                    {FINDER_SECTIONS.map((section) => (
                        <button
                            type="button"
                            key={section.id}
                            className={activeView === section.id ? "active" : ""}
                            onClick={() => openSection(section.id)}
                        >
                            {section.kind === "web" ? <Globe size={15} /> : <Folder size={15} />}
                            <span>{section.label}</span>
                        </button>
                    ))}
                </aside>

                <div className="finder-content">
                    {activeView === "projects" && (
                        <>
                            <div className="finder-grid">
                                {projectCards.map((project, index) => (
                                    <button
                                        type="button"
                                        key={project.title}
                                        className={`finder-project ${selectedProject?.name === project.title ? "selected" : ""}`}
                                        onClick={() => setSelectedProject(locations.projects.children[index])}
                                    >
                                        <Folder size={22} />
                                        <strong>{project.title}</strong>
                                        <span>{project.description}</span>
                                    </button>
                                ))}
                            </div>

                            {selectedProject && (
                                <div className="finder-detail">
                                    <div className="detail-head">
                                        <div>
                                            <p>Project Folder</p>
                                            <h3>{selectedProject.name}</h3>
                                        </div>
                                        <ArrowRight size={16} />
                                    </div>

                                    <div className="detail-body">
                                        <img
                                            src={getProjectSummary(selectedProject).imageUrl}
                                            alt={selectedProject.name}
                                        />
                                        <div className="detail-copy">
                                            <p>{getProjectSummary(selectedProject).description}</p>
                                            <div className="detail-links">
                                                {getProjectSummary(selectedProject).liveUrl && (
                                                    <a href={getProjectSummary(selectedProject).liveUrl} target="_blank" rel="noreferrer">
                                                        Live URL
                                                    </a>
                                                )}
                                                {getProjectSummary(selectedProject).designUrl && (
                                                    <a href={getProjectSummary(selectedProject).designUrl} target="_blank" rel="noreferrer">
                                                        Design
                                                    </a>
                                                )}
                                            </div>
                                            <div className="project-files">{renderProjectFiles()}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {activeView === "resume" && (
                        <div className="webview">
                            <div className="webview-bar">
                                <div className="webview-pill">Resume Preview</div>
                                <a href="/files/resume.pdf" target="_blank" rel="noreferrer">Open</a>
                            </div>
                            <iframe src="/files/resume.pdf" title="Resume preview" />
                            <p>Resume preview loaded from the portfolio files folder.</p>
                        </div>
                    )}

                    {currentWebView && (
                        <div className="webview">
                            <div className="webview-bar">
                                <div className="webview-pill">{activeView === "github" ? "GitHub Profile" : "LeetCode"}</div>
                                <a href={currentWebView} target="_blank" rel="noreferrer">Open</a>
                            </div>
                            <iframe src={currentWebView} title={activeView} />
                            <p>Web view preview. If the remote site blocks embedding, open it in a new tab.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default WindowWrapper(Finder, "finder");
