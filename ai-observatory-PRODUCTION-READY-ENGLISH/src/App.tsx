import { useState } from "react";
import CompanyGrid from "./components/CompanyGrid";
import SuperPacButton from "./components/SuperPacButton";
import SuperPacModal from "./components/SuperPacModal";
import SupportModal from "./components/SupportModal";
import CitizenTracker from "./components/CitizenTracker";
import AIonXCCarousel from "./components/AIonXCCarousel";
import AIonXCStats from "./components/AIonXCStats";
import ActionExplainer from "./components/ActionExplainer";
import BadgeExplainer from "./components/BadgeExplainer";
import MagazinePage from "./pages/MagazinePage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import type { ActionType } from "./types";
import "./App.css";

type Page = 'home' | 'magazine' | 'admin';

function App() {
  const [selected, setSelected] = useState<{ ticker: string; action: ActionType } | null>(null);
  const [showSupport, setShowSupport] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Render pages based on navigation
  if (currentPage === 'magazine') {
    return (
      <>
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all shadow-lg"
          >
            ← Home
          </button>
        </div>
        <MagazinePage />
      </>
    );
  }

  if (currentPage === 'admin') {
    // Show login if not authenticated
    if (!isAdminAuthenticated) {
      return (
        <>
          <div className="fixed top-4 left-4 z-50">
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all shadow-lg"
            >
              ← Home
            </button>
          </div>
          <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
        </>
      );
    }
    
    // Show dashboard if authenticated
    return (
      <>
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all shadow-lg"
          >
            ← Home
          </button>
        </div>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => {
              setIsAdminAuthenticated(false);
              setCurrentPage('home');
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all shadow-lg"
          >
            Logout
          </button>
        </div>
        <AdminDashboard />
      </>
    );
  }

  // Main page (Home)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-slate-50">
      {/* Navigation Bar - Top */}
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        <button
          onClick={() => setCurrentPage('magazine')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all transform hover:scale-105 shadow-lg"
        >
          Magazine & Research
        </button>
        <button
          onClick={() => setCurrentPage('admin')}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all transform hover:scale-105 shadow-lg"
        >
          Admin
        </button>
        <button
          onClick={() => setShowSupport(true)}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Support
        </button>
      </div>

      {/* Hero Section - Star Wars Style */}
      <header 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/hero-professional-new.jpg)",
            filter: "brightness(0.7)"
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/50 to-dark-950" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
            eXtreme Concentration AI Observatory
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-slate-200 font-light tracking-wide">
            Vote with Your Capital. Shape the Future of AI.
          </p>
          <p className="text-lg md:text-xl mb-12 text-slate-300 max-w-3xl mx-auto leading-relaxed">
            The power to govern AI shouldn't rest with a few corporations. Join thousands of citizens using their capital to demand transparency, accountability, and democratic oversight of the most powerful technology in human history.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SuperPacButton />
            <a 
              href="https://citizen-observatory-ai-g8pmeqh.gamma.site/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-2xl"
            >
              Learn More
            </a>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <AIonXCStats />
      </section>

      {/* Carousel Section */}
      <section className="py-16 px-6 bg-slate-900/30">
        <AIonXCCarousel />
      </section>

      {/* Action Explainer */}
      <section className="py-16 px-6">
        <ActionExplainer />
      </section>

      {/* Main Content - Companies Grid + Citizen Tracker */}
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Companies Grid */}
          <div className="flex-1">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                AI Power Players
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Track the companies shaping our AI future. Vote with your capital.
              </p>
              <BadgeExplainer />
            </div>
            <CompanyGrid onAction={setSelected} />
          </div>

          {/* Citizen Tracker - Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-4">
              <CitizenTracker />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
      {selected && (
        <SuperPacModal
          ticker={selected.ticker}
          action={selected.action}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

export default App;
