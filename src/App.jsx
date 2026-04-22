import { useEffect, useState } from "react";
import BiteRun from "./BiteRun/BiteRun";
import CostCut from "./CostCut/CostCut";
import CrossFit from "./CrossFit/CrossFit";
import Expedia from "./Expedia/Expedia";
import People from "./People/People";
import YamahaMotorsports from "./YamahaMotorsports/YamahaMotorsports";

function getCurrentPage() {
  if (window.location.hash === "#/people") {
    return "people";
  }

  if (window.location.hash === "#/yamaha") {
    return "yamaha";
  }

  if (window.location.hash.startsWith("#/costcut")) {
    return "costcut";
  }

  if (window.location.hash === "#/expedia") {
    return "expedia";
  }

  return window.location.hash === "#/biterun" ? "biterun" : "crossfit";
}

function getHashPage() {
  if (window.location.hash === "#/people") {
    return "people";
  }

  if (window.location.hash === "#/expedia") {
    return "expedia";
  }

  if (window.location.hash === "#/yamaha") {
    return "yamaha";
  }

  if (window.location.hash.startsWith("#/costcut")) {
    return "costcut";
  }

  if (window.location.hash === "#/biterun") {
    return "biterun";
  }

  if (window.location.hash === "#/crossfit") {
    return "crossfit";
  }

  return null;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hashPage = getHashPage();

      if (hashPage) {
        setCurrentPage(hashPage);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    document.title =
      currentPage === "people"
        ? "People | Entertainment News"
        : currentPage === "yamaha"
        ? "Yamaha Motorsports | Demo"
        : currentPage === "costcut"
        ? "CostCut | Warehouse Savings"
        : currentPage === "expedia"
        ? "Expidition | Travel Search"
        : currentPage === "biterun"
          ? "BiteRun | Food Delivery"
          : "CrossFit | The Path to Better Health";
  }, [currentPage]);

  if (currentPage === "people") {
    return <People />;
  }

  if (currentPage === "yamaha") {
    return <YamahaMotorsports />;
  }

  if (currentPage === "costcut") {
    return <CostCut />;
  }

  if (currentPage === "expedia") {
    return <Expedia />;
  }

  return currentPage === "biterun" ? <BiteRun /> : <CrossFit />;
}
