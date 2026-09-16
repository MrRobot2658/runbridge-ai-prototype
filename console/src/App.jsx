import React, { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Box,
  Check,
  ChevronDown,
  CircleHelp,
  Clipboard,
  Code2,
  CreditCard,
  ExternalLink,
  Eye,
  EyeOff,
  Gauge,
  KeyRound,
  Layers3,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  WalletCards,
  X,
  Zap,
} from 'lucide-react';

const nav = [
  { section: 'Workspace' },
  { id: 'overview', label: 'Overview', icon: Gauge },
  { id: 'playground', label: 'Playground', icon: MessageSquareText },
  { id: 'models', label: 'Models', icon: Box },
  { section: 'Build' },
  { id: 'keys', label: 'API Keys', icon: KeyRound },
  { id: 'usage', label: 'Usage', icon: BarChart3 },
  { id: 'activity', label: 'Activity', icon: Activity },
  { section: 'Manage' },
  { id: 'billing', label: 'Billing', icon: WalletCards },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const modelData = [
  { name: 'GPT-5.2', provider: 'OpenAI', tag: 'Reasoning', input: '$1.75', output: '$14.00', latency: '820 ms', color: '#0b64e5' },
  { name: 'Claude Sonnet 4.5', provider: 'Anthropic', tag: 'Coding', input: '$3.00', output: '$15.00', latency: '690 ms', color: '#3975d5' },
  { name: 'Gemini 2.5 Pro', provider: 'Google', tag: 'Multimodal', input: '$1.25', output: '$10.00', latency: '740 ms', color: '#1386ef' },
  { name: 'DeepSeek V3.2', provider: 'DeepSeek', tag: 'Fast', input: '$0.28', output: '$0.42', latency: '510 ms', color: '#2762ba' },
  { name: 'Grok 4.1 Fast', provider: 'xAI', tag: 'Realtime', input: '$0.20', output: '$0.50', latency: '460 ms', color: '#194f9d' },
  { name: 'Qwen3 Max', provider: 'Alibaba', tag: 'Long context', input: '$1.20', output: '$6.00', latency: '630 ms', color: '#479bf4' },
];

const initialKeys = [
  { id: 1, name: 'Production', key: 'rb_live_••••••••••••a93f', created: 'Sep 12, 2026', used: '2 min ago' },
  { id: 2, name: 'Local development', key: 'rb_test_••••••••••••3bd8', created: 'Aug 28, 2026', used: 'Yesterday' },
];

const chart = [34, 52, 41, 66, 54, 72, 68, 91, 77, 96, 82, 112, 101, 124];

function Brand({ compact = false }) {
  return (
    <div className="brand">
      <div className="brand-mark"><img src="/runbridge-logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 5 }} /></div>
      {!compact && <span>runbridge<span className="brand-dot">.ai</span></span>}
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return <div className="toast"><Check size={16} />{message}</div>;
}

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head"><h3>{title}</h3><button className="icon-btn" onClick={onClose}><X size={18} /></button></div>
        {children}
      </div>
    </div>
  );
}

function MiniChart() {
  const points = chart.map((v, i) => `${(i / (chart.length - 1)) * 100},${90 - (v / 130) * 75}`).join(' ');
  return (
    <div className="chart-wrap">
      <div className="chart-grid"><i /><i /><i /><i /></div>
      <svg viewBox="0 0 100 90" preserveAspectRatio="none" aria-label="API usage chart">
        <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1475ed" stopOpacity=".24" /><stop offset="1" stopColor="#1475ed" stopOpacity="0" /></linearGradient></defs>
        <polygon points={`0,90 ${points} 100,90`} fill="url(#area)" />
        <polyline points={points} fill="none" stroke="#0872ef" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="chart-days"><span>Sep 3</span><span>Sep 6</span><span>Sep 9</span><span>Sep 12</span><span>Today</span></div>
    </div>
  );
}

