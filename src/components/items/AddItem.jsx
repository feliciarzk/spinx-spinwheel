import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function AddItem({
  items,
  setItems,
}) {
  const [value, setValue] = useState("");

  const addItem = () => {
    const text = value.trim();

    if (!text) return;

    // Cegah item duplikat
    if (
      items.some(
        (item) => item.toLowerCase() === text.toLowerCase()
      )
    ) {
      alert("Item already exists.");
      return;
    }

    setItems((prev) => [...prev, text]);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="flex gap-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add new option..."
        className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
      />

      <button
        onClick={addItem}
        className="flex items-center justify-center rounded-2xl bg-violet-600 px-5 transition hover:bg-violet-500"
      >
        <FaPlus />
      </button>
    </div>
  );
}