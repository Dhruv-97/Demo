import { useEffect, useMemo, useState } from "react";
import "./Expedia.css";

const tabs = ["Stays", "Flights", "Cars", "Packages", "Things to do", "Cruises"];

const destinationIdeas = [
  {
    city: "Cancun",
    detail: "Beach resorts with flight + hotel savings",
    image:
      "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "New York",
    detail: "Weekend hotels near the city buzz",
    image:
      "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Paris",
    detail: "Romantic stays and flexible flights",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
];

const packageCards = [
  {
    title: "All-inclusive escapes",
    text: "Pair flights and resorts for a smoother sunny getaway.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "City breaks",
    text: "Book a hotel, add a flight, and keep plans flexible.",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Family favorites",
    text: "Find roomy stays and activities that keep everyone moving.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
];

const quickLinks = [
  "Hotels",
  "Flights",
  "Vacation rentals",
  "Car rentals",
  "Packages",
  "Things to do",
  "Cruises",
  "Travel deals",
];

const footerGroups = [
  {
    title: "Company",
    links: ["About", "Jobs", "List your property", "Partnerships"],
  },
  {
    title: "Explore",
    links: ["United States travel", "Hotels in Las Vegas", "Flights to Orlando", "Vacation packages"],
  },
  {
    title: "Policies",
    links: ["Privacy", "Terms of use", "Accessibility", "Support"],
  },
];

const genuinApiKey = "5bb7d302c337f2037072da4390ad373019d68ae1d46627e1";

const genuinPlacements = {
  wide: {
    ariaLabel: "Traveler stories",
    containerId: "gen-sdk",
    height: "325px",
    placement_id: "69e798334f981f9247b537c4",
    style_id: "69e798334f981f9247b537c5",
    width: "900px",
  },
  rail: {
    ariaLabel: "Featured travel stories",
    containerId: "gen-sdk-expedia-rail",
    height: "750px",
    placement_id: "69e79e624f981f9247b53a5a",
    style_id: "69e79e624f981f9247b53a5b",
    width: "200px",
  },
};

function ExpediaGenuinPlacement({ className = "", placement }) {
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
    <div
      className={`expedia-genuin-placement ${className}`}
      aria-label={placement.ariaLabel}
    >
      <div
        id={placement.containerId}
        className="gen-sdk-class"
        data-api-key={genuinApiKey}
        data-placement-id={placement.placement_id}
        data-style-id={placement.style_id}
        style={{ width: placement.width, height: placement.height, background: "#efefef" }}
      />
    </div>
  );
}

function SearchTabPanel({ activeTab }) {
  const primaryLabel = useMemo(() => {
    if (activeTab === "Flights") return "Leaving from";
    if (activeTab === "Cars") return "Pick-up location";
    if (activeTab === "Things to do") return "Destination";
    if (activeTab === "Cruises") return "Destination or cruise line";
    return "Where to?";
  }, [activeTab]);

  const secondaryLabel = activeTab === "Flights" ? "Going to" : "Dates";

  return (
    <form className="expedia-search-form" onSubmit={(event) => event.preventDefault()}>
      <div className="expedia-trip-switch" aria-label="Trip type">
        <button className="active" type="button">
          Roundtrip
        </button>
        <button type="button">One-way</button>
        <button type="button">Multi-city</button>
      </div>

      <div className="expedia-field-grid">
        <label className="expedia-field expedia-field--wide">
          <span>{primaryLabel}</span>
          <input placeholder={activeTab === "Flights" ? "City or airport" : "Going to"} />
        </label>
        <label className="expedia-field">
          <span>{secondaryLabel}</span>
          <input placeholder={activeTab === "Flights" ? "City or airport" : "Apr 28 - May 2"} />
        </label>
        <label className="expedia-field">
          <span>Travelers</span>
          <input defaultValue="2 travelers, 1 room" />
        </label>
      </div>

      <label className="expedia-checkbox">
        <input type="checkbox" />
        <span>Add a flight to save even more</span>
      </label>

      <button className="expedia-primary-button" type="submit">
        Search
      </button>
    </form>
  );
}

export default function Expedia() {
  const [activeTab, setActiveTab] = useState("Stays");

  return (
    <div className="expedia-page">
      <header className="expedia-header">
        <a className="expedia-brand" href="#/expedia" aria-label="Expidition home">
          <span>e</span>
          Expidition
        </a>
        <nav className="expedia-nav" aria-label="Primary navigation">
          <a href="#shop">Shop travel</a>
          <a href="#/crossfit">CrossFit</a>
          <a href="#/biterun">BiteRun</a>
          <a href="#/costcut">CostCut</a>
          <a href="#property">List your property</a>
          <a href="#support">Support</a>
          <a href="#trips">Trips</a>
          <a className="expedia-sign-in" href="#signin">
            Sign in
          </a>
        </nav>
      </header>

      <main>
        <section className="expedia-hero" aria-labelledby="expedia-hero-title">
          <div className="expedia-hero-media" aria-hidden="true" />
          <div className="expedia-search-card" id="shop">
            <h1 id="expedia-hero-title">The one place you go to go places.</h1>
            <p>
              Book stays, flights, cars, packages, and things to do with a trip
              planner built for real life.
            </p>

            <div className="expedia-tabs" role="tablist" aria-label="Travel search categories">
              {tabs.map((tab) => (
                <button
                  aria-selected={activeTab === tab}
                  className={activeTab === tab ? "active" : ""}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>

            <SearchTabPanel activeTab={activeTab} />
          </div>
        </section>

        <section className="expedia-promo-band" aria-label="Member savings">
          <div>
            <span>Member prices</span>
            <strong>Save 10% or more on thousands of stays.</strong>
          </div>
          <a href="#signin">Sign in and save</a>
        </section>

        <section className="expedia-section" aria-labelledby="early-save-title">
          <div className="expedia-section-header">
            <h2 id="early-save-title">Book early and save</h2>
            <a href="#deals">Explore deals</a>
          </div>
          <div className="expedia-destination-grid">
            {destinationIdeas.map((destination) => (
              <article className="expedia-destination-card" key={destination.city}>
                <img src={destination.image} alt="" />
                <div>
                  <h3>{destination.city}</h3>
                  <p>{destination.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="expedia-sdk-section">
          <ExpediaGenuinPlacement
            className="expedia-genuin-placement--wide"
            placement={genuinPlacements.wide}
          />
        </section>

        <div className="expedia-rail-layout">
          <div className="expedia-rail-main">
            <section className="expedia-section" aria-labelledby="package-title">
              <div className="expedia-section-header">
                <h2 id="package-title">More ways to get away</h2>
                <a href="#packages">View packages</a>
              </div>
              <div className="expedia-package-grid">
                {packageCards.map((card) => (
                  <article className="expedia-package-card" key={card.title}>
                    <img src={card.image} alt="" />
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                      <a href="#packages">Plan a trip</a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="expedia-links-section" aria-labelledby="links-title">
              <h2 id="links-title">Explore stays and travel</h2>
              <div className="expedia-link-grid">
                {quickLinks.map((link) => (
                  <a href="#shop" key={link}>
                    {link}
                  </a>
                ))}
              </div>
            </section>
          </div>
          <aside className="expedia-rail-aside" aria-label="Featured travel stories">
            <ExpediaGenuinPlacement
              className="expedia-genuin-placement--rail"
              placement={genuinPlacements.rail}
            />
          </aside>
        </div>
      </main>

      <footer className="expedia-footer">
        <div className="expedia-footer-brand">
          <span>e</span>
          Expidition
        </div>
        <div className="expedia-footer-grid">
          {footerGroups.map((group) => (
            <section key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map((link) => (
                <a href="#support" key={link}>
                  {link}
                </a>
              ))}
            </section>
          ))}
        </div>
        <p>Replica demo page.</p>
      </footer>
    </div>
  );
}
