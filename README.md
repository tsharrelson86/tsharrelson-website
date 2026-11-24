# Timothy Harrelson Portfolio

Source for [tsharrelson.com](https://tsharrelson.com), built with React, Vite, and GSAP.

This repository starts from the published portfolio, Sites version 37, released November 24, 2026. Its original source commit is `8cad7e49d03975700d7471ae677508ea80ddd354`. It includes the published User Center case study. Unpublished review iterations and the surrounding job-search workspace are outside this repository.

## Local development

Use Node.js 22 LTS and npm.

```sh
npm ci
npm run dev
```

## Build and checks

```sh
npm run build
node --test tests/*.test.mjs
```

The build writes static assets to `dist/client`, the Sites worker to `dist/server/index.js`, and hosting metadata to `dist/.openai/hosting.json`.

## Hosting

The live portfolio is hosted through Sites. `.openai/hosting.json` retains the existing project identity. A GitHub push stores source code; it does not deploy the website. No automated deployment is configured in this repository.

## Project guidance

Read `AGENTS.md` and `work-case-study-standard.md` before changing case studies. Preserve approved wording, contribution boundaries, sample data, and reduced-motion behavior. Source code and portfolio assets are retained here for the owner's use; this repository does not grant a reuse license.
