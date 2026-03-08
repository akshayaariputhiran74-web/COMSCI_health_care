import { GoogleGenAI, Type } from "@google/genai";
import { Language, TriageCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

function getLanguageName(lang: Language): string {
  const names = {
    [Language.ENGLISH]: 'English',
    [Language.HINDI]: 'Hindi',
    [Language.KANNADA]: 'Kannada',
    [Language.TAMIL]: 'Tamil',
    [Language.MALAYALAM]: 'Malayalam'
  };
  return names[lang] || 'English';
}

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
  const langName = getLanguageName(language);
  
  if (isMockMode) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const lowerSymptoms = symptoms.toLowerCase();
    const isRedFlag = lowerSymptoms.includes('chest pain') || lowerSymptoms.includes('breathing') || lowerSymptoms.includes('unconscious') || lowerSymptoms.includes('bleeding');
    const isYellowFlag = lowerSymptoms.includes('fever') || lowerSymptoms.includes('pain') || lowerSymptoms.includes('vomiting');
    const responses: Record<string, any> = {
      'English': {
        red: "(Mock Mode) This is a severe symptom! Please take the patient to the nearest hospital immediately.",
        yellow: "(Mock Mode) These symptoms require medical attention. Please visit the Primary Health Center within 24 hours.",
        green: "(Mock Mode) These symptoms seem mild. Continue home care and monitor the patient.",
        questions: ["How long have these symptoms been present?", "Is there any relevant medical history?"]
      },
      'Hindi': {
        red: "(मॉक मोड) यह एक गंभीर लक्षण है! कृपया मरीज को तुरंत नजदीकी अस्पताल ले जाएं।",
        yellow: "(मॉक मोड) इन लक्षणों पर चिकित्सा ध्यान देने की आवश्यकता है। कृपया 24 घंटे के भीतर प्राथमिक स्वास्थ्य केंद्र पर जाएं।",
        green: "(मॉक मोड) ये लक्षण हल्के लगते हैं। घर पर देखभाल जारी रखें और मरीज की निगरानी करें।",
        questions: ["ये लक्षण कितने समय से हैं?", "क्या मरीज को पहले से कोई बीमारी है?"]
      },
      'Tamil': {
        red: "(மோக் பயன்முறை) இது ஒரு கடுமையான அறிகுறி! தயவுசெய்து நோயாளியை உடனடியாக அருகிலுள்ள மருத்துவமனைக்கு அழைத்துச் செல்லுங்கள்.",
        yellow: "(மோக் பயன்முறை) இந்த அறிகுறிகளுக்கு மருத்துவ கவனிப்பு தேவை. தயவுசெய்து 24 மணி நேரத்திற்குள் ஆரம்ப சுகாதார நிலையத்திற்குச் செல்லுங்கள்.",
        green: "(மோக் பயன்முறை) இந்த அறிகுறிகள் லேசானவை என்று தெரிகிறது. வீட்டிலேயே தொடர்ந்து கவனித்து நோயாளியைக் கண்காணிக்கவும்.",
        questions: ["இந்த அறிகுறிகள் எவ்வளவு காலமாக உள்ளன?", "நோயாளியின் மருத்துவ பின்னணி ஏதேனும் உண்டா?"]
      },
      'Kannada': {
        red: "(ಮಾಕ್ ಮೋಡ್) ಇದು ತೀವ್ರವಾದ ಲಕ್ಷಣವಾಗಿದೆ! ದಯವಿಟ್ಟು ರೋಗಿಯನ್ನು ತಕ್ಷಣ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗೆ ಕರೆದೊಯ್ಯಿರಿ.",
        yellow: "(ಮಾಕ್ ಮೋಡ್) ಈ ಲಕ್ಷಣಗಳಿಗೆ ವೈದ್ಯಕೀಯ ಗಮನ ಅಗತ್ಯವಿದೆ. ದಯವಿಟ್ಟು 24 ಗಂಟೆಗಳ ಒಳಗೆ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.",
        green: "(ಮಾಕ್ ಮೋಡ್) ಈ ಲಕ್ಷಣಗಳು ಸೌಮ್ಯವಾಗಿ ಕಂಡುಬರುತ್ತವೆ. ಮನೆಯಲ್ಲೇ ಆರೈಕೆ ಮುಂದುವರಿಸಿ ಮತ್ತು ರೋಗಿಯನ್ನು ಗಮನಿಸಿ.",
        questions: ["ಈ ಲಕ್ಷಣಗಳು ಎಷ್ಟು ಸಮಯದಿಂದ ಇವೆ?", "ರೋಗಿಯ ಹಿಂದಿನ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸವಿದೆಯೇ?"]
      },
      'Malayalam': {
        red: "(മോക്ക് മോഡ്) ഇതൊരു ഗുരുതരമായ ലക്ഷണമാണ്! ദയവായി രോഗിയെ ഉടൻ അടുത്തുള്ള ആശുപത്രിയിൽ എത്തിക്കുക.",
        yellow: "(മോക്ക് മോഡ്) ഈ ലക്ഷണങ്ങൾക്ക് വൈദ്യസഹായം ആവശ്യമാണ്. ദയവായി 24 മണിക്കൂറിനുള്ളിൽ പ്രാഥമിക ആരോഗ്യ കേന്ദ്രം സന്ദർശിക്കുക.",
        green: "(മോക്ക് മോഡ്) ഈ ലക്ഷണങ്ങൾ നിസാരമാണെന്ന് തോന്നുന്നു. വീട്ടിൽ പരിചരണം തുടരുകയും രോഗിയെ നിരീക്ഷിക്കുകയും ചെയ്യുക.",
        questions: ["ഈ ലക്ഷണങ്ങൾ എത്ര കാലമായി ഉണ്ട്?", "രോഗിക്ക് മുൻപ് എന്തെങ്കിലും രോഗങ്ങൾ ഉണ്ടായിരുന്നോ?"]
      }
    };

    const res = responses[langName] || responses['English'];
    
    return {
      category: isRedFlag ? "RED" : isYellowFlag ? "YELLOW" : "GREEN",
      explanation: isRedFlag ? res.red : isYellowFlag ? res.yellow : res.green,
      isRedFlag,
      followUpQuestions: res.questions || ["How long have these symptoms been present?"]
    };
  }

  const model = "gemini-2.0-flash";
  const response = await ai.models.generateContent({
    model,
    contents: [{ 
      role: 'user', 
      parts: [{ text: `Patient: ${age} year old ${gender}. 
        Symptoms reported (possibly in another language): ${symptoms}. 
        MANDATORY: You MUST provide the output in ${langName}.` }]
    }],
    config: {
      systemInstruction: `You are a medical triage assistant for ASHA workers in rural India. 
      Analyze the symptoms and categorize them as:
      - RED: Immediate hospital referral (emergency).
      - YELLOW: Visit Primary Health Center (PHC) within 24 hours.
      - GREEN: Home care with monitoring.
      
      CRITICAL INSTRUCTIONS:
      1. Provide a simple explanation for the ASHA worker to tell the family.
      2. Generate 2-3 relevant follow-up questions to help clarify the situation.
      3. ALL text fields in the JSON (explanation, followUpQuestions) MUST be in ${langName}.
      4. Return ONLY a valid JSON object.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, enum: ["RED", "YELLOW", "GREEN"] },
          explanation: { type: Type.STRING },
          isRedFlag: { type: Type.BOOLEAN },
          followUpQuestions: { type: Type.ARRAY, items: { type: Type.STRING } }
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
      explanation: language === Language.TAMIL ? "செயலாக்க முடியவில்லை. தயவுசெய்து அருகிலுள்ள ஆரம்ப சுகாதார நிலையத்தை அணுகவும்." : "Unable to process. Please consult the nearest PHC.",
      isRedFlag: false,
      followUpQuestions: []
    };
  }
}

export async function analyzeSymptomPhoto(base64Image: string, language: Language) {
  const isMockMode = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY";
  const langName = getLanguageName(language);
  
  if (isMockMode) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockRes: Record<string, string> = {
      'English': "(Mock Mode) Based on the photo, there seems to be a mild skin irritation.",
      'Hindi': "(मॉक मोड) फोटो के आधार पर, हल्की त्वचा में जलन महसूस होती है।",
      'Tamil': "(மோக் பயன்முறை) புகைப்படத்தின் அடிப்படையில், லேசான தோல் எரிச்சல் இருப்பதாகத் தெரிகிறது.",
      'Kannada': "(ಮಾಕ್ ಮೋಡ್) ಫೋಟೋ ಆಧರಿಸಿ, ಚರ್ಮದಲ್ಲಿ ಸ್ವಲ್ಪ ಕಿರಿಕಿರಿ ಕಂಡುಬರುತ್ತಿದೆ.",
      'Malayalam': "(മോക്ക് മോഡ്) ഫോട്ടോ അടിസ്ഥാനമാക്കി, നേരിയ ചർമ്മ പ്രകോപനം ഉണ്ടെന്ന് തോന്നുന്നു."
    };
    return mockRes[langName] || mockRes['English'];
  }

  const model = "gemini-2.0-flash";
  const response = await ai.models.generateContent({
    model,
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: "image/jpeg" } },
        { text: `Analyze this medical photo for symptoms. Provide a simple assessment in ${langName}. 
          Keep it easy for a rural family to understand.` }
      ]
    }]
  });
  return response.text;
}

export async function translateText(text: string, from: Language, to: Language) {
  const isMockMode = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY";
  const fromName = getLanguageName(from);
  const toName = getLanguageName(to);
  
  if (isMockMode) {
    if (to === Language.TAMIL) {
      return `(மொழிபெயர்ப்பு: "${text}")`;
    }
    return `(Mock Translate: "${text}" from ${fromName} to ${toName})`;
  }

  try {
    const model = "gemini-2.0-flash";
    const response = await ai.models.generateContent({
      model,
      contents: [{
        role: 'user',
        parts: [{ text: `Translate the following medical/health text from ${fromName} to ${toName}. 
          MANDATORY: Return ONLY the translated text without any explanations or quotes.
          
          Text: ${text}` }]
      }]
    });
    return response.text || text;
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
}
