import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const translations = {
  es: {
    headerBadge: "Plataforma Vecinal",
    heroTitle1: "Exigimos",
    heroTitle2: "Soluciones.",
    heroTitle3: "No excusas.",
    heroDesc: "Tarragona Neta es una plataforma ciudadana creada para denunciar la suciedad urbana, la acumulación incontrolada de residuos y la insalubridad en nuestras calles.",
    heroBtn1: "Firmar Manifiesto",
    heroBtn2: "Ver Acciones",
    contextTitle1: "Nuestros barrios",
    contextTitle2: "no son un vertedero.",
    contextDesc: "La plataforma surge de la indignación vecinal ante el deterioro progresivo de los espacios públicos. La acumulación de basura y la falta de mantenimiento no solo destrozan la imagen de Tarragona, sino que generan graves riesgos de salud pública.",
    gallery1: "Contenedores Desbordados",
    gallery1Sub: "Torreforta, 12 Octubre",
    gallery2: "Mobiliario Destruido",
    gallery2Sub: "Campclar, 15 Octubre",
    gallery3: "Abandono Total",
    gallery3Sub: "Part Alta, 18 Octubre",
    gallery4: "Incivismo Descontrolado",
    gallery4Sub: "Llevant, 22 Octubre",
    evidenceTitle: "El Problema en Imágenes",
    evidenceDesc: "Desliza para ver la realidad actual de abandono frente a la ciudad que exigimos y merecemos.",
    before: "Antes (Realidad)",
    after: "Después (Exigencia)",
    planTitle1: "Nuestro Plan",
    planTitle2: "de Acción",
    planDesc: "Actuamos en tres frentes para asegurar que la voz de los vecinos no pueda ser ignorada por el Ayuntamiento.",
    plan1Tag: "01 // DENUNCIA",
    plan1Title: "Visibilizar el abandono",
    plan1Desc: "Reunimos y documentamos de forma sistemática las quejas de los vecinos sobre el estado de la limpieza viaria. Exponemos la realidad de nuestros barrios con pruebas irrefutables.",
    plan2Tag: "02 // MOVILIZACIÓN",
    plan2Title: "Tomar las calles",
    plan2Desc: "Organizamos concentraciones, barricadas simbólicas y protestas populares. Trabajamos hombro a hombro con federaciones vecinales (FAVT). Si no nos escuchan en los despachos, nos verán en las calles.",
    plan3Tag: "03 // ACCIÓN LEGAL",
    plan3Title: "Presión institucional",
    plan3Desc: "Convertimos la indignación en expedientes. Presentamos informes técnicos con miles de firmas y actas fotográficas ante el Síndic de Greuges y otros tribunales competentes.",
    ctaTitle: "Únete a la plataforma",
    ctaDesc: "El Ayuntamiento no actuará si no le obligamos. Suma tu firma, recibe convocatorias de protesta y participa en la recuperación de tu barrio.",
    ctaInput: "TU CORREO ELECTRÓNICO",
    ctaBtn: "Unirme",
    footerRights: "Plataforma per una Tarragona Neta.",
    footerTagline: "Por una ciudad digna para sus vecinos.",
    legal: "Aviso Legal",
    contact: "Contacto",
  },
  ca: {
    headerBadge: "Plataforma Veïnal",
    heroTitle1: "Exigim",
    heroTitle2: "Solucions.",
    heroTitle3: "No excuses.",
    heroDesc: "Tarragona Neta és una plataforma ciutadana creada per denunciar la brutícia urbana, l'acumulació incontrolada de residus i la insalubritat als nostres carrers.",
    heroBtn1: "Signar Manifest",
    heroBtn2: "Veure Accions",
    contextTitle1: "Els nostres barris",
    contextTitle2: "no són un abocador.",
    contextDesc: "La plataforma sorgeix de la indignació veïnal davant el deteriorament progressiu dels espais públics. L'acumulació d'escombraries i la manca de manteniment no només destrossen la imatge de Tarragona, sinó que generen greus riscos de salut pública.",
    gallery1: "Contenidors Desbordats",
    gallery1Sub: "Torreforta, 12 Octubre",
    gallery2: "Mobiliari Destruït",
    gallery2Sub: "Campclar, 15 Octubre",
    gallery3: "Abandonament Total",
    gallery3Sub: "Part Alta, 18 Octubre",
    gallery4: "Incivisme Descontrolat",
    gallery4Sub: "Llevant, 22 Octubre",
    evidenceTitle: "El Problema en Imatges",
    evidenceDesc: "Llisca per veure la realitat actual d'abandonament davant la ciutat que exigim i mereixem.",
    before: "Abans (Realitat)",
    after: "Després (Exigència)",
    planTitle1: "El Nostre Pla",
    planTitle2: "d'Acció",
    planDesc: "Actuem en tres fronts per assegurar que la veu dels veïns no pugui ser ignorada per l'Ajuntament.",
    plan1Tag: "01 // DENÚNCIA",
    plan1Title: "Visibilitzar l'abandonament",
    plan1Desc: "Reunim i documentem de forma sistemàtica les queixes dels veïns sobre l'estat de la neteja viària. Exposem la realitat dels nostres barris amb proves irrefutables.",
    plan2Tag: "02 // MOBILITZACIÓ",
    plan2Title: "Prendre els carrers",
    plan2Desc: "Organitzem concentracions, barricades simbòliques i protestes populars. Treballem braç a braç amb federacions veïnals (FAVT). Si no ens escolten als despatxos, ens veuran als carrers.",
    plan3Tag: "03 // ACCIÓ LEGAL",
    plan3Title: "Pressió institucional",
    plan3Desc: "Convertim la indignació en expedients. Presentem informes tècnics amb milers de firmes i actes fotogràfiques davant el Síndic de Greuges i altres tribunals competents.",
    ctaTitle: "Uneix-te a la plataforma",
    ctaDesc: "L'Ajuntament no actuarà si no l'obliguem. Suma la teva firma, rep convocatòries de protesta i participa en la recuperació del teu barri.",
    ctaInput: "EL TEU CORREU ELECTRÒNIC",
    ctaBtn: "Unir-me",
    footerRights: "Plataforma per una Tarragona Neta.",
    footerTagline: "Per una ciutat digna per als seus veïns.",
    legal: "Avís Legal",
    contact: "Contacte",
  }
};