function Overview({ navigate }) {
  return (
    <>
      <div className="welcome-row">
        <div><p className="eyebrow">GOOD MORNING, ALEX</p><h1>Build faster with every model.</h1><p className="lede">Route, observe, and optimize your AI traffic from one reliable API.</p></div>
        <button className="primary" onClick={() => navigate('playground')}><Sparkles size={16} />Open playground</button>
      </div>
      <section className="metrics">
        <div className="metric"><span>Credits</span><strong>$84.20</strong><small><span className="up">+ $50.00</span> this month</small></div>
        <div className="metric"><span>API requests</span><strong>128,492</strong><small><span className="up">↑ 18.4%</span> vs last month</small></div>
        <div className="metric"><span>Total tokens</span><strong>9.84M</strong><small>7.2M input · 2.6M output</small></div>
        <div className="metric"><span>Success rate</span><strong>99.94%</strong><small><span className="live-dot" /> All systems operational</small></div>
      </section>
      <div className="overview-grid">
        <section className="panel usage-panel">
          <div className="panel-head"><div><h2>API usage</h2><p>Requests across all models</p></div><button className="select-btn">Last 14 days <ChevronDown size={14} /></button></div>
          <MiniChart />
        </section>
        <section className="panel quickstart">
          <div className="panel-head"><div><h2>Quick start</h2><p>Your first request in minutes</p></div><BookOpen size={18} /></div>
          <ol>
            <li className="done"><span><Check size={13} /></span><div><b>Create an API key</b><small>Production key is ready</small></div></li>
            <li><span>2</span><div><b>Send your first request</b><small>OpenAI-compatible API</small></div></li>
            <li><span>3</span><div><b>Set a budget alert</b><small>Stay ahead of spend</small></div></li>
          </ol>
          <button className="secondary wide" onClick={() => navigate('keys')}>View API keys <ArrowRight size={15} /></button>
        </section>
      </div>
      <section className="panel model-table-panel">
        <div className="panel-head"><div><h2>Popular models</h2><p>Most used in your workspace this week</p></div><button className="text-btn" onClick={() => navigate('models')}>Browse all models <ArrowRight size={14} /></button></div>
        <div className="model-list">
          {modelData.slice(0, 4).map((m, i) => <ModelRow model={m} key={m.name} share={[38, 27, 19, 9][i]} />)}
        </div>
      </section>
    </>
  );
}

function ModelIcon({ model }) {
  return <div className="model-icon" style={{ '--model': model.color }}>{model.provider.slice(0, 1)}</div>;
}

function ModelRow({ model, share }) {
  return (
    <div className="model-row">
      <ModelIcon model={model} />
      <div className="model-name"><b>{model.name}</b><small>{model.provider}</small></div>
      <span className="tag">{model.tag}</span>
      {share != null && <div className="share"><span><i style={{ width: `${share * 2.1}%` }} /></span><small>{share}%</small></div>}
      <div className="model-price"><small>Input / 1M</small><b>{model.input}</b></div>
      <div className="model-price"><small>Output / 1M</small><b>{model.output}</b></div>
      <button className="icon-btn"><MoreHorizontal size={18} /></button>
    </div>
  );
}

