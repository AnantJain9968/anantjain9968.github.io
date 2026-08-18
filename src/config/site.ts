export const siteConfig = {
  name: 'Anant Jain',
  title: 'Java Backend Engineer',
  description: 'Java Backend Engineer writing about backend engineering, system design, Java, Spring Boot, Kafka, databases and scalable systems.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://anantjain9968.github.io',
  location: 'Delhi NCR, India',
  email: 'anantjain9968@gmail.com',
  social: {
    github: 'https://github.com/AnantJain9968',
    linkedin: 'https://www.linkedin.com/in/anant-jain-078792122',
  },
  navigation: [
    { label: 'About', href: '/about' },
    { label: 'Experience', href: '/experience' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
  ],
};

export const skills = ['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'Oracle SQL', 'PL/SQL', 'Kafka', 'System Design', 'Performance Engineering', 'Python Automation'];
