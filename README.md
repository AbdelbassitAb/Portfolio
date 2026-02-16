# Portfolio CV download setup

The **Download CV** button in `components/hero-section.tsx` points to `/cv.pdf`, which means Next.js serves the file from:

- `public/cv.pdf`

## What to do

1. Export your CV as a PDF.
2. Copy it to this exact path in the project:
   - `public/cv.pdf`
3. Restart your dev server (`npm run dev`) if it was already running.
4. Click **Download CV** again.

## Optional: downloaded filename

The button is configured with:

- `download="Abdelbassit-Abed-Meraim-CV.pdf"`

So browsers should save it with that name.
