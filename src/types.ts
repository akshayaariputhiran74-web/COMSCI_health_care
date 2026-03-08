export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi',
  KANNADA = 'kn',
  TAMIL = 'ta',
  MALAYALAM = 'ml'
}

export type TriageCategory = 'GREEN' | 'YELLOW' | 'RED';

export interface Patient {
  id: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  language: Language;
}

export interface TriageRecord {
  id: string;
  patientId: string;
  date: string;
  symptoms: string[];
  category: TriageCategory;
  notes: string;
  isRedFlag: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  distance: string;
  phone: string;
  is24h: boolean;
  lat: number;
  lng: number;
  address?: string;
}

export interface Translation {
  home: {
    title: string;
    description: string;
    startBtn: string;
    features: {
      triage: string;
      redFlag: string;
      photo: string;
      locator: string;
      history: string;
      offline: string;
      translator: string;
    }
  };
  triage: {
    patientId: string;
    age: string;
    gender: string;
    language: string;
    startChat: string;
    placeholder: string;
    redFlagWarning: string;
    welcome: string;
    male: string;
    female: string;
    other: string;
  };
  results: {
    category: string;
    homeCare: string;
    phcVisit: string;
    emergency: string;
    explanation: string;
  };
  common: {
    back: string;
    next: string;
    submit: string;
    loading: string;
    finish: string;
    error: string;
  };
  photo: {
    title: string;
    subtitle: string;
    uploadBtn: string;
    analyzeBtn: string;
    analyzing: string;
    resultTitle: string;
  };
  locator: {
    title: string;
    finding: string;
    noneFound: string;
    openNow: string;
    call: string;
    noPhone: string;
    directions: string;
  };
  history: {
    title: string;
    searchPlaceholder: string;
    noRecords: string;
  };
  dashboard: {
    title: string;
    totalTriages: string;
    referrals: string;
    homeCare: string;
    referralRate: string;
    dailyChart: string;
    distributionChart: string;
    alertsTitle: string;
  };
  translator: {
    title: string;
    description: string;
    from: string;
    to: string;
    speakHint: string;
    translating: string;
    translatedAlt: string;
  };
}
