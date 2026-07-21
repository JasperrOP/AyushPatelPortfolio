export type Project = {
  slug: string;
  index: string;
  category: string;
  name: string;
  statement: string;
  technologies: string[];
  outcomes: string[];
  capabilities: string[];
  system: string[];
  visual: "research" | "model" | "location" | "booking" | "predictive" | "assessment";
  github?: string;
  deployed?: string;
  /** Optional real screenshot/mockup — path under /public. Falls back to the generated diagram when omitted. */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "axesai", index: "01", category: "AI operating system for classrooms", name: "AxesAI",
    statement: "One platform for schools and colleges — AI assessments, live quizzes, OCR grading, proctoring, spoken viva and live classes.",
    technologies: ["LLMs", "OCR", "Prompt Engineering", "React", "JWT", "Face ID"],
    outcomes: [
      "Six AI-powered modules replacing separate tools for assessment, grading, proctoring and live teaching.",
      "Around ten minutes saved per graded paper through automated OCR marking.",
      "Answers are grounded and cited rather than free-form generated.",
    ],
    capabilities: [
      "AI-generated assessments built from a topic or supplied source material",
      "Live quizzes and spoken viva conducted in real time",
      "OCR grading that reads and marks handwritten answer sheets",
      "Proctoring with JWT authentication and optional Face ID verification",
      "Live classes delivered inside the same platform",
      "Grounded, cited answers so every response is traceable to a source",
    ],
    system: ["Topic or source", "AI assessment engine", "Live quiz & viva", "OCR grading", "Proctored results"],
    visual: "assessment",
    github: "https://github.com/JasperrOP/AxesAI",
    image: "/projects/axesai.png",
  },
  {
    slug: "synagent", index: "02", category: "Multi-agent research system", name: "SynAgent",
    statement: "Four specialised AI agents collaborate — searching, scraping, writing and critiquing — to deliver a polished research report on any topic.",
    technologies: ["LangChain", "Tavily API", "BeautifulSoup", "Mistral Small", "Python", "Streamlit"],
    outcomes: [
      "Turns a single research topic into a complete, reviewed report without manual searching.",
      "Uses Mistral Small to keep average query response time low.",
    ],
    capabilities: [
      "Search Agent — gathers recent web information through the Tavily API",
      "Reader Agent — scrapes and extracts deep content from retrieved sources",
      "Writer Chain — drafts the full research report from gathered material",
      "Critic Agent — reviews and refines the draft before it is returned",
      "Live pipeline view showing each agent's status as the run progresses",
    ],
    system: ["Research topic", "Search Agent", "Reader Agent", "Writer Chain", "Critic Agent"],
    visual: "research",
    github: "https://github.com/JasperrOP/Synagent",
    deployed: "https://synagentai.streamlit.app/",
    image: "/projects/synagent.png",
  },
  {
    slug: "quolagpt", index: "03", category: "Multilingual Transformer language model", name: "QuolaGPT",
    statement: "A GPT-style Transformer built from scratch in PyTorch, generating text across English, Hindi and Gujarati.",
    technologies: ["PyTorch", "Python", "FastAPI", "ReactJS", "Streamlit", "NLP"],
    outcomes: [
      "Trigrammatic text generation across English, Hindi and Gujarati.",
      "Built without Hugging Face Transformers or OpenAI APIs — every layer written by hand.",
    ],
    capabilities: [
      "Custom tokenizer, embeddings, multi-head self-attention, positional encoding and Transformer blocks",
      "4,000-token vocabulary across 4 layers and 4 attention heads with a 64-token context window",
      "Training and inference pipeline with preprocessing, checkpointing, evaluation and generation",
      "Interactive full-stack inference application using FastAPI and ReactJS",
    ],
    system: ["Tri-lingual corpus", "Custom tokenizer", "4-layer Transformer", "Training / inference", "FastAPI + React"],
    visual: "model",
    github: "https://github.com/JasperrOP/QuolaGPT",
    deployed: "https://jasperrop-quolagpt-app-jvuy7z.streamlit.app/",
    image: "/projects/quolagpt.png",
  },
  {
    slug: "real-time-location-sharing", index: "04", category: "Real-time collaboration platform", name: "GeoSync",
    statement: "Create a private room or drop a code to join one — your live position syncs to everyone in the room in real time.",
    technologies: ["Node.js", "Express", "Socket.IO", "WebRTC", "Leaflet.js", "JavaScript"],
    outcomes: [
      "Multiple users join a room and see each other move on a shared map instantly.",
      "Frontend deployed on Vercel and backend deployed on Render.",
    ],
    capabilities: [
      "Room-based sessions — create a private room or join with a code",
      "Live position sharing through Socket.IO with minimal latency",
      "Interactive maps with dynamic markers and smooth movement updates",
      "WebRTC peer-to-peer communication to improve scalability and reduce server load",
      "Live presence indicators showing who is currently connected",
    ],
    system: ["Create / join room", "Socket.IO sync", "Leaflet map markers", "WebRTC peers", "Vercel / Render"],
    visual: "location",
    github: "https://github.com/JasperrOP/real-time-location-webrtc",
    deployed: "https://real-time-location-webrtc.vercel.app/auth",
    image: "/projects/geosync.png",
  },
  {
    slug: "movie-booking", index: "05", category: "Full-stack cinema management system", name: "MovieBooking",
    statement: "A full-stack MERN cinema platform — browse now-showing films, pick seats live, order food, and manage it all through role-based access.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    outcomes: [
      "Streamlined ticket reservations with an interactive, real-time seating map.",
      "Reduced manual verification effort with QR-based ticket scanning.",
    ],
    capabilities: [
      "Now-showing catalogue with search and genre / language filtering",
      "Role-based authentication via JWT for users, admins and staff",
      "Admin console for managing theatres, screens and show schedules",
      "Interactive seat-selection map with live reservation state",
      "QR-based ticket verification for streamlined check-in",
      "Food ordering and booking-history management",
    ],
    system: ["Browse & filter", "Seat map & JWT auth", "MongoDB", "Admin console", "QR verification"],
    visual: "booking",
    github: "https://github.com/JasperrOP/MovieBooking",
    image: "/projects/moviebooking.png",
  },
  {
    slug: "carvium", index: "06", category: "ML-powered car price predictor", name: "Carvium",
    statement: "An AI-powered web app that predicts used-car resale prices from brand, year, mileage and fuel type, helping buyers and sellers decide on data rather than guesswork.",
    technologies: ["Python", "Flask", "Scikit-learn", "Pandas", "HTML", "CSS", "JavaScript"],
    outcomes: [
      "Gives an instant, data-driven price estimate instead of manual guesswork.",
      "Packaged the trained model for lightweight, low-latency inference.",
    ],
    capabilities: [
      "Regression model trained on historical car listing data",
      "Predicts from key features — brand, year, mileage and fuel type",
      "Dataset explorer showing the data the model learned from",
      "Serialized model served via a Flask REST endpoint",
      "Prediction interface for entering vehicle details and viewing estimates",
    ],
    system: ["Vehicle details", "Flask API", "Regression model", "Predicted price"],
    visual: "predictive",
    github: "https://github.com/JasperrOP/carvium-app",
    deployed: "https://carvium-app-1.onrender.com/",
    image: "/projects/carvium.png",
  },
  {
    slug: "aera", index: "07", category: "Web-based tablet OS interface", name: "Aera",
    statement: "A tablet operating system recreated in the browser — a live home screen with widgets, apps and gesture navigation, built in React and Vite.",
    technologies: ["React", "Vite", "JavaScript", "CSS", "HTML"],
    outcomes: [
      "Recreates a full tablet home-screen experience entirely in the browser.",
      "Demonstrates complex stateful UI and animation work beyond standard page layouts.",
    ],
    capabilities: [
      "Live home screen with a word clock, calendar, now-playing and quote widgets",
      "App launcher including Notes, Photos, Flashlight, YouTube and Motion Games",
      "Gesture navigation with swipe interactions and a home indicator",
      "Animated gradient wallpaper and layered widget composition",
    ],
    system: ["Home screen", "Widget layer", "App launcher", "Gesture navigation"],
    visual: "assessment",
    github: "https://github.com/JasperrOP/Aera",
    image: "/projects/aera.png",
  },
];

