import { useEffect, useMemo, useState } from "react";
import "./CostCut.css";

const departments = [
  "Grocery",
  "Appliances",
  "Electronics",
  "Furniture",
  "Outdoor",
  "Pharmacy",
  "Optical",
  "Travel",
  "Business",
  "Membership",
];

const dealTiles = [
  {
    title: "Warehouse savings",
    text: "Member-only prices on pantry staples, home basics, and weekly essentials.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Big-ticket finds",
    text: "Appliances, furniture, and home theater bundles ready for delivery.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Fresh for the weekend",
    text: "Produce, bakery trays, party platters, and easy meals in larger packs.",
    image:
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1000&q=80",
  },
];

const productCards = [
  {
    title: "Stainless Kitchen Suite",
    category: "Appliances",
    price: "$2,899.99",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Organic Pantry Bundle",
    category: "Grocery",
    price: "$74.99",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Ultra HD Entertainment Set",
    category: "Electronics",
    price: "$1,249.99",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Backyard Lounge Collection",
    category: "Outdoor",
    price: "$899.99",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  },
];

const serviceCards = [
  {
    title: "Find a warehouse",
    text: "Check hours, fuel prices, services, and same-day pickup options.",
  },
  {
    title: "Pharmacy",
    text: "Manage prescriptions, shop health essentials, and schedule vaccines.",
  },
  {
    title: "Tires & auto",
    text: "Compare tires, book installation, and browse seasonal service offers.",
  },
  {
    title: "Business delivery",
    text: "Restock office supplies, snacks, paper goods, and breakroom favorites.",
  },
];

const footerGroups = [
  {
    title: "Customer Service",
    links: ["Orders", "Returns", "Shipping", "Product recalls"],
  },
  {
    title: "CostCut",
    links: ["Membership", "Locations", "Services", "Credit card"],
  },
  {
    title: "About",
    links: ["Company", "Jobs", "Sustainability", "Suppliers"],
  },
];

const genuinApiKey = "5bb7d302c337f2037072da4390ad373019d68ae1d46627e1";

const genuinPlacements = {
  versionATrending: {
    ariaLabel: "CostCut trending products",
    containerId: "gen-sdk-costcut-version-a-trending",
    height: "300px",
    placement_id: "69e81f4c4f981f9247b556ea",
    style_id: "69e81f4c4f981f9247b556eb",
    width: "1180px",
  },
  versionAFavorites: {
    ariaLabel: "CostCut member stories",
    containerId: "gen-sdk-costcut-version-a",
    height: "300px",
    placement_id: "69e7ac88e5a28ab56aac6216",
    style_id: "69e7ac88e5a28ab56aac6217",
    width: "1180px",
  },
  versionBIntro: {
    ariaLabel: "CostCut featured products",
    containerId: "gen-sdk-costcut-version-b-intro",
    height: "700px",
    placement_id: "69e8258c4f981f9247b5577b",
    style_id: "69e8258c4f981f9247b5577c",
    width: "250px",
  },
};

