
import { useState, useEffect } from "react";
import { Button, TabBar } from "glisse";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";

const projects = [
  {
    title: "NixOS Configuration",
    description:
      "My personal NixOS configuration, featuring a customized and reproducible Linux environment.",
    tags: ["NixOS", "Hyprland", "Linux", "Nix Flakes"],
    link: "https://github.com/quicktommy/nixos-config",
  },
  {
    title: "Hackintosh Tahoe EFI",
    description:
      "My Hackintosh EFI configuration and experiments with running macOS on non-Apple hardware.",
    tags: ["OpenCore", "macOS", "EFI"],
    link: "https://github.com/quicktommy/IdeaPad-Gaming-3-15ARH05-Hackintosh",
  },
];

const skills = [
  "NixOS",
  "Hyprland",
  "Zsh",
  "OpenCore",
  "EFI",
  "macOS",
  "Git",
  "GitHub",
];

const navigation = [
  { value: "home", label: "Home" },
  { value: "about", label: "About" },
  { value: "projects", label: "Projects" },
  { value: "skills", label: "Skills" },
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
          <h2>Junior Software Developer | Linux & Systems Enthusiast</h2>
          <p>
            Programming student and technology enthusiast interested
            in software development, Linux, macOS and computer systems.
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
              I'm a programming student with a strong interest in
              software, operating systems and the relationship
              between hardware and software.
            </p>

            <p>
              I enjoy experimenting with different technologies,
              configuring Linux environments, exploring macOS on
              non-Apple hardware and building projects that help me
              learn through practical experience.
            </p>

            <div className="about-divider" />

            <span className="eyebrow">MY DEVELOPMENT APPROACH</span>
            <h3>Vibe coding & AI-assisted development</h3>

            <p>
              I use AI-assisted development tools to explore ideas,
              prototype features and speed up implementation.
              AI-generated code is a starting point, not a finished
              product: I review, test and refine it as part of my
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
            <span className="eyebrow">MY TOOLKIT</span>
            <h2>Skills & Technologies</h2>
          </div>

          <div className="skills-panel">
            {skills.map((skill) => (
              <span className="glass-tag skill-tag" key={skill}>
                {skill}
              </span>
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
