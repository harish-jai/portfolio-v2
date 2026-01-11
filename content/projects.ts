export interface ProjectItem {
  id: string;
  name: string;
  blurb: string;
  details?: string;
  stack: string[];
  links?: {
    github?: string;
    demo?: string;
  };
  tags?: string[];
}

export const projects: ProjectItem[] = [
  // Add your projects here
  // Example structure:
  // {
  //   id: "project-name",
  //   name: "Project Name",
  //   blurb: "Short description",
  //   details: "Longer description for doc generation",
  //   stack: ["TypeScript", "React", "Next.js"],
  //   links: {
  //     github: "https://github.com/...",
  //     demo: "https://demo.com",
  //   },
  //   tags: ["web", "fullstack"],
  // },
  {
    id: "cortado",
    name: "Cortado (In Progress)",
    blurb: "Cortado is a web application that allows you to manage your coffee chat notes in one place. The project is very much a work in progress but I have implemented the CRUD features and a semantic search engine to help you find notes based on your memories. Eventually, I want this to be a tool that can listen in on your coffee chats, take notes, distill learnings across chats, and let you quickly reference key ideas in case of an interview or project.",
    stack: ["TypeScript", "React", "Next.js", "Supabase", "pgvector", "FAISS"],
    links: {
      demo: "https://cortado-cct.vercel.app/",
    },
    tags: ["web", "fullstack", "semantic-search"],
  },
  {
    id: "finny",
    name: "Finny",
    blurb: "Finny is a web application for simple financial planning. It provides support for expense tracking, budgeting, and credit card management. I built this for my own personal use as I am wary of giving my financial data to third-parties like Monarch and Mint but still want their core features.",
    stack: ["TypeScript", "React", "Next.js", "Supabase"],
    links: {
      demo: "https://finny-pwa.vercel.app/",
      github: "https://github.com/harish-jai/finny-pwa",
    },
    tags: ["web", "fullstack", "financial-planning"],
  },
  {
    id: "chore-sms",
    name: "Chore SMS",
    blurb: "Chore SMS is an AWS based SMS bot for roommates to set up rotating chores and automatic completion tracking and reminders. The service is currently down due to struggles with getting a Toll Free Number but I'm looking into alternative solutions, such as a WhatsApp bot.",
    stack: ["AWS End User Messaging", "AWS Lambda", "Dynamo DB", "EventBridge Scheduler", "CloudWatch"],
    links: {
      github: "https://github.com/harish-jai/choreSMS",
    },
  },
  {
    id: "pairwise",
    name: "Pairwise",
    blurb: "Pairwise is a web-hosted linear optimization tool to find the optimal pairs from a pool of mentors and mentees. I developed this project with Professor Albert Berahas of the University of Michigan's Industrial Operations Engineering department for my nonprofit, College Connect.",
    stack: ["TypeScript", "React", "Next.js", "Supabase"],
    links: {
      demo: "https://pairwise-jet.vercel.app/",
      github: "https://github.com/harish-jai/pairwise",
    },
  }

];