function CostCutGenuinPlacement({ className = "", placement, title }) {
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
    <section
      className={`costcut-genuin-section ${className}`}
      aria-label={placement.ariaLabel}
    >
      {title ? <h2>{title}</h2> : null}
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

function ProductCard({ product }) {
  return (
    <article className="costcut-product-card">
      <img src={product.image} alt="" />
      <div>
        <span>{product.category}</span>
        <h3>{product.title}</h3>
        <p>{product.price}</p>
        <button type="button">Add</button>
      </div>
    </article>
  );
}

function getInitialPlacementVersion() {
  return window.location.hash.toLowerCase().includes("version=b") ? "versionB" : "versionA";
}

export default function CostCut() {
  const [searchTerm, setSearchTerm] = useState("");
  const [placementVersion, setPlacementVersion] = useState(getInitialPlacementVersion);

  const filteredProducts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return productCards;
    }

    return productCards.filter((product) =>
      `${product.title} ${product.category}`.toLowerCase().includes(normalizedTerm),
    );
  }, [searchTerm]);

  return (
    <div className="costcut-page">
      <div className="costcut-top-strip">
        <span>Member-only warehouse value</span>
        <a href="#savings">View current offers</a>
      </div>

      <header className="costcut-header">
        <a className="costcut-brand" href="#/costcut" aria-label="CostCut home">
          <span>Cost</span>
          <strong>Cut</strong>
        </a>
        <label className="costcut-search">
          <span>Search</span>
          <input
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Find groceries, appliances, electronics..."
            value={searchTerm}
          />
        </label>
        <nav className="costcut-utility-nav" aria-label="Utility navigation">
          <a href="#warehouse">Warehouse</a>
          <a href="#orders">Orders</a>
          <a href="#/crossfit">CrossFit</a>
          <a href="#/biterun">BiteRun</a>
          <a href="#/expedia">Expidition</a>
          <a href="#account">Sign In</a>
        </nav>
        <div className="costcut-version-switch" aria-label="SDK placement version">
          <button
            className={placementVersion === "versionA" ? "active" : ""}
            onClick={() => setPlacementVersion("versionA")}
            type="button"
          >
            Version A
          </button>
          <button
            className={placementVersion === "versionB" ? "active" : ""}
            onClick={() => setPlacementVersion("versionB")}
            type="button"
          >
            Version B
          </button>
        </div>
      </header>

      <nav className="costcut-department-nav" aria-label="Departments">
        {departments.map((department) => (
          <a href="#departments" key={department}>
            {department}
          </a>
        ))}
      </nav>

      <main>
        <div
          className={`costcut-intro-layout ${
            placementVersion === "versionB" ? "costcut-intro-layout--version-b" : ""
          }`}
        >
          <div className="costcut-intro-main">
            <section className="costcut-hero" aria-labelledby="costcut-hero-title">
              <div className="costcut-hero-copy">
                <p>April warehouse savings</p>
                <h1 id="costcut-hero-title">Buy more. Spend smarter.</h1>
                <a href="#savings">Shop member deals</a>
              </div>
              <div className="costcut-hero-panel">
                <article>
                  <span>Online only</span>
                  <strong>$400 off</strong>
                  <p>Select appliance packages</p>
                </article>
                <article>
                  <span>Same day</span>
                  <strong>Fresh picks</strong>
                  <p>Groceries delivered from your local warehouse</p>
                </article>
              </div>
            </section>

            <section className="costcut-deal-grid" id="savings" aria-label="Featured savings">
              {dealTiles.map((deal) => (
                <article className="costcut-deal-card" key={deal.title}>
                  <img src={deal.image} alt="" />
                  <div>
                    <h2>{deal.title}</h2>
                    <p>{deal.text}</p>
                    <a href="#departments">Shop now</a>
                  </div>
                </article>
              ))}
            </section>
          </div>

          {placementVersion === "versionB" ? (
            <aside className="costcut-intro-aside" aria-label="Featured product videos">
              <CostCutGenuinPlacement
                className="costcut-genuin-section--rail"
                placement={genuinPlacements.versionBIntro}
              />
            </aside>
          ) : null}
        </div>

        {placementVersion === "versionA" ? (
          <CostCutGenuinPlacement
            placement={genuinPlacements.versionATrending}
            title="Trending Products"
          />
        ) : null}

        <section className="costcut-product-section" aria-labelledby="popular-title">
          <div className="costcut-section-header">
            <div>
              <p>Popular right now</p>
              <h2 id="popular-title">Member favorites</h2>
            </div>
            <a href="#departments">View all departments</a>
          </div>
          <div className="costcut-product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>
        </section>

        {placementVersion === "versionA" ? (
          <CostCutGenuinPlacement placement={genuinPlacements.versionAFavorites} />
        ) : null}

        <section className="costcut-services" id="warehouse" aria-labelledby="services-title">
          <div className="costcut-section-header">
            <div>
              <p>Everyday services</p>
              <h2 id="services-title">More ways to save time</h2>
            </div>
          </div>
          <div className="costcut-service-grid">
            {serviceCards.map((service) => (
              <article key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#warehouse">Explore</a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="costcut-footer">
        <div className="costcut-footer-brand">
          <span>Cost</span>
          <strong>Cut</strong>
        </div>
        <div className="costcut-footer-grid">
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
