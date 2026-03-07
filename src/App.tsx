import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Home,
  MessageSquare,
  Camera,
  MapPin,
  History,
  BarChart3,
  Wifi,
  WifiOff,
  ChevronLeft,
  Menu,
  X,
  Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Patient, TriageRecord, Hospital } from './types';
import { TRANSLATIONS } from './constants';
import { cn } from './utils';
import { getTriageAssessment, analyzeSymptomPhoto } from './services/geminiService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// --- Context ---
interface AppContextType {
  language: Language;
  setLanguage: (l: Language) => void;
  isOnline: boolean;
  currentPage: string;
  setCurrentPage: (p: string) => void;
  triageHistory: TriageRecord[];
  addTriageRecord: (r: TriageRecord) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

// --- Components ---

const Button = ({
  children,
  className,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'outline' }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-emerald-600 text-white hover:bg-emerald-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  return (
    <button
      className={cn(
        'px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-lg',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('bg-white rounded-2xl shadow-sm border border-slate-100 p-6', className)}>
    {children}
  </div>
);

const Navbar = () => {
  const { language, setLanguage, isOnline, setCurrentPage } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <div className="bg-blue-600 p-2 rounded-lg">
          <Stethoscope className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-slate-800 text-lg hidden sm:block">ASHA AI</span>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={Language.ENGLISH}>English</option>
          <option value={Language.HINDI}>हिन्दी</option>
          <option value={Language.KANNADA}>ಕನ್ನಡ</option>
        </select>

        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold",
          isOnline ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        )}>
          {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          <span className="hidden xs:block">{isOnline ? "Online" : "Offline"}</span>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-2"
          >
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'triage', label: 'Start Triage', icon: MessageSquare },
              { id: 'photo', label: 'Photo Analysis', icon: Camera },
              { id: 'locator', label: 'Hospital Locator', icon: MapPin },
              { id: 'history', label: 'Patient History', icon: History },
              { id: 'dashboard', label: 'Supervisor Dashboard', icon: BarChart3 },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setIsMenuOpen(false); }}
                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl text-slate-700 font-medium"
              >
                <item.icon className="w-5 h-5 text-blue-600" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const HomePage = () => {
  const { setCurrentPage, language } = useAppContext();
  const t = TRANSLATIONS[language];

  return (
    <div className="flex flex-col gap-8 p-4 max-w-2xl mx-auto">
      <header className="text-center space-y-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-slate-900 leading-tight"
        >
          {t.home.title}
        </motion.h1>
        <p className="text-slate-600 text-lg">
          {t.home.description}
        </p>
        <Button onClick={() => setCurrentPage('triage')} className="w-full sm:w-auto">
          {t.home.startBtn}
        </Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: MessageSquare, title: t.home.features.triage, color: 'bg-blue-50 text-blue-600' },
          { icon: Stethoscope, title: t.home.features.redFlag, color: 'bg-red-50 text-red-600' },
          // { icon: Camera, title: t.home.features.photo, color: 'bg-emerald-50 text-emerald-600' },
          { icon: MapPin, title: t.home.features.locator, color: 'bg-orange-50 text-orange-600' },
          { icon: History, title: t.home.features.history, color: 'bg-purple-50 text-purple-600' },
          // { icon: Wifi, title: t.home.features.offline, color: 'bg-slate-50 text-slate-600' },
        ].map((feature, i) => (
          <Card key={i} className="flex items-center gap-4 p-4">
            <div className={cn("p-3 rounded-xl", feature.color)}>
              <feature.icon className="w-6 h-6" />
            </div>
            <span className="font-semibold text-slate-700">{feature.title}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

const TriageChatPage = () => {
  const { language, addTriageRecord, setCurrentPage } = useAppContext();
  const t = TRANSLATIONS[language];

  const [step, setStep] = useState<'info' | 'chat'>('info');
  const [patient, setPatient] = useState<Patient>({
    id: '',
    age: 0,
    gender: 'Male',
    language: language
  });

  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: "What symptoms does the patient have?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleStartChat = () => {
    if (patient.id && patient.age > 0) {
      setStep('chat');
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const assessment = await getTriageAssessment(userMsg, patient.age, patient.gender, language);
      setResult(assessment);

      const botMsg = assessment.explanation;
      setMessages(prev => [...prev, { role: 'bot', text: botMsg }]);

      // Save to history
      addTriageRecord({
        id: Math.random().toString(36).substr(2, 9),
        patientId: patient.id,
        date: new Date().toISOString(),
        symptoms: [userMsg],
        category: assessment.category,
        notes: assessment.explanation,
        isRedFlag: assessment.isRedFlag
      });

    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'info') {
    return (
      <div className="p-4 max-w-xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Patient Information</h2>
        <Card className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">{t.triage.patientId}</label>
            <input
              type="text"
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. P12345"
              value={patient.id}
              onChange={(e) => setPatient({ ...patient, id: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">{t.triage.age}</label>
              <input
                type="number"
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={patient.age || ''}
                onChange={(e) => setPatient({ ...patient, age: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">{t.triage.gender}</label>
              <select
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={patient.gender}
                onChange={(e) => setPatient({ ...patient, gender: e.target.value as any })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <Button onClick={handleStartChat} className="w-full" disabled={!patient.id || patient.age <= 0}>
            {t.triage.startChat}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
      {result?.isRedFlag && (
        <div className="bg-red-600 text-white p-4 text-center font-bold animate-pulse">
          {t.triage.redFlagWarning}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "max-w-[85%] p-4 rounded-2xl text-lg",
            msg.role === 'bot'
              ? "bg-white text-slate-800 self-start border border-slate-200 rounded-tl-none"
              : "bg-blue-600 text-white self-end ml-auto rounded-tr-none"
          )}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="bg-white text-slate-400 p-4 rounded-2xl self-start border border-slate-200 animate-pulse italic">
            {t.common.loading}
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t.triage.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage} className="px-4" disabled={loading}>
          Send
        </Button>
      </div>

      {result && (
        <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-4 h-4 rounded-full",
              result.category === 'RED' ? 'bg-red-500' : result.category === 'YELLOW' ? 'bg-yellow-500' : 'bg-emerald-500'
            )} />
            <span className="font-bold text-slate-700">{result.category}</span>
          </div>
          <Button variant="outline" onClick={() => setCurrentPage('home')}>Finish</Button>
        </div>
      )}
    </div>
  );
};

const PhotoAnalysisPage = () => {
  const { language } = useAppContext();
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const res = await analyzeSymptomPhoto(image, language);
      setAnalysis(res || "No analysis available.");
    } catch (error) {
      setAnalysis("Error analyzing photo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Photo Symptom Analysis</h2>
      <Card className="space-y-4">
        <div
          className="border-2 border-dashed border-slate-200 rounded-2xl h-64 flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors relative overflow-hidden"
          onClick={() => document.getElementById('photo-input')?.click()}
        >
          {image ? (
            <img src={image} className="w-full h-full object-cover" alt="Preview" />
          ) : (
            <>
              <Camera className="w-12 h-12 text-slate-400 mb-2" />
              <p className="text-slate-500 font-medium">Click to upload or take photo</p>
            </>
          )}
          <input id="photo-input" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        <Button onClick={handleAnalyze} className="w-full" disabled={!image || loading}>
          {loading ? "Analyzing..." : "Analyze Photo"}
        </Button>

        {analysis && (
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-900">
            <h3 className="font-bold mb-2">AI Assessment:</h3>
            <p className="text-lg leading-relaxed">{analysis}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

const HospitalLocatorPage = () => {
  const hospitals: Hospital[] = [
    { id: '1', name: 'Village PHC', type: 'PHC', distance: '1.2 km', phone: '011-1234567', is24h: true, lat: 0, lng: 0 },
    { id: '2', name: 'District Govt Hospital', type: 'Government Hospital', distance: '12.5 km', phone: '011-7654321', is24h: true, lat: 0, lng: 0 },
    { id: '3', name: 'City Medical Center', type: 'District Hospital', distance: '25.0 km', phone: '011-9998887', is24h: true, lat: 0, lng: 0 },
  ];

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Nearest Facilities</h2>
      <div className="space-y-4">
        {hospitals.map(h => (
          <Card key={h.id} className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{h.name}</h3>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{h.type}</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">{h.distance}</p>
                {h.is24h && <span className="text-xs text-emerald-600 font-bold">24/7 Available</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 py-2 text-sm" onClick={() => window.open(`tel:${h.phone}`)}>
                Call {h.phone}
              </Button>
              <Button className="flex-1 py-2 text-sm">Directions</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const HistoryPage = () => {
  const { triageHistory } = useAppContext();
  const [search, setSearch] = useState('');

  const filtered = triageHistory.filter(h => h.patientId.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Patient History</h2>
      <input
        type="text"
        placeholder="Search by Patient ID..."
        className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-4">
        {filtered.length > 0 ? filtered.map(h => (
          <Card key={h.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">{h.patientId}</span>
              <span className="text-sm text-slate-500">{new Date(h.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                h.category === 'RED' ? 'bg-red-500' : h.category === 'YELLOW' ? 'bg-yellow-500' : 'bg-emerald-500'
              )} />
              <span className="font-medium text-slate-700">{h.category}</span>
            </div>
            <p className="text-sm text-slate-600 line-clamp-2">{h.notes}</p>
          </Card>
        )) : (
          <p className="text-center text-slate-500 py-12">No records found.</p>
        )}
      </div>
    </div>
  );
};

const SupervisorDashboard = () => {
  const data = [
    { name: 'Mon', triages: 12, referrals: 2 },
    { name: 'Tue', triages: 18, referrals: 5 },
    { name: 'Wed', triages: 15, referrals: 3 },
    { name: 'Thu', triages: 22, referrals: 8 },
    { name: 'Fri', triages: 20, referrals: 4 },
    { name: 'Sat', triages: 10, referrals: 1 },
    { name: 'Sun', triages: 8, referrals: 2 },
  ];

  const pieData = [
    { name: 'Home Care', value: 65, color: '#10b981' },
    { name: 'PHC Visit', value: 25, color: '#f59e0b' },
    { name: 'Hospital Referral', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Supervisor Dashboard</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Triages', value: '105', color: 'text-blue-600' },
          { label: 'Referrals', value: '25', color: 'text-red-600' },
          { label: 'Home Care', value: '80', color: 'text-emerald-600' },
          { label: 'Referral Rate', value: '23.8%', color: 'text-orange-600' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className={cn("text-2xl font-black mt-1", stat.color)}>{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-80">
          <h3 className="font-bold text-slate-800 mb-4">Daily Triage Count</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="triages" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="referrals" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="h-80">
          <h3 className="font-bold text-slate-800 mb-4">Referral Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 text-xs font-bold">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="space-y-4">
        <h3 className="font-bold text-slate-800">Alerts & Patterns</h3>
        <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-3">
          <div className="bg-orange-500 p-2 rounded-lg h-fit">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-orange-900">Unusual Pattern Detected</p>
            <p className="text-orange-800 text-sm">ASHA Worker #42 has a 45% referral rate this week, which is 2x higher than the regional average.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentPage, setCurrentPage] = useState('home');
  const [triageHistory, setTriageHistory] = useState<TriageRecord[]>([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addTriageRecord = (record: TriageRecord) => {
    setTriageHistory(prev => [record, ...prev]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'triage': return <TriageChatPage />;
      case 'photo': return <PhotoAnalysisPage />;
      case 'locator': return <HospitalLocatorPage />;
      case 'history': return <HistoryPage />;
      case 'dashboard': return <SupervisorDashboard />;
      default: return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      isOnline,
      currentPage,
      setCurrentPage,
      triageHistory,
      addTriageRecord
    }}>
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navbar />
        <main className="pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {!isOnline && (
          <div className="fixed bottom-0 left-0 w-full bg-slate-800 text-white p-2 text-center text-xs font-bold z-50">
            Offline Mode Active – Core triage still working
          </div>
        )}

        {/* Bottom Navigation for Mobile */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex justify-around p-2 sm:hidden z-40">
          {[
            { id: 'home', icon: Home },
            { id: 'triage', icon: MessageSquare },
            { id: 'photo', icon: Camera },
            { id: 'locator', icon: MapPin },
            { id: 'history', icon: History },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                "p-3 rounded-xl transition-colors",
                currentPage === item.id ? "bg-blue-50 text-blue-600" : "text-slate-400"
              )}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>
    </AppContext.Provider>
  );
}
