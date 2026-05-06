export default function DocsPortal() {
  return (
    <div style={{display:'flex',minHeight:'100vh',backgroundColor:'#05070D'}}>
      <aside style={{width:240,backgroundColor:'#0B1020',borderRight:'1px solid rgba(255,255,255,0.07)',padding:24}}>
        <div style={{marginBottom:32,fontSize:20,fontWeight:600,color:'#F5F8FF'}}>CUBOID</div>
        <nav style={{display:'flex',flexDirection:'column',gap:8}}>
          {['Getting Started','Authentication','Wallet API','Transaction API','Quotes','Webhooks','SDKs'].map(item => (
            <a key={item} href="#" style={{padding:'8px 12px',borderRadius:8,color:'#7183A6',textDecoration:'none',fontSize:14}}>{item}</a>
          ))}
        </nav>
      </aside>
      <main style={{flex:1,padding:48}}>
        <h1 style={{fontSize:32,fontWeight:300,color:'#F5F8FF',marginBottom:16}}>Developer Documentation</h1>
        <p style={{color:'#AAB7D1',marginBottom:32,maxWidth:600}}>Built for institutions. JSON-first API.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16,maxWidth:800}}>
          {['Getting Started','API Reference','Webhooks','SDKs','Authentication','Error Codes'].map(item => (
            <div key={item} style={{padding:24,backgroundColor:'rgba(255,255,255,0.06)',borderRadius:16,border:'1px solid rgba(255,255,255,0.12)'}}>
              <div style={{fontSize:16,fontWeight:500,color:'#F5F8FF',marginBottom:8}}>{item}</div>
              <div style={{fontSize:14,color:'#7183A6'}}>Learn more →</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}