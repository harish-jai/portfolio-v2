import { WritingItem } from "../writing";

export const samplePost: WritingItem = {
    id: "sample-post",
    slug: "sample-post",
    title: "Building a Modern Portfolio with Next.js",
    date: "2024-12-15",
    excerpt: "A journey through building a personal portfolio website using Next.js, TypeScript, and modern web development practices.",
    content: `# Building a Modern Portfolio with Next.js

Building a personal portfolio is one of the best ways to showcase your work and tell your story as a developer. In this post, I'll walk through my experience building this portfolio using Next.js and TypeScript.

## Why Next.js?

Next.js provides an excellent developer experience with features like:

- **Server-side rendering** for better SEO and performance
- **File-based routing** that makes navigation intuitive
- **TypeScript support** out of the box
- **Optimized images and fonts** for better performance

## Architecture Decisions

When building this portfolio, I made several key architectural decisions:

### Content Management

Instead of using a CMS or database, I chose to store all content in TypeScript files. This approach offers:

- **Type safety** - All content is validated at compile time
- **Version control** - Content changes are tracked in git
- **No runtime overhead** - Content is bundled with the application
- **Easy to maintain** - Simple file structure

### Component Structure

The portfolio follows a simple component hierarchy:

\`\`\`
/components
  - Section.tsx (layout wrapper)
  - Nav.tsx (navigation)
  - NavLink.tsx (navigation links)
/content
  - profile.ts
  - experience.ts
  - projects.ts
  - writing.ts
  - posts/
/app
  - page.tsx (home)
  - writing/
    - page.tsx (list view)
    - [slug]/page.tsx (individual post)
\`\`\`

## Key Features

### Search Integration

The portfolio includes a docs system that indexes all content for search. This allows visitors to quickly find relevant information across projects, experience, and writing.

### Responsive Design

The design is fully responsive, using Tailwind CSS for styling. The layout adapts seamlessly from mobile to desktop views.

## Lessons Learned

1. **Start simple** - Begin with a basic structure and iterate
2. **Type safety matters** - TypeScript catches errors early
3. **Content-first** - Structure your content before building UI
4. **Performance** - Next.js optimizations make a huge difference

## Next Steps

Future improvements I'm considering:

- Add RSS feed for blog posts
- Implement dark mode toggle
- Add reading time estimates
- Create a search interface

## Conclusion

Building this portfolio has been a great learning experience. The combination of Next.js, TypeScript, and a content-first approach has resulted in a fast, maintainable, and type-safe application.

If you're thinking about building your own portfolio, I'd highly recommend giving Next.js a try. The developer experience is excellent, and the performance benefits are significant.`,
    tags: ["nextjs", "typescript", "web-development", "portfolio"],
};
