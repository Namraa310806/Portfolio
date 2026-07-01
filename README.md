# Namraa Patel Portfolio

A personal portfolio built with Next.js and deployed as a static site on GitHub Pages.

This is not a starter app. It is the public home for my work, open-source contributions, projects, resume, and contact details.

## Live Site

- https://namraa310806.github.io/Portfolio

## What's Inside

- Hero section with a short intro and call to action
- Open source dashboard with merged contribution highlights
- Projects showcase with featured builds and detail pages
- Engineering ecosystem / skills visualization
- Education, achievements, and contact sections
- Resume page and direct PDF download links

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- GitHub Pages static export

## Deployment

The site is configured for GitHub Pages static hosting.

- Production build output is exported to `out/`
- GitHub Pages base-path handling is derived from the repository name during deployment
- Static assets such as the resume PDF use the configured base path

If you deploy this repository under a different GitHub Pages repo name, the build will follow that repo name automatically.

## Production Build

```bash
npm run build:gh-pages
```

This runs the static export build used for GitHub Pages.

## Project Structure

- `src/app` - Next.js app router pages and global styles
- `src/components` - layout, sections, pages, and UI components
- `src/data` - portfolio content and site configuration
- `src/lib` - shared helpers such as base-path utilities
- `public` - static assets, including the resume PDF
- `.github/workflows` - GitHub Pages deployment workflow

## Customization

The main content you are likely to edit lives in:

- `src/data/site.ts` for profile, links, projects, and achievements
- `src/components/sections/*` for homepage sections
- `src/components/pages/*` for routed detail pages
- `src/app/globals.css` for the portfolio's visual language

## Notes

- The site is optimized for static hosting.
- Internal links and assets should use the base-path helpers so GitHub Pages routing stays correct.
- Fonts are self-contained so the export does not depend on external font downloads.

## License

No license has been declared yet. Add one if you want to make reuse terms explicit.
