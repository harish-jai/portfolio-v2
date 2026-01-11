# Portfolio

Personal portfolio website built with Next.js, featuring a semantic search system that combines AI-powered embeddings with keyword matching.

## Features

- **Semantic Search**: Hybrid search system using OpenAI embeddings (70% semantic, 30% keyword) with graceful fallback to keyword-only search
- **Type-Safe Content**: All content managed as TypeScript files for compile-time validation
- **Keyboard Navigation**: Full keyboard support (Cmd/Ctrl+K to open search, arrow keys to navigate)
- **Responsive Design**: Clean, modern UI that adapts across devices
- **Content Sections**: Profile, experience, projects, education, and writing/blog posts

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables for theming
- **Search**: Hybrid semantic + keyword search with OpenAI embeddings
- **Deployment**: Vercel

## Semantic Search Architecture

The search system implements a production-ready hybrid approach:

- **Embeddings**: Pre-generated using OpenAI's `text-embedding-3-small` model
- **Hybrid Scoring**: Combines cosine similarity (semantic) with TF-IDF-like keyword matching
- **Graceful Degradation**: Automatically falls back to keyword-only if embeddings or API key unavailable
- **Build-Time Safety**: Embeddings generated locally and committed (never during build/deploy)
- **Git Integration**: Pre-commit hook prevents stale embeddings from being committed

The search UI includes:
- Debounced input (300ms)
- Real-time results
- Keyboard navigation (arrow keys, Enter, Escape)
- Type badges and excerpts
- Click-outside-to-close

## Project Structure

```
├── app/              # Next.js app router pages
├── components/       # React components
├── content/          # TypeScript content files
├── lib/docs/         # Search and document building logic
├── scripts/          # Utility scripts (embeddings, validation)
└── data/             # Generated embeddings (committed)
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Generate embeddings (requires OPENAI_API_KEY in .env.local)
npm run generate:embeddings

# Check if embeddings are stale
npm run check:embeddings
```

## License

Personal project - not intended for reproduction.
