
import { useState, useEffect } from "react";
import { Button, TabBar } from "glisse";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";
import { Analytics } from "@vercel/analytics/react";

const projects = [
  {
    title: "NixOS Configuration",
    description:
      "My personal NixOS configuration, featuring a customized Linux environment.",
    tags: ["NixOS", "Hyprland", "Linux"],
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
  "NixOS", "Hyprland", "Zsh", "OpenCore",
  "EFI", "macOS", "Git", "GitHub",
];

const navigation = [
  { value: "home", label: "Home" },
  { value: "projects", label: "Projects" },
  { value: "skills", label: "Skills" },
  { value: "contact", label: "Contact" },
];

function App() {
  const [activeTab, setActiveTab] = useState("home");

  // Start with the theme detected in index.html
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark"
  );

  // Apply theme and update browser theme colour
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        theme === "dark" ? "#1c1c1e" : "#f5f5f7"
      );
  }, [theme]);

  // Track the currently visible section while scrolling
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
    <>
      <Analytics />
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
              theme === "dark"
                ? <SunIcon weight="fill" />
                : <MoonIcon weight="fill" />
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
          <h1>Tomás Durães<span className="blue-dot">.</span></h1>
          <h2>Backend Developer</h2>
          <p>
            Student and technology enthusiast interested in programming,
            Linux, macOS and computer systems.
          </p>

          <div className="hero-actions">
            <Button
              variant="filled"
              onClick={() => {
                window.location.href = "mailto:tomas.duraes2009@gmail.com";
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
            <p>Interested in my work? Feel free to reach out.</p>

            <div className="hero-actions">
              <Button
                variant="filled"
                onClick={() => {
                  window.location.href = "mailto:tomas.duraes2009@gmail.com";
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
    </>
  );
}

export default App;
