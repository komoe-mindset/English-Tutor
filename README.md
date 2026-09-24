# Mingalar · AI English Tutor

A responsive English speaking web app for Myanmar learners with two connected courses:

- **10 Essential Steps**: a short interactive path adapted from Saya Nay’s *How to Master Spoken English* ebook.
- **150 Sentence Practice**: the original speaking course, where each lesson follows **Hear → Shadow → Answer → Think → Retry → Improve → Use**.

## Cloudflare Pages Deployment

This project is fully optimized for **Cloudflare Pages**:

1. **Pure Static Deployment**: Connect your repository to Cloudflare Pages. Set build command to empty/none and build output directory to `/` (the root).
2. **Cloudflare Pages Functions**: An included API handler is located at `/functions/api/feedback.js`. You can set `GEMINI_API_KEY` in the Cloudflare Pages project settings under **Settings > Environment Variables**.
3. **Client-side API Key Setting**: If deploying without backend functions or server environment variables, learners can simply click **Gemini AI** in the top navigation bar to enter their Google Gemini API key. The key is securely saved only in the user's local browser (`localStorage`).

## Run Locally

1. Open a terminal in this folder.
2. Run `node server.js` (or `npm run dev`).
3. Open `http://localhost:3000` (or `http://localhost:3000/mastery.html` for the 10-step course).

Node.js 18 or newer is sufficient. There are no external npm dependencies required.

## Google Gemini AI Feedback

The app works without an API key using local rule-based match feedback. To enable real-time personalized AI coaching:

- **Option A (Browser UI)**: Click the **Gemini AI** button or go to **Settings** in the app to configure your Gemini API Key directly in your browser. Get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).
- **Option B (Server / Cloudflare Pages)**: Set the `GEMINI_API_KEY` environment variable. You can also specify `GEMINI_MODEL` (default: `gemini-2.5-flash`).

For local terminal:

```bash
export GEMINI_API_KEY="your-gemini-api-key"
node server.js
```

Or on Windows PowerShell:

```powershell
$env:GEMINI_API_KEY = "your-gemini-api-key"
node server.js
```

## Learning Content

The 10-step course condenses the ebook’s core pillars into small tasks: a one-minute speaking sprint, pattern builder, collocation quiz, restaurant phrase match, role-play, daily habit plan, three-pass active listening, four-pass shadowing, Myanmar-speaker pronunciation drill, and a 30-day 10/10/10 practice tracker. Each lesson identifies the relevant PDF pages. The app summarizes and adapts the ideas; it does not reproduce the full ebook. Progress and phrase notes are stored in the browser. The **Start this course over** button clears only the 10-step course's saved progress after a second confirming click. Optional voice recordings stay in the current tab and disappear when it closes or reloads.

The supplied guide contains **47 numbered situations and 141 sentences**, despite its 50/150 title. All 141 supplied sentences and Myanmar translations are included. Situations 48–50 are clearly marked bonus material written for this app, giving a total of 150 sentences.

Speech playback uses browser text to speech. Microphone transcription uses browser speech recognition where supported; typing works everywhere. Word match compares transcripts or typed words and does **not** measure pronunciation. Progress is saved in this browser with local storage.
