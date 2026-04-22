import { useEffect, useMemo, useState } from "react";
import "./YamahaMotorsports.css";

const productCategories = [
  "Motorcycles",
  "Side-by-Sides",
  "ATVs",
  "Off-Road",
  "Snowmobiles",
  "Power Assist Bicycles",
];

const featuredMachines = [
  {
    category: "Supersport",
    name: "R-Series Track Edition",
    price: "From $18,499",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1100&q=80",
  },
  {
    category: "Side-by-Side",
    name: "Adventure Utility XT",
    price: "From $24,999",
    image:
      "https://images.unsplash.com/photo-1604054094723-3a949e4a69e9?auto=format&fit=crop&w=1100&q=80",
  },
  {
    category: "Off-Road",
    name: "YZ Dirt Competition",
    price: "From $9,999",
    image:
      "https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?auto=format&fit=crop&w=1100&q=80",
  },
  {
    category: "Snow",
    name: "Mountain Snowcross LE",
    price: "From $15,799",
    image:
      "https://images.unsplash.com/photo-1518972734183-c5b490a7c637?auto=format&fit=crop&w=1100&q=80",
  },
];

const rideCards = [
  {
    title: "Find your next machine",
    text: "Compare families, trim levels, and capability across road, dirt, snow, and utility.",
  },
  {
    title: "Schedule a demo",
    text: "Connect with a dealer for availability, ride days, financing, and accessory packages.",
  },
  {
    title: "Factory racing",
    text: "Follow teams, race calendars, rider news, and competition-inspired performance tech.",
  },
];

const accessoryCards = [
  "Helmets & riding gear",
  "Performance accessories",
  "Genuine parts",
  "Maintenance kits",
  "Lifestyle apparel",
  "Owner resources",
];

const genuinApiKey = "5bb7d302c337f2037072da4390ad373019d68ae1d46627e1";

const genuinPlacement = {
  ariaLabel: "Yamaha featured videos",
  containerId: "gen-sdk-yamaha-products",
  height: "620px",
  placement_id: "69e833d94f981f9247b558cb",
  style_id: "69e833d94f981f9247b558cc",
  width: "460px",
};

function YamahaGenuinPlacement({ placement }) {
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
    <section className="yamaha-genuin-placement" aria-label={placement.ariaLabel}>
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

function MachineCard({ machine }) {
  return (
    <article className="yamaha-machine-card">
      <img src={machine.image} alt="" />
      <div>
        <span>{machine.category}</span>
        <h3>{machine.name}</h3>
        <p>{machine.price}</p>
        <a href="#models">Explore model</a>
      </div>
    </article>
  );
}

export default function YamahaMotorsports() {
  const [activeCategory, setActiveCategory] = useState("Motorcycles");

  const selectedMachines = useMemo(() => {
    if (activeCategory === "Motorcycles") {
      return featuredMachines.filter((machine) =>
        ["Supersport", "Off-Road"].includes(machine.category),
      );
    }

    if (activeCategory === "Side-by-Sides") {
      return featuredMachines.filter((machine) => machine.category === "Side-by-Side");
    }

    if (activeCategory === "Snowmobiles") {
      return featuredMachines.filter((machine) => machine.category === "Snow");
    }

    return featuredMachines;
  }, [activeCategory]);

  return (
    <div className="yamaha-page">
      <header className="yamaha-header">
        <a className="yamaha-brand" href="#/yamaha" aria-label="Yamaha Motorsports home">
          <span>Y</span>
          <strong>Yamaha</strong>
          <em>Motorsports</em>
        </a>
        <nav className="yamaha-nav" aria-label="Primary navigation">
          <a href="#products">Products</a>
          <a href="#experience">Experience</a>
          <a href="#racing">Racing</a>
          <a href="#parts">Parts & Accessories</a>
          <a href="#dealer">Find a Dealer</a>
          <a href="#/crossfit">CrossFit</a>
          <a href="#/costcut">CostCut</a>
          <a href="#/people">People</a>
        </nav>
      </header>

      <main>
        <section className="yamaha-hero" aria-labelledby="yamaha-hero-title">
          <div className="yamaha-hero-copy">
            <p>Proven off-road, track, trail, and snow performance</p>
            <h1 id="yamaha-hero-title">Revs your weekend remembers.</h1>
            <div className="yamaha-hero-actions">
              <a href="#products">Shop models</a>
              <a href="#dealer">Find a dealer</a>
            </div>
          </div>
          <div className="yamaha-hero-stat">
            <span>2026 lineup</span>
            <strong>Built for every ride</strong>
            <p>Road, dirt, utility, snow, and adventure machines in one showroom.</p>
          </div>
        </section>

        <section className="yamaha-products-layout" id="products" aria-labelledby="products-title">
          <div className="yamaha-products-main">
            <div className="yamaha-section-header">
              <p>Products</p>
              <h2 id="products-title">Choose your ride</h2>
            </div>
            <div className="yamaha-category-tabs" aria-label="Product categories">
              {productCategories.map((category) => (
                <button
                  className={activeCategory === category ? "active" : ""}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="yamaha-machine-grid">
              {selectedMachines.map((machine) => (
                <MachineCard key={machine.name} machine={machine} />
              ))}
            </div>
          </div>
          <div className="yamaha-products-aside">
            <YamahaGenuinPlacement placement={genuinPlacement} />
          </div>
        </section>

        <section className="yamaha-ride-grid" id="experience" aria-label="Shopping tools">
          {rideCards.map((card) => (
            <article key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <a href="#dealer">Start here</a>
            </article>
          ))}
        </section>

        <section className="yamaha-racing" id="racing" aria-labelledby="racing-title">
          <div>
            <p>Racing heritage</p>
            <h2 id="racing-title">Competition DNA in every lineup.</h2>
          </div>
          <a href="#results">Follow the team</a>
        </section>

        <section className="yamaha-accessories" id="parts" aria-labelledby="parts-title">
          <div className="yamaha-section-header">
            <p>Parts & Accessories</p>
            <h2 id="parts-title">Gear up before you roll out</h2>
          </div>
          <div className="yamaha-accessory-grid">
            {accessoryCards.map((card) => (
              <a href="#parts" key={card}>
                {card}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="yamaha-footer">
        <div className="yamaha-footer-brand">
          <span>Y</span>
          Yamaha Motorsports
        </div>
        <div className="yamaha-footer-links">
          <a href="#/biterun">BiteRun</a>
          <a href="#/expedia">Expidition</a>
          <a href="#/costcut">CostCut</a>
          <a href="#/people">People</a>
          <a href="#dealer">Dealer locator</a>
          <a href="#parts">Owner resources</a>
        </div>
        <p>Replica demo page.</p>
      </footer>
    </div>
  );
}
