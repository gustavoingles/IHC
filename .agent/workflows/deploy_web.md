---
description: How to deploy the React Native Expo app to the web
---

# Deploying to Web

This workflow describes how to build and deploy your Expo application to the web.

## Prerequisites

1.  **Expo CLI**: Ensure you have the Expo CLI installed (usually via `npx`).
2.  **Hosting Provider Account**: An account with Vercel, Netlify, or GitHub Pages.

## Building for Web

1.  **Export Static Bundle**:
    Run the following command to create a production-ready static bundle in the `dist` directory.
    ```bash
    npx expo export
    ```

2.  **Test Locally**:
    You can serve the static files locally to verify everything works.
    ```bash
    npx serve dist
    ```

## Deploying

### Option 1: Vercel (Recommended)

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2.  **Deploy**:
    Run the deploy command and follow the prompts.
    ```bash
    vercel
    ```
    - Set the output directory to `dist` if asked (Vercel usually detects this for Expo).

### Option 2: Netlify

1.  **Install Netlify CLI**:
    ```bash
    npm install -g netlify-cli
    ```

2.  **Deploy**:
    ```bash
    netlify deploy --prod
    ```
    - Publish directory: `dist`

### Option 3: GitHub Pages

1.  **Install gh-pages**:
    ```bash
    npm install -D gh-pages
    ```

2.  **Update package.json**:
    Add a `homepage` field and a deploy script.
    ```json
    {
      "homepage": "https://your-username.github.io/repo-name",
      "scripts": {
        "deploy": "gh-pages -d dist"
      }
    }
    ```

3.  **Deploy**:
    ```bash
    npm run deploy
    ```
