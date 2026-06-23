export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  githubUrl?: string | null;
  image?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
  color: string;
  glow: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export interface Education {
  degree: string;
  institution: string;
  details: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Yeamin Islam",
    title: "Software Engineer",
    location: "Gulshan, Dhaka, Bangladesh",
    email: "yeaminislamemon02@gmail.com",
    phone: "+8801406900468",
    linkedin: "https://linkedin.com/in/yeamin-islam83/",
    github: "https://github.com/Yeamin1083",
    bio: "Driven software engineer specializing in scalable enterprise backends, optimized operational reporting databases, and smooth high-performance frontend interfaces."
  },
  skills: [
    {
      category: "Backend Engine",
      skills: ["PHP", "Python", "Go (Golang)", "Laravel", "Django", "REST APIs"],
      color: "from-cyan-400 to-blue-500",
      glow: "rgba(6, 182, 212, 0.4)"
    },
    {
      category: "Frontend Deck",
      skills: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
      color: "from-purple-400 to-pink-500",
      glow: "rgba(168, 85, 247, 0.4)"
    },
    {
      category: "Database Layer",
      skills: ["Oracle SQL", "MySQL", "PostgreSQL", "Data pipelines", "Reporting Systems"],
      color: "from-amber-400 to-orange-500",
      glow: "rgba(245, 158, 11, 0.4)"
    }
  ] as SkillGroup[],
  projects: [
    {
      id: 1,
      title: "Enterprise Insurance & Payments",
      category: "FinTech & SQL Enterprise",
      year: "2024",
      description: "Automated premium billing collections, transaction audits, and administrative operational workflows in Oracle SQL.",
      tech: ["Oracle SQL", "REST APIs", "PHP", "Reporting"],
      image: "/projects/p1.png"
    },
    {
      id: 2,
      title: "Self-Onboarding Platform",
      category: "User Acquisition Flow",
      year: "2023",
      description: "Secure user registration framework featuring OTP verifications, session audits, and fluid dynamic layouts.",
      tech: ["Next.js", "React.js", "TypeScript", "Tailwind CSS"],
      image: "/projects/p2.png"
    },
    {
      id: 3,
      title: "Retail POS & Management Dashboard",
      category: "Infrastructure",
      year: "2022",
      description: "Cloud-based POS containing inventory workflows, sales metrics charts, and multi-tier user privilege levels.",
      tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
      image: "/projects/p3.png"
    },
    {
      id: 4,
      title: "Automotive Listing Platform",
      category: "Full-Stack Web App",
      year: "2021",
      description: "Full-stack automotive job listing site equipped with advanced filter indexes, listings search, and profile pages.",
      tech: ["Java", "Django", "Python", "MySQL"],
      githubUrl: "https://github.com/Yeamin1083/Java-Car-Application",
      image: "/projects/p4.png"
    }
  ] as Project[],
  experience: [
    {
      role: "Officer",
      company: "Guardian Life Insurance Limited",
      period: "Present",
      desc: "Optimizing premium collections and transaction reporting systems. Managing SQL pipeline triggers and operational audits."
    },
    {
      role: "Industrial Attachment Trainee",
      company: "Brain Station 23",
      period: "Sep 2023",
      desc: "Immersed in agile workflows, RESTful backend layouts, and modern TS web application architectures."
    },
    {
      role: "Senior Executive, Web Dev Wing",
      company: "UITS Computer Club",
      period: "2021 - 2024",
      desc: "Directed workshop classes, designed event sites, and represented UITS in programming competitions (Won 5th place, 2021)."
    }
  ] as Experience[],
  education: [
    {
      degree: "MSc in Computer Science",
      institution: "East West University",
      details: "Pursuing focus on Advanced Algorithms and Data Science"
    },
    {
      degree: "BSc in Computer Science",
      institution: "University of Information Technology & Sciences (UITS)",
      details: "CGPA: 3.71 | Graduated 2024"
    }
  ] as Education[]
};
