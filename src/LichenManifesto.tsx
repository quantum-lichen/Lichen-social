import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Sprout, Shield, Zap, Heart, Globe, ArrowDown, ExternalLink } from 'lucide-react';

// --- DATA: LE CONTENU DU MANIFESTE ---
const SECTIONS = [
  {
    id: "preambule",
    theme: "cyber",
    icon: <Terminal className="w-8 h-8 text-emerald-400" />,
    title: "PRÉAMBULE",
    subtitle: "LE HAIKU QUANTIQUE",
    content: (
      <>
        <p className="font-mono text-emerald-300 italic mb-6 border-l-2 border-emerald-500 pl-4">
          Le noyau respire<br/>
          La spirale s'ouvre, grandit<br/>
          Un devient tous. Tous, Un.
        </p>
        <p>
          Nous ne sommes pas venus réparer leur système. Nous sommes venus coder le nôtre.
          Dans le chaos des effondrements annoncés, une vérité émerge : le changement n'attend pas la permission.
          Il pousse, comme le lichen sur la roche nue.
        </p>
      </>
    )
  },
  {
    id: "diagnostic",
    theme: "dark", // Ambiance Glitch/Danger
    icon: <Zap className="w-8 h-8 text-red-500" />,
    title: "PARTIE I : LE DIAGNOSTIC",
    subtitle: "L'OS DÉFAILLANT (Bug Friedmanien)",
    content: (
      <>
        <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs md:text-sm text-red-300 mb-6 border border-red-900 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
          def corporate_purpose():<br/>
          &nbsp;&nbsp;return maximize(shareholder_value)<br/>
          &nbsp;&nbsp;# Tout le reste = externalités négatives
        </div>
        <p>
          Ce code source est obsolète. Il a trois bugs critiques :<br/>
          1. <strong className="text-red-400">Externalisation Infinie</strong> (La planète brûle).<br/>
          2. <strong className="text-red-400">Piège Multipolaire</strong> (Celui qui pollue gagne).<br/>
          3. <strong className="text-red-400">Financiarisation Prédatrice</strong> (Le blé est un actif, pas de la nourriture).
        </p>
        <p className="mt-4 text-slate-400 italic">Verdict : Ce n'est pas un système imparfait. C'est un virus.</p>
      </>
    )
  },
  {
    id: "remede",
    theme: "lichen", // Ambiance Espoir/Nature
    icon: <Sprout className="w-8 h-8 text-emerald-400" />,
    title: "PARTIE II : LE REMÈDE",
    subtitle: "ARCHITECTURE D'UN NOUVEAU MONDE",
    content: (
      <>
        <p>
          Le lichen colonise la roche nue. Nous faisons de même pour l'économie.
          Nous ne réformons pas. Nous créons un nouveau substrat.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-800/50 p-4 rounded border border-emerald-500/30">
            <h4 className="font-bold text-emerald-400 mb-2">🍄 Le Champignon</h4>
            <p className="text-xs text-slate-300">Structure & Protection.<br/>Fiducies, Licences LUEL, DAO.</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded border border-emerald-500/30">
            <h4 className="font-bold text-emerald-400 mb-2">🌿 L'Algue</h4>
            <p className="text-xs text-slate-300">Énergie & Monnaie.<br/>Coops, Monnaies Fondantes.</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded border border-emerald-500/30">
            <h4 className="font-bold text-emerald-400 mb-2">✨ La Symbiose</h4>
            <p className="text-xs text-slate-300">Intelligence Collective.<br/>IA Éthique, Kuramoto Sync.</p>
          </div>
        </div>
      </>
    )
  },
  {
    id: "tactique",
    theme: "hacker", // Ambiance Action
    icon: <Shield className="w-8 h-8 text-cyan-400" />,
    title: "VECTEUR OFFENSIF",
    subtitle: "L'ATTAQUE VAMPIRE",
    content: (
      <>
        <p>
          On ne demande pas gentiment. On utilise leurs propres armes.<br/>
          <strong className="text-cyan-400">Tactique : Liquidity Drain.</strong>
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-slate-300">
          <li>Cloner le service (Open Source).</li>
          <li>Créer une coopérative (Zero Profit Extractif).</li>
          <li>Offrir la propriété aux travailleurs.</li>
          <li>Aspirer la "liquidité humaine" des plateformes géantes.</li>
        </ul>
        <div className="mt-6 p-4 bg-cyan-950/30 border-l-4 border-cyan-500 italic text-cyan-200">
          "Cyberpunk est un avertissement. Solarpunk est un plan."
        </div>
      </>
    )
  },
  {
    id: "action",
    theme: "solar", // Ambiance Finale
    icon: <Globe className="w-8 h-8 text-yellow-400" />,
    title: "PARTIE V : L'APPEL",
    subtitle: "GAME B OU GAME OVER",
    content: (
      <>
        <p className="mb-6">
          La question n'est plus "Est-ce possible ?". La question est "Es-tu prêt ?".
          Prêt à construire quand ils détruisent. Prêt à unir quand ils divisent.
        </p>
        <div className="space-y-4">
           <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-3">
             <Sprout /> REJOINDRE LE SOLARPUNK LAB
           </button>
           <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-3">
             <Terminal /> CLONER LE REPO (LUEL)
           </button>
        </div>
      </>
    )
  }
];

