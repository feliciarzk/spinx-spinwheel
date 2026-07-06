import { FaClockRotateLeft } from "react-icons/fa6";

export default function History({
  history,
  clearHistory,
}) {
  return (
    <div>
      <h3 className="section-title">
        <FaClockRotateLeft size={12} /> History
      </h3>

      {history.length === 0 ? (
        <p className="empty-state">
          Belum ada hasil spin.
        </p>
      ) : (
        <>
          <ul className="history-list">
            {history.map((h, i) => (
              <li
                className="history-row"
                key={i}
              >
                <span>{h.text}</span>

                <span className="history-time">
                  {h.time}
                </span>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <button
              onClick={clearHistory}
              style={{
                border: "none",
                background: "transparent",
                color: "#ef4444",
                fontSize: "0.8rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Clear History
            </button>
          </div>
        </>
      )}
    </div>
  );
}