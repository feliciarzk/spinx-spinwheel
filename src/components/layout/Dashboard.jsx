import Wheel from "../wheel/Wheel";
import ItemList from "../items/ItemList";
import WinnerCard from "../winner/WinnerCard";
import History from "../history/History";

export default function Dashboard({
  items,
  setItems,
  winner,
  setWinner,
  history,
  removeAfterSpin,
  setRemoveAfterSpin,

  // ⭐ NEW
  presets,
  setPresets,
}) {
  return (
    <div className="dashboard-grid">
      {/* LEFT */}
      <div className="panel wheel-panel">
        <Wheel
          items={items}
          setWinner={setWinner}
        />

        <WinnerCard winner={winner} />
      </div>

      {/* RIGHT */}
      <div className="side-col">
        <div className="panel">
          <ItemList
            items={items}
            setItems={setItems}
            removeAfterSpin={removeAfterSpin}
            setRemoveAfterSpin={setRemoveAfterSpin}

            // ⭐ NEW
            presets={presets}
            setPresets={setPresets}
          />
        </div>

        <div className="panel">
          <History history={history} />
        </div>
      </div>
    </div>
  );
}