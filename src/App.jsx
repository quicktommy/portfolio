
import { useState, useEffect } from "react";
import { Button, TabBar } from "glisse";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";

const projects = [
    {
        title: "NixOS Configuration",
        description:
            "A personal, declarative NixOS configuration built around a customized Hyprland desktop. Uses Nix flakes and modular configuration to keep the environment reproducible and maintainable, with Noctalia as its desktop shell.",
        tags: ["NixOS", "Nix Flakes", "Hyprland", "Noctalia", "Linux"],
        link: "https://github.com/quicktommy/nixos-config",
    },
    {
        title: "Hackintosh Tahoe EFI",
        description:
            "An OpenCore EFI project for running macOS Tahoe on a Lenovo IdeaPad Gaming 3 15ARH05 with a Ryzen 5 4600H. Includes separate Recovery and Full EFI setups, plus Intel AX210 Wi-Fi and Bluetooth support.",
        tags: ["OpenCore", "macOS Tahoe", "EFI", "Ryzen", "Intel AX210"],
        link: "https://github.com/quicktommy/IdeaPad-Gaming-3-15ARH05-Hackintosh",
    },
];

const skillGroups = [
    {
        title: "Operating Systems",
        items: ["Linux", "NixOS", "macOS"],
    },
    {
        title: "Desktop & Customization",
        items: ["Hyprland", "Noctalia", "Zsh"],
    },
    {
        title: "System Configuration",
        items: ["Nix Flakes", "Declarative Configuration", "OpenCore", "EFI"],
    },
    {
        title: "Development Tools",
        items: ["Git", "GitHub"],
    },
];

const learningItems = [
    {
        title: "Rust",
        description:
            "Exploring the language and learning its fundamentals.",
    },
    {
        title: "SQL",
        description:
            "Learning basic SQL syntax, queries and database concepts.",
    },
];

const navigation = [
    { value: "home", label: "Home" },
    { value: "about", label: "About" },
    { value: "projects", label: "Projects" },
    { value: "skills", label: "Interests" },
    { value: "learning", label: "Learning" },
    { value: "contact", label: "Contact" },
];

