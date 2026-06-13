import React, { useState, useEffect } from 'react';

function App() {
 
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('devlogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [topic, setTopic] = useState('');
  const [accomplishments, setAccomplishments] = useState('');
  const [blockers, setBlockers] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('devlogs', JSON.stringify(logs));
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim() || !accomplishments.trim()) return;

    const newLog = {
      id: Date.now(),
      date,
      topic,
      accomplishments,
      blockers: blockers || 'None! Plain sailing today. ⛵'
    };

    setLogs([newLog, ...logs]);
    
    
    setTopic('');
    setAccomplishments('');
    setBlockers('');
  };

  const deleteLog = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const copyAsMarkdown = (log, index) => {
    const markdown = `### 📅 Log Entry: ${log.date}\n` +
                     `* **Core Tech/Topic:** \`${log.topic}\`\n` +
                     `* **What I accomplished:** ${log.accomplishments}\n` +
                     `* **Roadblocks/Blockers:** ${log.blockers}\n` +
                     `---`;
    
    navigator.clipboard.writeText(markdown);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'Segoe UI, sans-serif', color: '#2d3748' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ margin: '0', fontSize: '28px', color: '#4c51bf' }}> DevLog</h1>
        <p style={{ margin: '5px 0 0 0', color: '#718096' }}>Document your daily learning milestones and export them instantly to Markdown.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        
        {/* LEFT COMPONENT: The Input Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#f7fafc', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
          <h3 style={{ marginTop: '0', color: '#2d3748', marginBottom: '20px' }}>Log Today's Progress</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>Tech Stack / Main Topic</label>
            <input type="text" placeholder="e.g., React Context API, Next.js Routing" value={topic} onChange={(e) => setTopic(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>What did you build/learn?</label>
            <textarea placeholder="Summarize your key achievements..." value={accomplishments} onChange={(e) => setAccomplishments(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', boxSizing: 'border-box', minHeight: '80px', resize: 'vertical' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>Roadblocks & Blockers (Optional)</label>
            <input type="text" placeholder="Any bugs or concepts you struggled with?" value={blockers} onChange={(e) => setBlockers(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#4c51bf', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
            Save Entry Locally 💾
          </button>
        </form>

        {/* RIGHT COMPONENT: Interactive History  */}
        <div>
          <h3 style={{ marginTop: '0', color: '#2d3748', marginBottom: '20px' }}>Timeline Log Feed ({logs.length})</h3>
          
          {logs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', border: '2px dashed #e2e8f0', borderRadius: '12px', color: '#a0aec0' }}>
              <p style={{ margin: '0', fontSize: '16px' }}>No logs tracked yet.</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '13px' }}>Fill out the dashboard form to start your log file timeline!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {logs.map((log, index) => (
                <div key={log.id} style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#718096', backgroundColor: '#edf2f7', padding: '3px 8px', borderRadius: '4px' }}>{log.date}</span>
                    <button onClick={() => deleteLog(log.id)} style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                  </div>
                  
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#2d3748' }}>🚀 Learn: <code style={{ backgroundColor: '#faf5ff', color: '#6b46c1', padding: '2px 6px', borderRadius: '4px', fontSize: '14px' }}>{log.topic}</code></h4>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', lineHeight: '1.5' }}><strong>Accomplished:</strong> {log.accomplishments}</p>
                  <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#4a5568' }}><strong>Blockers:</strong> {log.blockers}</p>
                  
                  <button onClick={() => copyAsMarkdown(log, index)} style={{ width: '100%', padding: '8px', backgroundColor: copiedIndex === index ? '#48bb78' : '#e2e8f0', color: copiedIndex === index ? '#fff' : '#4a5568', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }}>
                    {copiedIndex === index ? 'Copied Markdown! 🎉' : '📋 Copy as Markdown String'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;