function Models() {
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState('All');
  const filtered = modelData.filter((m) => (provider === 'All' || m.provider === provider) && `${m.name} ${m.provider}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <PageTitle title="Models" subtitle="One API, the best models from every provider." action={<button className="secondary"><BookOpen size={16} />API documentation</button>} />
      <div className="toolbar"><label className="search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search models" /></label><div className="pills">{['All', 'OpenAI', 'Anthropic', 'Google', 'DeepSeek'].map((p) => <button key={p} className={provider === p ? 'active' : ''} onClick={() => setProvider(p)}>{p}</button>)}</div></div>
      <div className="model-cards">{filtered.map((m) => <article className="model-card" key={m.name}><div className="model-card-top"><ModelIcon model={m} /><span className="tag">{m.tag}</span></div><h3>{m.name}</h3><p>{m.provider} · 128K context</p><div className="model-specs"><span><small>Input / 1M</small><b>{m.input}</b></span><span><small>Output / 1M</small><b>{m.output}</b></span><span><small>Latency</small><b>{m.latency}</b></span></div><button className="secondary wide">View model <ArrowRight size={15} /></button></article>)}</div>
    </>
  );
}

function Playground({ showToast }) {
  const [model, setModel] = useState('GPT-5.2');
  const [prompt, setPrompt] = useState('Explain why a unified AI gateway makes production systems more resilient.');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const run = () => { setLoading(true); setAnswer(''); setTimeout(() => { setAnswer('A unified AI gateway decouples your application from individual providers. It adds consistent authentication, automatic fallbacks, unified observability, and cost-aware routing—so a provider outage or model migration becomes a configuration change instead of an emergency release.'); setLoading(false); showToast('Mock response completed'); }, 650); };
  return (
    <>
      <PageTitle title="Playground" subtitle="Test prompts across providers with a consistent interface." action={<button className="secondary"><Code2 size={16} />View code</button>} />
      <div className="playground">
        <section className="chat-panel panel"><div className="play-head"><div className="model-picker"><Bot size={18} /><select value={model} onChange={(e) => setModel(e.target.value)}>{modelData.map((m) => <option key={m.name}>{m.name}</option>)}</select></div><span className="status-chip"><span />Ready</span></div><div className="chat-space">{answer ? <div className="answer"><div className="assistant-avatar"><Sparkles size={16} /></div><div><b>{model}</b><p>{answer}</p><small>142 tokens · 0.8s · mock response</small></div></div> : <div className="empty-chat"><div><Sparkles size={23} /></div><h3>Start a conversation</h3><p>Responses are locally mocked in this prototype.</p></div>}</div><div className="composer"><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} /><button className="send-btn" onClick={run} disabled={loading}>{loading ? <span className="spinner" /> : <Send size={17} />}</button></div></section>
        <aside className="params panel"><h3>Parameters</h3><label>Temperature <b>0.7</b><input type="range" min="0" max="100" defaultValue="70" /></label><label>Max tokens <input className="field" defaultValue="1024" /></label><label>Top P <b>1.0</b><input type="range" min="0" max="100" defaultValue="100" /></label><div className="toggle-line"><span>Stream response</span><button className="toggle on"><i /></button></div><div className="toggle-line"><span>JSON mode</span><button className="toggle"><i /></button></div><hr /><h3>Request estimate</h3><div className="estimate"><span>Input</span><b>14 tokens</b><span>Estimated cost</span><b>$0.00003</b></div></aside>
      </div>
    </>
  );
}

function Keys({ showToast }) {
  const [keys, setKeys] = useState(initialKeys);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const create = () => { if (!name.trim()) return; setKeys([{ id: Date.now(), name, key: 'rb_live_••••••••••••' + Math.random().toString(16).slice(2, 6), created: 'Just now', used: 'Never' }, ...keys]); setModal(false); setName(''); showToast('API key created'); };
  return (
    <>
      <PageTitle title="API Keys" subtitle="Authenticate requests to the Runbridge API." action={<button className="primary" onClick={() => setModal(true)}><Plus size={16} />Create key</button>} />
      <div className="notice"><ShieldCheck size={19} /><div><b>Keep your API keys secure</b><p>Never expose keys in client-side code. Use environment variables or a secrets manager.</p></div><button className="text-btn">Read security guide</button></div>
      <section className="panel table-panel"><div className="table-header"><span>Name</span><span>Key</span><span>Created</span><span>Last used</span><span /></div>{keys.map((key) => <div className="key-row" key={key.id}><div><span className="key-icon"><KeyRound size={16} /></span><b>{key.name}</b></div><code>{key.key}</code><span>{key.created}</span><span>{key.used}</span><div><button className="icon-btn" onClick={() => showToast('Key copied')}><Clipboard size={16} /></button><button className="icon-btn danger" onClick={() => { setKeys(keys.filter((k) => k.id !== key.id)); showToast('API key revoked'); }}><Trash2 size={16} /></button></div></div>)}</section>
      {modal && <Modal title="Create API key" onClose={() => setModal(false)}><p className="modal-copy">Give your key a recognizable name. The prototype generates a mock credential.</p><label className="form-label">Key name<input className="field" autoFocus placeholder="e.g. Staging server" value={name} onChange={(e) => setName(e.target.value)} /></label><div className="modal-actions"><button className="secondary" onClick={() => setModal(false)}>Cancel</button><button className="primary" onClick={create}>Create key</button></div></Modal>}
    </>
  );
}

function Usage() {
  return <><PageTitle title="Usage" subtitle="Understand requests, tokens, spend, and model performance." action={<button className="select-btn">Last 30 days <ChevronDown size={14} /></button>} /><section className="metrics"><div className="metric"><span>Total spend</span><strong>$126.84</strong><small><span className="up">↓ 8.2%</span> per request</small></div><div className="metric"><span>Requests</span><strong>284.3K</strong><small>9.4K daily average</small></div><div className="metric"><span>Tokens</span><strong>21.6M</strong><small>74% input tokens</small></div><div className="metric"><span>Avg. latency</span><strong>742 ms</strong><small><span className="up">↓ 62 ms</span> improvement</small></div></section><section className="panel usage-large"><div className="panel-head"><div><h2>Requests over time</h2><p>Daily request volume across your workspace</p></div><div className="legend"><span><i />Requests</span><span><i />Errors</span></div></div><MiniChart /></section><section className="panel model-table-panel"><div className="panel-head"><div><h2>Usage by model</h2><p>Current billing period</p></div></div><div className="model-list">{modelData.slice(0, 5).map((m, i) => <ModelRow model={m} key={m.name} share={[41, 24, 18, 10, 7][i]} />)}</div></section></>;
}

function Billing({ showToast }) {
  return <><PageTitle title="Billing" subtitle="Manage credits, payment methods, and invoices." action={<button className="primary" onClick={() => showToast('Mock checkout opened')}><Plus size={16} />Add credits</button>} /><div className="billing-grid"><section className="balance-card"><div><span>Available balance</span><strong>$84.20</strong><small>Auto-recharge is enabled</small></div><div className="balance-visual"><WalletCards size={34} /></div></section><section className="panel auto-card"><div><h3>Auto-recharge</h3><p>Add $50 when balance falls below $10.</p></div><button className="toggle on"><i /></button></section></div><section className="panel payment-panel"><div className="panel-head"><div><h2>Payment method</h2><p>Used for auto-recharge and one-time payments</p></div><button className="secondary">Update</button></div><div className="credit-card-row"><div className="visa">VISA</div><div><b>Visa ending in 4242</b><small>Expires 08 / 29</small></div><span className="tag">Default</span></div></section><section className="panel table-panel invoices"><div className="panel-head"><div><h2>Invoices</h2><p>Recent payments and receipts</p></div></div>{['Sep 12, 2026|$50.00|Paid', 'Aug 24, 2026|$100.00|Paid', 'Aug 03, 2026|$50.00|Paid'].map((v) => { const [date, amount, state] = v.split('|'); return <div className="invoice-row" key={date}><span>{date}</span><b>{amount}</b><span className="paid"><Check size={13} />{state}</span><button className="text-btn">Receipt <ExternalLink size={13} /></button></div>; })}</section></>;
}

function GenericPage({ id, showToast }) {
  const configs = {
    activity: ['Activity', 'Monitor recent requests and workspace events.', Activity],
    team: ['Team', 'Invite collaborators and manage workspace access.', Users],
    settings: ['Settings', 'Configure workspace preferences and defaults.', Settings],
  };
  const [title, subtitle, Icon] = configs[id];
  return <><PageTitle title={title} subtitle={subtitle} action={id === 'team' ? <button className="primary" onClick={() => showToast('Invitation sent')}><Plus size={16} />Invite member</button> : null} /><section className="panel generic"><div className="generic-icon"><Icon size={24} /></div><h2>{id === 'activity' ? 'Recent workspace events' : id === 'team' ? 'Workspace members' : 'Workspace profile'}</h2>{id === 'activity' ? ['GPT-5.2 request completed · 812 ms', 'Production API key used · US East', 'Balance auto-recharged · $50.00', 'Claude Sonnet 4.5 request completed · 691 ms'].map((x, i) => <div className="activity-row" key={x}><span className="activity-dot" /><div><b>{x}</b><small>{i * 7 + 2} minutes ago</small></div></div>) : id === 'team' ? ['Alex Morgan|Owner|alex@runbridge.ai', 'Maya Chen|Developer|maya@example.com', 'Jordan Lee|Viewer|jordan@example.com'].map((x) => { const [n, r, e] = x.split('|'); return <div className="member-row" key={e}><span className="avatar small">{n.split(' ').map((p) => p[0]).join('')}</span><div><b>{n}</b><small>{e}</small></div><span className="tag">{r}</span></div>; }) : <div className="settings-form"><label className="form-label">Workspace name<input className="field" defaultValue="Acme AI" /></label><label className="form-label">Default model<select className="field" defaultValue="GPT-5.2">{modelData.map((m) => <option key={m.name}>{m.name}</option>)}</select></label><label className="form-label">Monthly budget<input className="field" defaultValue="$500" /></label><button className="primary" onClick={() => showToast('Settings saved')}>Save changes</button></div>}</section></>;
}

function PageTitle({ title, subtitle, action }) { return <div className="page-title"><div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>; }

export default function App() {
  const [page, setPage] = useState('overview');
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState('');
  const showToast = (message) => { setToast(message); window.clearTimeout(window.__rbToast); window.__rbToast = window.setTimeout(() => setToast(''), 2200); };
  const content = useMemo(() => {
    if (page === 'overview') return <Overview navigate={setPage} />;
    if (page === 'models') return <Models />;
    if (page === 'playground') return <Playground showToast={showToast} />;
    if (page === 'keys') return <Keys showToast={showToast} />;
    if (page === 'usage') return <Usage />;
    if (page === 'billing') return <Billing showToast={showToast} />;
    return <GenericPage id={page} showToast={showToast} />;
  }, [page]);
  const go = (id) => { setPage(id); setMobileNav(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
        <div className="sidebar-brand"><Brand /><button className="mobile-close" onClick={() => setMobileNav(false)}><X size={20} /></button></div>
        <button className="workspace-switch"><span className="workspace-logo">A</span><span><b>Acme AI</b><small>Production</small></span><ChevronDown size={15} /></button>
        <nav>{nav.map((item, i) => item.section ? <div className="nav-section" key={`${item.section}-${i}`}>{item.section}</div> : <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => go(item.id)}><item.icon size={17} /><span>{item.label}</span>{item.id === 'billing' && <small>$84.20</small>}</button>)}</nav>
        <div className="sidebar-bottom"><button><CircleHelp size={17} />Help & docs</button><div className="account"><span className="avatar">AM</span><div><b>Alex Morgan</b><small>alex@example.com</small></div><MoreHorizontal size={17} /></div></div>
      </aside>
      {mobileNav && <div className="nav-scrim" onClick={() => setMobileNav(false)} />}
      <div className="main-shell">
        <header><button className="menu-btn" onClick={() => setMobileNav(true)}><Menu size={20} /></button><div className="mobile-brand"><Brand /></div><div className="header-spacer" /><button className="docs-btn"><BookOpen size={16} />Docs</button><button className="icon-btn notification"><Bell size={18} /><i /></button><button className="credit-pill" onClick={() => go('billing')}><CreditCard size={15} />$84.20</button><span className="avatar header-avatar">AM</span></header>
        <main>{content}</main>
      </div>
      <Toast message={toast} />
    </div>
  );
}
