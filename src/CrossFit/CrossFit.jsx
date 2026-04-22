import { useEffect, useState } from "react";
import "./CrossFit.css";

const navGroups = [
  {
    title: "Getting Started",
    links: ["What is CrossFit?", "The CrossFit Effect", "Find a Gym"],
  },
  {
    title: "Courses",
    links: ["Level 1 Certificate Course", "Explore All Courses", "Coaching Resources"],
  },
  {
    title: "Workouts",
    links: ["Workout of the Day", "Explore Workouts", "Hero Workouts"],
  },
];

const articleCards = [
  {
    category: "Essentials",
    title: "Why Standards Define Everything",
    text: "Functional movement, constant variety, and threshold training create the balance that makes progress measurable.",
  },
  {
    category: "Education",
    title: "Why CrossFit Trainers Are So Prepared",
    text: "A practical coaching pathway turns movement standards into useful feedback inside class.",
  },
  {
    category: "Community",
    title: "CrossFit Is Not Easy. Neither Is Life.",
    text: "The work inside the gym builds strength, confidence, and a community that keeps showing up.",
  },
];

const courseLinks = [
  "Courses Near You",
  "Certificate Courses",
  "Certifications",
  "Private Courses",
];

const faqCards = [
  {
    title: "Do I have to be fit to start CrossFit?",
    text: "No. Workouts are scaled to meet you where you are and help you progress safely.",
  },
  {
    title: "How will my body change with regular training?",
    text: "Most people feel stronger, improve endurance, and see meaningful health markers move.",
  },
  {
    title: "What should I expect at my first class?",
    text: "A coach will guide the warmup, explain the workout, adjust movements, and keep you moving well.",
  },
];

const footerColumns = [
  {
    title: "About CrossFit",
    links: ["What Is CrossFit?", "Get Started", "Workouts", "Movements", "FAQ"],
  },
  {
    title: "Education",
    links: ["Courses Near You", "Certificate Courses", "Certifications", "Explore Courses"],
  },
  {
    title: "Affiliates",
    links: ["Open a CrossFit Gym", "Field Leaders", "Global Mentor Program", "Affiliate Toolkit"],
  },
  {
    title: "The CrossFit Games",
    links: ["About the Games", "Leaderboard", "Schedule", "Workouts"],
  },
];

const genuinApiKey = "5bb7d302c337f2037072da4390ad373019d68ae1d46627e1";

const genuinPlacements = {
  hero: {
    containerId: "gen-sdk-hero",
    styleId: "69e7426eb7908587274a2ee0",
    placementId: "69e7426eb7908587274a2edf",
  },
  coaches: {
    containerId: "gen-sdk-coaches",
    styleId: "69e73d69e5a28ab56aac2bbc",
    placementId: "69e73d69e5a28ab56aac2bbb",
  },
};

function CrossFitGenuinPlacement({ ariaLabel, className = "", placement, style }) {
  useEffect(() => {
    const initializeGenuin = () => {
      if (window.genuin?.init) {
        window.genuin.init({ api_key: genuinApiKey });
      } else {
        console.warn("The Genuin SDK script loaded, but the placement returned no videos.");
      }
    };

    const existingScript = document.getElementById("genuin-sdk-script");

    if (existingScript) {
      existingScript.addEventListener("load", initializeGenuin, { once: true });
      initializeGenuin();

      return () => {
        existingScript.removeEventListener("load", initializeGenuin);
      };
    }

    const script = document.createElement("script");
    script.id = "genuin-sdk-script";
    script.src = "https://media.begenuin.com/sdk/2.0.5/gen_sdk.min.js";
    script.async = true;
    script.addEventListener("load", initializeGenuin, { once: true });
    script.addEventListener("error", () => {
      console.warn("The Genuin SDK script could not be loaded.");
    });
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", initializeGenuin);
    };
  }, []);

  return (
    <div
      className={`crossfit-genuin-placement ${className}`}
      aria-label={ariaLabel}
    >
      <div
        id={placement.containerId}
        className="gen-sdk-class"
        data-api-key={genuinApiKey}
        data-placement-id={placement.placementId}
        data-style-id={placement.styleId}
        style={{ maxWidth: "100%", background: "#efefef", ...style }}
      />
    </div>
  );
}

