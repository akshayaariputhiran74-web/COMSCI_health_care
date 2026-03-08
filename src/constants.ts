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
        offline: "Offline Mode Support",
        translator: "Voice & Text Translator"
      }
    },
    triage: {
      patientId: "Patient ID",
      age: "Age",
      gender: "Gender",
      language: "Preferred Language",
      startChat: "Start Assessment",
      placeholder: "Type symptoms here...",
      redFlagWarning: "RED FLAG – Immediate Hospital Referral Required",
      welcome: "Hello! I am your AI Health Assistant. Please describe the symptoms of the patient.",
      male: "Male",
      female: "Female",
      other: "Other"
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
      loading: "Processing...",
      finish: "Finish",
      error: "Sorry, an error occurred."
    },
    photo: {
      title: "Photo Symptom Analysis",
      subtitle: "Click to upload or take a photo of the symptoms",
      uploadBtn: "Upload Photo",
      analyzeBtn: "Analyze Photo",
      analyzing: "Analyzing...",
      resultTitle: "AI Assessment"
    },
    locator: {
      title: "Nearest Facilities",
      finding: "Finding nearby hospitals...",
      noneFound: "No hospitals found near your location.",
      openNow: "Open Now",
      call: "Call",
      noPhone: "No Phone",
      directions: "Directions"
    },
    history: {
      title: "Patient History",
      searchPlaceholder: "Search by Patient ID...",
      noRecords: "No records found."
    },
    dashboard: {
      title: "Supervisor Dashboard",
      totalTriages: "Total Triages",
      referrals: "Referrals",
      homeCare: "Home Care",
      referralRate: "Referral Rate",
      dailyChart: "Daily Triage Count",
      distributionChart: "Referral Distribution",
      alertsTitle: "Alerts & Patterns"
    },
    translator: {
      title: "Medical Translator",
      description: "Translate phrases between local languages to help communicate with patients.",
      from: "Translate From",
      to: "Translate To",
      speakHint: "Click mic to speak",
      translating: "Translating...",
      translatedAlt: "Translated Text"
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
        offline: "ऑफलाइन मोड सपोर्ट",
        translator: "आवाज और पाठ अनुवादक"
      }
    },
    triage: {
      patientId: "मरीज आईडी",
      age: "उम्र",
      gender: "लिंग",
      language: "पसंदीदा भाषा",
      startChat: "आकलन शुरू करें",
      placeholder: "यहाँ लक्षण लिखें...",
      redFlagWarning: "🚨 रेड फ्लैग - तत्काल अस्पताल रेफरल आवश्यक",
      welcome: "नमस्ते! मैं आपका एआई स्वास्थ्य सहायक हूं। कृपया मरीज के लक्षण बताएं।",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य"
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
      loading: "प्रक्रिया जारी है...",
      finish: "समाप्त",
      error: "क्षमा करें, कोई त्रुटि हुई।"
    },
    photo: {
      title: "फोटो लक्षण विश्लेषण",
      subtitle: "लक्षणों का फोटो लेने या अपलोड करने के लिए क्लिक करें",
      uploadBtn: "फोटो अपलोड करें",
      analyzeBtn: "फोटो का विश्लेषण करें",
      analyzing: "विश्लेषण हो रहा है...",
      resultTitle: "एआई मूल्यांकन"
    },
    locator: {
      title: "निकटतम स्वास्थ्य सुविधाएं",
      finding: "आस-पास के अस्पतालों की तलाश...",
      noneFound: "आपके स्थान के पास कोई अस्पताल नहीं मिला।",
      openNow: "अभी खुला है",
      call: "कॉल करें",
      noPhone: "फोन उपलब्ध नहीं",
      directions: "दिशा-निर्देश"
    },
    history: {
      title: "मरीज का इतिहास",
      searchPlaceholder: "मरीज आईडी द्वारा खोजें...",
      noRecords: "कोई रिकॉर्ड नहीं मिला।"
    },
    dashboard: {
      title: "पर्यवेक्षक डैशबोर्ड",
      totalTriages: "कुल जांच",
      referrals: "रेफरल",
      homeCare: "घर पर देखभाल",
      referralRate: "रेफरल दर",
      dailyChart: "दैनिक जांच संख्या",
      distributionChart: "रेफरल वितरण",
      alertsTitle: "अलर्ट और पैटर्न"
    },
    translator: {
      title: "चिकित्सा अनुवादक",
      description: "मरीजों के साथ संवाद करने में मदद करने के लिए स्थानीय भाषाओं के बीच अनुवाद करें।",
      from: "कहाँ से अनुवाद करें",
      to: "कहाँ अनुवाद करें",
      speakHint: "बोलने के लिए माइक पर क्लिक करें",
      translating: "अनुवाद हो रहा है...",
      translatedAlt: "अनुवादित पाठ"
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
        offline: "ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಬೆಂಬಲ",
        translator: "ಧ್ವನಿ ಮತ್ತು ಪಠ್ಯ ಅನುವಾದಕ"
      }
    },
    triage: {
      patientId: "ರೋಗಿಯ ಐಡಿ",
      age: "ವಯಸ್ಸು",
      gender: "ಲಿಂಗ",
      language: "ಆದ್ಯತೆಯ ಭಾಷೆ",
      startChat: "ಮೌಲ್ಯಮಾಪನ ಪ್ರಾರಂಭಿಸಿ",
      placeholder: "ಲಕ್ಷಣಗಳನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",
      redFlagWarning: "🚨 ರೆಡ್ ಫ್ಲ್ಯಾಗ್ - ತಕ್ಷಣದ ಆಸ್ಪತ್ರೆ ಉಲ್ಲೇಖ ಅಗತ್ಯವಿದೆ",
      welcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಎಐ ಆರೋಗ್ಯ ಸಹಾಯಕ. ದಯವಿಟ್ಟು ರೋಗಿಯ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ.",
      male: "ಪುರುಷ",
      female: "ಮಹಿಳೆ",
      other: "ಇತರೆ"
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
      loading: "ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ...",
      finish: "ಮುಕ್ತಾಯ",
      error: "ಕ್ಷಮಿಸಿ, ದೋಷ ಸಂಭವಿಸಿದೆ."
    },
    photo: {
      title: "ಫೋಟೋ ಲಕ್ಷಣ ವಿಶ್ಲೇಷಣೆ",
      subtitle: "ಲಕ್ಷಣಗಳ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಲು ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
      uploadBtn: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      analyzeBtn: "ಫೋಟೋ ವಿಶ್ಲೇಷಿಸಿ",
      analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
      resultTitle: "ಎಐ ಮೌಲ್ಯಮಾಪನ"
    },
    locator: {
      title: "ಹತ್ತಿರದ ಆರೋಗ್ಯ ಕೇಂದ್ರಗಳು",
      finding: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಪತ್ತೆ ಹಚ್ಚಲಾಗುತ್ತಿದೆ...",
      noneFound: "ನಿಮ್ಮ ಸ್ಥಳದ ಹತ್ತಿರ ಯಾವುದೇ ಆಸ್ಪತ್ರೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
      openNow: "ಈಗ ತೆರೆದಿದೆ",
      call: "ಕರೆ ಮಾಡಿ",
      noPhone: "ಫೋನ್ ಲಭ್ಯವಿಲ್ಲ",
      directions: "ದಿಕ್ಕಿನ ಮಾಹಿತಿ"
    },
    history: {
      title: "ರೋಗಿಯ ಇತಿಹಾಸ",
      searchPlaceholder: "ರೋಗಿಯ ಐಡಿ ಮೂಲಕ ಹುಡುಕಿ...",
      noRecords: "ಯಾವುದೇ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ."
    },
    dashboard: {
      title: "ಮೇಲ್ವಿಚಾರಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      totalTriages: "ಒಟ್ಟು ತಪಾಸಣೆಗಳು",
      referrals: "ಶಿಫಾರಸುಗಳು",
      homeCare: "ಮನೆ ಆರೈಕೆ",
      referralRate: "ಶಿಫಾರಸು ದರ",
      dailyChart: "ದೈನಂದಿನ ತಪಾಸಣೆ ಸಂಖ್ಯೆ",
      distributionChart: "ಶಿಫಾರಸು ಹಂಚಿಕೆ",
      alertsTitle: "ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಮಾದರಿಗಳು"
    },
    translator: {
      title: "ವೈದ್ಯಕೀಯ ಅನುವಾದಕ",
      description: "ರೋಗಿಗಳೊಂದಿಗೆ ಸಂವಹನ ನಡೆಸಲು ಸಹಾಯ ಮಾಡಲು ಸ್ಥಳೀಯ ಭಾಷೆಗಳ ನಡುವೆ ಪದಗುಚ್ಛಗಳನ್ನು ಅನುವಾದಿಸಿ.",
      from: "ಇಲ್ಲಿಂದ ಅನುವಾದಿಸಿ",
      to: "ಇಲ್ಲಿಗೆ ಅನುವಾದಿಸಿ",
      speakHint: "ಮಾತನಾಡಲು ಮೈಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ",
      translating: "ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...",
      translatedAlt: "ಅನುವಾದಿತ ಪಠ್ಯ"
    }
  },
  [Language.TAMIL]: {
    home: {
      title: "ஆஷா பணியாளர்களுக்கான AI சுகாதார உதவியாளர்",
      description: "நோயாளி அறிகுறிகளை மதிப்பிடவும் சிறந்த நடவடிக்கையை எடுக்கவும் உதவும் ஒரு ஸ்மார்ட் கருவி.",
      startBtn: "நோயாளி மதிப்பீட்டைத் தொடங்கு",
      features: {
        triage: "அறிகுறி மதிப்பீடு சாட்பாட்",
        redFlag: "அவசர எச்சரிக்கைகள்",
        photo: "புகைப்பட அறிகுறி பகுப்பாய்வு",
        locator: "அருகிலுள்ள மருத்துவமனை கண்டுபிடிப்பாளர்",
        history: "நோயாளி வரலாறு",
        offline: "ஆஃப்லைன் ஆதரவு",
        translator: "குரல் மற்றும் உரை மொழிபெயர்ப்பாளர்"
      }
    },
    triage: {
      patientId: "நோயாளி ஐடி",
      age: "வயது",
      gender: "பாலினம்",
      language: "விருப்பமான மொழி",
      startChat: "மதிப்பீட்டைத் தொடங்கு",
      placeholder: "அறிகுறிகளை இங்கே தட்டச்சு செய்க...",
      redFlagWarning: "🚨 ரெட் பிளாக் - உடனடி மருத்துவமனை பரிந்துரை தேவை",
      welcome: "வணக்கம்! நான் உங்கள் ஏஐ சுகாதார உதவியாளர். நோயாளியின் அறிகுறிகளை விவரிக்கவும்.",
      male: "ஆண்",
      female: "பெண்",
      other: "மற்றவை"
    },
    results: {
      category: "மதிப்பீடு வகை",
      homeCare: "வீட்டு பராமரிப்பு (பச்சை)",
      phcVisit: "24 மணி நேரத்திற்குள் PHC-க்குச் செல்லுங்கள் (மஞ்சள்)",
      emergency: "உடனடி மருத்துவமனை பரிந்துரை (சிவப்பு)",
      explanation: "குடும்பத்திற்கான விளக்கம்"
    },
    common: {
      back: "பின்னால்",
      next: "அடுத்தது",
      submit: "சமர்ப்பி",
      loading: "செயலாக்கப்படுகின்றன...",
      finish: "முடிக்க",
      error: "மன்னிக்கவும், ஒரு பிழை ஏற்பட்டது."
    },
    photo: {
      title: "புகைப்பட அறிகுறி பகுப்பாய்வு",
      subtitle: "அறிகுறிகளின் புகைப்படத்தைப் பதிவேற்ற அல்லது எடுக்க கிளிக் செய்க",
      uploadBtn: "புகைப்படத்தைப் பதிவேற்றவும்",
      analyzeBtn: "புகைப்படத்தை பகுப்பாய்வு செய்யுங்கள்",
      analyzing: "பகுப்பாய்வு செய்கிறது...",
      resultTitle: "AI மதிப்பீடு"
    },
    locator: {
      title: "அருகிலுள்ள மருத்துவமனைகள்",
      finding: "அருகிலுள்ள மருத்துவமனைகளைக் கண்டறிகிறது...",
      noneFound: "உங்கள் இருப்பிடத்திற்கு அருகில் மருத்துவமனைகள் எதுவும் இல்லை.",
      openNow: "இப்போது திறந்திருக்கிறது",
      call: "அழைப்பு",
      noPhone: "தொலைபேசி இல்லை",
      directions: "வழிமுறைகள்"
    },
    history: {
      title: "நோயாளி வரலாறு",
      searchPlaceholder: "நோயாளி ஐடி மூலம் தேடுங்கள்...",
      noRecords: "பதிவுகள் எதுவும் இல்லை."
    },
    dashboard: {
      title: "மேற்பார்வையாளர் டாஷ்போர்டு",
      totalTriages: "மொத்த மதிப்பீடுகள்",
      referrals: "பரிந்துரைகள்",
      homeCare: "வீட்டு பராமரிப்பு",
      referralRate: "பரிந்துரை விகிதம்",
      dailyChart: "தினசரி மதிப்பீடு எண்ணிக்கை",
      distributionChart: "பரிந்துரை விநியோகம்",
      alertsTitle: "எச்சரிக்கைகள் மற்றும் வடிவங்கள்"
    },
    translator: {
      title: "மருத்துவ மொழிபெயர்ப்பாளர்",
      description: "நோயாளிகளுடன் தொடர்பு கொள்ள உதவ உள்ளூர் மொழிகளுக்கு இடையே சொற்றொடர்களை மொழிபெயர்க்கவும்.",
      from: "இதிலிருந்து மொழிபெயர்க்கவும்",
      to: "இதற்கு மொழிபெயர்க்கவும்",
      speakHint: "பேச மைக்கை கிளிக் செய்க",
      translating: "மொழிபெயர்க்கிறது...",
      translatedAlt: "மொழிபெயர்க்கப்பட்ட உரை"
    }
  },
  [Language.MALAYALAM]: {
    home: {
      title: "ആശാ വർക്കർമാർക്കുള്ള AI ആരോഗ്യ സഹായി",
      description: "രോഗിയുടെ ലക്ഷണങ്ങൾ വിലയിരുത്തുന്നതിനും മികച്ച തീരുമാനം എടുക്കുന്നതിനും നിങ്ങളെ സഹായിക്കുന്ന ഒരു സ്മാർട്ട് ടൂൾ.",
      startBtn: "രോഗി പരിശോധന തുടങ്ങുക",
      features: {
        triage: "ലക്ഷണ പരിശോധന ചാറ്റ്ബോട്ട്",
        redFlag: "അടിയന്തര മുന്നറിയിപ്പുകൾ",
        photo: "ഫോട്ടോ ലക്ഷണ വിശകലനം",
        locator: "അടുത്തുള്ള ആശുപത്രി കണ്ടെത്തുക",
        history: "രോഗിയുടെ ഹിസ്റ്ററി",
        offline: "ഓഫ്‌ലൈൻ സപ്പോർಟ್",
        translator: "വിവർത്തകൻ"
      }
    },
    triage: {
      patientId: "രോഗി ഐഡി",
      age: "വയസ്സ്",
      gender: "ലിംഗം",
      language: "ഭാഷ",
      startChat: "പരിശോധന തുടങ്ങുക",
      placeholder: "ലക്ഷണങ്ങൾ ഇവിടെ എഴുതുക...",
      redFlagWarning: "🚨 റെഡ് ഫ്ലാഗ് - ഉടൻ ആശുപത്രിയിൽ എത്തിക്കുക",
      welcome: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ എഐ ആരോഗ്യ സഹായിയാണ്. ദയവായി രോഗിയുടെ ലക്ഷണങ്ങൾ വിവരിക്കുക.",
      male: "പുരുഷൻ",
      female: "സ്ത്രീ",
      other: "മറ്റുള്ളവ"
    },
    results: {
      category: "പരിശോധനാ വിഭാഗം",
      homeCare: "വീട്ടുപരിചരണം (പച്ച)",
      phcVisit: "24 മണിക്കൂറിനുള്ളിൽ PHC സന്ദർശിക്കുക (മഞ്ഞ)",
      emergency: "ഉടൻ ആശുപത്രിയിൽ എത്തിക്കുക (ചുവപ്പ്)",
      explanation: "കുടുംബത്തിനുള്ള വിശദീകരണം"
    },
    common: {
      back: "പിന്നിലേക്ക്",
      next: "അടുത്തത്",
      submit: "സമർപ്പിക്കുക",
      loading: "പ്രോസസ്സ് ചെയ്യുന്നു...",
      finish: "അവസാനിപ്പിക്കുക",
      error: "ക്ഷമിക്കണം, ഒരു പിശക് സംഭവിച്ചു."
    },
    photo: {
      title: "ഫോട്ടോ ലക്ഷണ വിശകലനം",
      subtitle: "ലക്ഷണങ്ങളുടെ ഫോട്ടോ എടുക്കുന്നതിനോ അപ്‌ലോഡ് ചെയ്യുന്നതിനോ ക്ലിക്ക് ചെയ്യുക",
      uploadBtn: "ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക",
      analyzeBtn: "ഫോട്ടോ വിശകലനം ചെയ്യുക",
      analyzing: "വിശകലനം ചെയ്യുന്നു...",
      resultTitle: "AI വിലയിരുത്തൽ"
    },
    locator: {
      title: "അടുത്തുള്ള ആശുപത്രികൾ",
      finding: "അടുത്തുള്ള ആശുപത്രികൾ കണ്ടെത്തുന്നു...",
      noneFound: "നിങ്ങളുടെ ലൊക്കേഷന് അടുത്തായി ആശുപത്രികളൊന്നും കണ്ടെത്തിയില്ല.",
      openNow: "ഇപ്പോൾ തുറന്നിരിക്കുന്നു",
      call: "വിളിക്കുക",
      noPhone: "ഫോൺ ലഭ്യമല്ല",
      directions: "ദിശകൾ"
    },
    history: {
      title: "രോഗിയുടെ ഹിസ്റ്ററി",
      searchPlaceholder: "രോഗി ഐഡി ഉപയോഗിച്ച് തിരയുക...",
      noRecords: "രേഖകളൊന്നും കണ്ടെത്തിയില്ല."
    },
    dashboard: {
      title: "സൂപ്പർവൈസർ ഡാഷ്‌ബോർഡ്",
      totalTriages: "ആകെ പരിശോധനകൾ",
      referrals: "റഫറലുകൾ",
      homeCare: "വീട്ടുപരിചരണം",
      referralRate: "റഫറൽ നിരക്ക്",
      dailyChart: "പ്രതിദിന പരിശോധനാ കണക്ക്",
      distributionChart: "റഫറൽ വിതരണം",
      alertsTitle: "അലേർട്ടുകളും പാറ്റേണുകളും"
    },
    translator: {
      title: "മെഡിക്കൽ ട്രാൻസ്ലേറ്റർ",
      description: "രോഗികളുമായി ആശയവിനിമയം നടത്താൻ സഹായിക്കുന്നതിന് പ്രാദേശിക ഭാഷകൾക്കിടയിൽ വാക്യങ്ങൾ വിവർത്തനം ചെയ്യുക.",
      from: "ഇതിൽ നിന്ന് വിവർത്തനം ചെയ്യുക",
      to: "ഇതിലേക്ക് വിവർത്തനം ചെയ്യുക",
      speakHint: "സംസാരിക്കാൻ മൈക്ക് ക്ലിಕ್ ചെയ്യുക",
      translating: "വിവർത്തനം ചെയ്യുന്നു...",
      translatedAlt: "വിവർത്തനം ചെയ്ത വാചകം"
    }
  }
};
