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
  /** Optional real screenshot/mockup — path under /public. Falls back to the generated diagram when omitted. */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "synagent", index: "01", category: "Multi-agent research system", name: "SynAgent",
    statement: "An LLM-powered research system that autonomously gathers, analyzes, and summarizes web data.",
    technologies: ["LangChain", "Tavily API", "BeautifulSoup", "Mistral Small", "Python", "Streamlit"],
    outcomes: ["Designed to reduce manual research effort significantly.", "Uses Mistral Small to keep average query response time low."],
    capabilities: ["Agent workflows using LangChain agents, tools, and runnables", "Dynamic task execution and multi-step reasoning", "Real-time extraction through Tavily API and BeautifulSoup", "Streamlit interface for real-time research insights"],
    system: ["Research query", "LangChain agents & tools", "Tavily API / BeautifulSoup", "Mistral Small", "Streamlit insights"], visual: "research",
  },
  {
    slug: "quolagpt", index: "02", category: "Multilingual Transformer language model", name: "QuolaGPT",
    statement: "A GPT-style Transformer language model built from scratch in PyTorch, with multilingual English and Hindi text-generation capabilities.",
    technologies: ["PyTorch", "Python", "FastAPI", "ReactJS", "Streamlit", "NLP"],
    outcomes: ["Enabled basic multilingual text-generation capabilities.", "Built without Hugging Face Transformers or OpenAI APIs."],
    capabilities: ["Custom tokenizer, embeddings, multi-head self-attention, positional encoding, and Transformer blocks", "Training and inference pipeline with preprocessing, checkpointing, evaluation, and generation", "Interactive full-stack inference application using FastAPI and ReactJS"],
    system: ["English & Hindi datasets", "Custom tokenizer", "Transformer blocks", "Training / inference", "FastAPI + ReactJS"], visual: "model",
  },
  {
    slug: "real-time-location-sharing", index: "03", category: "Real-time collaboration platform", name: "Real-Time Location Sharing",
    statement: "A room-based web application for sharing live locations through Socket.IO and peer-to-peer communication.",
    technologies: ["Node.js", "Express", "Socket.IO", "WebRTC", "Leaflet.js", "JavaScript"],
    outcomes: ["Enables multiple users to join, share locations, and collaborate in real time.", "Frontend deployed on Vercel and backend deployed on Render."],
    capabilities: ["Live position sharing through Socket.IO with minimal latency", "Interactive maps with dynamic markers and smooth movement updates", "WebRTC peer-to-peer communication to improve scalability and reduce server load", "Responsive room-based interface for joining and viewing participants"],
    system: ["Users", "Socket.IO rooms", "Leaflet map updates", "WebRTC peers", "Vercel / Render"], visual: "location",
  },
  {
    slug: "movie-booking", index: "04", category: "Full-stack cinema management system", name: "Movie Booking Application",
    statement: "A full-stack MERN platform for cinema management, with dynamic seat selection, food ordering, and role-based access for users, admins, and staff.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    outcomes: ["Streamlined ticket reservations with an interactive, real-time seating map.", "Reduced manual verification effort with QR-based ticket scanning."],
    capabilities: ["Role-based authentication via JWT for users, admins, and staff", "Admin console for managing theatres, screens, and show schedules", "Interactive seat-selection map with live reservation state", "QR-based ticket verification for streamlined check-in", "Food ordering and booking-history management"],
    system: ["User booking", "Seat map & JWT auth", "MongoDB", "Admin console", "QR verification"], visual: "booking",
  },
  {
    slug: "carvium", index: "05", category: "ML-powered car price predictor", name: "Carvium",
    statement: "A machine learning web app that predicts used-car resale prices from vehicle attributes, served through a Flask backend.",
    technologies: ["Python", "Flask", "Scikit-learn", "Pandas", "HTML", "CSS", "JavaScript"],
    outcomes: ["Gives users an instant, data-driven price estimate instead of manual guesswork.", "Packaged the trained model for lightweight, low-latency inference."],
    capabilities: ["Regression model trained on historical car listing data", "Feature engineering and preprocessing pipeline notebook", "Serialized model served via a Flask REST endpoint", "Simple web UI for entering vehicle details and viewing predictions"],
    system: ["Vehicle details form", "Flask API", "Trained regression model", "Predicted price"], visual: "predictive",
  },
  {
    slug: "axesai", index: "06", category: "AI-powered assessment generator", name: "AxesAI",
    statement: "An AI assessment creator that generates structured quizzes and evaluation material from a given topic or source content.",
    technologies: ["LLMs", "Prompt Engineering"],
    outcomes: ["Cuts down the manual effort of writing assessment questions from scratch.", "Produces structured, ready-to-use question sets on demand."],
    capabilities: ["LLM-driven question and answer generation", "Structured output suited for direct use in quizzes or tests", "Configurable topic and content input for tailored assessments"],
    system: ["Topic / content input", "LLM prompt pipeline", "Structured question set", "Assessment output"], visual: "assessment",
  },
];

export const skills = [
  ["AI & GenAI", "Large Language Models, Generative AI, Retrieval-Augmented Generation, LangChain, LangGraph, LangSmith, Model Context Protocol, Deep Agents, AI Guardrails, PyTorch, OpenCV"],
  ["Product engineering", "ReactJS, Next.js, Node.js, Express, FastAPI, Socket.IO, WebRTC, JavaScript, TypeScript, HTML, CSS, Tailwind CSS, EJS"],
  ["Data & infrastructure", "MySQL, MongoDB, PostgreSQL, Vector Databases, REST APIs, Docker, Git, GitHub, Vercel, Render, Linux, Windows"],
  ["Foundations", "Data Structures & Algorithms, Object-Oriented Programming, System Design Fundamentals, Problem Solving"],
] as const;
