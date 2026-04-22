import { useEffect } from "react";
import "./People.css";

const navLinks = [
  "Entertainment",
  "Celebrity",
  "Style",
  "Lifestyle",
  "Royals",
  "Human Interest",
  "Shopping",
  "TV",
];

const quickStories = [
  {
    category: "Exclusive",
    title: "Inside the dinner party everyone kept talking about",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=84",
  },
  {
    category: "Style",
    title: "The spring dress trend showing up on every carpet",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=84",
  },
];

const latestNews = [
  "Beloved screen star shares the advice that changed her career",
  "A surprise reunion brings the cast back together for one night",
  "Inside a chef's new home kitchen and the recipe that started it all",
  "A family celebrates a milestone with a backyard ceremony",
  "The playlist, book, and getaway editors are recommending this week",
];

const photoStories = [
  {
    title: "A gala night full of bright color and old friends",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=84",
  },
  {
    title: "The candid backstage moment fans loved",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=84",
  },
  {
    title: "A sunny arrival at the weekend film premiere",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=84",
  },
  {
    title: "The tiny detail that made this look memorable",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=84",
  },
];

const genuinApiKey = "2ad9a23113eb3fe4108d071988325a48b5bd5b90df04678d";

const genuinPlacements = [
  {
    ariaLabel: "People editor picks videos",
    containerId: "gen-sdk-people-editors-picks",
    height: "820px",
    placement_id: "69e8ce63b7908587274ad106",
    style_id: "69e8ce63b7908587274ad107",
    width: "100%",
  },
  {
    ariaLabel: "People shopping videos",
    containerId: "gen-sdk-people-shopping",
    height: "820px",
    placement_id: "69e8d009c389e59d070aee74",
    style_id: "69e8d009c389e59d070aee75",
    width: "100%",
  },
];

function PeopleGenuinPlacement({ placement }) {
  useEffect(() => {
    const initializeGenuin = () => {
      const container = document.getElementById(placement.containerId);

      if (!container || container.dataset.genuinInitialized === "true") {
        return;
      }

      if (window.genuin?.init) {
        window.genuin.init({
          api_key: genuinApiKey,
          placement_id: placement.placement_id,
          style_id: placement.style_id,
        });
        container.dataset.genuinInitialized = "true";
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
  }, [placement.containerId, placement.placement_id, placement.style_id]);

  return (
    <section className="people-genuin-section" aria-label={placement.ariaLabel}>
      <div
        id={placement.containerId}
        className="gen-sdk-class"
        data-api-key={genuinApiKey}
        data-placement-id={placement.placement_id}
        data-style-id={placement.style_id}
        style={{ width: placement.width, height: placement.height, background: "#efefef" }}
      />
    </section>
  );
}

function StoryCard({ story }) {
  return (
    <article className="people-story-card">
      <img src={story.image} alt="" />
      <div>
        <span>{story.category}</span>
        <h3>{story.title}</h3>
      </div>
    </article>
  );
}

export default function People() {
  return (
    <div className="people-page">
      <header className="people-header">
        <div className="people-utility">
          <a href="#newsletters">Newsletters</a>
          <a href="#subscribe">Subscribe</a>
          <a href="#search">Search</a>
          <a href="#/costcut">CostCut</a>
        </div>
        <a className="people-logo" href="#/people" aria-label="People home">
          PEOPLE
        </a>
        <nav className="people-nav" aria-label="People sections">
          {navLinks.map((link) => (
            <a href="#sections" key={link}>
              {link}
            </a>
          ))}
          <a href="#/crossfit">CrossFit</a>
          <a href="#/biterun">BiteRun</a>
          <a href="#/yamaha">Yamaha</a>
        </nav>
      </header>

      <main>
        <section className="people-lead-grid" aria-labelledby="people-main-story">
          <article className="people-lead-story">
            <img
              src="https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1400&q=84"
              alt=""
            />
            <div>
              <span>Cover Story</span>
              <h1 id="people-main-story">
                The stars, style moments, and human stories everyone is talking about.
              </h1>
              <p>
                A fresh entertainment homepage with the same quick-scan rhythm:
                big photos, bold headlines, and a steady stream of culture notes.
              </p>
            </div>
          </article>

          <div className="people-side-stack">
            {quickStories.map((story) => (
              <StoryCard key={story.title} story={story} />
            ))}
          </div>

          <aside className="people-latest" aria-labelledby="latest-title">
            <p>Latest</p>
            <h2 id="latest-title">News now</h2>
            {latestNews.map((item) => (
              <a href="#latest" key={item}>
                {item}
              </a>
            ))}
          </aside>
        </section>

        <section className="people-photo-strip" aria-labelledby="photos-title">
          <div className="people-section-heading">
            <p>Must-see moments</p>
            <h2 id="photos-title">Photos people are opening first</h2>
          </div>
          <div className="people-photo-grid">
            {photoStories.map((story) => (
              <article key={story.title}>
                <img src={story.image} alt="" />
                <h3>{story.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="people-feature-layout" id="sections">
          <div className="people-feature-main">
            <div className="people-section-heading">
              <p>Editors' picks</p>
              <h2>Stories with staying power</h2>
            </div>
            <div className="people-genuin-grid">
              {genuinPlacements.map((placement) => (
                <PeopleGenuinPlacement key={placement.containerId} placement={placement} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="people-footer">
        <a className="people-logo" href="#/people" aria-label="People home">
          PEOPLE
        </a>
        <nav aria-label="Demo pages">
          <a href="#/crossfit">CrossFit</a>
          <a href="#/biterun">BiteRun</a>
          <a href="#/expedia">Expidition</a>
          <a href="#/costcut">CostCut</a>
          <a href="#/yamaha">Yamaha</a>
        </nav>
        <p>Replica demo page.</p>
      </footer>
    </div>
  );
}
