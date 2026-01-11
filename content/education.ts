export interface CourseProject {
    title: string;
    description: string;
    links?: string[];
}

export interface CourseItem {
    id: string;
    name: string;
    description: string;
    blurb?: string; // longer course details
    technologies?: string[]; // technologies used in class
    projects?: CourseProject[]; // projects with title and description
    tags?: string[];
}

export interface EducationTrack {
    track: string;
    courses: CourseItem[];
}

export const educationTracks: EducationTrack[] = [
    {
        track: "Computer Science",
        courses: [
            {
                id: "cse-582",
                name: "Advanced Operating Systems",
                description:
                    "Virtualization, memory management, concurrency, and systems performance—grounded in real OS and VMM behavior.",
                blurb:
                    `This couse focused on exploring historical and modern operating systems as a research field.
                    We studied topics like time-sharing, virtualization, scheduling, and security from a design point of view.
                    By reading over 50 papers and working on our own final project, I learned how to critically analyze research papers and identify themes and topics across research.
                    Key topics like Worse is Better and exokernels built on each other to explain how foundational OS research led to modern systems like LegoOS, Multikernels, and Firecracker.
                    `,
                technologies: [
                    "Linux",
                    "Rust",
                    "KVM",
                    "AWS Firecracker",
                    "ptrace"
                ],
                projects: [
                    {
                        title: "Phoenix: Page-Fault Handling for Firecracker MicroVMs",
                        description:
                            "Phoenix is a snapshot-restore system for Firecracker MicroVMs that improves serverless cold-start performance by avoiding disk-backed memory loading. It stores snapshot deltas in memory, using Incinerator, a custom page-level diff-compression algorithm, and reconstructs pages lazily using Linux userfaultfd. This reduces memory suplication across similar MicroVMs and serves page faults faster than disk-backed snapshot loading.",
                        links: ["https://github.com/ProjectPhoenixVM/phoenix", "/papers/cse582-paper.pdf"],
                    }
                ],
                tags: [
                    "operating-systems",
                    "virtualization",
                    "firecracker",
                    "kvm",
                    "snapshotting",
                    "memory",
                    "performance",
                ],
            },
            {
                id: "cse-587",
                name: "Parallel Computing",
                description: "Parallel scaling, MPI, CUDA, and consistency models.",
                blurb: `This course focused on parallel computing and distributed systems.
                Through lectures and projects, I learned how modern parallel programming evolved from ILLIAC IV to modern GPU programming.
                We studied parallel meshes, fine and medium grain shared memory, systolic dynamic programming, consistency models, and SIMD programming.
                Through projects, I learned how to use OpenMP, MPI, and CUDA together to build scalable parallel programs.`,
                technologies: ["C++", "Python", "CUDA", "MPI", "OpenMP"],
                projects: [
                    {
                        title: "Parallel Time-History Convolution for Option Pricing",
                        description: `
                        For my final project, I extended my summer math research on barrier option pricing to a parallel setting.
                        I implemented a parallel Boundary Element Method solver with dense time-history dependencies and evaluated multiple MPI decomposition strategies, 
                        showing that a cyclic distribution is essential for scalable performance on triangular workloads where later timesteps dominate computation.
                        I used MPI for distributed memory parallelism and OpenMP for shared memory parallelism, which helped me reduce sychronization overhead caused by load imbalance.
                        `,
                        links: ["https://github.com/harish-jai/cse-587-barrier-option-pricing", "/papers/cse587-paper.pdf"],
                    }
                ],
                tags: ["parallel-computing", "distributed-systems"],
            },
            {
                id: "eecs-491",
                name: "Distributed Systems",
                description: "Distributed systems, RPC, and distributed algorithms.",
                blurb: `This course was a deep dive into communication and shared memory in distributed systems.
                Over the semester, I learned about the CAP theorem, using RPCs, the difference between concurrency and parallelism,
                MapReduce, clock synchronization, Paxos, linearizability, consistency models, and more.
                I used Go and gRPC to work on multiple projects, deepening my understand and interest in distributed systems.
                `,
                technologies: ["Go", "gRPC", "Consensus Algorithms", "Distributed Transactions"],
                projects: [
                    {
                        title: "Simple Key-Value Store",
                        description: ` This project was a simple key-value store using Go and gRPC.
                        It supported basic CRUD operations and was able to handle concurrent requests.
                        I focused on learning distributed communication systems and how to implement consistency models in code.
                        `,
                    },
                    {
                        title: "Fault-Tolerant Key-Value Store",
                        description: ` This project built on the simple key-value store to add fault tolerance.
                        It used Primary-Backup replication to replicate the data across multiple nodes.
                        On fault, I had to promote the backup to primary, select a new backup, and continue serving requests.
                        I had to implement this to align with sequential consistency and linearizability.
                        `,
                    },
                    {
                        title: "Paxos-Based Key-Value Store",
                        description: ` In this project, I implemented the Paxos consensus algorithm to achieve linearizability.
                        Paxos is an algorithm that allows a group of nodes to agree on a single value.
                        When a client makes a request, the node that receives the request becomes the proposer.
                        The proposer sends a proposal to the acceptors, who vote on the value.
                        If a majority of the acceptors vote for the value, the proposer becomes the leader and the value is committed.
                        If the proposer does not receive a majority of the acceptors' votes, it retries with a new proposal.
                        This project helped me understand how consensus algorithms work and why they are more reliable and practical than a simple primary-backup replication.
                        `,
                    },
                    {
                        title: "Sharded Key-Value Store with Paxos Groups",
                        description: `In this project, I extended my Paxos-based key-value store to add sharding.
                        Sharding distributes data across multiple nodes, which is essential for both scalability and fault tolerance.
                        However, sharding makes it harder to maintain consistency, because different nodes have different data.
                        I solved this by using Paxos groups, assigning each group a shard.
                        Each group consisted of a leader that proposed updates and followers that committed them via consensus.
                        This approach allowed the system to scale while maintaining consistency and fault tolerance.
                        `,
                    },
                ],
                tags: ["distributed-systems", "rpc", "distributed-algorithms"],
            },
            {
                id: "eecs-489",
                name: "Computer Networks",
                description: "Network protocols, TCP/IP, routing, and distributed systems networking.",
                blurb: `This course focused on the fundamentals of computer networks.
                We studied network protocols, TCP and IP, routing, and more.
                Mainly through C++, I learned socket programming and gained experience with the design thinking behind network protocols.
                `,
                technologies: ["C++", "Python", "Socket Programming", "Wireshark"],
                projects: [
                    {
                        title: "Sockets, Mininet, and Performance",
                        description: `This project had me build iPerfer, a clone of iperf, a common tool for measuring network performance.
                        I used sockets to implement the server and client, and Mininet to test their performance.
                        I measured bandwidth using the data size and the bandwidth and latency using the RTT of the packets.
                        `,
                    },
                    {
                        title: "Adaptive Video Streaming with a CDN",
                        description: `In this project, I implemented load balancing and adaptive bitrate selection through an HTTP proxy server.
                        The goal was to use HTTP andthe DASH MPEG video protocol to fetch and stream video data on the web.
                        We implemented an HTTP proxy server that used polling to estimate the throughput of each client connected to the server.
                        Then, it determined the optimal bitrate for each client and delivered the appropriate video segments from a CDN.
                        `,
                    },
                    {
                        title: "Reliable Transport",
                        description: `Here, I built WTP, a reliable transport protocol on top of UDP.
                        My implementation had to provide inorder, reliable delivery of UDP datagrams and handle packet loss, delay, corruption, duplication, and reordering.
                        Implementing both a sender and receiver, I designed a new WTP packet and the logic senders and receivers had to follow to enable the guarantees of WTP on UDP datagrams.
                        `,
                    },
                    {
                        title: "Designing a Static Router",
                        description: `In this project, I built a simple router configured with a static routing table.
                        The router received raw Ethernet frames, processed the packets, and forwarded them to the appropriate outgoing interface.
                        I implemented an ARP cache to resolve MAC addresses and a routing table to forward packets based on IP addresses.
                        Overall, I learned how exactly real-world routers work and how layer 2 and layer 3 protocols like ARP and ICMP work.
                        `,
                    },
                ],
                tags: ["networking", "http", "udp", "tcp", "ip", "routing", "arp", "icmp", "socket-programming"],
            },
            {
                id: "eecs-485",
                name: "Web Systems",
                description: "Web systems, web frameworks, and web applications.",
                blurb: `This course was about the backbone of modern web systems.
                Starting from the basics of HTML, CSS, and JavaScript frameworks for frontend design to
                making backend servers using Python Flask, I learned how to build fullstack web applications.
                In detail, I learned about the HTTP protocol, how a website's DOM is structured, and the standards for RESTful API design.
                I most enjoyed learning about the steps engineers took to scale web search, dynamic pages, and the storage associated with them.
                This course motivated me to pursue backend and systems related coursework in future semesters.
                `,
                technologies: ["Python", "Flask", "React", "Node.js"],
                projects: [
                    {
                        title: "Templated Static Site Generator",
                        description: `This project was a simple static Instagram clone using HTML, CSS, and JavaScript.
                        It had a simple UI with a feed of static, predetermined "posts".
                        Though I had experience with this before, I specifically learned about templating engines and how to use them to generate static pages.
                        The Jinja2 templating engine allows you to use variables and control flow to generate dynamic pages.
                        I used this to generate a static page for the feed and each post.
                        `,
                    },
                    {
                        title: "Server-Side Dynamic Pages",
                        description: `This project built on the previous one by adding support for creating, updating, and deleting users, posts, comments, and likes.
                        The project taught me the concept of CRUD (Create, Read, Update, Delete) operations and basic usage of an SQL database.
                        Using a SQLite database, I implemented a RESTful API to support key operations like user login, post creation, and more.
                        Through this project, I learned how to integrate a RESTful API with a frontend and enable user interaction on a website.
                        `,
                    },
                    {
                        title: "Client-Side Dynamic Pages",
                        description: `This was the final extension of our Instagram clone.
                        I built a browser-based client in JavaScript that used AJAX to communicate with our REST API.
                        While the UI was similar to the server-side dynamic version, the DOM here was generated by JavaScript rather than rendered from HTML on the server.
                        With client-side dynamic pages, the HTML sent from the server is minimal—mostly just references to scripts—which allows the page to handle real-time updates, user interactions, and features like infinite scrolling, with no full page reloads.
                        This project taught me how dynamic web apps are designed to give users a seamless, responsive experience.
                        `,
                    },
                    {
                        title: "MapReduce",
                        description: `I implemented Google’s MapReduce framework in Python for this project. 
                        The Manager listens for submitted jobs and distributes them to workers, who run map and reduce functions in parallel. 
                        The Map stage generates intermediate key-value pairs, while the Reduce stage compiles them into a final output. 
                        Through this, I learned how MapReduce enables scalable, fault-tolerant data processing in distributed systems.`,
                    },
                    {
                        title: "Search Engine",
                        description: `In this project, I built a scalable search engine similar to Google.
                        Using MapReduce's parallel processing, I created a segmented inverted index of the web pages.
                        I used information retrieval techniques like TF-IDF and PageRank to rank the pages and return the most relevant results.
                        `,
                    }
                ],
                tags: ["web-systems", "web-frameworks", "web-applications"],
            },
        ],
    },
    {
        track: "Mathematics",
        courses: [
            {
                id: "math-440",
                name: "Lab of Geometry",
                description: "Geometry, topology, and differential geometry.",
                blurb: `This course was a deep dive into differential geometry.
                Through a guided research project under the supervision of Professor Alejandro Bravo-Doddoli, I learned about
                geodesic flows on Riemannian manifolds and their applications to physics.
                `,
                projects: [
                    {
                        title: "Geodesic Flows on Special Linear Groups",
                        description: `This was a semester-long research project under the supervision of Professor Alejandro Bravo-Doddoli.
                        I studied the geodesic flows on the Lie group SL(2, R) through the lens of Hamiltonian mechanics.
                        The goal was to develop a more computationally effective and framework than traditional exponential-map-based approaches.
                        I derived the geodesic equations for left-invariant metrics using momentum maps and Poisson brackets, reformulating the problem as a Hamiltonian system on the cotangent bundle.
                        I then implemented a numeric solver in Python to simulate and visualize geodesic trajectories using a spherical parametrization of the Lie group.
                        `,
                        links: ["/papers/math440-paper.pdf"],
                    },
                ],
                tags: ["geodesic-flows", "riemannian-manifolds", "lie-groups", "symplectic-geometry"],
            },
            {
                id: "math-423",
                name: "Mathematics of Finance",
                description: "Mathematics of finance, stochastic calculus, and financial markets.",
                blurb: `This course was an introduction to the mathematics of fixed-rate bonds, options, and futures contracts derived from basic economic principles.
                Over the semester, I learned about the Black-Scholes model, the binomial model, and portfolio theory.
                I also learned about the importance of risk-neutral pricing and how to use it to price options and futures contracts.
                This course was a fun way to learn about the mathematics of finance and how it can be used to price financial instruments.
                `,
                tags: ["stochastic-calculus", "financial-markets", "option-pricing", "bond-pricing", "futures-pricing", "risk-and-return", "portfolio-theory", "capital-asset-pricing-model", "black-scholes-model"],
            },
            {
                id: "math-425",
                name: "Introduction to Probability",
                description: "Probability, random variables, and stochastic processes.",
                blurb: `This course was an introduction to probability theory.
                Over the semester, I learned about the basics of probability, random variables, and stochastic processes.
                I also learned about the importance of probability in real-world fields like genetics, economics, and engineering.
                This course was a fun way to learn about probability and how it can be used to model real-world phenomena.
                `,
                tags: ["probability", "random-variables", "stochastic-processes", "markov-chains", "markov-processes", "poisson-processes", "exponential-distributions", "normal-distributions", "chi-squared-distributions", "t-distributions", "f-distributions"],
            },
            {
                id: "math-214",
                name: "Applied Linear Algebra",
                description: "Linear algebra, vector spaces, and linear transformations.",
                blurb: `This course provided a foundational understanding of linear algebra, covering topics such as vector spaces, linear transformations, and their applications.
                Throughout the semester, I gained insight into how linear algebra underpins a range of disciplines, from genetics and economics to engineering.
                Through both theory and real-world examples, I developed an appreciation for the role of linear algebra in modeling, problem solving, and data analysis.
                `,
                tags: ["linear-algebra", "vector-spaces", "linear-transformations", "eigenvalues", "eigenvectors", "singular-value-decomposition", "principal-component-analysis", "linear-regression", "least-squares-method", "correlation", "covariance", "correlation-matrix", "covariance-matrix", "correlation-matrix", "covariance-matrix"],
            }
        ],
    },
    {
        track: "Multidisciplinary Design",
        courses: [
            {
                id: "engr-456",
                name: "Engineering Mentorship",
                description: "Engineering mentorship, engineering leadership, and engineering management.",
                blurb: "I mentored a group of students working for Sartorius, a biotechnology company, through the MDP program. Given that the students came from various engineering disciplines, I focused on two mentorship objectives. First, I helped the team with their research, brainstorming, and decision-making processes. Second, I worked with them to build cohesion and a supportive, understanding culture.",
                tags: ["engineering-mentorship", "engineering-leadership", "engineering-management"],
            },
            {
                id: "engr-455",
                name: "Multidisciplinary Design Program",
                description: "Multidisciplinary design, design thinking, and design methodology.",
                blurb: "I worked with Northrop Grumman on GATE, a tool to generate unit tests for developers. Through this course, I gained experience working with a large team, managing a project, and developing a product with external sepcifications.",
                tags: ["multidisciplinary-design", "design-thinking", "design-methodology", "project-management", "product-development", "software-engineering"],
            },
            {
                id: "ba-456",
                name: "Living Business Leadership Experience",
                description: "Business course working with a local startup on their product launch.",
                blurb: "I collaborated with Relic, an Ann Arbor startup, to develop a business strategy for their digital sports metaverse product. I learned about busines sstrategy, marketing, product development, and pitching to decision-makers.",
                tags: ["business-strategy", "marketing", "product-development", "pitching", "decision-making"],
            }
        ],
    },
];

export const school = {
    name: "University of Michigan, Ann Arbor",
    degree: "B.S.E. in Computer Science, Minors in Mathematics and Multidisciplinary Design",
    location: "Ann Arbor, MI",
};

