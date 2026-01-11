export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  team?: string;
  location?: string;
  dates: string;
  blurb?: string;
  stack: string[];
  tags?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "capital-one",
    company: "Capital One",
    role: "Software Engineering Intern",
    team: "Messaging Team",
    location: "McLean, VA",
    dates: "May 2025 - August 2025",
    blurb: `I spent the summer working on Capital One's Messaging team.
    This team is responsible for managing the infrastructure for push notifications, email, and SMS sent to Capital One customers.
    While many of the systems were automated, the Messaging engineers were still blocked by needing to manually review and implement changes to the messaging data.
    Since each internal team has their own notifications to send customers (e.g. Credit Card alerts, Checking account alerts, Auto loan alerts, etc.), the Messaging team took requests to update alerts from the teams.
    They then had to manually check the data using tools like Postman to verify the changes are allowed and then hit POST endpoints manually to make the changes.
    This process cost the team over 18 person-weeks per year, detracting from their ability to focus on other projects.
    To solve this, I worked with three other interns to build an internal web application that allowed Messaging engineers to view, search, and edit data through a UI.
    I designed an API interface that pulled data from five enterprise APIs to provide engineers with a consolidated view.
    Now, instead of looking at alerts individually, engineers can see them how customers see them, grouped into categories like Security, Transactions, etc.
    Engineers can also efficiently verify alert changes and update them, all in the same UI.
    `,
    stack: ["Vue.js", "JavaScript", "Fastify", "PostgreSQL", "Redis", "AWS Lambda", "AWS Route 53"],
    tags: ["internship", "messaging", "distributed-systems", "web-development", "api-design", "database-design", "aws"],
  },
  {
    id: "northrop-grumman",
    company: "Northrop Grumman",
    role: "Software Engineering Intern",
    team: "Satellite Visualization Team",
    location: "Dulles, VA and Remote (part-time)",
    dates: "January 2024 - March 2025",
    blurb: `I began working with Northrop Grumman as a part of my on-campus Multidisciplinary Design Program.
    The MDP program is a two-semester course that allows a team of students to work with corporate engineers to solve a real-world problem.
    Our team was tasked with building a reliable generative AI framework that Northrop Grumman developers could use to generate test cases for their code.
    Given the sensitive nature of their work, our solution had to be completely airgapped (no network connectivity) and generate reliable test cases with no room for hallucination.
    After a semester of research and planning, my team got invited to join Northrop Grumman as interns in Virginia to work on the project full-time (outside of the MDP program).
    I spent the summer building out our tool's backend framework. Using Elixir and Erlang, I implemented a distributed system that could handle the high throughput of requests from developers.
    My main design decisions included implementing a message queue to handle the requests from developers and a Kubernetes cluster to deploy and manage the system.
    Given the pipelined nature of our project, user input had to be validated and passed along through different programs that worked together to generate a reliable output.
    To solve this, I implemented a state machine that could handle the different states of the project and transition between them.
    Additionally, our team needed to pivot from a web based application to a desktop application, so I learned how to use Electron and migrated our existing React frontend to a desktop application.
    /paragraph-break/
    As our project began to wrap up, I met with several engineers on the Satellite Visualization team to learn what they do.
    Here, I got introduced to the DevOps team which manages the deployment and monitoring of their system.
    Once I wrapped up my MDP project, I began working part-time with the DevOps team during the school year to help them with their projects.
    I learned how to use Docker and Kubernetes to deploy and manage applications and how to use Jenkins to automate the deployment.
    I also used Prometheus and Grafana to monitor the system and troubleshoot issues.
    I loved this role because I got to work with a new technology and problem every week and gained a deep appreciation for what happens behind the scenes once a developer pushes their code.
    `,
    stack: ["React", "Node.js", "PostgreSQL", "Docker", "Kubernetes", "Elixir", "Erlang", "Jenkins", "Prometheus", "Grafana"],
    tags: ["internship", "satellite-visualization", "web-development", "api-design", "database-design", "docker", "kubernetes", "elixir", "erlang", "jenkins", "prometheus", "grafana"],
  },
  {
    id: "trinity-health",
    company: "Trinity Health",
    role: "Information Technology Intern",
    team: "Trinity Health",
    location: "Ypsilanti, MI",
    dates: "May 2023 - August 2023",
    blurb: `I spent the summer working on the Technology Information Services (TIS) team at Trinity Health's Ypsilanti hospital.
    This team was responsible for managing all devices across the hospital, ranging from patient monitors to laptops.
    As the hospital was going through a digital refresh, I spent a lot of time learning how to properly clean and format old devices and boot up new devices with the Trinity Health imaging system.
    I also spent time visiting various departments in the hospital and replacing the physical devices once the new ones were ready.
    Here, I noticed that my colleagues and I were spending a lot of time walking around the department looking for the device we needed to replace.
    Each device's ID told us which department it was in, but each department housed at least 80 to 100 devices, making it time consuming to find the small subset of ones we needed.
    Additionally, since a department's device refresh was a multi-week process, we would often find a device one day that we may need a few days later, but wouldn't remember exactly where it was (or that we had even found it).
    To solve this, I used Microsoft Power Apps to build a device tracking app that allowed us to search by device ID or scan a device's barcode and see what room it was located in.
    On our first day in any department, we would spend 30 minutes looking throughout the department and entering each device and its location into the app.
    Now, for the remainder of our time in the department, we could quickly find the device we needed and replace it without having to search through the department.
    `,
    stack: ["Power Apps"],
    tags: ["internship", "trinity-health", "it", "power-apps", "app-development", "problem-solving"],
  }
];

