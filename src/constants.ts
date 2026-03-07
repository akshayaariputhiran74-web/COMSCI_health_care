import { Language, Translation } from './types';

export const TRANSLATIONS: Record<Language, Translation> = {
  [Language.ENGLISH]: {
    home: {
      title: "AI Health Assistant for ASHA Workers",
      description: "A smart tool to help you assess patient symptoms and decide the best course of action.",
      startBtn: "Start Patient Triage",
      features: {
        triage: "Symptom Triage Chatbot",
        redFlag: "Red Flag Emergency Alerts",
        photo: "Photo Symptom Analysis",
        locator: "Nearest Hospital Locator",
        history: "Patient Triage History",
        offline: "Offline Mode Support"
      }
    },
    triage: {
      patientId: "Patient ID",
      age: "Age",
      gender: "Gender",
      language: "Preferred Language",
      startChat: "Start Assessment",
      placeholder: "Type symptoms here...",
      redFlagWarning: "RED FLAG – Immediate Hospital Referral Required"
    },
    results: {
      category: "Triage Category",
      homeCare: "Home Care (Green)",
      phcVisit: "Visit PHC within 24 hours (Yellow)",
      emergency: "Immediate Hospital Referral (Red)",
      explanation: "Explanation for Family"
    },
    common: {
      back: "Back",
      next: "Next",
      submit: "Submit",
      loading: "Processing..."
    }
  },
  [Language.HINDI]: {
    home: {
      title: "आशा कार्यकर्ताओं के लिए एआई स्वास्थ्य सहायक",
      description: "मरीजों के लक्षणों का आकलन करने और सही निर्णय लेने में आपकी मदद करने वाला एक स्मार्ट टूल।",
      startBtn: "मरीज की जांच शुरू करें",
      features: {
        triage: "लक्षण जांच चैटबॉट",
        redFlag: "आपातकालीन अलर्ट",
        photo: "फोटो लक्षण विश्लेषण",
        locator: "निकटतम अस्पताल खोजें",
        history: "मरीज का इतिहास",
        offline: "ऑफलाइन मोड सपोर्ट"
      }
    },
    triage: {
      patientId: "मरीज आईडी",
      age: "उम्र",
      gender: "लिंग",
      language: "पसंदीदा भाषा",
      startChat: "आकलन शुरू करें",
      placeholder: "यहाँ लक्षण लिखें...",
      redFlagWarning: "🚨 रेड फ्लैग - तत्काल अस्पताल रेफरल आवश्यक"
    },
    results: {
      category: "जांच श्रेणी",
      homeCare: "घर पर देखभाल (हरा)",
      phcVisit: "24 घंटे के भीतर पीएचसी जाएं (पीला)",
      emergency: "तत्काल अस्पताल रेफरल (लाल)",
      explanation: "परिवार के लिए स्पष्टीकरण"
    },
    common: {
      back: "पीछे",
      next: "आगे",
      submit: "जमा करें",
      loading: "प्रक्रिया जारी है..."
    }
  },
  [Language.KANNADA]: {
    home: {
      title: "ಆಶಾ ಕಾರ್ಯಕರ್ತರಿಗಾಗಿ ಎಐ ಆರೋಗ್ಯ ಸಹಾಯಕ",
      description: "ರೋಗಿಯ ಲಕ್ಷಣಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲು ಮತ್ತು ಸರಿಯಾದ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುವ ಸ್ಮಾರ್ಟ್ ಸಾಧನ.",
      startBtn: "ರೋಗಿಯ ತಪಾಸಣೆ ಪ್ರಾರಂಭಿಸಿ",
      features: {
        triage: "ಲಕ್ಷಣ ತಪಾಸಣೆ ಚಾಟ್‌ಬಾಟ್",
        redFlag: "ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳು",
        photo: "ಫೋಟೋ ಲಕ್ಷಣ ವಿಶ್ಲೇಷಣೆ",
        locator: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಪತ್ತೆಕಾರಕ",
        history: "ರೋಗಿಯ ಇತಿಹಾಸ",
        offline: "ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಬೆಂಬಲ"
      }
    },
    triage: {
      patientId: "ರೋಗಿಯ ಐಡಿ",
      age: "ವಯಸ್ಸು",
      gender: "ಲಿಂಗ",
      language: "ಆದ್ಯತೆಯ ಭಾಷೆ",
      startChat: "ಮೌಲ್ಯಮಾಪನ ಪ್ರಾರಂಭಿಸಿ",
      placeholder: "ಲಕ್ಷಣಗಳನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",
      redFlagWarning: "🚨 ರೆಡ್ ಫ್ಲ್ಯಾಗ್ - ತಕ್ಷಣದ ಆಸ್ಪತ್ರೆ ಉಲ್ಲೇಖ ಅಗತ್ಯವಿದೆ"
    },
    results: {
      category: "ತಪಾಸಣೆ ವರ್ಗ",
      homeCare: "ಮನೆ ಆರೈಕೆ (ಹಸಿರು)",
      phcVisit: "24 ಗಂಟೆಗಳ ಒಳಗೆ ಪಿಎಚ್‌ಸಿ ಭೇಟಿ ನೀಡಿ (ಹಳದಿ)",
      emergency: "ತಕ್ಷಣದ ಆಸ್ಪತ್ರೆ ಉಲ್ಲೇಖ (ಕೆಂಪು)",
      explanation: "ಕುಟುಂಬಕ್ಕೆ ವಿವರಣೆ"
    },
    common: {
      back: "ಹಿಂದೆ",
      next: "ಮುಂದೆ",
      submit: "ಸಲ್ಲಿಸಿ",
      loading: "ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ..."
    }
  }
};
