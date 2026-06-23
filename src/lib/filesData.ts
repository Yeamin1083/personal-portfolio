export interface FileItem {
  name: string;
  language: string;
  icon: string;
  codeContent: string;
}

export const PORTFOLIO_FILES: Record<string, FileItem> = {
  "README.md": {
    name: "README.md",
    language: "markdown",
    icon: "markdown",
    codeContent: `# 🚀 Welcome to my Portfolio!

## Profile
* Name: Yeamin Islam
* Role: Software Engineer
* Location: Gulshan, Dhaka, Bangladesh
* Current Stack: Next.js, React, TypeScript, Go, Python, Laravel, SQL

## Philosophy
> "I bridge the gap between robust, scalable backend systems and high-fidelity, fluid frontend interfaces."

---

## Technical Highlights
* 🏗️ **Architecture-First**: Meticulous focus on performance, scalability, and maintainability.
* 🤖 **Automation**: Streamlining manual operations, operational reporting, and data pipelines.
* 🎨 **Visual Excellence**: Implementing high-quality interactive experiences with Framer Motion, GSAP, and Three.js.

## Let's Connect
- Email: yeaminislamemon02@gmail.com
- LinkedIn: [linkedin.com/in/yeamin-islam83](https://linkedin.com/in/yeamin-islam83/)
- GitHub: [github.com/Yeamin1083](https://github.com/Yeamin1083)
`
  },

  "skills.json": {
    name: "skills.json",
    language: "json",
    icon: "json",
    codeContent: `{
  "developer": "Yeamin Islam",
  "technical_arsenal": {
    "backend": {
      "languages": ["PHP", "Python", "Go", "Java"],
      "frameworks": ["Django", "Laravel", "REST APIs"],
      "principles": ["MVC", "OOP", "Microservices"]
    },
    "frontend": {
      "languages": ["TypeScript", "JavaScript"],
      "frameworks": ["Next.js", "React.js"],
      "styling": ["Tailwind CSS", "Vanilla CSS"],
      "animation": ["Framer Motion", "GSAP", "Three.js", "React Three Fiber"]
    },
    "databases": {
      "systems": ["Oracle SQL", "MySQL", "PostgreSQL"],
      "operations": ["Enterprise Data Management", "Operational Reporting", "Query Optimization"]
    },
    "tools_and_methods": {
      "version_control": ["Git", "GitHub"],
      "methodologies": ["Agile", "Scrum", "CI/CD"]
    }
  }
}`
  },

  "projects.ts": {
    name: "projects.ts",
    language: "typescript",
    icon: "typescript",
    codeContent: `import { Project } from "@/types";

export const selectedWork: Project[] = [
  {
    id: 1,
    title: "Enterprise Insurance & Payment Systems",
    category: "FinTech & Enterprise",
    year: "2024",
    description: "Enterprise-grade workflows for premium collection, transaction processing, and operational reporting automation.",
    tech: ["Oracle SQL", "REST APIs", "Automation", "Reporting"],
    image: "/projects/p1.png"
  },
  {
    id: 2,
    title: "Self-Onboarding Platform",
    category: "User Acquisition Flow",
    year: "2023",
    description: "Secure onboarding systems featuring OTP verification, complex form workflows, and dynamic UI handling.",
    tech: ["Next.js", "React.js", "TypeScript", "Tailwind CSS"],
    image: "/projects/p2.png"
  },
  {
    id: 3,
    title: "Retail POS & Management Dashboard",
    category: "Infrastructure",
    year: "2022",
    description: "Cloud-based Point of Sale and inventory workflow system featuring real-time dashboards and user role management.",
    tech: ["Laravel", "PHP", "MySQL", "MVC"],
    image: "/projects/p3.png"
  },
  {
    id: 4,
    title: "Automotive Job & Listing Platform",
    category: "Full-Stack Web App",
    year: "2021",
    description: "Laravel-based listing platform with secure authentication, image-based job posts, and dynamic search.",
    tech: ["Java", "Django", "Python", "MySQL"],
    githubUrl: "https://github.com/Yeamin1083/Java-Car-Application",
    image: "/projects/p4.png"
  }
];`
  },

  "experience.go": {
    name: "experience.go",
    language: "go",
    icon: "go",
    codeContent: `package main

import "fmt"

type Experience struct {
	Role    string
	Company string
	Period  string
	Details string
}

func GetProfessionalJourney() []Experience {
	return []Experience{
		{
			Role:    "Officer",
			Company: "Guardian Life Insurance Limited",
			Period:  "Present",
			Details: "Managing core enterprise operations, optimizing payment workflows, and utilizing modern tech stacks to streamline business automation and reporting systems.",
		},
		{
			Role:    "Industrial Attachment Trainee",
			Company: "Brain Station 23",
			Period:  "Sep 2023",
			Details: "Intensive training program focused on modern JavaScript ecosystems. Collaborated in an agile environment and reported directly to HR and lead trainers.",
		},
		{
			Role:    "Senior Executive, Web Dev Wing",
			Company: "UITS Computer Club",
			Period:  "2021 - 2024",
			Details: "Led the web development team, organized technical workshops, and achieved 5th place at the UITS Victory Day Programming Contest (2021).",
		},
	}
}`
  },

  "education.py": {
    name: "education.py",
    language: "python",
    icon: "python",
    codeContent: `class Education:
    def __init__(self, degree, institution, details):
        self.degree = degree
        self.institution = institution
        self.details = details

def get_academic_history():
    return [
        Education(
            degree="MSc in Computer Science & Engineering",
            institution="East West University",
            details="Specialization: Data Science & Algorithms | Currently Pursuing"
        ),
        Education(
            degree="BSc in Computer Science & Engineering",
            institution="University of Information Technology & Sciences (UITS)",
            details="CGPA: 3.71 | Passing Year: 2024"
        ),
        Education(
            degree="Higher Secondary Certificate (HSC)",
            institution="Uttara Residential School & College (URSC)",
            details="CGPA: 4.83 | Passing Year: 2019"
        ),
        Education(
            degree="Secondary School Certificate (SSC)",
            institution="Govt. Kalachandpur High School & College",
            details="CGPA: 4.73 | Passing Year: 2017"
        )
    ]`
  },

  "contact.sh": {
    name: "contact.sh",
    language: "bash",
    icon: "bash",
    codeContent: `#!/bin/bash

# Contact Yeamin Islam
EMAIL="yeaminislamemon02@gmail.com"
PHONE="+8801406900468"
LOCATION="Gulshan, Dhaka 1212"

echo "=== INITIATING SECURE CONNECTION ==="
echo "Host: Yeamin Islam's Portfolio OS"
echo "Target Email: $EMAIL"
echo ""

read -p "Enter your name: " GUEST_NAME
read -p "Enter your email: " GUEST_EMAIL
read -p "Enter your message: " MESSAGE_BODY

echo ""
echo "Sending payload..."
curl -X POST -d "name=$GUEST_NAME&email=$GUEST_EMAIL&message=$MESSAGE_BODY" https://yeamin.dev/api/contact

echo "Connection established successfully. Thank you, $GUEST_NAME!"`
  }
};