export default function CrossFit() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("");

  const gymMessage = location.trim()
    ? `Showing gyms near ${location.trim()}`
    : "Please enable location services";

  return (
    <div className="crossfit-page">
      <a className="crossfit-announcement" href="#games">
        <span>2026 CrossFit Games tickets now available to general public</span>
        <strong>Buy tickets now</strong>
      </a>

      <header className="crossfit-header">
        <a className="crossfit-brand" href="#/crossfit" aria-label="CrossFit home">
          CrossFit
        </a>
        <button
          className="crossfit-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="crossfit-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={`crossfit-nav ${menuOpen ? "crossfit-nav--open" : ""}`}
          id="crossfit-nav"
          aria-label="Primary navigation"
        >
          <a href="#affiliate">Open a CrossFit Gym</a>
          {navGroups.map((group) => (
            <div className="crossfit-nav-group" key={group.title}>
              <a href={`#${group.title.toLowerCase().replaceAll(" ", "-")}`}>
                {group.title}
              </a>
              <div className="crossfit-nav-panel">
                {group.links.map((link) => (
                  <a href="#content" key={link}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <a href="#content">Media</a>
          <a href="#games">Games</a>
          <a href="#store">Store</a>
          <a className="crossfit-demo-link" href="#/biterun">
            BiteRun
          </a>
          <a className="crossfit-demo-link" href="#/expedia">
            Expidition
          </a>
          <a className="crossfit-demo-link" href="#/costcut">
            CostCut
          </a>
          <a className="crossfit-login" href="#account">
            Log In
          </a>
        </nav>
      </header>

      <main>
        <section className="crossfit-hero" aria-labelledby="crossfit-hero-title">
          <div className="crossfit-hero-overlay">
            <p className="crossfit-kicker">Forging elite fitness</p>
            <h1 id="crossfit-hero-title">The CrossFit Effect</h1>
            <p>
              We gave away the secrets so you could lead the movement.
            </p>
            <div className="crossfit-hero-actions">
              <a className="crossfit-button crossfit-button--primary" href="#find-gym">
                Find Gyms Near You
              </a>
              <a className="crossfit-button crossfit-button--secondary" href="#content">
                Explore Courses
              </a>
            </div>
          </div>
          <CrossFitGenuinPlacement
            ariaLabel="CrossFit featured videos"
            className="crossfit-genuin-placement--hero"
            placement={genuinPlacements.hero}
            style={{ width: "420px", height: "700px" }}
          />
        </section>

        <section
          className="crossfit-gym-search"
          id="find-gym"
          aria-labelledby="crossfit-gym-title"
        >
          <div>
            <p className="crossfit-kicker">Find Gyms Near You</p>
            <h2 id="crossfit-gym-title">Start with a coach close by.</h2>
          </div>
          <form className="crossfit-search-form" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="gym-location">Search by location, zip code, or gym name</label>
            <div>
              <input
                id="gym-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="New York, NY"
              />
              <button type="submit">Search</button>
            </div>
            <p>{gymMessage}</p>
          </form>
          <a className="crossfit-map-link" href="#map">
            Visit the CrossFit Map
          </a>
        </section>

        <section className="crossfit-section" id="content" aria-labelledby="for-you-title">
          <div className="crossfit-section-header">
            <h2 id="for-you-title">CrossFit is For You</h2>
            <a href="#content">View All</a>
          </div>
          <div className="crossfit-article-grid">
            {articleCards.map((card) => (
              <article className="crossfit-article-card" key={card.title}>
                <span>{card.category}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <a href="#content">Read More</a>
              </article>
            ))}
          </div>
        </section>

        <section className="crossfit-split-section" aria-labelledby="formula-title">
          <div className="crossfit-split-copy">
            <p className="crossfit-kicker">The formula</p>
            <h2 id="formula-title">Constantly varied, functional movement, performed at high intensity.</h2>
            <p>
              CrossFit combines training, nutrition, and community accountability
              into a program that keeps people engaged for years.
            </p>
          </div>
          <div className="crossfit-stat-grid" aria-label="CrossFit highlights">
            <div>
              <strong>20+</strong>
              <span>Years of training culture</span>
            </div>
            <div>
              <strong>150+</strong>
              <span>Countries with affiliates</span>
            </div>
            <div>
              <strong>1</strong>
              <span>Coach-led class at a time</span>
            </div>
          </div>
        </section>

        <section className="crossfit-photo-cta crossfit-photo-cta--life" aria-labelledby="life-title">
          <div>
            <h2 id="life-title">Enhance Your Life In &amp; Out Of The Gym</h2>
            <p>
              For over 20 years, CrossFit has delivered results to people of all
              ages and fitness levels through training, nutrition, and community.
            </p>
            <div className="crossfit-hero-actions">
              <a className="crossfit-button crossfit-button--primary" href="#find-gym">
                Try CrossFit
              </a>
              <a className="crossfit-button crossfit-button--secondary" href="#content">
                Learn More
              </a>
            </div>
          </div>
        </section>

        <section className="crossfit-section" aria-labelledby="courses-title">
          <div className="crossfit-section-header">
            <h2 id="courses-title">Build Better Coaches</h2>
            <a href="#content">Explore All Courses</a>
          </div>
          <div className="crossfit-course-row">
            {courseLinks.map((course) => (
              <a href="#content" key={course}>
                <span>{course}</span>
              </a>
            ))}
          </div>
          <CrossFitGenuinPlacement
            ariaLabel="Build Better Coaches videos"
            className="crossfit-genuin-placement--coaches"
            placement={genuinPlacements.coaches}
            style={{ width: "1180px", height: "420px" }}
          />
        </section>

        <section className="crossfit-section" aria-labelledby="faq-title">
          <div className="crossfit-section-header">
            <h2 id="faq-title">FAQs, Expert Answers</h2>
            <a href="#content">View All</a>
          </div>
          <div className="crossfit-faq-grid">
            {faqCards.map((faq) => (
              <article className="crossfit-faq-card" key={faq.title}>
                <h3>{faq.title}</h3>
                <p>{faq.text}</p>
                <a href="#content">Learn More</a>
              </article>
            ))}
          </div>
        </section>

        <section className="crossfit-photo-cta crossfit-photo-cta--gym" aria-labelledby="nearby-title">
          <div>
            <h2 id="nearby-title">Find a CrossFit Gym Near You</h2>
            <p>
              Your CrossFit journey starts at a gym near you. Find a location
              that is convenient and ready to welcome you.
            </p>
            <a className="crossfit-button crossfit-button--primary" href="#find-gym">
              Find a CrossFit Gym
            </a>
          </div>
        </section>
      </main>

      <footer className="crossfit-footer">
        <div className="crossfit-footer-main">
          <div className="crossfit-footer-links">
            {footerColumns.map((column) => (
              <section key={column.title}>
                <h3>{column.title}</h3>
                {column.links.map((link) => (
                  <a href="#content" key={link}>
                    {link}
                  </a>
                ))}
              </section>
            ))}
          </div>
          <div className="crossfit-footer-signup">
            <h3>Find a gym today!</h3>
            <p>Start your fitness journey today and get healthy.</p>
            <a className="crossfit-button crossfit-button--primary" href="#find-gym">
              Find a gym near you
            </a>
            <form onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="wod-email">Subscribe to the Workout of the Day</label>
              <div>
                <input id="wod-email" type="email" placeholder="your@email.com" />
                <button type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
        <div className="crossfit-footer-bottom">
          <p>
            © 2026 CrossFit, LLC. CrossFit, Fittest on Earth, 3...2...1...Go!,
            CrossFit Games, and Sport of Fitness are trademarks of CrossFit, LLC.
          </p>
          <nav aria-label="Legal navigation">
            <a href="#content">Terms</a>
            <a href="#content">Privacy</a>
            <a href="#content">Cookie Policy</a>
            <a href="#content">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
