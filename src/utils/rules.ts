import { ContactFormData } from '../types/index.ts';

export interface FormValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  selectedServices?: string;
  budgetRange?: string;
  projectDetails?: string;
}

export function validateContactForm(data: Partial<ContactFormData>): {
  isValid: boolean;
  errors: FormValidationErrors;
} {
  const errors: FormValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (data.phone && data.phone.trim().length > 0) {
    const cleanPhone = data.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errors.phone = 'Please provide a valid 10-digit phone number.';
    }
  }

  if (!data.businessName || data.businessName.trim().length < 2) {
    errors.businessName = 'Please provide your business or project name.';
  }

  if (!data.selectedServices || data.selectedServices.length === 0) {
    errors.selectedServices = 'Please select at least one primary service of interest.';
  }

  if (!data.budgetRange || data.budgetRange.trim() === '') {
    errors.budgetRange = 'Please indicate your anticipated investment tier.';
  }

  if (!data.projectDetails || data.projectDetails.trim().length < 15) {
    errors.projectDetails = 'Please briefly outline your goals or current bottlenecks (min 15 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateReadingTime(text: string, wordsPerMinute: number = 200): string {
  if (!text || text.trim() === '') return '1 min read';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function matchesKeyword(query: string, target: string, keywords: string[] = []): boolean {
  if (!query || query.trim() === '') return true;
  const cleanQuery = query.toLowerCase().trim();
  const cleanTarget = target.toLowerCase();
  
  if (cleanTarget.includes(cleanQuery)) return true;
  
  for (const kw of keywords) {
    if (kw.toLowerCase().includes(cleanQuery)) return true;
  }
  
  return false;
}
