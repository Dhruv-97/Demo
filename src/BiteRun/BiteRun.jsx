import { useEffect, useState } from "react";
import "./BiteRun.css";

const cuisines = [
  {
    name: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Sushi",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Noodles",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Healthy",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
  },
];

const restaurants = [
  {
    name: "Juniper Street Bowls",
    cuisine: "Healthy bowls",
    rating: "4.8",
    eta: "20-30 min",
    fee: "$0 delivery",
    badge: "BiteRun+",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Midnight Slice Co.",
    cuisine: "Pizza",
    rating: "4.6",
    eta: "25-35 min",
    fee: "$1.49 delivery",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bao & Broth",
    cuisine: "Asian comfort",
    rating: "4.9",
    eta: "15-25 min",
    fee: "$0.99 delivery",
    badge: "Fast",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Copper Pan Tacos",
    cuisine: "Mexican",
    rating: "4.7",
    eta: "30-40 min",
    fee: "$2.49 delivery",
    badge: "Deal",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Harbor Roll",
    cuisine: "Sushi",
    rating: "4.5",
    eta: "35-45 min",
    fee: "$1.99 delivery",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Griddle & Greens",
    cuisine: "Breakfast",
    rating: "4.8",
    eta: "10-20 min",
    fee: "$0 delivery",
    badge: "Morning fave",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
  },
];

const filters = [
  "Free delivery",
  "Open now",
  "Offers",
  "BiteRun+",
  "Under 30 min",
  "Top rated",
];

const genuinPlacements = {
  rail: {
    style_id: "69e6e20fe5a28ab56aabff67",
    placement_id: "69e6e20fe5a28ab56aabff66",
  },
  inline: {
    style_id: "69e6e78cb79085872749ffe5",
    placement_id: "69e6e78cb79085872749ffe4",
  },
};

function getGenuinConfig(viewStyle) {
  const placement = genuinPlacements[viewStyle];

  return {
    style_id: placement.style_id,
    placement_id: placement.placement_id,
    api_key: "5bb7d302c337f2037072da4390ad373019d68ae1d46627e1",
  };
}

function GenuinPlacement({ viewStyle }) {
  useEffect(() => {
    const initializeGenuin = () => {
      const container = document.getElementById("biterun-gen-sdk");

      if (!container || container.dataset.genuinInitialized === "true") {
        return;
      }

      if (window.genuin?.init) {
        window.genuin.init(getGenuinConfig(viewStyle));
        container.dataset.genuinInitialized = "true";
      } else {
        console.warn("The Genuin SDK script loaded, but the placement returned no videos.");
      }
    };

    const existingScript = document.getElementById("genuin-sdk-script");

    if (existingScript) {
      existingScript.addEventListener("load", initializeGenuin, { once: true });
      initializeGenuin();
      return;
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
  }, [viewStyle]);

  return (
    <section
      className={`biterun-genuin-card biterun-genuin-card--${viewStyle}`}
      aria-labelledby={`biterun-genuin-heading-${viewStyle}`}
    >
      <div>
        <p className="biterun-eyebrow">Community picks</p>
        <h2 id={`biterun-genuin-heading-${viewStyle}`}>
          See what people are craving
        </h2>
      </div>
      <div id="biterun-gen-sdk" className="gen-sdk-class" />
    </section>
  );
}

export default function BiteRun() {
  const [placementView, setPlacementView] = useState("rail");

  return (
    <div className="biterun-page">
      <header className="biterun-topbar">
        <a className="biterun-brand" href="/" aria-label="BiteRun home">
          BiteRun
        </a>
        <label className="biterun-search" aria-label="Search restaurants or foods">
          <span>Deliver to</span>
          <input defaultValue="123 Market Street" />
        </label>
        <nav className="biterun-nav-links" aria-label="Primary navigation">
          <a href="#restaurants">Restaurants</a>
          <a href="#offers">Offers</a>
          <a href="#help">Help</a>
        </nav>
        <div className="biterun-view-switch" aria-label="Placement view style">
          <span>View style</span>
          <button
            className={placementView === "rail" ? "active" : ""}
            onClick={() => setPlacementView("rail")}
            type="button"
          >
            Rail
          </button>
          <button
            className={placementView === "inline" ? "active" : ""}
            onClick={() => setPlacementView("inline")}
            type="button"
          >
            Inline row
          </button>
        </div>
      </header>

      <main className="biterun-marketplace">
        <aside className="biterun-filters" aria-label="Delivery filters">
          <h2>Filters</h2>
          <div className="biterun-toggle-group" aria-label="Order type">
            <button className="active">Delivery</button>
            <button>Pickup</button>
          </div>
          <p className="biterun-arrival">Arrives today, ASAP</p>
          {filters.map((filter) => (
            <label key={filter} className="biterun-check-row">
              <input type="checkbox" />
              <span>{filter}</span>
            </label>
          ))}
        </aside>

        <section className="biterun-content" id="restaurants">
          <section className="biterun-hero-card">
            <div>
              <p className="biterun-eyebrow">Let&apos;s eat</p>
              <h1>Food nearby, ready when you are.</h1>
              <p>
                Browse local favorites, compare delivery times, and discover
                tonight&apos;s easiest win.
              </p>
            </div>
            <div className="biterun-deal-card">
              <span>Tonight&apos;s perk</span>
              <strong>$5 off comfort food</strong>
              <small>Use code BITERUN5 at checkout</small>
            </div>
          </section>

          <section aria-labelledby="browse-heading">
            <div className="biterun-section-title">
              <h2 id="browse-heading">Browse food near you</h2>
              <a href="#restaurants">See all</a>
            </div>
            <div className="biterun-cuisine-grid">
              {cuisines.map((cuisine) => (
                <article className="biterun-cuisine-card" key={cuisine.name}>
                  <img src={cuisine.image} alt="" />
                  <span>{cuisine.name}</span>
                </article>
              ))}
            </div>
          </section>

          {placementView === "inline" && (
            <GenuinPlacement key="inline-placement" viewStyle="inline" />
          )}

          <section aria-labelledby="restaurant-heading">
            <div className="biterun-section-title">
              <h2 id="restaurant-heading">Restaurants open now</h2>
              <a href="#offers">Sort by recommended</a>
            </div>
            <div className="biterun-restaurant-grid">
              {restaurants.map((restaurant) => (
                <article className="biterun-restaurant-card" key={restaurant.name}>
                  <div className="biterun-image-wrap">
                    <img src={restaurant.image} alt="" />
                    <span>{restaurant.badge}</span>
                  </div>
                  <div className="biterun-card-body">
                    <div>
                      <h3>{restaurant.name}</h3>
                      <p>{restaurant.cuisine}</p>
                    </div>
                    <strong>{restaurant.rating}</strong>
                  </div>
                  <p className="biterun-meta">
                    {restaurant.eta} • {restaurant.fee}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </section>

        <aside className="biterun-side-rail" id="offers" aria-label="Trending offers">
          {placementView === "rail" && (
            <GenuinPlacement key="rail-placement" viewStyle="rail" />
          )}
          <h2>Trending offers</h2>
          <article>
            <span>Save 20%</span>
            <p>On sushi orders over $25 from Harbor Roll.</p>
          </article>
          <article>
            <span>Free fries</span>
            <p>With any burger combo from participating spots.</p>
          </article>
          <article>
            <span>Lunch rush</span>
            <p>Fast bites under 25 minutes near your address.</p>
          </article>
        </aside>
      </main>
    </div>
  );
}