const BeforeAfterSlider = ({ beforeImg, afterImg, beforeLabel, afterLabel }: { beforeImg: string, afterImg: string, beforeLabel: string, afterLabel: string }) => {
  const [position, setPosition] = useState(50);
  return (
    <div className="relative w-full h-[500px] md:h-[600px] border-4 border-zinc-950 bg-zinc-200 overflow-hidden group select-none flex-shrink-0">
      {/* After image (base) */}
      <img src={afterImg} className="absolute inset-0 w-full h-full object-cover grayscale opacity-60" draggable={false} alt="Después" />
      <div className="absolute top-4 right-4 bg-zinc-950 text-white px-3 py-1 font-black uppercase text-sm z-0">
        {afterLabel}
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={beforeImg} className="absolute inset-0 w-full h-full object-cover" draggable={false} alt="Antes" />
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 font-black uppercase text-sm">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize mix-blend-difference z-20"
        style={{ left: `calc(${position}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-950 flex items-center justify-center rounded-none border-4 border-white pointer-events-none">
          <div className="flex gap-0 text-white">
            <ChevronLeft size={20} strokeWidth={4} />
            <ChevronRight size={20} strokeWidth={4} />
          </div>
        </div>
      </div>

      {/* Hidden Range Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<'es' | 'ca'>('ca');
  const t = translations[lang];

  const heroRef = useRef<HTMLElement>(null);
  const galleryContainerRef = useRef<HTMLElement>(null);
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis for Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // GSAP Animations
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // 1. Horizontal Scroll Gallery
    const sections = gsap.utils.toArray('.gallery-item');
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: galleryContainerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + (galleryScrollRef.current?.offsetWidth || window.innerWidth * 2),
        invalidateOnRefresh: true,
      }
    });

    // 2. Simple fade-ins for manifesto items
    const manifestoItems = gsap.utils.toArray('.manifesto-item');
    manifestoItems.forEach((item: any) => {
      gsap.fromTo(item, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });

    return () => mm.revert();
  }, { dependencies: [lang] });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* Header */}
      <header className="border-b-4 border-zinc-950 px-4 md:px-6 py-4 flex justify-between items-center uppercase font-black tracking-widest text-sm sticky top-0 bg-zinc-50 z-40 h-[68px]">
        <div className="flex items-center gap-4">
          <span className="text-lg">Tarragona Neta</span>
        </div>
        
        <div className="flex items-center gap-2">
           <span className="hidden sm:inline-block bg-red-600 text-white px-3 py-1 mr-4">{t.headerBadge}</span>
           <button 
             onClick={() => setLang('ca')} 
             className={`px-2 py-1 border-2 border-zinc-950 font-bold transition-colors ${lang === 'ca' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-200'}`}
           >
             CAT
           </button>
           <button 
             onClick={() => setLang('es')} 
             className={`px-2 py-1 border-2 border-zinc-950 font-bold transition-colors ${lang === 'es' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-200'}`}
           >
             ESP
           </button>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 min-h-[90vh] border-b-4 border-zinc-950 bg-zinc-50">
        
        {/* Left Content */}
        <div className="lg:col-span-7 px-6 py-12 md:py-16 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-zinc-950">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-[6.5vw] font-black uppercase leading-[0.85] tracking-tighter text-zinc-950">
              {t.heroTitle1} <br />
              <span className="text-red-600">{t.heroTitle2}</span><br />
              {t.heroTitle3}
            </h1>
            <p className="mt-8 md:mt-12 text-xl md:text-3xl font-medium leading-snug tracking-tight">
              {t.heroDesc}
            </p>
            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4">
               <a href="#unete" className="inline-flex items-center justify-between bg-zinc-950 text-white px-8 py-5 text-xl font-black uppercase tracking-widest hover:bg-red-600 transition-colors">
                 <span>{t.heroBtn1}</span>
                 <ArrowRight className="ml-6" size={24} />
               </a>
               <a href="#plan" className="inline-flex items-center justify-between border-4 border-zinc-950 text-zinc-950 px-8 py-5 text-xl font-black uppercase tracking-widest hover:bg-zinc-950 hover:text-white transition-colors">
                 <span>{t.heroBtn2}</span>
               </a>
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <div className="lg:col-span-5 relative bg-zinc-200 min-h-[40vh] lg:min-h-full overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1200" 
            alt="Calle descuidada"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
          />
          {/* Subtle red tint over the image to tie into the brutalist brand */}
          <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-20"></div>
        </div>
      </section>

      {/* GSAP Horizontal Scroll Gallery */}
      <section ref={galleryContainerRef} className="bg-zinc-950 border-b-4 border-zinc-950 overflow-hidden">
        <div ref={galleryScrollRef} className="flex w-[400vw] h-screen">
          
          <div className="gallery-item w-screen h-full relative border-r-4 border-zinc-950 shrink-0">
            <img src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Basura" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-12 md:bottom-24 left-6 md:left-16 right-6">
               <span className="bg-red-600 text-white px-4 py-2 text-xl font-black uppercase tracking-widest">{t.gallery1Sub}</span>
               <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mt-4">{t.gallery1}</h3>
            </div>
          </div>

          <div className="gallery-item w-screen h-full relative border-r-4 border-zinc-950 shrink-0">
            <img src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Mobiliario destruido" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-12 md:bottom-24 left-6 md:left-16 right-6">
               <span className="bg-red-600 text-white px-4 py-2 text-xl font-black uppercase tracking-widest">{t.gallery2Sub}</span>
               <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mt-4">{t.gallery2}</h3>
            </div>
          </div>

          <div className="gallery-item w-screen h-full relative border-r-4 border-zinc-950 shrink-0">
            <img src="https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Abandono total" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-12 md:bottom-24 left-6 md:left-16 right-6">
               <span className="bg-red-600 text-white px-4 py-2 text-xl font-black uppercase tracking-widest">{t.gallery3Sub}</span>
               <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mt-4">{t.gallery3}</h3>
            </div>
          </div>

          <div className="gallery-item w-screen h-full relative shrink-0">
            <img src="https://images.unsplash.com/photo-1589839958933-28f09b5ee948?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Incivismo" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-12 md:bottom-24 left-6 md:left-16 right-6">
               <span className="bg-red-600 text-white px-4 py-2 text-xl font-black uppercase tracking-widest">{t.gallery4Sub}</span>
               <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mt-4">{t.gallery4}</h3>
            </div>
          </div>

        </div>
      </section>

      {/* Context Image (Asymmetrical) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b-4 border-zinc-950 bg-zinc-950 text-zinc-50">
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8 manifesto-item">
            {t.contextTitle1}<br/>{t.contextTitle2}
          </h2>
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-300 manifesto-item">
            {t.contextDesc}
          </p>
        </div>
        <div className="min-h-[400px] border-t-4 lg:border-t-0 lg:border-l-4 border-zinc-950 bg-zinc-200 grayscale contrast-125 relative">
          <img 
            src="https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=1200" 
            alt="Basura en las calles" 
            className="w-full h-full object-cover opacity-80 mix-blend-multiply absolute inset-0"
          />
        </div>
      </section>

      {/* Evidence / Before After */}
      <section className="grid grid-cols-1 lg:grid-cols-3 border-b-4 border-zinc-950 bg-zinc-50">
        <div className="p-8 md:p-16 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-zinc-950 col-span-1">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 manifesto-item">
            {t.evidenceTitle}
          </h2>
          <p className="text-xl font-medium leading-relaxed text-zinc-700 manifesto-item">
            {t.evidenceDesc}
          </p>
        </div>
        <div className="col-span-2">
           <BeforeAfterSlider 
             beforeImg="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=1200"
             afterImg="https://images.unsplash.com/photo-1476483543940-9a2ebfdf1095?auto=format&fit=crop&q=80&w=1200"
             beforeLabel={t.before}
             afterLabel={t.after}
           />
        </div>
      </section>

      {/* Manifesto / Actions - Vertical stark list */}
      <section id="plan" className="grid md:grid-cols-12 border-b-4 border-zinc-950">
        <div className="md:col-span-5 p-6 md:p-12 lg:p-16 border-b-4 md:border-b-0 md:border-r-4 border-zinc-950 flex flex-col justify-between">
          <div className="manifesto-item">
             <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">{t.planTitle1} <br/>{t.planTitle2}</h2>
             <p className="mt-8 text-xl font-medium text-zinc-700">{t.planDesc}</p>
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col">
          {/* Item 1 */}
          <div className="p-6 md:p-12 lg:p-16 border-b-4 border-zinc-950 group hover:bg-red-600 hover:text-white transition-colors duration-300 cursor-default">
             <div className="text-red-600 group-hover:text-zinc-950 font-black text-2xl md:text-3xl tracking-widest mb-4">{t.plan1Tag}</div>
             <h3 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter">{t.plan1Title}</h3>
             <p className="text-xl md:text-2xl font-medium text-zinc-700 group-hover:text-zinc-100 max-w-xl">
               {t.plan1Desc}
             </p>
          </div>
          {/* Item 2 */}
          <div className="p-6 md:p-12 lg:p-16 border-b-4 border-zinc-950 group hover:bg-red-600 hover:text-white transition-colors duration-300 cursor-default">
             <div className="text-red-600 group-hover:text-zinc-950 font-black text-2xl md:text-3xl tracking-widest mb-4">{t.plan2Tag}</div>
             <h3 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter">{t.plan2Title}</h3>
             <p className="text-xl md:text-2xl font-medium text-zinc-700 group-hover:text-zinc-100 max-w-xl">
               {t.plan2Desc}
             </p>
          </div>
          {/* Item 3 */}
          <div className="p-6 md:p-12 lg:p-16 group hover:bg-red-600 hover:text-white transition-colors duration-300 cursor-default">
             <div className="text-red-600 group-hover:text-zinc-950 font-black text-2xl md:text-3xl tracking-widest mb-4">{t.plan3Tag}</div>
             <h3 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter">{t.plan3Title}</h3>
             <p className="text-xl md:text-2xl font-medium text-zinc-700 group-hover:text-zinc-100 max-w-xl">
               {t.plan3Desc}
             </p>
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <section id="unete" className="bg-red-600 text-white p-8 md:p-24 flex flex-col items-center text-center border-b-4 border-zinc-950">
         <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-8 manifesto-item" dangerouslySetInnerHTML={{ __html: t.ctaTitle.replace(' ', '<br/>') }}>
         </h2>
         <p className="text-2xl md:text-3xl font-medium max-w-3xl mb-12 manifesto-item">
           {t.ctaDesc}
         </p>
         
         <form className="w-full max-w-2xl flex flex-col sm:flex-row border-4 border-zinc-950 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] focus-within:translate-y-1 focus-within:translate-x-1 focus-within:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] transition-all bg-zinc-50 manifesto-item">
            <input 
              type="email" 
              placeholder={t.ctaInput} 
              className="flex-1 bg-transparent border-b-4 sm:border-b-0 sm:border-r-4 border-zinc-950 px-6 py-5 text-xl font-bold uppercase placeholder-zinc-400 text-zinc-950 focus:outline-none focus:bg-zinc-100 rounded-none"
              required
            />
            <button 
              type="submit"
              className="bg-zinc-950 text-white px-8 py-5 text-xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"
            >
              {t.ctaBtn}
            </button>
         </form>
      </section>

      {/* Footer minimal */}
      <footer className="bg-zinc-50 text-zinc-950 px-6 py-12 flex flex-col gap-8 font-bold uppercase tracking-widest text-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} {t.footerRights}</p>
            <p className="text-zinc-500 mt-2">{t.footerTagline}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a href="#" className="hover:text-red-600 transition-colors">{t.legal}</a>
            <a href="#" className="hover:text-red-600 transition-colors">{t.contact}</a>
          </div>
        </div>
        <div className="pt-8 border-t-4 border-zinc-200 text-zinc-500">
          Fet per <a href="#" target="_blank" rel="noopener noreferrer" className="text-zinc-950 hover:text-red-600 transition-colors underline underline-offset-4 decoration-2 decoration-red-600/30 hover:decoration-red-600">ElBalcoDigital</a>
        </div>
      </footer>
    </div>
  );
}

