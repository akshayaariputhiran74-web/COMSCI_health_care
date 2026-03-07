import { GoogleGenAI, Type } from "@google/genai";
import { Language, TriageCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface TriageResponse {
  category: TriageCategory;
  explanation: string;
  isRedFlag: boolean;
  followUpQuestions: string[];
}

export async function getTriageAssessment(
  symptoms: string,
  age: number,
  gender: string,
  language: Language
): Promise<TriageResponse> {
  const isMockMode = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY";
  
  if (isMockMode) {
    // Wait for a second to simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple mock logic based on keywords
    const lowerSymptoms = symptoms.toLowerCase();
    const isRedFlag = lowerSymptoms.includes('chest pain') || lowerSymptoms.includes('breathing') || lowerSymptoms.includes('unconscious') || lowerSymptoms.includes('bleeding');
    const isYellowFlag = lowerSymptoms.includes('fever') || lowerSymptoms.includes('pain') || lowerSymptoms.includes('vomiting');
    
    return {
      category: isRedFlag ? "RED" : isYellowFlag ? "YELLOW" : "GREEN",
      explanation: isRedFlag 
        ? "(Mock Mode) This is a severe symptom! Please take the patient to the nearest hospital immediately." 
        : isYellowFlag 
          ? "(Mock Mode) These symptoms require medical attention. Please visit the Primary Health Center within 24 hours." 
          : "(Mock Mode) These symptoms seem mild. Continue home care and monitor the patient.",
      isRedFlag,
      followUpQuestions: ["How long have these symptoms been present?"]
    };
  }

  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: `Patient: ${age} year old ${gender}. Symptoms: ${symptoms}. Language: ${language}.`,
    config: {
      systemInstruction: `You are a medical triage assistant for ASHA workers in rural India. 
      Analyze the symptoms and categorize them as:
      - RED: Immediate hospital referral (emergency).
      - YELLOW: Visit Primary Health Center (PHC) within 24 hours.
      - GREEN: Home care with monitoring.
      
      Provide a simple explanation for the ASHA worker to tell the family in the requested language (${language}).
      Identify if there are "red flag" symptoms (breathing difficulty, chest pain, unconsciousness, severe bleeding, high fever with stiff neck).
      
      Return JSON format.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, enum: ["RED", "YELLOW", "GREEN"] },
          explanation: { type: Type.STRING },
          isRedFlag: { type: Type.BOOLEAN },
          followUpQuestions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          }
        },
        required: ["category", "explanation", "isRedFlag", "followUpQuestions"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    return {
      category: "YELLOW",
      explanation: "Unable to process. Please consult the nearest PHC.",
      isRedFlag: false,
      followUpQuestions: []
    };
  }
}

export async function analyzeSymptomPhoto(base64Image: string, language: Language) {
  const isMockMode = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY";
  
  if (isMockMode) {
    // Wait for a second to simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "(Mock Mode) Based on the photo, there seems to be a mild skin irritation. If it worsens, spreads rapidly, or is accompanied by a fever, please consult the nearest PHC immediately.";
  }

  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: "image/jpeg" } },
        { text: `Analyze this medical photo (rash, wound, or infection). Provide a simple assessment in ${language}.` }
      ]
    }
  });

  return response.text;
}
