# OpenPsychTools Differential Matrix

A static, local-first differential diagnosis organizer for psychiatry and medical education.

## What it does

Choose a presenting syndrome, mark discriminating findings as Present / Absent / Unknown, and review how those findings support, conflict with, or leave unresolved each competing explanation.

Version 0.2.3 includes 13 presenting-syndrome matrices and a one-click fictional example case that pre-fills the Psychosis, Hallucinations, and Paranoia matrices:

- Psychosis
- Mania / elevated mood
- Inattention
- Anxiety / panic
- Cognitive change
- Insomnia / reduced sleep
- Depression
- Irritability
- Hallucinations
- Paranoia / persecutory thinking
- Catatonia / marked motor-behavioral change
- Somatic symptoms / health concern
- Eating disturbance

The app intentionally does **not** rank diagnoses, calculate probabilities, reproduce diagnostic criteria, or recommend treatment.

## Privacy

There is no backend. Case selections are kept in page memory only and are cleared on refresh or close. Nothing is transmitted or persisted by the application.

## Run locally

Open `index.html` directly, or serve the folder with any static web server.

## GitHub Pages

1. Create a repository, for example `openpsychtools-ddx-matrix`.
2. Upload the contents of this folder to the repository root.
3. In **Settings > Pages**, deploy from the `main` branch and `/ (root)`.
4. Open the generated Pages URL.

## Clinical scope

This is a clinical reasoning and education aid. It is not a substitute for comprehensive assessment, diagnostic criteria, clinical judgment, or indicated medical evaluation. Acute safety or medical red flags require appropriate urgent assessment.

## Evidence

See `EVIDENCE.md` for the evidence framework and source list.

## License

MIT. See `LICENSE`.
