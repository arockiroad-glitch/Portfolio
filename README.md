# Perrin Despeignes Portfolio

A responsive personal portfolio website focused on network infrastructure, systems administration, and hands-on technical lab projects.

## Live Site

- GitHub Pages: [https://arockiroad-glitch.github.io/Portfolio/](https://arockiroad-glitch.github.io/Portfolio/)
- Repository: [https://github.com/arockiroad-glitch/Portfolio](https://github.com/arockiroad-glitch/Portfolio)

## Overview

This site showcases:

- Technical skills across networking, operating systems, virtualization, and scripting
- Lab-based project experience
- Education and current focus areas
- Contact information and a QR code link to the repository
- A lightweight FAQ chatbot for quick portfolio questions

## Built With

- HTML5
- CSS3
- Vanilla JavaScript
- [QRCode.js](https://github.com/davidshimjs/qrcodejs) (CDN)

## Project Structure

```text
.
├── index.html      # Main portfolio page
├── style.css       # Global styles and chatbot styles
├── script.js       # Theme toggle, navigation, reveal animations, QR/chat logic
└── README.md
```

## Run Locally

1. Clone the repository:

	```bash
	git clone https://github.com/arockiroad-glitch/Portfolio.git
	cd Portfolio
	```

2. Open `index.html` directly in a browser, or run with VS Code Live Server.

## Deployment (GitHub Pages)

1. Push changes to `main`.
2. In GitHub: **Settings → Pages**.
3. Under **Build and deployment**:
	- Source: `Deploy from a branch`
	- Branch: `main`
	- Folder: `/ (root)`
4. Save and wait for deployment.

## Update Workflow

Use this command sequence whenever you make site updates:

```bash
git add .
git commit -m "Describe your update"
git push origin main
```

## Customization Notes

- Main content sections are in `index.html`.
- Visual styling is managed in `style.css`.
- Interactive behavior is in `script.js`.
- QR destination URL is set in `script.js`.

## Future Improvements

- Replace static chatbot responses with backend-assisted Q&A
- Add downloadable resume file and link
- Add project screenshots and deeper case studies