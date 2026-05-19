import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Pause, 
  Plus, 
  ExternalLink,
  MessageCircle,
  BookOpen,
  Calendar,
  Users,
  Home,
  Info,
  MapPin,
  ClipboardList,
  Heart,
  Baby,
  GraduationCap,
  Megaphone,
  Download,
  MousePointer2,
  School,
  Gamepad2,
  PlayCircle,
  Award,
  PhoneCall,
  BookOpenText,
  ArrowUp,
  ArrowUpRight,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface NavItem {
  title: string;
  subItems: string[];
}

// --- Data ---
const NAVIGATION_DATA: NavItem[] = [
  {
    title: "센터소개",
    subItems: ["비전 및 미션", "설립목적 및 연혁", "업무전달체계", "주요사업", "CI소개", "전국센터현황", "중앙센터 소개", "보육정책"]
  },
  {
    title: "어린이집지원",
    subItems: ["어린이집운영관리", "보육교직원", "어린이집지원사업", "보육교직원상담", "어린이집자료실"]
  },
  {
    title: "가정양육지원",
    subItems: ["공통 부모교육", "부모상담", "영유아 발달지원", "양육서비스", "어린이집 이용정보", "부모교육 콘텐츠 정보", "시간제보육"]
  },
  {
    title: "센터지원",
    subItems: ["센터운영지원", "직원역량강화교육", "센터평가"]
  },
  {
    title: "나눔정보",
    subItems: ["공지사항", "보육뉴스", "자료실", "행사/교육", "인력뱅크", "관련사이트", "설문조사"]
  },
  {
    title: "e-고객센터",
    subItems: ["이용안내"]
  }
];

const NEWS_CATEGORIES = ["공지사항", "센터교육", "보육뉴스", "구인정보", "나들이정보"];
const NEWS_ITEMS: Record<string, { title: string, sub?: string, date: string }[]> = {
  "공지사항": [
    { title: "2026년 상반기 부모교육 일정 안내", date: "2024.05.15" },
    { title: "화성시육아종합지원센터 대체교사 채용 공고", date: "2024.05.10" },
    { title: "5월 가정의 달 기념 행사 안내", date: "2024.05.01" }
  ],
  "센터교육": [
    { title: "보육교직원 디지털 역량 강화 교육 신청 안내", date: "2024.05.20" },
    { title: "어린이집 원장 리더십 컨퍼런스", date: "2024.05.15" }
  ],
  "보육뉴스": [
    { title: "화성시, 영유아 체험 프로그램 확대 운영", date: "2024.05.12" },
    { title: "2026년 보육 정책 변화 핵심 요약", date: "2024.05.05" }
  ],
  "구인정보": [
    { title: "화성시 관내 어린이집 조리원 긴급 채용", date: "2024.05.18" },
    { title: "향남읍 소재 어린이집 보조교사 모집", date: "2024.05.14" }
  ],
  "나들이정보": [
    { title: "[경기-화성] 제14회 화성 뱃놀이 축제 안내 (전곡항)", sub: "화성시 대표 축제인 뱃놀이 축제에 여러분을 초대합니다.", date: "2026.05.10" },
    { title: "[경기-화성] 우리꽃식물원 '봄 향기 가득' 기획전시", sub: "다양한 자생 식물과 꽃들을 만나보실 수 있습니다.", date: "2026.05.08" },
    { title: "[경기-화성] 동탄호수공원 루나쇼(Luna Show) 일정 안내", sub: "화려한 분수와 조명이 어우러지는 루나쇼 일정을 확인하세요.", date: "2026.05.02" }
  ]
};

