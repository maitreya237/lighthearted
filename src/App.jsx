import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart, Activity, Shield, Globe, Clock,
  FileSearch, BadgeCheck, Zap, Layers,
  ChevronRight, ExternalLink, RefreshCw,
  Filter, Search, AlertTriangle, Briefcase,
  MapPin, Database, Send
} from 'lucide-react';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  const [searchQuery, setSearchQuery] = useState('');

  // Office Timezones
  const offices = [
    { name: 'London', tz: 'Europe/London', status: 'Active', type: 'HQ/Regulatory' },
    { name: 'New York', tz: 'America/New_York', status: 'Active', type: 'Clinical/Commercial' },
    { name: 'Bengaluru', tz: 'Asia/Kolkata', status: 'Active', type: 'Engineering/R&D' }
  ];

  // Simulated Live Data
  const nhsUpdates = [
    { id: 1, type: 'NHS Trial', title: 'AI-Enhanced Photonics for Valve Disease', location: 'Barts Heart Centre', status: 'Recruiting', date: '2024-03-12' },
    { id: 2, type: 'Regulatory', title: 'MHRA Update on AI as Medical Device (SaMD)', location: 'UK Gov', status: 'Guidance Issued', date: '2024-03-10' },
    { id: 3, type: 'Grant', title: 'Innovate UK: Biomedical Catalyst Round 3', location: 'Swindon', status: 'Reporting Due', date: '2024-04-01' },
    { id: 4, type: 'Scientific', title: 'Non-invasive Hemodynamic Monitoring Benchmarking', location: 'MIT/Harvard', status: 'Paper Published', date: '2024-03-08' }
  ];

  const grants = [
    { name: 'Innovate UK Smart Grant', amount: '£450k', deadline: '2024-05-15', progress: 65, status: 'Drafting Narrative' },
    { name: 'R&D Tax Credit (FY23-24)', amount: 'Variable', deadline: '2024-09-30', progress: 20, status: 'Data Collection' },
    { name: 'Horizon Europe Health Call', amount: '€1.2M', deadline: '2024-07-10', progress: 10, status: 'Consortium Formation' }
  ];

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLastSync(new Date().toLocaleTimeString());
    }, 800);
  };

  return (
    <div className="flex h-screen bg-[#050505] text-slate-200 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-red-600 p-1.5 rounded-md shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            <Heart className="text-white fill-current" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm tracking-tight">LightHearted <span className="text-red-500 text-[10px] ml-1 px-1 border border-red-500 rounded">OPS</span></h1>
            <p className="text-[10px] text-slate-500 font-mono">v1.2.0-STABLE</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem icon={<Layers size={18} />} label="Global Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavItem icon={<Activity size={18} />} label="Clinical Intelligence" active={activeTab === 'trials'} onClick={() => setActiveTab('trials')} />
          <NavItem icon={<Shield size={18} />} label="Compliance & Risk" active={activeTab === 'compliance'} onClick={() => setActiveTab('compliance')} />
          <NavItem icon={<Database size={18} />} label="Grant Ledger" active={activeTab === 'grants'} onClick={() => setActiveTab('grants')} />
          <NavItem icon={<Briefcase size={18} />} label="VC Due Diligence" active={activeTab === 'vc'} onClick={() => setActiveTab('vc')} />
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <div className="bg-[#111] p-3 rounded-lg border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Network Status</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </div>
            <p className="text-[10px] text-slate-400">Linked to Glasgow/MIT Hubs</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#0a0a0a] border-b border-slate-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                type="text" 
                placeholder="Search grants, trials, or researchers..."
                className="bg-[#111] border border-slate-800 rounded-full py-1.5 pl-10 pr-4 text-xs w-80 focus:outline-none focus:border-red-500/50 transition-all"
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-4 items-center mr-4 border-r border-slate-800 pr-4">
              {offices.map(office => (
                <div key={office.name} className="flex flex-col items-end">
                  <span className="text-[9px] text-slate-500 uppercase">{office.name}</span>
                  <span className="text-xs font-mono text-white">
                    {new Date().toLocaleTimeString('en-GB', { timeZone: office.tz, hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
            <button onClick={refreshData} className="p-2 hover:bg-slate-800 rounded-full transition-colors relative">
              <RefreshCw size={16} className={loading ? 'animate-spin text-red-500' : 'text-slate-400'} />
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-500 flex items-center justify-center text-[10px] font-bold">MH</div>
              <span className="text-xs font-medium">M. Hiware</span>
            </div>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-y-auto bg-[#050505] p-8">
          {activeTab === 'overview' && <Overview grants={grants} nhsUpdates={nhsUpdates} />}
          {activeTab === 'trials' && <ClinicalIntelligence trials={nhsUpdates} />}
          {activeTab === 'compliance' && <ComplianceView />}
          {activeTab === 'grants' && <GrantLedger grants={grants} />}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
      active 
        ? 'bg-red-500/10 text-red-500 border border-red-500/20 shadow-sm' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    {icon}
    {label}
  </button>
);

const Overview = ({ grants, nhsUpdates }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard label="Active NHS Pilots" value="03" trend="+1" icon={<Activity size={16} />} color="text-red-500" />
      <StatCard label="Grant Funding Under Management" value="£1.2M" trend="Stable" icon={<Zap size={16} />} color="text-amber-500" />
      <StatCard label="Regulatory Phase" value="ISO 13485" trend="Audit Next" icon={<Shield size={16} />} color="text-blue-500" />
      <StatCard label="Global Team Nodes" value="22" trend="+2" icon={<Globe size={16} />} color="text-emerald-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Col: Real-time Feed */}
      <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#0d0d0d]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical & Regulatory Feed</h3>
          <button className="text-[10px] text-red-500 hover:underline">Sync with MHRA Portal</button>
        </div>
        <div className="divide-y divide-slate-800">
          {nhsUpdates.map(u => (
            <div key={u.id} className="p-4 hover:bg-slate-800/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded uppercase">{u.type}</span>
                <span className="text-[10px] text-slate-600">{u.date}</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white mb-1">{u.title}</h4>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin size={10} /> {u.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Col: Grant Progress */}
      <div className="bg-[#0a0a0a] rounded-xl border border-slate-800 p-6 flex flex-col">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
          <Zap size={14} className="text-amber-500" /> Operational Milestones
        </h3>
        <div className="space-y-6 flex-1">
          {grants.map(grant => (
            <div key={grant.name} className="space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm font-bold text-slate-200">{grant.name}</p>
                  <p className="text-[10px] text-slate-500 italic">{grant.status}</p>
                </div>
                <p className="text-xs font-mono text-slate-400">{grant.progress}%</p>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-red-600 h-full rounded-full transition-all duration-1000" style={{ width: `${grant.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 w-full py-2 bg-white text-black font-bold text-xs rounded-lg hover:bg-slate-200 transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
          New Grant Submission
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  </div>
);

const ClinicalIntelligence = ({ trials }) => (
  <div className="space-y-6 animate-in slide-in-from-right-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-white">NHS & Clinical Research Database</h2>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 hover:bg-slate-800 transition-all">
          <Filter size={14} /> Filter Results
        </button>
        <button className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded text-xs text-white font-bold hover:bg-red-700 transition-all">
          <RefreshCw size={14} /> Live Sync
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {trials.map(trial => (
        <div key={trial.id} className="bg-[#0a0a0a] border border-slate-800 p-6 rounded-xl hover:border-red-500/30 transition-all group">
          <div className="flex justify-between mb-4">
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">{trial.status}</span>
            <ExternalLink size={14} className="text-slate-600 group-hover:text-slate-300 cursor-pointer" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{trial.title}</h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Investigation of non-invasive photonic markers in cardiology patients with primary valve complications. Pilot site active at {trial.location}.
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-[10px] text-slate-500 font-mono tracking-tighter">REF_ID: LH-CLN-2024-0{trial.id}</span>
            <button className="text-xs text-red-500 font-medium hover:underline">Download Documentation</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GrantLedger = ({ grants }) => (
  <div className="space-y-6">
    <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl flex justify-between items-center">
      <div>
        <h3 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-1">Upcoming Deadline</h3>
        <p className="text-xl text-white font-bold">Innovate UK: Biomedical Catalyst <span className="text-slate-500 font-normal ml-2">in 14 Days</span></p>
      </div>
      <button className="bg-red-600 px-6 py-2 rounded-lg text-white font-bold text-sm shadow-lg shadow-red-900/20">Review Submission</button>
    </div>

    <div className="bg-[#0a0a0a] rounded-xl border border-slate-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#111] border-b border-slate-800">
          <tr>
            <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Grant Body</th>
            <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Project Value</th>
            <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Next Deadline</th>
            <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Owner</th>
            <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {grants.map(grant => (
            <tr key={grant.name} className="hover:bg-slate-800/20 transition-colors">
              <td className="px-6 py-4 font-medium text-white">{grant.name}</td>
              <td className="px-6 py-4 text-slate-300 font-mono">{grant.amount}</td>
              <td className="px-6 py-4 text-slate-400">{grant.deadline}</td>
              <td className="px-6 py-4">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 border border-[#0a0a0a] flex items-center justify-center text-[8px] font-bold">JD</div>
                  <div className="w-6 h-6 rounded-full bg-emerald-500 border border-[#0a0a0a] flex items-center justify-center text-[8px] font-bold">MH</div>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ComplianceView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-[#0a0a0a] p-8 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-red-500" size={24} />
          <h2 className="text-xl font-bold text-white">ISO 13485 Readiness Monitor</h2>
        </div>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h4 className="text-xs text-slate-500 uppercase font-bold tracking-widest">Completed Clauses</h4>
            <div className="space-y-3">
              <CheckItem label="4.1 General Requirements" checked={true} />
              <CheckItem label="4.2 Documentation Requirements" checked={true} />
              <CheckItem label="5.0 Management Responsibility" checked={true} />
              <CheckItem label="6.0 Resource Management" checked={false} />
            </div>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="50.2" className="text-red-600" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">80%</div>
            </div>
            <p className="text-xs text-slate-400 font-medium">Audit Readiness Score</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0a0a] p-6 rounded-xl border border-slate-800">
        <h3 className="font-bold text-white mb-4">Recent Quality Events</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded border border-slate-800">
            <span className="text-xs text-slate-300">New CAPA issued (ID: 2024-042)</span>
            <span className="text-[10px] text-slate-500">2h ago</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded border border-slate-800">
            <span className="text-xs text-slate-300">Risk Assessment updated for v2.0 Photonics</span>
            <span className="text-[10px] text-slate-500">1d ago</span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
      <h3 className="font-bold text-white mb-6 flex items-center gap-2">
        <AlertTriangle className="text-amber-500" size={18} /> Risk Register
      </h3>
      <div className="space-y-4">
        <RiskCard level="High" label="Regulatory Delay" sub="MHRA review timeframe increased" />
        <RiskCard level="Medium" label="Supply Chain" sub="Bespoke sensor lead times (12w)" />
        <RiskCard level="Low" label="Patent Filing" sub="US provisionals pending conversion" />
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, trend, icon, color }) => (
  <div className="bg-[#0a0a0a] p-5 rounded-xl border border-slate-800 shadow-xl">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2 bg-[#111] rounded-lg ${color}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">{trend}</span>
    </div>
    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{label}</p>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

const CheckItem = ({ label, checked }) => (
  <div className="flex items-center gap-3">
    <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-700'}`}>
      {checked && <BadgeCheck size={10} className="text-white" />}
    </div>
    <span className={`text-xs ${checked ? 'text-slate-300' : 'text-slate-600 italic'}`}>{label}</span>
  </div>
);

const RiskCard = ({ level, label, sub }) => (
  <div className="p-4 bg-[#050505] rounded-lg border border-slate-800 flex items-start gap-4">
    <div className={`w-1 h-10 rounded-full ${level === 'High' ? 'bg-red-500' : level === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
    <div>
      <p className="text-xs font-bold text-slate-200 uppercase tracking-tight">{label}</p>
      <p className="text-[10px] text-slate-500 mt-1">{sub}</p>
    </div>
  </div>
);

export default App;
