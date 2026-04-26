/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Calendar, 
  PlusCircle, 
  Users, 
  Settings, 
  CheckCircle2, 
  Pill, 
  Star, 
  ChevronRight,
  TrendingUp,
  ThumbsUp,
  X,
  Plus
} from 'lucide-react';
import { View, Medication, Patient, INITIAL_MEDS, PATIENTS as INITIAL_PATIENTS } from './types';

// --- Sub-components ---

const NavBar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const tabs = [
    { id: View.AGENDA, icon: Calendar, label: 'Agenda' },
    { id: View.ADD, icon: PlusCircle, label: 'Add' },
    { id: View.PATIENTS, icon: Users, label: 'Patients' },
    { id: View.ALERT, icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md rounded-t-xl border-t border-primary-fixed py-4 px-6 z-50 md:max-w-md md:mx-auto">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`nav-tab-${tab.id}`}
            onClick={() => setView(tab.id as View)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentView === tab.id 
                ? 'text-on-secondary-container' 
                : 'text-outline hover:text-primary'
            }`}
          >
            <div className={`p-1.5 rounded-full transition-all ${
              currentView === tab.id ? 'bg-secondary-container active-tab-shadow -translate-y-2' : ''
            }`}>
              <tab.icon size={24} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const Header = () => (
  <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md py-4 px-6 z-40 rounded-b-lg border-b border-background md:max-w-md md:mx-auto">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container shadow-sm">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9bpXq5F9d540-_efe8SmlBtTKh3jASBvKZhmvCBDNWRGDfz_5hifn3WyiMt5NnPDSEzTAr6VShNl08NSjD4CoLvh-ny8pPsgWi9PpvtBFL2gxe28yD4nnNi1brzfLWaRhg4VzSDDN6Qk8srNHrSuunyVrFhK4Wz2YfDvWi_JKG6kJOut068bvUnXkjymITSCYGDq6OVYMPxuCBHa0pOQY3C6D3PHgtEPxmt9Kk0Y7yI_2ZQ9pljPMeCd9uCkRSV1_Emlt2x87QpON" 
            alt="Marbacon Mascot" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-black text-primary-container italic tracking-tight">Marbacon</h1>
      </div>
      <button id="notification-bell" className="p-2 text-primary-container hover:bg-primary-fixed rounded-full transition-colors">
        <Bell size={24} />
      </button>
    </div>
  </header>
);

// --- Views ---

interface SplashViewProps {
  onStart: () => void;
}

const SplashView: React.FC<SplashViewProps> = ({ onStart }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen bg-primary-container flex flex-col items-center justify-center p-8 relative overflow-hidden"
  >
    <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-4 gap-8 rotate-12 scale-150">
      {Array.from({ length: 16 }).map((_, i) => (
        <img key={i} src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9bpXq5F9d540-_efe8SmlBtTKh3jASBvKZhmvCBDNWRGDfz_5hifn3WyiMt5NnPDSEzTAr6VShNl08NSjD4CoLvh-ny8pPsgWi9PpvtBFL2gxe28yD4nnNi1brzfLWaRhg4VzSDDN6Qk8srNHrSuunyVrFhK4Wz2YfDvWi_JKG6kJOut068bvUnXkjymITSCYGDq6OVYMPxuCBHa0pOQY3C6D3PHgtEPxmt9Kk0Y7yI_2ZQ9pljPMeCd9uCkRSV1_Emlt2x87QpON" className="w-24 opacity-40 shadow-none" alt="" />
      ))}
    </div>
    <div className="relative z-10 flex flex-col items-center text-center">
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-72 h-72 mb-8">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9bpXq5F9d540-_efe8SmlBtTKh3jASBvKZhmvCBDNWRGDfz_5hifn3WyiMt5NnPDSEzTAr6VShNl08NSjD4CoLvh-ny8pPsgWi9PpvtBFL2gxe28yD4nnNi1brzfLWaRhg4VzSDDN6Qk8srNHrSuunyVrFhK4Wz2YfDvWi_JKG6kJOut068bvUnXkjymITSCYGDq6OVYMPxuCBHa0pOQY3C6D3PHgtEPxmt9Kk0Y7yI_2ZQ9pljPMeCd9uCkRSV1_Emlt2x87QpON" alt="Elephant Mascot" className="w-full h-full object-cover rounded-full shadow-2xl" />
      </motion.div>
      <h1 className="text-5xl font-black text-white mb-2 tracking-tighter">MARBACON</h1>
      <p className="text-white/80 text-xl font-medium italic mb-12">Busca tu pasión</p>
      <button onClick={onStart} className="bg-secondary-container text-on-secondary-container px-12 py-4 rounded-full text-xl font-bold active-tab-shadow active:scale-95 transition-all">Entrar</button>
    </div>
  </motion.div>
);

interface AddPatientViewProps {
  onSave: (p: any) => void;
  onCancel?: () => void;
  isFirst?: boolean;
}

const AddPatientView: React.FC<AddPatientViewProps> = ({ onSave, onCancel, isFirst }) => {
  const [formData, setFormData] = useState({ name: '', relation: '', color: '#fcd03d' });
  const colors = ['#fcd03d', '#b0f1c2', '#ffdad6', '#ffe089', '#95d5a7'];

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-[60] bg-white p-8 flex flex-col md:max-w-md md:mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-primary-container">{isFirst ? '¡Bienvenido! Empecemos' : 'Nuevo Paciente'}</h2>
        {!isFirst && onCancel && <button onClick={onCancel} className="p-2 text-outline"><X size={24} /></button>}
      </div>
      <p className="text-on-surface-variant text-lg mb-8 italic">{isFirst ? 'Dinos el nombre de la persona que vamos a cuidar.' : 'Agreguemos a alguien más a la familia.'}</p>
      <div className="space-y-6 flex-grow">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-on-surface-variant ml-2 uppercase tracking-widest">Nombre del Paciente</label>
          <input type="text" placeholder="Ej. Abuela María" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-background border-2 border-outline-variant rounded-full py-4 px-6 focus:border-primary-container outline-none transition-all font-bold text-lg" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-on-surface-variant ml-2 uppercase tracking-widest">Parentesco / Relación</label>
          <input type="text" placeholder="Ej. Abuela, Padre, Hijo..." value={formData.relation} onChange={(e) => setFormData({...formData, relation: e.target.value})} className="w-full bg-background border-2 border-outline-variant rounded-full py-4 px-6 focus:border-primary-container outline-none transition-all font-medium" />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-on-surface-variant ml-2 uppercase tracking-widest">Color de Referencia</label>
          <div className="flex gap-4">
            {colors.map(c => (
              <button key={c} onClick={() => setFormData({...formData, color: c})} className={`w-10 h-10 rounded-full border-4 transition-all ${formData.color === c ? 'border-primary-container' : 'border-transparent'}`} style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
      <button disabled={!formData.name} onClick={() => onSave(formData)} className="w-full bg-secondary-container text-on-secondary-container py-5 rounded-full font-black text-xl active-tab-shadow active:scale-95 transition-all flex items-center justify-center gap-2 mt-auto disabled:opacity-50">
        <CheckCircle2 size={24} />{isFirst ? '¡Comenzar!' : 'Guardar Paciente'}
      </button>
    </motion.div>
  );
};

interface AgendaViewProps {
  medications: Medication[];
  patients: Patient[];
}

const AgendaView: React.FC<AgendaViewProps> = ({ medications, patients }) => {
  const getNextDose = (startTime: string, frequency: number) => {
    const now = new Date();
    const [hours, minutes] = startTime.split(':').map(Number);
    const firstDose = new Date();
    firstDose.setHours(hours, minutes, 0, 0);

    let next = new Date(firstDose);
    while (next < now) {
      next.setHours(next.getHours() + frequency);
    }
    return next.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-24 pb-32 px-6">
      <div className="bg-white rounded-lg p-6 mb-8 pill-shadow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/20 rounded-bl-full -mr-8 -mt-8" />
        <h2 className="text-3xl font-bold text-primary-container mb-1 relative z-10">¡Hola!</h2>
        <p className="text-on-surface-variant text-lg relative z-10 italic">Vamos a cuidar de los nuestros hoy.</p>
      </div>
      <h3 className="text-2xl font-bold mb-4 px-2">Agenda de Hoy</h3>
      <div className="space-y-4">
        {medications.length === 0 ? (
          <div className="text-center py-12 text-outline italic">No hay medicación programada.</div>
        ) : (
          medications.map((med) => {
            const patient = patients.find(p => p.id === med.patientId);
            const nextDoseTime = getNextDose(med.startTime, med.frequencyHours);
            return (
              <motion.div key={med.id} whileTap={{ scale: 0.98 }} className="bg-white rounded-lg p-5 flex items-center gap-4 pill-shadow relative overflow-hidden border-l-[8px]" style={{ borderLeftColor: patient?.color }}>
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-surface-container">
                  {patient?.avatar ? <img src={patient.avatar} alt={patient.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-outline-variant text-white font-bold text-xl uppercase">{patient?.name.charAt(0)}</div>}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant bg-background px-2 py-0.5 rounded-full">{patient?.name}</span>
                    <div className="flex flex-col items-end">
                      <span className="text-primary-container font-black text-sm">{med.startTime}</span>
                      <span className="text-[9px] text-secondary font-bold uppercase tracking-tighter">Inicio</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-on-surface leading-tight">{med.name}</h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-on-surface-variant mt-1">
                    <span className="font-medium">{med.dose}</span>
                    <span className="w-1 h-1 bg-outline-variant rounded-full" />
                    <span>Cada {med.frequencyHours}h</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-background flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <Calendar size={14} />
                      <span className="text-[11px] font-black uppercase tracking-wider">Próxima: {nextDoseTime}</span>
                    </div>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm active:scale-90 transition-transform">
                  <CheckCircle2 size={20} />
                </button>
              </motion.div>
            );
          })
        )}
      </div>
      <motion.div className="mt-12 bg-secondary-container rounded-lg p-6 text-center active-tab-shadow" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
        <div className="inline-flex items-center gap-2 mb-2 text-primary-container font-black text-xl"><TrendingUp size={24} />¡Gran trabajo hoy!</div>
        <p className="text-on-secondary-container mb-6 italic">Llevas una racha de días cuidando a los tuyos.</p>
        <button className="w-full bg-white text-primary-container py-3 rounded-full font-bold shadow-sm active:scale-95 transition-all">Ver progreso</button>
      </motion.div>
    </motion.div>
  );
};

interface AddViewProps {
  onSave: (m: any) => void;
  patients: Patient[];
}

const AddView: React.FC<AddViewProps> = ({ onSave, patients }) => {
  const [formData, setFormData] = useState({ 
    patientId: patients[0]?.id || '', 
    medicineName: '', 
    dose: '', 
    startTime: '08:00', 
    frequencyHours: 8, 
    durationDays: 7, 
    isPermanent: false, 
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    alertTheme: 'fire' as 'fire' | 'party' | 'nature' | 'robot'
  });
  const toggleDay = (day: number) => {
    if (formData.daysOfWeek.includes(day)) {
      setFormData({ ...formData, daysOfWeek: formData.daysOfWeek.filter(d => d !== day) });
    } else {
      setFormData({ ...formData, daysOfWeek: [...formData.daysOfWeek, day] });
    }
  };
  const days = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="pt-24 pb-32 px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-primary-container mb-2">¡Nuevo Medicamento!</h2>
        <p className="text-on-surface-variant text-lg italic">Agreguemos una nueva rutina a la lista.</p>
      </div>
      <div className="bg-white rounded-xl p-8 pill-shadow space-y-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-on-surface-variant ml-2 uppercase tracking-widest">¿Para quién es?</label>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2">
            {patients.map(p => (
              <button key={p.id} onClick={() => setFormData({ ...formData, patientId: p.id })} className={`flex-shrink-0 flex items-center gap-2 p-2 rounded-full border-2 transition-all ${formData.patientId === p.id ? 'border-secondary-container bg-secondary-container/10' : 'border-outline-variant hover:border-outline'}`}>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container flex items-center justify-center font-bold text-xs uppercase">{p.avatar ? <img src={p.avatar} className="w-full h-full object-cover" alt="" /> : p.name.charAt(0)}</div>
                <span className="text-sm font-bold pr-2">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-on-surface-variant ml-2 uppercase tracking-widest">¿Qué medicamento?</label>
          <div className="relative">
            <Pill size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
            <input type="text" placeholder="Ej. Paracetamol" value={formData.medicineName} onChange={(e) => setFormData({...formData, medicineName: e.target.value})} className="w-full bg-background border-2 border-outline-variant rounded-full py-4 pl-12 pr-6 focus:border-primary-container outline-none transition-all font-medium text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant ml-2 uppercase tracking-widest">Dosis (mg)</label>
            <input type="text" placeholder="500" value={formData.dose} onChange={(e) => setFormData({...formData, dose: e.target.value})} className="w-full bg-background border-2 border-outline-variant rounded-full py-4 px-6 focus:border-primary-container outline-none transition-all font-medium text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant ml-2 uppercase tracking-widest">Hora Inicio</label>
            <input type="time" value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} className="w-full bg-background border-2 border-outline-variant rounded-full py-4 px-6 focus:border-primary-container outline-none transition-all font-medium text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant ml-2 uppercase tracking-widest">Cada (horas)</label>
            <select value={formData.frequencyHours} onChange={(e) => setFormData({...formData, frequencyHours: parseInt(e.target.value)})} className="w-full bg-background border-2 border-outline-variant rounded-full py-4 px-6 focus:border-primary-container outline-none appearance-none transition-all font-medium text-sm">
              {[4, 6, 8, 12, 24].map(h => (<option key={h} value={h}>{h} horas</option>))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant ml-2 uppercase tracking-widest">Días totales</label>
            <input type="number" value={formData.durationDays} onChange={(e) => setFormData({...formData, durationDays: parseInt(e.target.value)})} className="w-full bg-background border-2 border-outline-variant rounded-full py-4 px-6 focus:border-primary-container outline-none transition-all font-medium text-sm" />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-on-surface-variant ml-2 uppercase tracking-widest">Repetir estos días</label>
          <div className="flex justify-between gap-1">
            {days.map((day, i) => (
              <button key={i} type="button" onClick={() => toggleDay(i)} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all border-2 ${formData.daysOfWeek.includes(i) ? 'bg-secondary-container border-secondary-container text-on-secondary-container' : 'border-outline-variant text-outline hover:border-outline'}`}>
                {day}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between bg-background p-4 rounded-lg border border-outline-variant/30">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-secondary">∞</span>
            <span className="font-bold text-on-surface text-sm">Tratamiento permanente</span>
          </div>
          <button type="button" onClick={() => setFormData({...formData, isPermanent: !formData.isPermanent})} className={`w-12 h-6 rounded-full p-1 transition-all ${formData.isPermanent ? 'bg-secondary-container' : 'bg-outline-variant'}`}>
            <motion.div animate={{ x: formData.isPermanent ? 24 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-sm" />
          </button>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-on-surface-variant ml-2 uppercase tracking-widest">Tema de Alerta</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'fire', icon: '🚨', label: 'Bomberos' },
              { id: 'party', icon: '🎉', label: 'Fiesta' },
              { id: 'nature', icon: '🌿', label: 'Calma' },
              { id: 'robot', icon: '🤖', label: 'Robot' }
            ].map(t => (
              <button 
                key={t.id} 
                type="button" 
                onClick={() => setFormData({...formData, alertTheme: t.id as any})}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${formData.alertTheme === t.id ? 'bg-primary-container border-primary-container text-white' : 'border-outline-variant text-outline hover:border-outline bg-white'}`}
              >
                <span className="text-xl">{t.icon}</span>
                <span className="text-[8px] font-bold uppercase">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => onSave(formData)} className="w-full bg-secondary-container text-on-secondary-container py-5 rounded-full font-black text-xl active-tab-shadow active:scale-95 transition-all flex items-center justify-center gap-2">
          <CheckCircle2 size={24} />¡Guardar Rutina!
        </button>
      </div>
    </motion.div>
  );
};

interface PatientsViewProps {
  patients: Patient[];
  onAdd: () => void;
}

const PatientsView: React.FC<PatientsViewProps> = ({ patients, onAdd }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-24 pb-32 px-6">
    <h2 className="text-3xl font-black text-primary-container mb-6 px-2">Mis Pacientes</h2>
    <div className="space-y-4">
      {patients.map(p => (
        <div key={p.id} className="bg-white p-5 rounded-xl pill-shadow flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container rounded-bl-full opacity-30" />
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container bg-surface-container flex items-center justify-center">
            {p.avatar ? <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" /> : <span className="font-black text-2xl uppercase">{p.name.charAt(0)}</span>}
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-on-surface">{p.name}</h3>
            <p className="text-on-surface-variant text-sm italic">{p.relation}</p>
          </div>
          <button className="p-3 text-primary-container hover:bg-primary-fixed rounded-full transition-colors relative z-10"><ChevronRight size={20} /></button>
        </div>
      ))}
      <button onClick={onAdd} className="w-full border-4 border-dashed border-outline-variant rounded-xl p-6 text-outline font-bold flex items-center justify-center gap-2 hover:border-primary-container hover:text-primary-container transition-all">
        <Plus size={24} />Añadir nuevo paciente
      </button>
    </div>
  </motion.div>
);

interface AlertViewProps {
  onDismiss: () => void;
  medication: Medication | null;
  patient: Patient | null;
  minutesLeft: number;
}

const AlertView: React.FC<AlertViewProps> = ({ onDismiss, medication, patient, minutesLeft }) => {
  const theme = medication?.alertTheme || 'fire';
  
  const themeStyles = {
    fire: {
      bg: 'from-orange-600 via-red-600 to-orange-600',
      accent: 'text-red-700',
      iconBg: 'bg-red-700',
      title: '¡ALERTA MÁXIMA!',
      decoration: (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 0.3 }} 
            className="absolute inset-0 bg-red-600 mix-blend-overlay"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-50" />
        </div>
      )
    },
    party: {
      bg: 'from-pink-500 via-purple-500 to-indigo-500',
      accent: 'text-pink-600',
      iconBg: 'bg-pink-600',
      title: '¡HORA DE FIESTA!',
      decoration: (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * 400, rotate: 0 }}
              animate={{ y: 800, rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2 + Math.random() * 3, delay: Math.random() * 2 }}
              className="absolute w-2 h-4 rounded-sm"
              style={{ backgroundColor: ['#FFC107', '#E91E63', '#2196F3', '#4CAF50'][i % 4] }}
            />
          ))}
        </div>
      )
    },
    nature: {
      bg: 'from-green-400 via-teal-500 to-emerald-400',
      accent: 'text-green-600',
      iconBg: 'bg-green-600',
      title: 'MOMENTO ZEN',
      decoration: (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }} 
            transition={{ repeat: Infinity, duration: 4 }} 
            className="absolute inset-0 bg-white rounded-full scale-150 blur-3xl"
          />
        </div>
      )
    },
    robot: {
      bg: 'from-blue-900 via-purple-900 to-black',
      accent: 'text-blue-400',
      iconBg: 'bg-blue-600',
      title: 'SYSTEM SCAN',
      decoration: (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute inset-x-0 h-1 bg-blue-500/50 shadow-[0_0_15px_blue] animate-[scan_2s_linear_infinite]" />
           <style>{`
             @keyframes scan {
               from { top: 0%; }
               to { top: 100%; }
             }
           `}</style>
        </div>
      )
    }
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} flex flex-col items-center justify-center p-8 text-center text-on-surface relative`}
    >
      {currentTheme.decoration}
      <div className="relative z-10 w-full max-w-sm">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className={`${currentTheme.iconBg} text-white p-6 rounded-full inline-flex mb-6 shadow-2xl`}
        >
          {theme === 'nature' ? <Star size={40} fill="currentColor" /> : <Bell size={40} fill="currentColor" />}
        </motion.div>
        
        <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase leading-none drop-shadow-lg">
          {currentTheme.title}
        </h1>
        <p className="text-white/90 text-xl font-bold mb-8 uppercase tracking-widest italic drop-shadow-md bg-black/20 px-4 py-1 rounded-full inline-block">
          Faltan {minutesLeft} Minutos
        </p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-8 pill-shadow mb-12 border border-white"
        >
          <div className="flex flex-col items-center mb-6">
            <span className={`text-6xl font-black ${currentTheme.accent} mb-2 tracking-tight`}>{medication?.startTime}</span>
            <div className={`${currentTheme.iconBg} text-white px-6 py-2 rounded-full flex items-center gap-2 font-black text-sm uppercase tracking-widest animate-pulse`}>
               <CheckCircle2 size={18} /> PRÓXIMA TOMA
            </div>
          </div>
          <div className="h-px bg-outline-variant/30 w-full mb-6" />
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded-xl p-5 text-center border border-outline-variant/10">
              <div className={`w-12 h-12 ${currentTheme.iconBg}/10 mx-auto rounded-full flex items-center justify-center mb-2 ${currentTheme.accent}`}><Users size={24} /></div>
              <span className="block text-[10px] font-black uppercase text-outline tracking-widest mb-1">Paciente</span>
              <span className="block text-xl font-bold leading-tight">{patient?.name || '---'}</span>
            </div>
            <div className="bg-background rounded-xl p-5 text-center border border-outline-variant/10">
              <div className={`w-12 h-12 ${currentTheme.iconBg}/10 mx-auto rounded-full flex items-center justify-center mb-2 ${currentTheme.accent}`}><Pill size={24} fill="currentColor" /></div>
              <span className="block text-[10px] font-black uppercase text-outline tracking-widest mb-1">Medicina</span>
              <span className="block text-xl font-bold leading-tight">{medication?.name || '---'}</span>
            </div>
          </div>
        </motion.div>
        
        <button 
          onClick={onDismiss} 
          className="w-full bg-white text-on-background py-5 rounded-full font-black text-2xl active-tab-shadow active:scale-95 transition-all flex items-center justify-center gap-4 group ring-8 ring-white/20"
        >
          ¡ENTENDIDO!<ThumbsUp size={32} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [currentView, setView] = useState<View>(View.SPLASH);
  const [meds, setMeds] = useState<Medication[]>(INITIAL_MEDS);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [alertingMed, setAlertingMed] = useState<{ med: Medication; patient: Patient | undefined; minutesLeft: number } | null>(null);
  const [alarmAudio, setAlarmAudio] = useState<HTMLAudioElement | null>(null);
  const [triggeredAlerts, setTriggeredAlerts] = useState<Record<string, number[]>>({});

  // Alarm checker
  useEffect(() => {
    const sounds = {
      fire: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
      party: 'https://assets.mixkit.co/active_storage/sfx/1013/1013-preview.mp3',
      nature: 'https://assets.mixkit.co/active_storage/sfx/10/10-preview.mp3',
      robot: 'https://assets.mixkit.co/active_storage/sfx/1020/1020-preview.mp3'
    };
    
    const checkAlarms = () => {
      const now = new Date();
      const thresholds = [15, 10, 5];
      
      meds.forEach(med => {
        const [hours, minutes] = med.startTime.split(':').map(Number);
        const firstDose = new Date();
        firstDose.setHours(hours, minutes, 0, 0);

        let next = new Date(firstDose);
        while (next < now) {
          next.setHours(next.getHours() + med.frequencyHours);
        }

        const diffMs = next.getTime() - now.getTime();
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        thresholds.forEach(threshold => {
          // Check if we are at the threshold and haven't triggered it yet for this dose cycle
          const alertKey = `${med.id}-${next.getTime()}`;
          const alreadyTriggered = triggeredAlerts[alertKey]?.includes(threshold);

          if (diffMinutes === threshold && !alreadyTriggered && currentView !== View.ALERT) {
            const patient = patients.find(p => p.id === med.patientId);
            setAlertingMed({ med, patient, minutesLeft: threshold });
            setView(View.ALERT);
            
            // Mark as triggered
            setTriggeredAlerts(prev => ({
              ...prev,
              [alertKey]: [...(prev[alertKey] || []), threshold]
            }));

            // Play Sound
            const audio = new Audio(sounds[med.alertTheme as keyof typeof sounds] || sounds.fire);
            audio.loop = true;
            audio.play().catch(e => {
              console.log("Audio play blocked. Needs user interaction.");
              // Fallback: alert might still show visually
            });
            setAlarmAudio(audio);

            // Vibrate if supported
            if ('vibrate' in navigator) {
              navigator.vibrate([500, 200, 500, 200, 500]);
            }
          }
        });
      });
    };

    const interval = setInterval(checkAlarms, 10000); // Check every 10 seconds for more precision
    return () => clearInterval(interval);
  }, [meds, patients, currentView, triggeredAlerts]);

  const stopAlarm = () => {
    if (alarmAudio) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      setAlarmAudio(null);
    }
    if ('vibrate' in navigator) {
      navigator.vibrate(0); // Stop vibration
    }
    setAlertingMed(null);
    setView(View.AGENDA);
  };

  const handleStart = () => {
    if (patients.length === 0) {
      setShowAddPatient(true);
    } else {
      setView(View.AGENDA);
    }
  };

  const handleSavePatient = (form: any) => {
    const newPatient: Patient = {
      id: Math.random().toString(36).substr(2, 9),
      name: form.name,
      relation: form.relation,
      color: form.color,
      avatar: ''
    };
    setPatients([...patients, newPatient]);
    setShowAddPatient(false);
    if (currentView === View.SPLASH) {
      setView(View.AGENDA);
    }
  };

  const handleSaveMed = (form: any) => {
    const newMed: Medication = {
      id: Math.random().toString(36).substr(2, 9),
      patientId: form.patientId,
      name: form.medicineName || 'Nuevo Medicamento',
      dose: form.dose ? `${form.dose}mg` : '1 pastilla',
      startTime: form.startTime || '08:00',
      frequencyHours: form.frequencyHours,
      durationDays: form.durationDays,
      daysOfWeek: form.daysOfWeek,
      isPermanent: form.isPermanent,
      alertTheme: form.alertTheme,
      type: 'pill'
    };
    setMeds([...meds, newMed]);
    setView(View.AGENDA);
  };

  return (
    <div 
      className="min-h-screen font-sans bg-background selection:bg-secondary-container"
      onClick={() => {
        // Subtle interaction to enable audio on many devices
        if (alarmAudio && alarmAudio.paused) {
          alarmAudio.play().catch(() => {});
        }
      }}
    >
      <div className="md:max-w-md md:mx-auto md:min-h-screen md:bg-white md:shadow-2xl relative">
        <AnimatePresence mode="wait">
          {currentView === View.SPLASH && <SplashView key="splash" onStart={handleStart} />}
          {currentView !== View.SPLASH && currentView !== View.ALERT && <Header key="header" />}
          {currentView === View.AGENDA && <AgendaView key="agenda" medications={meds} patients={patients} />}
          {currentView === View.ADD && <AddView key="add" onSave={handleSaveMed} patients={patients} />}
          {currentView === View.PATIENTS && <PatientsView key="patients" patients={patients} onAdd={() => setShowAddPatient(true)} />}
          {currentView === View.ALERT && (
            <AlertView 
              key="alert" 
              onDismiss={stopAlarm} 
              medication={alertingMed?.med || null} 
              patient={alertingMed?.patient || null} 
              minutesLeft={alertingMed?.minutesLeft || 0}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showAddPatient && <AddPatientView key="add-patient" isFirst={patients.length === 0} onSave={handleSavePatient} onCancel={() => setShowAddPatient(false)} />}
        </AnimatePresence>
        {currentView !== View.SPLASH && currentView !== View.ALERT && !showAddPatient && <NavBar currentView={currentView} setView={setView} />}
      </div>
    </div>
  );
}
