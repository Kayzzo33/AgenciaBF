import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  revenue: string;
  invests: string;
  message: string;
}