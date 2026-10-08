# Adding photographs

Drop images into these folders (jpg / jpeg / png / webp / avif):

- `pre-wedding/traditional/`  -> Chapter 01 "Tradition & Grace"
- `pre-wedding/street/`       -> Chapter 02 "Love in the Little Moments"
- `pre-wedding/lake/`         -> Chapter 03 "Where Love Meets Serenity"
- `pre-wedding/pottery/`      -> Chapter 04 "Shaping Our Forever"
- `wedding/`                  -> "Moments to Remember" (wedding day)
- `hero/`                     -> optional custom hero sequence

Name them 01.jpg, 02.jpg ... and they appear in that order. The first photo in
each chapter is its large lead image. For control over order, alt text and crop
position, edit `src/data/photos.ts`.

Tip: export photos at roughly 2400px on the long edge (JPEG quality ~85).
Next.js resizes and compresses them automatically for each device.
`placeholders/` holds the stand-in frames and is no longer used once real photos exist.