/** Flat capability list — kept for the /work pages. */
export const skills = [
  ["AI & GenAI", "Large Language Models, Generative AI, Retrieval-Augmented Generation, LangChain, LangGraph, LangSmith, Model Context Protocol, Deep Agents, AI Guardrails, PyTorch, OpenCV"],
  ["Product engineering", "ReactJS, Next.js, Node.js, Express, FastAPI, Socket.IO, WebRTC, JavaScript, TypeScript, HTML, CSS, Tailwind CSS, EJS"],
  ["Data & infrastructure", "MySQL, MongoDB, PostgreSQL, Vector Databases, REST APIs, Docker, Git, GitHub, Vercel, Render, Linux, Windows"],
  ["Foundations", "Data Structures & Algorithms, Object-Oriented Programming, System Design Fundamentals, Problem Solving"],
] as const;

export type SkillCard = {
  index: string;
  title: string;
  blurb: string;
  facets: string[];
  stack: string;
};

/** Card-shaped view of the same capabilities, for the pinned horizontal rail. */
export const skillCards: SkillCard[] = [
  {
    index: "01",
    title: "Agentic AI & GenAI",
    blurb:
      "I build LLM-powered systems that reason across multiple steps — agents that plan, call tools, retrieve context, and recover when a step fails.",
    facets: ["Multi-agent workflows", "RAG pipelines", "Guardrails & observability"],
    stack: "LangChain · LangGraph · LangSmith · MCP · Deep Agents · PyTorch · OpenCV",
  },
  {
    index: "02",
    title: "Full-Stack Engineering",
    blurb:
      "I ship complete products — typed React frontends, REST and real-time backends, and the deployment path that puts them in front of users.",
    facets: ["Frontend architecture", "API & real-time services", "Production deployment"],
    stack: "React · Next.js · Node · Express · FastAPI · Socket.IO · WebRTC · TypeScript · Tailwind",
  },
  {
    index: "03",
    title: "Data & Infrastructure",
    blurb:
      "Relational, document, and vector stores behind clean API boundaries, containerised so behaviour stays identical from laptop to production.",
    facets: ["Schema & query design", "Vector search", "Containerised delivery"],
    stack: "PostgreSQL · MongoDB · MySQL · Vector DBs · Docker · Git · Vercel · Render · Linux",
  },
  {
    index: "04",
    title: "Foundations",
    blurb:
      "220+ DSA problems solved across platforms. The habit underneath everything else — reasoning about complexity before reaching for a library.",
    facets: ["Data structures & algorithms", "Object-oriented design", "System design"],
    stack: "Problem solving · OOP · System design fundamentals",
  },
];
