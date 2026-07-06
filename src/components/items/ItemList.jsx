import { useEffect, useState } from "react";
import {
  FaTrash,
  FaPen,
  FaCheck,
  FaXmark,
  FaPlus,
  FaFloppyDisk,
} from "react-icons/fa6";

export default function ItemList({
  items,
  setItems,
  removeAfterSpin,
  setRemoveAfterSpin,
  presets,
  setPresets,
  clearAllItems,
}) {
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] =
    useState(null);
  const [editValue, setEditValue] =
    useState("");
  const [selectedPreset, setSelectedPreset] =
    useState("Custom");

  useEffect(() => {
    if (selectedPreset === "Custom") return;

    if (presets[selectedPreset]) {
      setItems([
        ...presets[selectedPreset],
      ]);
    }
  }, [selectedPreset]);

  const addItem = () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    setItems([...items, trimmed]);

    setInput("");
    setSelectedPreset("Custom");
  };

  const removeItem = (index) => {
    setItems(
      items.filter((_, i) => i !== index)
    );

    setSelectedPreset("Custom");
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditValue(items[index]);
  };

  const saveEdit = (index) => {
    const trimmed = editValue.trim();

    if (!trimmed) return;

    const updated = [...items];
    updated[index] = trimmed;

    setItems(updated);

    setEditingIndex(null);
    setEditValue("");

    setSelectedPreset("Custom");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const savePreset = () => {
    if (items.length === 0) {
      alert("Add some items first.");
      return;
    }

    const name = prompt("Preset name");

    if (!name) return;

    if (presets[name]) {
      const overwrite = confirm(
        `"${name}" already exists.\nOverwrite it?`
      );

      if (!overwrite) return;
    }

    setPresets({
      ...presets,
      [name]: [...items],
    });

    setSelectedPreset(name);
  };

  const deletePreset = () => {
    if (
      selectedPreset === "Custom" ||
      !presets[selectedPreset]
    ) {
      return;
    }

    const ok = confirm(
      `Delete "${selectedPreset}" preset?`
    );

    if (!ok) return;

    const updated = {
      ...presets,
    };

    delete updated[selectedPreset];

    setPresets(updated);

    setSelectedPreset("Custom");
  };

  return (
    <div>
      <h3 className="section-title">
        Items ({items.length})
      </h3>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={removeAfterSpin}
          onChange={(e) =>
            setRemoveAfterSpin(
              e.target.checked
            )
          }
        />
        <span>
          Remove winner after spin
        </span>
      </label>

      <div className="add-row">
        <select
          className="input"
          value={selectedPreset}
          onChange={(e) =>
            setSelectedPreset(
              e.target.value
            )
          }
        >
          <option value="Custom">
            Custom
          </option>

          {Object.keys(presets).map(
            (key) => (
              <option
                key={key}
                value={key}
              >
                {key}
              </option>
            )
          )}
        </select>
      </div>

      <div
        className="add-row"
        style={{
          marginBottom: 12,
        }}
      >
        <button
          className="btn-icon"
          onClick={savePreset}
          title="Save Preset"
        >
          <FaFloppyDisk />
        </button>

        <button
          className="btn-icon"
          onClick={deletePreset}
          title="Delete Preset"
        >
          <FaTrash />
        </button>
      </div>

      <div className="add-row">
        <input
          className="input"
          value={input}
          placeholder="Add item..."
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            addItem()
          }
        />

        <button
          className="btn-icon"
          onClick={addItem}
        >
          <FaPlus />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "8px",
          marginBottom: "12px",
        }}
      >
        <button
          onClick={clearAllItems}
          style={{
            border: "none",
            background: "transparent",
            color: "#ef4444",
            fontSize: "0.8rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Clear Items
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          No items yet.
          <br />
          Add your first item.
        </div>
      ) : (
        <ul className="item-list">
          {items.map((item, i) => (
            <li
              className="item-row"
              key={i}
            >
              {editingIndex === i ? (
                <>
                  <input
                    autoFocus
                    className="edit-input"
                    value={editValue}
                    onChange={(e) =>
                      setEditValue(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter"
                      )
                        saveEdit(i);

                      if (
                        e.key ===
                        "Escape"
                      )
                        cancelEdit();
                    }}
                  />

                  <div className="item-actions">
                    <button
                      className="icon-btn success"
                      onClick={() =>
                        saveEdit(i)
                      }
                    >
                      <FaCheck size={12} />
                    </button>

                    <button
                      className="icon-btn"
                      onClick={
                        cancelEdit
                      }
                    >
                      <FaXmark size={12} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>{item}</span>

                  <div className="item-actions">
                    <button
                      className="icon-btn"
                      onClick={() =>
                        startEdit(i)
                      }
                    >
                      <FaPen size={12} />
                    </button>

                    <button
                      className="icon-btn danger"
                      onClick={() =>
                        removeItem(i)
                      }
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}