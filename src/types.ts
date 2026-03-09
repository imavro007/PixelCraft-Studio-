export interface Project {
  id: number;
  title: string;
  category: 'Branding' | 'UI/UX' | 'Illustration' | 'Graphic Design';
  image: string;
  description: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  content: string;
  image: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}
