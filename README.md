# build-yo-resume

An ATS-optimized, client-side resume builder and scoring tool.

## Features

- **JSON Editor**: Edit and validate your resume details in real time with Monaco Editor.
- **ATS Evaluator**: Get instant feedback and compatibility scores based on recruiter guidelines.
- **A4 Preview Canvas**: Live document rendering with A4 cutoff lines showing page breaks.
- **Style Customizer**: Control font selection, side/top/bottom margins, and line heights.
- **Vector PDF Print**: Generates clean, selectable-text PDFs natively through browser printing.

## Tech Stack

- React + Vite
- Tailwind CSS v4
- Bun

<details>
<summary><b>Click to expand: Under the Hood Details</b></summary>

Here is how the application runs entirely client-side in the browser:

### 1. Document Schema & Editing
* **How it works:** The application initializes the editor with a structured JSON template representing sections like `basics`, `work`, `education`, `projects`, `skills`, and `certifications`. When the user types or uploads a JSON file, the schema is parsed and evaluated.
* **Technology:** **Monaco Editor** (`@monaco-editor/react`) is embedded directly in the browser. It provides syntax highlighting, auto-indentation, and error validation feedback in real time to prevent invalid JSON input.

### 2. Live Page Measurement & Pagination
* **How it works:** To prevent text cutting off in footers or overflowing onto empty pages, the layout engine measures section heights in real time. It renders a hidden off-screen copy of the resume sections at standard unscaled pixel widths, computes their bounds, partitions them according to A4 page dimensions, and renders the visual sheets with custom scale zooms.
* **Technology:** Built with **React** hooks (`useLayoutEffect` and `useRef`) that dynamically calculate container dimensions and trigger stateful pagination adjustments when content is updated.

### 3. Resume Scoring & Compatibility Report
* **How it works:** The evaluator scans the parsed JSON object to score content metrics. It reviews basic contact fields, validates professional links, checks education details, monitors work experience durations, and counts technical keywords (ensuring at least 8 tools/languages are listed) to calculate a final compatibility score (out of 100).
* **Technology:** Pure client-side **JavaScript** rules engine (`src/utils/scoreCalculator.js`) running reactively on every editor keystroke without database roundtrips.

### 4. Interactive Previews & Custom Zoom
* **How it works:** The preview screen renders the resume document as a series of A4-dimension pages with floating paper shadows. The user can interactively scale the pages from 80% to 150% for optimal readability on their monitor.
* **Technology:** **Tailwind CSS v4** utility styles combined with dynamic CSS `zoom` scaling properties. On mobile viewports below 1024px, a media query hides the workspace and renders a desktop-only fallback message card.

### 5. Vector PDF Export
* **How it works:** Clicking "Download PDF" calls the native print dialog. The print stylesheet resets screen scales, overrides margins, removes shadows, hides panels/headers, and enforces page-breaks to output a clean, selectable-text vector A4 PDF.
* **Technology:** **Vite** bundler compiler and **Tailwind CSS** `@media print` directives enforcing A4 page specifications.
</details>

## Development

```bash
# Install dependencies
bun install

# Launch local server
bun dev
```
