export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: 'Cinematic & Motion' | 'Web Architecture & Care' | 'Automations & Brand';
  summary: string;
  heroHeading: string;
  heroSubheading: string;
  painPointsSolved: {
    problem: string;
    agony: string;
    auvrynSolution: string;
  }[];
  deliverables: {
    name: string;
    description: string;
    badge?: string;
  }[];
  technicalSpecs: {
    metric: string;
    value: string;
    context: string;
  }[];
  competitorGap: {
    typicalAgency: string;
    auvrynStudios: string;
  };
  longtailKeywords: string[];
  estimatedTimeline: string;
  investmentTier: string;
  roiImpact: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface MockWebsitePreview {
  domain: string;
  tagline: string;
  heroHeadline: string;
  accentColor: string;
  previewType: 'architectural' | 'luxury-craft' | 'aerospace' | 'clinical' | 'logistics';
  stats: {
    label: string;
    value: string;
  }[];
  keyFeatures: string[];
  interactiveDemoType: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  businessName: string;
  industry: string;
  location: string;
  rating: 5;
  quote: string;
  serviceUsed: string;
  clientMetric?: {
    label: string;
    value: string;
  };
  mockWebsitePreview?: MockWebsitePreview;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  category: string;
  summary: string;
  painPointsAddressed: string[];
  targetLongtailKeywords: string[];
  contentSections: {
    heading: string;
    subheading?: string;
    body: string[];
    callout?: {
      type: 'stat' | 'takeaway' | 'warning';
      text: string;
    };
  }[];
  actionableChecklist: string[];
  relatedServiceSlug: string;
}

export interface PortfolioCaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  year: string;
  resultMetric: string;
  resultLabel: string;
  summary: string;
  tags: string[];
  techStack: string[];
  liveUrlMock?: string;
}

export interface CompetitorBenchmark {
  category: string;
  typicalOrlandoAgency: string;
  auvrynStudios: string;
  clientConsequence: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  currentWebsite?: string;
  selectedServices: string[];
  budgetRange: string;
  timeline: string;
  businessGoals: string[];
  projectDetails: string;
}