function App() {
    const [activeTab, setActiveTab] = useState("home");

    const [theme, setTheme] = useState(
        () => document.documentElement.dataset.theme || "dark"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);

        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute(
                "content",
                theme === "dark" ? "#1c1c1e" : "#f5f5f7"
            );
    }, [theme]);

    useEffect(() => {
        const sections = navigation
            .map(({ value }) => document.getElementById(value))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visible.length > 0) {
                    setActiveTab(visible[0].target.id);
                }
            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: 0,
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    function navigate(value) {
        setActiveTab(value);

        document.getElementById(value)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    return (
        <main className="page-scene" data-glisse-backdrop>
            <div className="ambient ambient-blue" />
            <div className="ambient ambient-purple" />
            <div className="ambient ambient-pink" />

            <div className="container">
                <div className="nav-wrapper">
                    <span className="nav-brand">Tomás Durães</span>

                    <TabBar
                        aria-label="Portfolio navigation"
                        items={navigation}
                        value={activeTab}
                        onValueChange={navigate}
                    />

                    <Button
                        variant="glass"
                        icon={
                            theme === "dark" ? (
                                <SunIcon weight="fill" />
                            ) : (
                                <MoonIcon weight="fill" />
                            )
                        }
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                        tint={theme === "dark" ? "#FFD60A" : "#0A84FF"}
                        onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                    />
                </div>

                <header id="home" className="hero">
                    <span className="eyebrow">PERSONAL PORTFOLIO</span>
                    <h1>
                        Tomás Durães<span className="blue-dot">.</span>
                    </h1>
                    <h2>Programming Student & Junior Developer</h2>
                    <p>
                        Interested in backend development, Linux, macOS
                        and computer systems.
                    </p>

                    <div className="hero-actions">
                        <Button
                            variant="filled"
                            onClick={() => {
                                window.location.href =
                                    "mailto:tomas.duraes2009@gmail.com";
                            }}
                        >
                            Contact Me
                        </Button>

                        <Button
                            variant="glass"
                            onClick={() => navigate("projects")}
                        >
                            View Projects
                        </Button>
                    </div>
                </header>

                <section id="about">
                    <div className="section-heading">
                        <span className="eyebrow">A LITTLE ABOUT ME</span>
                        <h2>About Me</h2>
                    </div>

                    <div className="about-panel">
                        <p>
                            I'm a programming student interested in software
                            development, operating systems and the relationship
                            between hardware and software.
                        </p>

                        <p>
                            I enjoy experimenting with different technologies,
                            configuring Linux environments, exploring macOS on
                            non-Apple hardware and learning how computer systems
                            work. I'm also interested in hardware troubleshooting
                            and diagnosing software and system issues.
                        </p>

                        <p>
                            My technical interests include backend development,
                            Linux system configuration, macOS, computer hardware
                            and software troubleshooting.
                        </p>

                        <div className="about-divider" />

                        <span className="eyebrow">MY DEVELOPMENT APPROACH</span>
                        <h3>Vibe coding & AI-assisted development</h3>

                        <p>
                            I use AI-assisted tools to explore ideas, prototype
                            features and support implementation. AI-generated
                            code is a starting point, not a finished product:
                            I review, test and refine it as part of my
                            development process.
                        </p>

                        <span className="glass-tag approach-tag">
                            AI-assisted development
                        </span>
                    </div>
                </section>

                <section id="projects">
                    <div className="section-heading">
                        <span className="eyebrow">WHAT I'VE BEEN BUILDING</span>
                        <h2>Projects</h2>
                    </div>

                    <div className="project-grid">
                        {projects.map((project) => (
                            <article className="glass-card" key={project.title}>
                                <div className="card-shine" />
                                <div className="card-content">
                                    <span className="card-label">PROJECT</span>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>

                                    <div className="tags">
                                        {project.tags.map((tag) => (
                                            <span className="glass-tag" key={tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Explore project <span>↗</span>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="skills">
                    <div className="section-heading">
                        <span className="eyebrow">WHAT I'M INTERESTED IN</span>
                        <h2>Technical Interests & Technologies</h2>
                    </div>

                    <div className="interest-grid">
                        {skillGroups.map((group) => (
                            <article className="interest-card" key={group.title}>
                                <h3>{group.title}</h3>

                                <div className="tags">
                                    {group.items.map((item) => (
                                        <span className="glass-tag" key={item}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}

                        <article className="interest-card">
                            <h3>Other Interests</h3>

                            <div className="tags">
                                {[
                                    "Backend Development",
                                    "Hardware Troubleshooting",
                                    "Computer Systems",
                                ].map((item) => (
                                    <span className="glass-tag" key={item}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </article>
                    </div>
                </section>

                <section id="learning">
                    <div className="section-heading">
                        <span className="eyebrow">CURRENTLY EXPLORING</span>
                        <h2>Currently Learning</h2>
                    </div>

                    <div className="learning-grid">
                        {learningItems.map((item) => (
                            <article className="learning-card" key={item.title}>
                                <span className="card-label">IN PROGRESS</span>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="contact">
                    <div className="contact-panel">
                        <span className="eyebrow">LET'S CONNECT</span>
                        <h2>Get in touch.</h2>
                        <p>
                            Interested in my work? Feel free to reach out.
                        </p>

                        <div className="hero-actions">
                            <Button
                                variant="filled"
                                onClick={() => {
                                    window.location.href =
                                        "mailto:tomas.duraes2009@gmail.com";
                                }}
                            >
                                Send me an email
                            </Button>

                            <Button
                                variant="glass"
                                onClick={() => {
                                    window.open(
                                        "https://github.com/quicktommy",
                                        "_blank",
                                        "noopener,noreferrer"
                                    );
                                }}
                            >
                                GitHub ↗
                            </Button>
                        </div>
                    </div>
                </section>

                <footer>
                    © {new Date().getFullYear()} Tomás Durães
                </footer>
            </div>
        </main>
    );
}

export default App;
