import { GoogleGenAI, Type } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function testTriageAssessment() {
  const model = "gemini-2.0-flash";
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Patient: 45 year old Male. Symptoms: severe headache and nausea. Language: English.`,
      config: {
        systemInstruction: `You are a medical triage assistant for ASHA workers in rural India. 
        Analyze the symptoms and categorize them as:
        - RED: Immediate hospital referral (emergency).
        - YELLOW: Visit Primary Health Center (PHC) within 24 hours.
        - GREEN: Home care with monitoring.
        
        Provide a simple explanation for the ASHA worker to tell the family in the requested language (English).
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

    console.log("Success:");
    console.log(response.text);
  } catch (err) {
    console.error("Error:");
    console.error(err);
  }
}

testTriageAssessment();
