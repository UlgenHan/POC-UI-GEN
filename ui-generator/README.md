# UI Generator

This generator builds a Next.js UI from JSON manifests using Handlebars templates and preserves protected regions.

Usage

- Build: pnpm build
- Validate: node dist/index.js validate --input ../ui
- Generate: node dist/index.js generate --input ../ui --output ../dist/generated

Inputs under ui/

- project.json
- components/*.json
- pages/*.page.json
- services/*.json

Protected region markers

```
<!-- <gen-start id="some-id"> -->
// custom code
<!-- <gen-end id="some-id"> -->
```
