export interface TechItem {
  key: string;
  name: string;
  type: string;
  color: string; // Tailwind text color class or hex
  borderColor: string; // Tailwind border color class or hex
  iconClass: string; // FontAwesome class
  isTextIcon?: boolean; // If true, use name/symbol instead of FA icon
  textSymbol?: string;
  desc: string;
  stats: {
    exp: string;
    projects: string;
  };
}

export interface QuestItem {
  id: string;
  title: string;
  description: string;
  image: any;
  level: number;
  levelColor: string;
  tags: string[];
  year: string;
  link: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  icon: string; // Material Symbol name
  highlightColor: string; // e.g. 'primary', 'xp-blue', 'hp-red'
}