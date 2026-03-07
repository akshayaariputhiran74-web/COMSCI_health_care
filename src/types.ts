export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi',
  KANNADA = 'kn'
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
  }
}
