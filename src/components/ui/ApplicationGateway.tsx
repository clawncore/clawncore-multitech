import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, CheckCircle2, UploadCloud, MapPin, Clock, Banknote,
  ArrowLeft, ArrowRight, BrainCircuit, Cpu, ShieldAlert,
  Network, BarChart3, Briefcase, GraduationCap, Heart,
  User, Mail, Phone, Globe, FileText, Send, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CareerRole, DepartmentId } from "../../services/careersData";

interface Props {
  role: CareerRole;
  onClose: () => void;
}

const DEPT_ICONS: Record<DepartmentId, typeof BrainCircuit> = {
  ai: BrainCircuit,
  drone: Cpu,
  cyber: ShieldAlert,
  cloud: Network,
  analytics: BarChart3,
};

const DEPT_COLORS: Record<DepartmentId, string> = {
  ai: 'text-blue-500',
  drone: 'text-sky-500',
  cyber: 'text-emerald-500',
  cloud: 'text-indigo-500',
  analytics: 'text-violet-500',
};

const STEPS = ['Details', 'About You', 'Experience', 'Resume', 'Review'];

export function ApplicationGateway({ role, onClose }: Props) {
  const [view, setView] = useState<'details' | 'apply'>('details');
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    currentRole: '',
    experience: '',
    education: '',
    whyInterested: '',
    skills: '',
    availability: '',
    salaryExpectation: '',
    resumeFileName: '',
  });

  const Icon = DEPT_ICONS[role.department];
  const colorClass = DEPT_COLORS[role.department];

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

  const canProceed = () => {
    if (step === 1) return form.firstName && form.lastName && form.email;
    if (step === 2) return form.experience && form.whyInterested;
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white dark:bg-cc-dark border border-gray-200 dark:border-white/10 shadow-2xl rounded-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* ═══ ROLE IMAGE BANNER (Details View) ═══ */}
        {view === 'details' && role.image && (
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <img src={role.image} alt={role.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${colorClass}`} />
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">{role.departmentName}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{role.title}</h2>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/50 transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {/* ═══ APPLICATION HEADER (Apply View) ═══ */}
        {view === 'apply' && !isSuccess && (
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] flex-shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => step === 0 ? setView('details') : setStep(step - 1)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4 text-gray-500" />
              </button>
              <div>
                <p className="text-[10px] font-mono text-gray-500 dark:text-white/40 uppercase tracking-widest">Applying for</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{role.title}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}

        {/* ═══ STEP INDICATOR (Apply View) ═══ */}
        {view === 'apply' && !isSuccess && (
          <div className="flex items-center gap-1 px-6 py-3 border-b border-gray-100 dark:border-white/5 overflow-x-auto flex-shrink-0">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  i < step ? 'bg-nvidia-500 text-black' :
                  i === step ? 'bg-nvidia-500/20 text-nvidia-500 border border-nvidia-500/40' :
                  'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-white/30'
                }`}>
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className={`text-[10px] font-medium hidden sm:inline ${
                  i === step ? 'text-nvidia-500' : 'text-gray-400 dark:text-white/30'
                }`}>{s}</span>
                {i < STEPS.length - 1 && <div className="w-4 sm:w-8 h-px bg-gray-200 dark:bg-white/10" />}
              </div>
            ))}
          </div>
        )}

        {/* ═══ BODY ═══ */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0">
          {isSuccess ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h3>
              <p className="text-gray-500 dark:text-white/50 max-w-md mb-8">
                Your application for <strong>{role.title}</strong> has been received. Our team will review your profile and reach out within 5 business days.
              </p>
              <Button onClick={onClose} className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold px-8">
                Back to Careers
              </Button>
            </motion.div>
          ) : view === 'details' ? (
            /* ═══ STEP 0: JOB DETAILS ═══ */
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-lg text-xs font-medium text-gray-700 dark:text-white/60">
                  <MapPin className="w-3.5 h-3.5" /> {role.location}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-lg text-xs font-medium text-gray-700 dark:text-white/60">
                  <Clock className="w-3.5 h-3.5" /> {role.type}
                </span>
                {role.salary && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-lg text-xs font-medium text-gray-700 dark:text-white/60">
                    <Banknote className="w-3.5 h-3.5" /> {role.salary}
                  </span>
                )}
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-lg text-xs font-medium text-gray-700 dark:text-white/60">
                  <Briefcase className="w-3.5 h-3.5" /> Posted {role.postedDate}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3">About This Role</h4>
                <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">{role.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-nvidia-500" /> Responsibilities
                </h4>
                <ul className="space-y-2">
                  {role.responsibilities.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-white/60">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-nvidia-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-nvidia-500" /> Requirements
                </h4>
                <ul className="space-y-2">
                  {role.requirements.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-white/60">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/30 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-nvidia-500/10 text-nvidia-600 dark:text-nvidia-400 text-xs font-semibold rounded-lg border border-nvidia-500/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-nvidia-500" /> Role Perks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.benefits.map((benefit) => (
                    <span key={benefit} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-lg border border-emerald-200 dark:border-emerald-500/20">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                <Button onClick={() => { setView('apply'); setStep(1); }} className="w-full h-12 bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold text-sm rounded-xl">
                  Apply for This Role <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ) : (
            /* ═══ MULTI-STEP APPLICATION FORM ═══ */
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* STEP 1: About You */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">About You</h3>
                      <p className="text-sm text-gray-500 dark:text-white/40">Tell us who you are so we can get to know you.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">First Name *</Label>
                        <Input value={form.firstName} onChange={(e) => updateForm('firstName', e.target.value)} placeholder="Jane" className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Last Name *</Label>
                        <Input value={form.lastName} onChange={(e) => updateForm('lastName', e.target.value)} placeholder="Doe" className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Email *</Label>
                      <Input type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)} placeholder="jane@example.com" className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Phone</Label>
                      <Input type="tel" value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="+1 (555) 000-0000" className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Location</Label>
                      <Input value={form.location} onChange={(e) => updateForm('location', e.target.value)} placeholder="Harare, Zimbabwe" className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">LinkedIn</Label>
                        <Input value={form.linkedin} onChange={(e) => updateForm('linkedin', e.target.value)} placeholder="linkedin.com/in/..." className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">GitHub / Portfolio</Label>
                        <Input value={form.github} onChange={(e) => updateForm('github', e.target.value)} placeholder="github.com/..." className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10" />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Experience */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Experience & Motivation</h3>
                      <p className="text-sm text-gray-500 dark:text-white/40">Help us understand your background and what drives you.</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Current / Recent Role</Label>
                      <Input value={form.currentRole} onChange={(e) => updateForm('currentRole', e.target.value)} placeholder="Senior ML Engineer at ..." className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Years of Experience *</Label>
                      <select value={form.experience} onChange={(e) => updateForm('experience', e.target.value)} className="w-full h-10 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nvidia-500/30">
                        <option value="">Select...</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-3">1–3 years</option>
                        <option value="3-5">3–5 years</option>
                        <option value="5-10">5–10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Education</Label>
                      <Input value={form.education} onChange={(e) => updateForm('education', e.target.value)} placeholder="BS/MS Computer Science, ..." className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Key Skills (comma separated)</Label>
                      <Input value={form.skills} onChange={(e) => updateForm('skills', e.target.value)} placeholder="Python, PyTorch, Kubernetes, ..." className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Why are you interested? *</Label>
                      <textarea
                        value={form.whyInterested}
                        onChange={(e) => updateForm('whyInterested', e.target.value)}
                        rows={4}
                        placeholder="Tell us why you'd be a great fit for this role and what excites you about ClawnCore..."
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-nvidia-500/30 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: Resume & Availability */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Resume & Availability</h3>
                      <p className="text-sm text-gray-500 dark:text-white/40">Upload your resume and let us know your availability.</p>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-2">
                      <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Resume *</Label>
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 hover:border-nvidia-400 hover:bg-nvidia-50 dark:hover:bg-nvidia-500/5 cursor-pointer transition-all">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) updateForm('resumeFileName', file.name);
                          }}
                        />
                        {form.resumeFileName ? (
                          <div className="flex items-center gap-2 text-nvidia-600 dark:text-nvidia-400">
                            <FileText className="w-5 h-5" />
                            <span className="text-sm font-medium">{form.resumeFileName}</span>
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="w-8 h-8 text-gray-300 dark:text-white/20 mb-2" />
                            <span className="text-sm text-gray-500 dark:text-white/40">Click to upload PDF, DOC, or DOCX</span>
                            <span className="text-[10px] text-gray-400 dark:text-white/20 mt-1">Max 10MB</span>
                          </>
                        )}
                      </label>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Availability</Label>
                      <select value={form.availability} onChange={(e) => updateForm('availability', e.target.value)} className="w-full h-10 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nvidia-500/30">
                        <option value="">Select...</option>
                        <option value="immediately">Immediately</option>
                        <option value="2-weeks">2 weeks notice</option>
                        <option value="1-month">1 month notice</option>
                        <option value="3-months">3+ months</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700 dark:text-white/60 text-xs uppercase tracking-wide">Salary Expectation (Annual, USD)</Label>
                      <Input value={form.salaryExpectation} onChange={(e) => updateForm('salaryExpectation', e.target.value)} placeholder="e.g. $120,000" className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10" />
                    </div>
                  </div>
                )}

                {/* STEP 4: Review & Submit */}
                {step === 4 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Review Your Application</h3>
                      <p className="text-sm text-gray-500 dark:text-white/40">Please review everything before submitting.</p>
                    </div>

                    {/* Role Summary */}
                    <div className="bg-nvidia-500/5 border border-nvidia-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${colorClass}`} />
                        <span className="text-xs font-mono text-gray-500 dark:text-white/40 uppercase">{role.departmentName}</span>
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white">{role.title}</p>
                      <p className="text-xs text-gray-500 dark:text-white/40">{role.location} · {role.type} {role.salary && `· ${role.salary}`}</p>
                    </div>

                    {/* Personal Info */}
                    <div className="bg-gray-50 dark:bg-white/[0.02] rounded-xl p-4">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3">Personal Information</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div><span className="text-gray-500 dark:text-white/40">Name:</span> <span className="text-gray-900 dark:text-white ml-1">{form.firstName} {form.lastName}</span></div>
                        <div><span className="text-gray-500 dark:text-white/40">Email:</span> <span className="text-gray-900 dark:text-white ml-1">{form.email}</span></div>
                        <div><span className="text-gray-500 dark:text-white/40">Phone:</span> <span className="text-gray-900 dark:text-white ml-1">{form.phone || '—'}</span></div>
                        <div><span className="text-gray-500 dark:text-white/40">Location:</span> <span className="text-gray-900 dark:text-white ml-1">{form.location || '—'}</span></div>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="bg-gray-50 dark:bg-white/[0.02] rounded-xl p-4">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3">Experience</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div><span className="text-gray-500 dark:text-white/40">Current Role:</span> <span className="text-gray-900 dark:text-white ml-1">{form.currentRole || '—'}</span></div>
                        <div><span className="text-gray-500 dark:text-white/40">Experience:</span> <span className="text-gray-900 dark:text-white ml-1">{form.experience || '—'}</span></div>
                        <div><span className="text-gray-500 dark:text-white/40">Resume:</span> <span className="text-gray-900 dark:text-white ml-1">{form.resumeFileName || '—'}</span></div>
                        <div><span className="text-gray-500 dark:text-white/40">Available:</span> <span className="text-gray-900 dark:text-white ml-1">{form.availability || '—'}</span></div>
                      </div>
                      {form.whyInterested && (
                        <div className="mt-3 text-sm">
                          <span className="text-gray-500 dark:text-white/40">Why interested:</span>
                          <p className="text-gray-700 dark:text-white/60 mt-1">{form.whyInterested}</p>
                        </div>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full h-12 bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold text-sm rounded-xl"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Submitting Application...
                          </div>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" /> Submit Application
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ═══ FOOTER NAVIGATION (Apply View) ═══ */}
        {view === 'apply' && !isSuccess && (
          <div className="flex items-center justify-between p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] flex-shrink-0">
            <Button
              variant="outline"
              onClick={() => step === 0 ? setView('details') : setStep(step - 1)}
              className="border-gray-200 dark:border-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold"
              >
                Next <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'} <Send className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