const ARCHIVE_DATA = [
  { title: "2026년 보육사업 안내 지침", category: "발간자료", img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400&auto=format&fit=crop" },
  { title: "영유아 발달 체크리스트", category: "연구보고서", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop" },
  { title: "어린이집 운영위원회 메뉴얼", category: "발간자료", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&auto=format&fit=crop" },
  { title: "부모교육 온라인 가이드북", category: "교육자료", img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop" }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full bg-brand-orange z-50 border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <button onClick={scrollToTop} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-orange font-extrabold text-xl group-hover:scale-110 transition-transform">
            H
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">화성시육아종합지원센터</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4 flex-nowrap">
          {NAVIGATION_DATA.map((item, idx) => (
            <div 
              key={idx} 
              className="relative py-7 cursor-pointer shrink-0"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                const sectionId = 
                  item.title === "센터소개" ? "footer" : 
                  item.title === "어린이집지원" ? "services" : 
                  item.title === "가정양육지원" ? "services" : 
                  item.title === "센터지원" ? "services" : 
                  item.title === "나눔정보" ? "news" : 
                  "footer";
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="text-[18px] font-black text-white hover:text-amber-200 transition-colors tracking-tight whitespace-nowrap">
                {item.title}
              </span>
              {hoveredIndex === idx && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-100 shadow-xl rounded-b-lg p-4"
                >
                  <ul className="space-y-1">
                    {item.subItems.map((sub, sIdx) => (
                      <li key={sIdx} className="text-sm text-gray-500 hover:text-brand-orange hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors truncate font-semibold">
                        {sub}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          ))}
          <div className="flex items-center gap-4 ml-4">
            <button className="text-sm text-white/80 hover:text-white font-bold transition-colors">로그인</button>
            <button className="text-sm text-white/80 hover:text-white font-bold transition-colors">회원가입</button>
            <div className="w-px h-4 bg-white/20"></div>
            <Search className="w-5 h-5 text-white/60 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button className="lg:hidden text-white transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 h-full w-[50%] min-w-[240px] bg-white z-[70] shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-extrabold">H</div>
                  <span className="font-extrabold text-gray-900">전체메뉴</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                {NAVIGATION_DATA.map((item, idx) => (
                  <div key={idx} className="border-b border-gray-50 pb-6 last:border-0">
                    <div className="font-black text-lg text-gray-900 mb-4 flex items-center justify-between">
                      {item.title}
                      <Plus size={16} className="text-emerald-600" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {item.subItems.map((sub, sIdx) => (
                        <div key={sIdx} className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">
                          {sub}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4">
                <button className="flex-1 py-3 bg-gray-50 rounded-xl text-sm font-black text-gray-900">로그인</button>
                <button className="flex-1 py-3 bg-emerald-700 rounded-xl text-sm font-black text-white">회원가입</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const HERO_BACKGROUNDS = [
    "/src/assets/images/hero_childcare_korea_1779197285054.png",
    "https://mydrim.net/img/childcare_main.png"
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative pt-20 overflow-hidden">
      <div className="relative h-[600px] bg-slate-900 flex items-center">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={bgIndex}
              src={HERO_BACKGROUNDS[bgIndex]} 
              alt={`Hero background ${bgIndex + 1}`} 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 flex justify-between items-center">
          <div className="max-w-2xl">
            <div className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-[1.4] flex flex-col gap-2 overflow-hidden">
              {["함께 키우고", "함께 웃는", "행복한 화성시 육아"].map((text, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -50, scale: 2 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    x: [-50, 0, 0, 20],
                    scale: [2, 1, 1, 0.9],
                  }}
                  transition={{
                    duration: 4,
                    times: [0, 0.15, 0.85, 1],
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="block origin-left whitespace-nowrap"
                >
                  {text}
                </motion.span>
              ))}
            </div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-200 mb-10 leading-relaxed"
            >
              아이와 부모, 보육교직원 <br />
              모두가 행복한 <br />
              지역사회 보육환경을 조성합니다.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="px-8 py-3 bg-brand-orange text-white rounded-full font-semibold flex items-center gap-2 hover:bg-brand-yellow hover:text-gray-900 transition-all border border-white/30 shadow-lg"
            >
              센터 사업 안내 <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Right Floating Widgets */}
          <div className="hidden xl:flex flex-col gap-4 w-[480px] -ml-20">
            {[
              { title: "2026년 보육정책 안내", sub: "새로운 보육 정책을 확인하세요" },
              { title: "부모상담 신청", sub: "전문가와 온라인으로 상담하세요" },
              { title: "어린이집 지원사업", sub: "보육 품질 향상을 위한 지원" }
            ].map((widget, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * i }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all cursor-pointer group"
              >
                <h3 className="text-white text-2xl font-black mb-2 group-hover:text-amber-200 transition-colors uppercase tracking-tight">{widget.title}</h3>
                <p className="text-gray-100 text-lg opacity-90 leading-relaxed">{widget.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar Controls */}
      <div className="absolute bottom-10 right-10 flex gap-2">
         <div className="bg-black/40 backdrop-blur px-4 py-2 rounded-full flex items-center text-white text-sm gap-4">
            <div className="flex gap-2">
              <ChevronLeft 
                className="w-4 h-4 cursor-pointer hover:text-brand-orange transition-colors" 
                onClick={() => setBgIndex(prev => (prev - 1 + HERO_BACKGROUNDS.length) % HERO_BACKGROUNDS.length)}
              />
              <span>{bgIndex + 1} / {HERO_BACKGROUNDS.length}</span>
              <ChevronRight 
                className="w-4 h-4 cursor-pointer hover:text-brand-orange transition-colors"
                onClick={() => setBgIndex(prev => (prev + 1) % HERO_BACKGROUNDS.length)}
              />
            </div>
            <Pause className="w-4 h-4 cursor-pointer" />
         </div>
      </div>
    </div>
  );
};

const QuickMenu = () => {
  const menus = [
    { icon: <MousePointer2 size={28} />, label: "육아종합지원센터", color: "text-red-500" },
    { icon: <School size={28} />, label: "어린이집 이용", color: "text-green-600" },
    { icon: <Gamepad2 size={28} />, label: "영유아체험 프로그램", color: "text-blue-600" },
    { icon: <PlayCircle size={28} />, label: "보육컨설팅 홍보영상", color: "text-purple-600" },
    { icon: <Award size={28} />, label: "어린이집 입소순위", color: "text-emerald-600" },
    { icon: <PhoneCall size={28} />, label: "보육교직원 상담실", color: "text-pink-600" },
    { icon: <Heart size={28} />, label: "가정양육 지원사업", color: "text-orange-600" },
    { icon: <BookOpenText size={28} />, label: "전자책[e-book]", color: "text-sky-600" }
  ];

  return (
    <div id="services" className="relative z-20 -mt-12 mb-12 px-4">
      <div className="max-w-7xl mx-auto bg-brand-yellow rounded-3xl shadow-xl shadow-yellow-950/10 p-6 md:p-8 border border-white/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {menus.map((m, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4 p-5 rounded-3xl hover:bg-white/20 transition-all cursor-pointer group">
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center shrink-0 bg-white shadow-md ${m.color} transition-all duration-700 group-hover:scale-110 group-hover:shadow-lg`}>
                <div className="scale-[1.2] md:scale-[1.4] group-hover:scale-[1.6] group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out">
                  {m.icon}
                </div>
              </div>
              <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-[10px] md:text-[11px] font-black text-white/50 uppercase tracking-tighter mb-1">SERVICE</span>
                <span className="text-[18px] md:text-[22px] font-black text-white group-hover:text-[#064e3b] transition-colors leading-tight break-keep group-hover:scale-125 origin-center inline-block transition-all">
                  {m.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NewsSection = () => {
  const [activeCategory, setActiveCategory] = useState("나들이정보");
  const [isAutoRolling, setIsAutoRolling] = useState(true);

  useEffect(() => {
    if (!isAutoRolling) return;
    
    const interval = setInterval(() => {
      setActiveCategory((prev) => {
        const currentIndex = NEWS_CATEGORIES.indexOf(prev);
        const nextIndex = (currentIndex + 1) % NEWS_CATEGORIES.length;
        return NEWS_CATEGORIES[nextIndex];
      });
    }, 3000); // Change category every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoRolling]);

  return (
    <div 
      id="news" 
      className="relative py-32 px-4 overflow-hidden bg-[url('https://mydrim.net/img/singlemom_main.png')] bg-fixed bg-cover bg-center"
      onMouseEnter={() => setIsAutoRolling(false)}
      onMouseLeave={() => setIsAutoRolling(true)}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/5"></div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-orange-200/10 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 p-1.5 bg-[#064e3b] rounded-none border border-emerald-800/40 w-full lg:w-fit order-2 lg:order-1 shadow-2xl">
            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setIsAutoRolling(false); // Stop auto rolling when manually clicked
                }}
                className={`relative px-6 py-3 rounded-none text-base font-black transition-all duration-300
                  ${activeCategory === cat 
                    ? "text-[#064e3b]" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
              >
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-none shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          <div className="max-w-xl text-center lg:text-right order-1 lg:order-2 lg:ml-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest leading-none">Latest Updates</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#064e3b] mb-4 tracking-tight leading-tight">
              알림<span className="text-emerald-600">.</span>소식
            </h2>
            <p className="text-slate-800 text-sm md:text-base font-medium leading-relaxed">
              화성시육아종합지원센터에서 전해드리는 <br />
              최신 보육 정책과 교육 정보들을 확인하세요
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {(NEWS_ITEMS[activeCategory] || []).length > 0 ? (
              (NEWS_ITEMS[activeCategory] || []).slice(0, 3).map((item, i) => (
                <motion.div 
                  key={`${activeCategory}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.1,
                    ease: [0.21, 0.45, 0.32, 0.9]
                  }}
                  whileHover={{ y: -12 }}
                  className="group relative bg-[#fefce8] p-8 rounded-[2.5rem] shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] border border-yellow-200/50 flex flex-col justify-between cursor-pointer hover:shadow-[0_20px_40px_-12px_rgba(249,115,22,0.12)] hover:border-orange-200 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-brand-orange shadow-sm rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-0.5 w-8 bg-brand-orange/20 rounded-full"></div>
                      <span className="px-3 py-1 bg-white/80 text-slate-600 text-[11px] font-black rounded-lg uppercase tracking-wider group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                        {activeCategory}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-800 mb-5 group-hover:text-[#0a192f] transition-colors duration-300 leading-[1.4] tracking-tight line-clamp-2">
                      {item.title}
                    </h3>
                    
                    {item.sub && item.sub !== item.title && (
                      <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 mb-4">
                        {item.sub}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto pt-8 border-t border-yellow-200/50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center group-hover:bg-white transition-colors">
                        <User className="w-4 h-4 text-slate-400 group-hover:text-brand-orange" />
                      </div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">센터 관리자</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-full text-[12px] font-bold text-slate-400 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-24 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-400">등록된 소식이 없습니다.</h4>
                <p className="text-slate-300 mt-2">새로운 소식이 업로드되면 알려드릴게요!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex justify-center">
          <button className="group flex items-center gap-3 px-8 py-4 bg-slate-900 border-2 border-slate-900 text-white rounded-2xl font-black hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 shadow-xl shadow-slate-200">
            소식 전체보기
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MidBanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-48 rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-emerald-900/5 bg-[#ecfdf5] border border-emerald-100">
          <div className="absolute inset-0 flex items-center p-10">
            <div className="relative z-10 transition-transform group-hover:translate-x-2">
              <h3 className="text-2xl font-bold mb-2 text-emerald-900 transition-all duration-300 group-hover:text-brand-orange group-hover:text-3xl origin-left">어린이집 지원 안내</h3>
              <p className="text-emerald-700/80 mb-4 text-sm md:text-base font-medium">어린이집 운영 및 컨설팅 지원에 대해 알아보세요</p>
              <button className="px-6 py-2 bg-emerald-600 hover:bg-brand-orange text-white rounded-full text-sm font-bold transition-all shadow-md shadow-emerald-100">자세히 보기</button>
            </div>
            <div className="absolute right-0 bottom-0 text-emerald-600 opacity-10 group-hover:opacity-30 transition-all duration-500 pointer-events-none group-hover:text-brand-orange group-hover:scale-125">
               <School size={160} />
            </div>
          </div>
        </div>
        <div className="relative h-48 rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-emerald-900/5 bg-[#f0fdf4] border border-emerald-100">
          <div className="absolute inset-0 flex items-center p-10">
            <div className="relative z-10 transition-transform group-hover:translate-x-2">
              <h3 className="text-2xl font-bold mb-2 text-emerald-900 transition-all duration-300 group-hover:text-brand-orange group-hover:text-3xl origin-left">가정양육 서비스</h3>
              <p className="text-emerald-700/80 mb-4 font-medium text-sm md:text-base">장난감 대여 및 부모교육 서비스</p>
              <button className="px-6 py-2 bg-emerald-600 hover:bg-brand-orange text-white rounded-full text-sm font-bold transition-all shadow-md shadow-emerald-100">자세히 보기</button>
            </div>
            <div className="absolute right-0 bottom-0 text-emerald-600 opacity-10 group-hover:opacity-30 transition-all duration-500 pointer-events-none group-hover:text-brand-orange group-hover:scale-125">
               <Baby size={160} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArchiveSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">자료실</h2>
            <p className="text-gray-500">각종 지침서와 연구 보고서를 열람하실 수 있습니다.</p>
          </div>
          <div className="flex bg-slate-50 rounded-full p-1 border border-slate-100 w-fit overflow-x-auto no-scrollbar">
              <button className="px-5 py-2 rounded-full text-sm font-black bg-gray-800 text-white shadow-sm whitespace-nowrap">전체</button>
              <button className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-100 whitespace-nowrap">발간자료</button>
              <button className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-100 whitespace-nowrap">연구보고서</button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {ARCHIVE_DATA.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100 shadow-md transform group-hover:translate-y-[-8px] transition-all duration-300 border border-gray-100">
                <img src={item.img} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <Download className="text-white w-10 h-10" />
                </div>
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{item.category}</span>
              <h3 className="font-bold text-gray-800 group-hover:text-brand-orange transition-colors line-clamp-2">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#0a192f] text-white py-16 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-md">
            <button onClick={scrollToTop} className="flex items-center gap-2 mb-6 group text-left">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-orange font-bold group-hover:scale-110 transition-transform">H</div>
                <span className="text-xl font-bold text-white tracking-tight leading-tight text-left">
                  화성시육아<br />
                  종합지원센터
                </span>
            </button>
            <p className="text-sm leading-relaxed mb-6 opacity-80">
              TEL: 031-8059-1640 | FAX: 031-8059-1641
            </p>
            <div className="flex gap-4 grayscale brightness-200 contrast-200">
              {/* Fake web symbols */}
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 text-xs">WA</div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 font-mono text-[10px]">ISO</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {NAVIGATION_DATA.slice(0, 4).map((item, i) => (
              <div key={i}>
                <h4 className="text-white font-bold mb-4">{item.title}</h4>
                <ul className="space-y-2 text-sm opacity-70">
                  {item.subItems.slice(0, 3).map((sub, j) => (
                    <li key={j} className="hover:text-amber-200 cursor-pointer transition-colors">{sub}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-80">
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer font-bold text-amber-200">개인정보처리방침</span>
            <span className="hover:text-white cursor-pointer">이용약관</span>
            <span className="hover:text-white cursor-pointer">이메일무단수집거부</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
            <span>유관사이트 바로가기</span>
            <Plus size={14} />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-[10px] opacity-50 flex flex-col gap-1">
          <p>주소: 경기도 화성시 향남읍 발안로 13 화성종합경기타운 내</p>
          <p>COPYRIGHT ⓒ By Hwaseong Childcare Support Center. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <QuickMenu />
      <NewsSection />
      <MidBanner />
      <ArchiveSection />
      
      {/* Visual Separation Line */}
      <div className="h-24 bg-gradient-to-b from-white to-gray-50 flex items-center justify-center relative">
         <div className="w-px h-full bg-slate-100"></div>
         <div className="absolute w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm">
            <Baby className="w-5 h-5 text-brand-orange" />
         </div>
      </div>

      <Footer />
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-white text-brand-orange rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-orange hover:text-white active:scale-95 transition-all border border-brand-orange/10 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
          <span className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">TOP</span>
        </button>
        
        <button className="w-16 h-16 bg-brand-orange text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group">
          <MessageCircle className="w-8 h-8" />
          <span className="absolute right-20 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">센터 챗봇 문의</span>
        </button>
      </div>
    </div>
  );
}
