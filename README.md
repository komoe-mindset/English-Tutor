# Mingalar · AI English Tutor

A responsive English speaking web app for Myanmar learners with two connected courses:

- **10 Essential Steps**: a short interactive path adapted from Saya Nay’s *How to Master Spoken English* ebook.
- **150 Sentence Practice**: the original speaking course, where each lesson follows **Hear → Shadow → Answer → Think → Retry → Improve → Use**.

## Run locally

1. Open a terminal in this folder.
2. Run `node server.js`.
3. Open [http://127.0.0.1:4173](http://127.0.0.1:4173) for the 10-step course. Open [http://127.0.0.1:4173/index.html](http://127.0.0.1:4173/index.html) for the 150-sentence course.

Node.js 18 or newer is sufficient. There are no packages to install.

## Optional AI feedback

The app works without an API key. It uses local word matching and a simple answer prompt. To enable AI coaching, set `OPENAI_API_KEY` on the server before starting it. For PowerShell:

```powershell
$env:OPENAI_API_KEY = "your-api-key"
node server.js
```

The API key stays on the local server. You may also set `OPENAI_MODEL`; the default is `gpt-5.4-mini`. AI requests use the [OpenAI Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses) and may incur API charges.

## Learning content

The 10-step course condenses the ebook’s core pillars into small tasks: a one-minute speaking sprint, pattern builder, collocation quiz, restaurant phrase match, role-play, daily habit plan, three-pass active listening, four-pass shadowing, Myanmar-speaker pronunciation drill, and a 30-day 10/10/10 practice tracker. Each lesson identifies the relevant PDF pages. The app summarizes and adapts the ideas; it does not reproduce the full ebook. Progress and phrase notes are stored in the browser. The **Start this course over** button clears only the 10-step course's saved progress after a second confirming click. Optional voice recordings stay in the current tab and disappear when it closes or reloads.

The supplied guide contains **47 numbered situations and 141 sentences**, despite its 50/150 title. All 141 supplied sentences and Myanmar translations are included. Situations 48–50 are clearly marked bonus material written for this app, giving a total of 150 sentences.

Speech playback uses browser text to speech. Microphone transcription uses browser speech recognition where supported; typing works everywhere. Word match compares transcripts or typed words and does **not** measure pronunciation. Progress is saved in this browser with local storage.

The tutor illustration was generated for this project using the built-in image generation tool. Final prompt:

> Use case: stylized-concept. Asset type: portrait illustration for the central hero of a bilingual English tutor web app. The attached image is a visual reference for the tutor character and warm Myanmar setting only, not an image to copy as a full web interface. Create a polished, friendly semi-realistic digital illustration of one young adult Myanmar woman English tutor, seated and facing the learner with a welcoming open-hand gesture, dark hair in a tidy bun, white traditional-inspired blouse with delicate blue piping and a blue patterned longyi. Warm classroom with a few books on the left, softly glowing golden Myanmar pagoda silhouettes and sunset sky through a window on the right. Composition: wide landscape 16:10, tutor centered slightly left, upper body and hands visible, enough natural open space on the right for an HTML speech bubble overlay. Rich navy, soft sky blue, warm gold, creamy white. Attractive editorial illustration, soft detailed lighting, expressive face, age appropriate, culturally respectful. No text, letters, logos, speech bubble, interface, controls, or watermark.
