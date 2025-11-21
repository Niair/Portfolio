import type { Project, BioData } from "@/lib/types";
import { BrainCircuit, Code, Pyramid, Database, Cloud } from "lucide-react";
import { Github, Linkedin, Mail } from 'lucide-react';

export const bio: BioData = {
  name: "Nihal Kumar",
  headline: "Data Scientist | Machine Learning Engineer | AI Specialist",
  summary:
    "Data Scientist specializing in machine learning, NLP, and generative AI applications. Built and deployed production-ready systems including multimodal RAG applications and AI voice agents. Proficient in Python, LangChain, TensorFlow, and MLOps with strong problem-solving abilities (HackerRank 4-star, 158+ LeetCode problems solved).",
  avatarImageId: "avatar",
  skills: [
    {
      category: "Machine Learning & AI",
      icon: BrainCircuit,
      experience: "2+ Years XP",
      skills: [
        { name: "Natural Language Processing", level: 90 },
        { name: "Generative AI & LLMs", level: 90 },
        { name: "Deep Learning (CNN, RNN, ANN)", level: 85 },
        { name: "Computer Vision (OpenCV)", level: 85 },
        { name: "Model Deployment & MLOps", level: 85 },
      ],
    },
    {
      category: "Programming & Tools",
      icon: Code,
      experience: "3+ Years XP",
      skills: [
        { name: "Python (DSA)", level: 95 },
        { name: "SQL (MySQL)", level: 85 },
        { name: "Git & GitHub", level: 90 },
        { name: "JavaScript / TypeScript", level: 75 },
      ],
    },
    {
      category: "Frameworks & Libraries",
      icon: Pyramid,
      experience: "2+ Years XP",
      skills: [
        { name: "LangChain & LangGraph", level: 90 },
        { name: "TensorFlow & PyTorch", level: 85 },
        { name: "Scikit-learn", level: 90 },
        { name: "Pandas & NumPy", level: 95 },
        { name: "FastAPI & Flask", level: 85 },
        { name: "Streamlit", level: 90 },
        { name: "Hugging Face Transformers", level: 85 },
      ],
    },
    {
      category: "MLOps & Cloud",
      icon: Cloud,
      experience: "1+ Years XP",
      skills: [
        { name: "MLflow & DVC", level: 85 },
        { name: "Docker & Kubernetes", level: 75 },
        { name: "CI/CD (GitHub Actions)", level: 80 },
        { name: "AWS & Heroku", level: 75 },
        { name: "Vector Databases (FAISS, Qdrant)", level: 85 },
      ],
    },
    {
      category: "Data Analysis & Visualization",
      icon: Database,
      experience: "2+ Years XP",
      skills: [
        { name: "Excel & Power BI", level: 85 },
        { name: "Matplotlib & Seaborn", level: 90 },
        { name: "Plotly", level: 85 },
        { name: "MongoDB & Vector DB", level: 80 },
      ],
    },
  ],
  experience: [
    {
      company: "Edulyt India",
      role: "AI and Machine Learning Intern",
      period: "2025",
      description:
        "Developed and deployed ML models through structured lifecycle, increasing predictive accuracy by 15% via optimized preprocessing and feature engineering. Cleaned and transformed 100K+ data records using Pandas/NumPy.",
    },
    {
      company: "Allsoft Solutions (IBM Partner)",
      role: "Data Science Intern",
      period: "2023",
      description:
        "Gained hands-on experience in ML, data wrangling, and preprocessing. Built and validated end-to-end ML models using Scikit-learn, improving prediction accuracy by 10% via advanced feature selection.",
    },
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Amity University, Noida",
      period: "2024 - 2026 (Expected)",
      description: "CGPA: 8.00 (current). Focusing on advanced machine learning algorithms and big data technologies.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "SGTBIMIT (GGSIPU)",
      period: "2021 - 2024",
      description: "CGPA: 8.82. Graduated with honors, specializing in software development and database management.",
    },
  ],
};

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "ZenTaa – Hinglish AI Voice Agent",
    description:
      "Developed an AI voice assistant with real-time STT (OpenAI on Hugging Face) and TTS (ElevenLabs) supporting natural Hinglish conversations. Powered by Gemini and Groq, delivering contextual, human-like voice interactions through a responsive conversational loop.",
    tags: ["Generative AI", "LLM", "STT/TTS", "Gemini", "Groq", "Python"],
    imageId: "project1",
    liveDemoUrl: "", // Add if you have deployed link
    sourceCodeUrl: "https://github.com/Niair/ZenTaa-Hinglish-AI-Voice-Agent",
    youtubeUrl: "", // Add if you have demo video
    metrics: [
      { name: "Response Time", value: 95, fill: "var(--color-speed)" },
      { name: "Accuracy", value: 90, fill: "var(--color-accuracy)" },
    ],
  },
  {
    id: "proj-2",
    title: "Customer Churn Prediction using MLOps & CI/CD",
    description:
      "Predicted telecom customer churn using end-to-end Machine Learning with MLOps best practices (CI/CD with MLflow, Docker, GitHub Actions). Developed a Streamlit app achieving 91% accuracy and 92% AUC-ROC, enabling real-time predictions for business stakeholders.",
    tags: ["MLOps", "MLflow", "Docker", "CI/CD", "Streamlit", "AWS"],
    imageId: "project2",
    liveDemoUrl: "https://huggingface.co/spaces/NihalNiair/customer_churn_app_using_cicd",
    sourceCodeUrl: "https://github.com/Niair/Customer_Churn_Prediction_using_MLOpps_MLflow_AWS_CI-CD",
    youtubeUrl: "",
    metrics: [
      { name: "Accuracy", value: 91, fill: "var(--color-accuracy)" },
      { name: "AUC-ROC", value: 92, fill: "var(--color-roc)" },
      { name: "Precision", value: 89, fill: "var(--color-precision)" },
    ],
  },
  {
    id: "proj-3",
    title: "iPDF Multimodal RAG Application",
    description:
      "Built a multi-model RAG application using LangChain, FAISS, and Qdrant, enabling hybrid vector search and intelligent document querying. Integrated Gemini and Groq APIs for multimodal reasoning to generate accurate, context-aware responses from PDF data.",
    tags: ["RAG", "LangChain", "FAISS", "Qdrant", "Gemini", "NLP"],
    imageId: "project3",
    liveDemoUrl: "https://niair-ipdf-srcuiapp-jrucow.streamlit.app/",
    sourceCodeUrl: "https://github.com/Niair/iPDF_Multimodal_RAG",
    youtubeUrl: "",
    metrics: [
      { name: "Query Accuracy", value: 94, fill: "var(--color-accuracy)" },
      { name: "Response Time", value: 88, fill: "var(--color-speed)" },
    ],
  },
  {
    id: "proj-4",
    title: "Mobile Device Data Insights Using EDA",
    description:
      "Comprehensive exploratory data analysis on mobile device dataset to uncover insights on user behavior, device preferences, and market trends. Used advanced visualization techniques with Matplotlib, Seaborn, and Plotly.",
    tags: ["EDA", "Data Analysis", "Python", "Visualization", "Pandas"],
    imageId: "project4",
    liveDemoUrl: "",
    sourceCodeUrl: "https://github.com/Niair/Mobile-Device-Data-Insights-Using-EDA",
    youtubeUrl: "",
    metrics: [
      { name: "Data Points", value: 95, fill: "var(--color-data)" },
      { name: "Insights", value: 87, fill: "var(--color-insights)" },
    ],
  },
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/Niair", icon: Github },
  { name: "LinkedIn", url: "https://linkedin.com/in/nihal-kumar-892365233", icon: Linkedin },
  { name: "Email", url: "mailto:nihalk2120@gmail.com", icon: Mail },
];

// Achievements data (optional - you can add this to your types if needed)
export const achievements = [
  {
    title: "LeetCode Problem Solver",
    description: "Solved 158 problems (76 Easy, 77 Medium, 5 Hard) | Beats 89.3%",
    icon: "🏆",
  },
  {
    title: "HackerRank 4-Star",
    description: "4-star rating in Problem Solving",
    icon: "⭐",
  },
  {
    title: "Community Educator",
    description: "Teacher at Robin Hood Army - Providing educational support to children",
    icon: "🎓",
  },
];