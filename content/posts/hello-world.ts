import { WritingItem } from "../writing";

export const samplePost: WritingItem = {
  id: "hello-world",
  slug: "hello-world",
  title: "Hello World!",
  date: "2026-01-11",
  excerpt: "My ideas when building this portfolio.",
  content: `# Hello World!
  This site is meant to be a simple, lightweight portfolio to showcase my work and projects. It's built with Next.js, TypeScript, and Tailwind CSS.

  As a computer science new grad, I wanted a place for coworkers, recruiters, and other professionals to learn more about me and my work. More than just my internships and projects, I wanted to showcase my skills, interests, and my thinking.

  I've built a couple iterations of this portfolio in the past, but they seemed too cluttered, to the point where the UI detracted from the content.

  This time, taking some inspiration from [Dead Simple Sites](https://deadsimplesites.com/), I wanted to build a site that was clean, minimal, and focused on the content.

  ## My goals with this site.
  As a student and intern, I've built small web applications, designed an API orchestration layer for a data lake with billions of rows, learned about operating systems and parallel computing, and more.

  I feel that resumes flatten my work into bullet points and while it's an efficient way to highlight my experience, I wanted a place to showcase my work in a more narrative way and capture why certain decisions were made.

  The other day, I watched a [video](https://www.youtube.com/watch?v=5pluVoDUN3c) by [Greiss](https://www.youtube.com/@EliGreiss) where he discussed tips for documenting your life.
  He used his recent honeymoon to Italy as an example of how he used creative videography to capture not just what he did but how he felt.
  In this video, he made a good point about making documenting fun. 
  
  He emphasized the importance of using the right tools.
  For some people, using a big camera can make them feel like their life is a movie.
  For others, the inconvenience of carrying around a huge device can be a turnoff.
  
  In designing this site, I wanted to make sure that the experience was as frictionless as possible.
  I wanted readers to easily find what they're looking for and I wanted to make it easy for me to write and update content.

  To facilitate this, I have all the content live in version-controlled files which are then rendered into HTML pages.
  This means that when I want to update content on the site, I don't need to worry about HTML tags and formatting.
  I can just edit the content as it lives in a multi-line TypeScript string.
  The content is then type-checked at build time and renders without any dependencies on databases or CMS tools.

  ## Search.
  Since I have a tendency to run on with my writing, I wanted a system that made it easy for visitors to find what they're looking for.
  [Cortado](https://harish-portfolio-zeta.vercel.app/projects#cortado), my current side project, uses semantic search to let users find the most relevant notes to what they need.
  Eventually, I want to upgrade this to a full LLM-powered chatbot that can answer questions and help users find the most relevant content.
  
  For my site, a chatbot would be overkill, but I liked how the semantic search worked in [Cortado](https://harish-portfolio-zeta.vercel.app/projects#cortado) and wanted to try it out here, especially given this site has a smaller corpus of content.
  To do this, I used OpenAI's \`text-embedding-3-small\` model to create embeddings for each piece of content.
  Then, I used the cosine similarity algorithm to find the most relevant content.
  The results are then ranked by a combination of the semantic and keyword scores.

  After some testing, I'm happy with the results. I was able to test out various queries (some reasonable, some not) and the results were generally good.
  For security, I applied what I learned about rate limiting from my work at Capital One and implemented a similar safeguards.
  I'm excited to see how well the search system works as I continue to use it myself (maybe it'll inspire some changes for [Cortado](https://harish-portfolio-zeta.vercel.app/projects#cortado))!

  ## What's next?
  My goal is to have the site evolve with me. As I grow, I'm sure the design of this site will change, but hopefully I can keep the content portable and easy to update.
  I'm mainly excited for the writing tab to be a place where I can share my thoughts and ideas with the world.
  I've never been a big writer, but part of my goal for 2026 is to be more mindful.
  On top of keeping a daily personal journal, I hope this site will be a cool way for me to write about tech, travel, and anything else that interests me.
  `,
  tags: ["nextjs", "typescript", "web-development", "portfolio"],
};
