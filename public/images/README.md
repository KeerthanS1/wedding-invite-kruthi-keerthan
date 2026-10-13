# Adding photographs

Drop images (jpg / jpeg / png / webp / avif) into these folders. Files are used in
name order, so call them 01.jpg, 02.jpg …

- `hero/`        3–4 photos for the opening carousel
- `invitation/`  8 photos for the grid under the invitation (extras join the gallery)
- `couple/`      `bride.jpg` and `groom.jpg`
- `gallery/`     everything else, for the scrolling gallery under the quote

The teaser film goes at `public/videos/teaser.mp4`.

For custom order, alt text or crop focus, edit `src/data/photos.ts`.
Tip: export photos at about 2000px on the long edge (JPEG quality ~85).
`placeholders/` holds the stand-ins shown until real photos exist.