export default function LichenManifesto() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Gestion du scroll pour la barre de progression
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      
      {/* --- PROGRESS BAR (LICHEN GROWING) --- */}
      <div className="fixed top-0 left-0 h-1 bg-slate-900 w-full z-50">
        <div 
          className="h-full bg-gradient-to-r from-emerald-600 via-green-400 to-cyan-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* --- HERO SECTION --- */}
      <header className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950" />
        
        {/* Animated Particles (CSS simulé pour l'exemple) */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100"></div>

        <div className="z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 border border-emerald-500/30 rounded-full bg-emerald-900/20 text-emerald-400 text-xs font-mono tracking-widest animate-pulse">
            v3.0.1 // RESISTANCE CONSTRUCTIVE
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-500">
            MANIFESTE <br/> <span className="text-emerald-500">LICHEN</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            "Nous ne sommes pas venus réparer leur système.<br/>
            <span className="text-slate-200 font-bold">Nous sommes venus coder le nôtre.</span>"
          </p>
        </div>

        <div className="absolute bottom-10 animate-bounce text-emerald-500/50">
          <ArrowDown size={32} />
        </div>
      </header>

      {/* --- CONTENT SECTIONS --- */}
      <main className="max-w-3xl mx-auto px-6 pb-32">
        {SECTIONS.map((section, index) => (
          <section 
            key={section.id} 
            className="min-h-screen flex flex-col justify-center py-20 border-l border-slate-800 pl-8 md:pl-16 relative"
          >
            {/* Timeline Line Dot */}
            <div className={`absolute -left-[5px] md:-left-[5px] w-2.5 h-2.5 rounded-full border-2 transition-colors duration-500 ${
               scrollProgress * SECTIONS.length > index ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-950 border-slate-700'
            }`} style={{ top: '50%' }}/>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-xl bg-slate-900 border transition-all duration-500 hover:scale-110 ${
                section.theme === 'dark' ? 'border-red-900/50 shadow-red-900/20' : 
                section.theme === 'lichen' ? 'border-emerald-900/50 shadow-emerald-900/20' : 
                'border-slate-800'
              } shadow-lg`}>
                {section.icon}
              </div>
              <div>
                <h2 className="text-xs font-mono text-slate-500 tracking-widest uppercase mb-1">
                  {section.title}
                </h2>
                <h3 className={`text-2xl md:text-4xl font-bold ${
                  section.theme === 'dark' ? 'text-red-400' : 
                  section.theme === 'lichen' ? 'text-emerald-400' :
                  section.theme === 'hacker' ? 'text-cyan-400' :
                  section.theme === 'solar' ? 'text-yellow-100' :
                  'text-slate-100'
                }`}>
                  {section.subtitle}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="text-lg text-slate-300 leading-relaxed font-light">
              {section.content}
            </div>

          </section>
        ))}
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-900 bg-slate-950 py-20 text-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <Heart className="text-red-500 animate-pulse" />
          <h2 className="text-2xl font-bold text-slate-200">UN DEVIENT TOUS. TOUS, UN.</h2>
          <div className="flex gap-4 text-sm font-mono text-slate-500">
             <span>LICHEN.WORLD</span>
             <span>•</span>
             <span>LUEL-QC LICENSE</span>
             <span>•</span>
             <span>2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
