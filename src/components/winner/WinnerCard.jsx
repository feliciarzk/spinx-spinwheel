export default function WinnerCard({ winner }) {
  return (
    <div className="winner-card">
      <h3 className="winner-text">{winner || "Spin to decide"}</h3>
    </div>
  );
}