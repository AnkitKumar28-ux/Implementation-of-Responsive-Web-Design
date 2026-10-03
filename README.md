# Transforming Wireframes into Static Web Pages

An interactive frontend web development project created during my internship to demonstrate the complete process of converting low-fidelity wireframe blueprints into functional, responsive, and visually appealing static web pages.

## Project Objective

The main objective of this project is to translate wireframe designs into clean, semantic, and responsive web pages by focusing on:
- **Structure & Layout:** Organizing webpage landmarks using semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Styling & Alignment:** Implementing CSS Flexbox, CSS Grid, custom properties, spacing tokens, typography hierarchy, and color systems.
- **Responsiveness:** Ensuring smooth adaptation across desktop, tablet, and mobile viewports.
- **Interactivity:** Using JavaScript (ES6) for real-time mode switching (Wireframe Blueprint vs. Layout Inspector vs. Final Static Webpage), component filtering, mobile navigation, and form validation.
- **Version Control & Deployment:** Managing source code with **GitHub** and deploying online via **Vercel**.

---

## Project Structure

```text
wireframe-to-webpage/
├── index.html   # Semantic HTML5 structure & content sections
├── styles.css   # Final UI styling, Wireframe Blueprint mode, Inspector mode & responsive styles
├── script.js    # Interactive mode switcher, component filter, mobile menu & form validation
└── README.md    # Project documentation & deployment guide
```

---

## Key Interactive Features

1. **3-Mode Interactive Switcher (Top Toolbar):**
   - **1. Wireframe Blueprint:** Converts the entire page into a low-fidelity grayscale wireframe with dashed borders, monospace annotations, and cross-hatched image placeholders.
   - **2. Layout & Spacing Inspector:** Overlays semantic HTML tag badges (`<header>`, `<section>`, `<article>`) and grid/spacing specifications directly onto the page.
   - **3. Final Static Webpage:** Displays the polished, high-fidelity production user interface.
2. **Filterable UI Components Showcase:** Filter translated wireframe modules by *Layout & Grid*, *Typography & Content*, or *Interactive UI*.
3. **Responsive Navigation & Form Validation:** Mobile drawer navigation and client-side form validation.

---

## How to Run Locally

1. Open the project folder in your code editor (e.g., Antigravity / VS Code).
2. Double-click `index.html` to open it in any web browser, or run a local server:
   ```bash
   npx serve .
   ```

---

## How to Push to GitHub & Deploy on Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Transforming Wireframes into Static Web Pages"
git branch -M main
git remote add origin https://github.com/<your-username>/wireframe-to-webpage.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com/) and sign in with your **GitHub** account.
2. Click **Add New... → Project** and import your `wireframe-to-webpage` repository.
3. Leave the Framework Preset as **Other** (Static HTML/CSS/JS) and click **Deploy**.
4. Your live URL will be generated automatically within seconds.
