# SpinX

SpinX is a modern spin wheel web application that helps users make random selections in a fun and interactive way.

Whether you're choosing a winner for a giveaway, deciding what to eat, selecting study topics, or making team decisions, SpinX provides a fast and engaging experience with customizable presets, history tracking, and persistent storage.

---

## Live Demo
https://spinx-spinwheel.vercel.app/

---
## Features

Interactive Spin Wheel
- Smooth spinning animation
- Random winner selection
- Confetti celebration effect

Item Management
- Add custom items
- Edit existing items
- Delete individual items
- Clear all items with one click

Preset System
- Save custom presets
- Load saved presets
- Delete presets
- Persistent storage via LocalStorage

Winner Tracking
- Winner result card
- Spin history log
- Clear history functionality

Advanced Options
- Remove winner after spin
- Unlimited item entries
- Automatic state persistence

Responsive Design
- Desktop-friendly layout
- Mobile responsive interface
- Modern dark-themed UI
---

## Tech Stack

- React 19
- Vite
- JavaScript (ES6+)
- CSS3
- React Icons
- Canvas Confetti

---

## Project Structure

```
src
│
├── components
│   ├── history
│   ├── items
│   ├── layout
│   ├── ui
│   ├── wheel
│   └── winner
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## How to Use

1. Add items into the list.
2. (Optional) Save your list as a preset.
3. Press **SPIN**.
4. Wait until the wheel stops.
5. The selected winner will appear automatically.
6. Check previous winners in the History panel.

---

## Screenshots
<img width="1508" height="772" alt="image" src="https://github.com/user-attachments/assets/873dc6cd-2286-46da-9e63-2f3880b84809" />

---

## Data Persistence

SpinX uses browser LocalStorage to automatically save:

- Current item list
- Spin history
- User presets
- Remove-after-spin preference

Your data remains available even after refreshing the page.

--

## Author

**Felicia Rizka Putri**
