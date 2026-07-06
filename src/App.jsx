import { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";

const DEFAULT_PRESETS = {
  Food: ["Pizza", "Burger", "Sushi", "Fried Chicken"],
  Study: ["React", "Java", "Database", "DSA"],
  Movie: ["Marvel", "Anime", "Comedy", "Horror"],
};

export default function App() {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("spinx-items")) || [];
  });

  const [winner, setWinner] = useState(null);

  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("spinx-history")) || [];
  });

  const [removeAfterSpin, setRemoveAfterSpin] = useState(() => {
    return JSON.parse(localStorage.getItem("spinx-remove")) || false;
  });

  const [presets, setPresets] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("spinx-presets")) ||
      DEFAULT_PRESETS
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "spinx-items",
      JSON.stringify(items)
    );
  }, [items]);

  useEffect(() => {
    localStorage.setItem(
      "spinx-history",
      JSON.stringify(history)
    );
  }, [history]);

  useEffect(() => {
    localStorage.setItem(
      "spinx-remove",
      JSON.stringify(removeAfterSpin)
    );
  }, [removeAfterSpin]);

  useEffect(() => {
    localStorage.setItem(
      "spinx-presets",
      JSON.stringify(presets)
    );
  }, [presets]);

  const handleWinner = (
    result,
    winnerIndex
  ) => {
    if (!result) return;

    setWinner(result);

    setHistory((prev) =>
      [
        {
          text: result,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ].slice(0, 20)
    );

    if (removeAfterSpin) {
      setItems((prev) =>
        prev.filter(
          (_, i) => i !== winnerIndex
        )
      );
    }
  };

  const clearHistory = () => {
    const ok = window.confirm(
      "Clear all history?"
    );

    if (!ok) return;

    setHistory([]);
    localStorage.removeItem(
      "spinx-history"
    );
  };

  const clearAllItems = () => {
    const ok = window.confirm(
      "Delete all items?"
    );

    if (!ok) return;

    setItems([]);
    setWinner(null);
    setHistory([]);

    localStorage.removeItem(
      "spinx-items"
    );

    localStorage.removeItem(
      "spinx-history"
    );
  };

  return (
    <div className="app">
      <Navbar />

      <main className="main">
        <Dashboard
          items={items}
          setItems={setItems}
          winner={winner}
          setWinner={handleWinner}
          history={history}
          removeAfterSpin={removeAfterSpin}
          setRemoveAfterSpin={
            setRemoveAfterSpin
          }
          presets={presets}
          setPresets={setPresets}

          clearHistory={clearHistory}
          clearAllItems={clearAllItems}
        />
      </main>
    </div>
  );
}