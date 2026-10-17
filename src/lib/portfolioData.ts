export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  role?: string;
  highlights?: string[];
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
      title: "Enterprise Insurance & Payments Engine",
      category: "FinTech & SQL Enterprise",
      year: "2024",
      role: "Backend & Database Engineer",
      description: "Mission-critical financial infrastructure orchestrating automated premium billing collections, transaction audits, and administrative reporting workflows in Oracle SQL.",
      tech: ["Oracle SQL", "REST APIs", "PHP", "PL/SQL", "Financial Reporting"],
      highlights: [
        "Automated recurring premium billing collections and multi-channel transaction reconciliations",
        "Engineered transactional audit triggers and integrity constraint safeguards in Oracle SQL",
        "Streamlined operational reporting queries, cutting administrative turnaround by 40%"
      ]
    },
    {
      id: 2,
      title: "Digital Self-Onboarding Platform",
      category: "User Acquisition Flow",
      year: "2023",
      role: "Full-Stack Engineer",
      description: "Secure, high-conversion customer registration framework featuring automated multi-channel OTP verifications, dynamic form validation engines, and session audits.",
      tech: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "REST APIs"],
      highlights: [
        "Constructed adaptive multi-step application journeys with progressive state caching",
        "Implemented real-time OTP challenge verification with fraud mitigation checks",
        "Delivered a fluid responsive interface with zero layout shift and smooth transitions"
      ]
    },
    {
      id: 3,
      title: "Retail POS & Inventory Management System",
      category: "Cloud Infrastructure & ERP",
      year: "2022",
      role: "Full-Stack Engineer",
      description: "Cloud-based Point-of-Sale (POS) and inventory orchestration system featuring live inventory workflows, interactive sales metrics dashboards, and multi-tier role permissions.",
      tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Chart.js"],
      highlights: [
        "Architected real-time checkout registry with instant barcode lookup and stock synchronization",
        "Configured multi-tier privilege levels isolating cashier, supervisor, and executive views",
        "Built dynamic revenue reporting dashboards with historical sales velocity visualizations"
      ]
    },
    {
      id: 4,
      title: "Automotive Marketplace & Listing Platform",
      category: "Full-Stack Web App",
      year: "2021",
      role: "Software Engineer",
      description: "Full-stack automotive marketplace platform equipped with indexed parametric search filters, relational catalog indexing, verified dealer profiles, and vehicle media managers.",
      tech: ["Java", "Django", "Python", "MySQL", "Bootstrap"],
      githubUrl: "https://github.com/Yeamin1083/Java-Car-Application",
      highlights: [
        "Designed relational database schemas optimized for multi-attribute vehicle filtering",
        "Implemented secure dealer dashboard for listing lifecycle management and buyer leads",
        "Engineered clean REST API endpoints serving paginated listings with sub-100ms latency"
      ]
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
