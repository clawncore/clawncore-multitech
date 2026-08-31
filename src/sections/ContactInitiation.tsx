import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ContactScene } from '../scenes/ContactScene';
import { Button } from '../components/ui/button';
import { ArrowRight, Sparkles, Building2, User, Mail, MessageSquare } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function ContactInitiation() {
  const [, setLocation] = useLocation();
  const [isFocused, setIsFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'partnership'>('contact');

  return (
    <section id="contact" className="relative w-full min-h-screen bg-white dark:bg-cc-dark overflow-hidden flex items-center">
      
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <ContactScene isFocused={isFocused} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full container mx-auto px-6 py-24 md:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Column: Typography & Invitation */}
        <div className="flex-1 w-full lg:max-w-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div custom={0} variants={fadeUp} className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono tracking-[0.35em] text-cyan-400/60 uppercase">
                Initiate Connection
              </span>
            </motion.div>
            
            <motion.h2 custom={1} variants={fadeUp}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6 leading-[1.1]"
              style={{ textShadow: '0 0 50px rgba(56,189,248,0.15)' }}
            >
              Enter the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-teal-300">
                Ecosystem.
              </span>
            </motion.h2>
            
            <motion.p custom={2} variants={fadeUp}
              className="text-lg text-gray-500 dark:text-slate-400 font-light leading-relaxed mb-10 max-w-lg">
              Whether you are looking to integrate ClawnCore infrastructure, explore AI partnerships, or deploy autonomous systems at scale — the future starts here.
            </motion.p>

            {/* Quick Actions */}
            <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setLocation('/intelligence-core')}
                className="h-12 px-6 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/20 transition-all group"
              >
                <Sparkles className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100" />
                Explore ClawnAI
              </Button>
              <Button className="h-12 px-6 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 transition-all">
                Create Account
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Interaction Interface */}
        <div className="w-full lg:w-[500px] shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-3xl overflow-hidden p-8 shadow-2xl"
          >
            {/* Ambient glow behind form */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px] transition-opacity duration-1000 ${isFocused ? 'opacity-100' : 'opacity-40'}`} />

            {/* Tabs */}
            <div className="flex gap-1 mb-8 border-b border-gray-200 dark:border-white/10 pb-4 relative z-10">
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 pb-2 text-sm font-medium transition-colors ${activeTab === 'contact' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-zinc-300'}`}
              >
                Direct Inquiry
              </button>
              <button
                onClick={() => setActiveTab('partnership')}
                className={`flex-1 pb-2 text-sm font-medium transition-colors ${activeTab === 'partnership' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-zinc-300'}`}
              >
                Enterprise Partnership
              </button>
              {/* Animated active indicator */}
              <div 
                className="absolute bottom-[-1px] h-[2px] w-1/2 bg-sky-400 transition-transform duration-300 ease-out"
                style={{ transform: `translateX(${activeTab === 'contact' ? '0%' : '100%'})` }}
              />
            </div>

            {/* Form */}
            <form className="relative z-10 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400 group-focus-within:text-sky-400 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full h-12 bg-white dark:bg-white border border-gray-200 dark:border-slate-200 rounded-xl pl-11 pr-4 text-sm text-gray-900 dark:text-slate-900 placeholder:text-gray-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
                  />
                </div>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400 group-focus-within:text-sky-400 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full h-12 bg-white dark:bg-white border border-gray-200 dark:border-slate-200 rounded-xl pl-11 pr-4 text-sm text-gray-900 dark:text-slate-900 placeholder:text-gray-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400 group-focus-within:text-sky-400 transition-colors" />
                <input 
                  type="email" 
                  placeholder="Work Email" 
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
                />
              </div>

              {activeTab === 'partnership' && (
                <div className="relative group">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-400 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Organization / Company" 
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full h-12 bg-white dark:bg-white border border-gray-200 dark:border-slate-200 rounded-xl pl-11 pr-4 text-sm text-gray-900 dark:text-slate-900 placeholder:text-gray-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
                  />
                </div>
              )}

              <div className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400 dark:text-slate-400 group-focus-within:text-sky-400 transition-colors" />
                <textarea 
                  placeholder="How can we build the future together?" 
                  rows={4}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full bg-gray-50 dark:bg-slate-50 border border-gray-200 dark:border-slate-200 rounded-xl pl-11 pr-4 pt-4 text-sm text-gray-900 dark:text-slate-900 placeholder:text-gray-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all resize-none"
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-12 mt-2 rounded-xl bg-white text-black hover:bg-sky-50 font-medium tracking-wide group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="relative flex items-center justify-center">
                  Initialize Transmission
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
