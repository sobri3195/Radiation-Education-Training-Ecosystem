export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: 'education' | 'training' | 'clinical' | 'public';
}

export interface BEDCalculation {
  fractions: number;
  totalDose: number;
  alphaBetha: number;
  bed: number;
  eqd2: number;
}

export interface ClinicalCase {
  id: string;
  diagnosis: string;
  technique: string;
  dose: string;
  toxicity: string;
  outcome: string;
}

export interface Myth {
  id: string;
  myth: string;
  fact: string;
  reference: string;
}

export interface OrganDose {
  organ: string;
  maxDose: string;
  toxicity: string;
  guideline: string;
}

export interface CancerData {
  province: string;
  cancerType: string;
  incidence: number;
  outcome: string;
}

export interface PatientJourneyStep {
  stage: string;
  duration: string;
  description: string;
  sideEffects: string[];
}

export interface SideEffect {
  name: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  management: string;
}

export interface TherapyModality {
  cancerType: string;
  stage: string;
  surgery: boolean;
  radiation: boolean;
  chemotherapy: boolean;
  targetedTherapy: boolean;
  immunotherapy: boolean;
  evidence: string;
}
