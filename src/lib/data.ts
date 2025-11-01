import type { Project, BioData } from "@/lib/types";
import { BarChart3, BrainCircuit, Cloud, Code, Database, GanttChart, Github, Linkedin, Mail, Pyramid, Server, Twitter } from "lucide-react";

export const bio: BioData = {
  name: "Alex Data",
  headline: "Data Scientist | Software Engineer | Artificial Intelligence",
  summary:
    "I'm a passionate data scientist with a knack for turning complex datasets into actionable insights. My expertise lies in machine learning, statistical analysis, and data visualization. I'm always excited to tackle new challenges and build innovative data-driven solutions.",
  avatarImageId: "avatar",
  skills: [
    {
      category: "Data Science & AI",
      icon: BrainCircuit,
      experience: "4+ Years XP",
      skills: [
        { name: "Computer Vision", level: 95 },
        { name: "Generative AI", level: 95 },
        { name: "Natural Language Processing", level: 95 },
        { name: "Signal Processing", level: 90 },
        { name: "Probability & Statistics", level: 90 },
        { name: "Data Analytics & Visualization", level: 85 },
      ],
    },
    {
      category: "Programming",
      icon: Code,
      experience: "3+ Years XP",
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 90 },
        { name: "JavaScript / TypeScript", level: 80 },
        { name: "R", level: 75 },
      ],
    },
    {
        category: "Frameworks & Libraries",
        icon: Pyramid,
        experience: "3+ Years XP",
        skills: [
            { name: "Scikit-learn", level: 95 },
            { name: "Pandas / NumPy", level: 95 },
            { name: "TensorFlow / PyTorch", level: 90 },
            { name: "Streamlit / FastAPI", level: 85 },
        ]
    },
    {
      category: "Computing & Cloud",
      icon: Server,
      experience: "3+ Years XP",
      skills: [
        { name: "AWS (S3, Redshift, SageMaker)", level: 90 },
        { name: "GCP (BigQuery, Vertex AI)", level: 85 },
        { name: "Docker", level: 80 },
        { name: "Linux / Bash", level: 88 },
      ],
    },
  ],
  experience: [
    {
      company: "Innovate Inc.",
      role: "Senior Data Scientist",
      period: "2020 - Present",
      description:
        "Led a team to develop a predictive maintenance model for industrial machinery, reducing downtime by 20%.",
    },
    {
      company: "DataCorp",
      role: "Data Scientist",
      period: "2018 - 2020",
      description:
        "Built a customer segmentation model that increased targeted marketing ROI by 15%.",
    },
     {
      company: "Cognizant",
      role: "Programmer Analyst Trainee",
      period: "2017 - 2018",
      description:
        "Developed and maintained web applications using modern JavaScript frameworks.",
    },
  ],
};

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Customer Churn Prediction",
    description:
      "A machine learning model to predict customer churn for a subscription-based service. The model helps in identifying at-risk customers, allowing for proactive retention strategies.",
    tags: ["Machine Learning", "Python", "Scikit-learn"],
    imageId: "project1",
    liveDemoUrl: "#",
    sourceCodeUrl: "#",
    metrics: [
      { name: "Accuracy", value: 92, fill: "var(--color-accuracy)" },
      { name: "Precision", value: 88, fill: "var(--color-precision)" },
      { name: "Recall", value: 85, fill: "var(--color-recall)" },
    ],
  },
  {
    id: "proj-2",
    title: "Sales Forecasting Dashboard",
    description:
      "An interactive dashboard built with Streamlit that provides real-time sales forecasting. It uses time-series analysis to predict future sales trends.",
    tags: ["Data Visualization", "Time Series", "Streamlit"],
    imageId: "project2",
    liveDemoUrl: "#",
    sourceCodeUrl: "#",
    metrics: [
        { name: "MAE", value: 5, fill: "var(--color-mae)" },
        { name: "RMSE", value: 7, fill: "var(--color-rmse)" },
        { name: "R²", value: 89, fill: "var(--color-r2)" },
    ],
  },
  {
    id: "proj-3",
    title: "Sentiment Analysis of Reviews",
    description:
      "A natural language processing (NLP) project to analyze customer reviews and classify them as positive, negative, or neutral. This helps businesses gauge customer satisfaction.",
    tags: ["NLP", "FastAPI", "TensorFlow"],
    imageId: "project3",
    liveDemoUrl: "#",
    sourceCodeUrl: "#",
    metrics: [
      { name: "F1-Score", value: 95, fill: "var(--color-f1)" },
      { name: "Accuracy", value: 97, fill: "var(--color-accuracy)" },
      { name: "Latency", value: 50, fill: "var(--color-latency)" },
    ],
  },
  {
    id: "proj-4",
    title: "Cloud Data Warehouse",
    description:
      "Designed and deployed a scalable data warehouse on AWS using Redshift. This project streamlined data access and improved query performance for BI tools by 3x.",
    tags: ["Cloud", "Data Engineering", "AWS"],
    imageId: "project4",
    liveDemoUrl: "#",
    sourceCodeUrl: "#",
    metrics: [
      { name: "Query Speed", value: 300, fill: "var(--color-speed)" },
      { name: "Data Volume", value: 500, fill: "var(--color-volume)" },
      { name: "Cost Savings", value: 40, fill: "var(--color-savings)" },
    ],
  },
];

export const socialLinks = [
    { name: "GitHub", url: "#", icon: Github },
    { name: "LinkedIn", url: "#", icon: Linkedin },
    { name: "Twitter", url: "#", icon: Twitter },
];
