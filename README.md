# Recipe Finder 🍳

A modern, visually striking frontend web application designed for browsing, searching, and saving your favorite meals. Built to practice state synchronization, API integration, and user-state retention using browser memory.

💻 **Live Demo:** [ayushtriescode.github.io/Recipe-Finder/](https://ayushtriescode.github.io/Recipe-Finder/)

---

## ✨ Features

- **Real-Time Data Fetching:** Integrates with TheMealDB API to fetch instant recipe data matching user search input.
- **Persistent Favorites:** Users can "Heart" their favorite recipes. State is mapped directly to `LocalStorage`, meaning favorites persist even after a complete browser refresh.
- **Premium Custom UI:** Styled with a "Cyber-Cabbage" color palette (fresh greens on a clean cream background) utilizing Tailwind CSS v4.
- **Glassmorphism Design:** A frosted-glass header layout featuring modern backdrop blurring effects.
- **UX Enhancements:** Implemented an keyboard event listener enabling users to execute searches seamlessly using the `Enter` key.
- **Fully Responsive:** Designed with a mobile-first approach utilizing fluid Tailwind grid mechanics.

---

## 🛠️ Tech Stack

- **Framework:** React.js (Functional Components & Hooks)
- **Styling:** Tailwind CSS v4 (Glassmorphism & Custom Palettes)
- **Data Source:** TheMealDB API
- **Deployment:** GitHub Pages

---

## 🧠 Core Learnings & Concepts Practiced

1. **Data Architecture:** Structuring decoupled states to separate transient search results (`recipes`) from persistent user items (`favorites`).
2. **React Hooks:**
   - `useState` lazily initialized with a callback function to extract data from memory immediately upon mount, preventing state race conditions.
   - `useEffect` to watch the active favorites array and synchronize data seamlessly into plain-text JSON strings.
3. **Event Optimization:** Leveraging conditional checks (`e.key === "Enter"`) inside keyboard hooks to prevent repetitive interface code.

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/ayushtriescode/Recipe-Finder.git](https://github.com/ayushtriescode/Recipe-Finder.git)