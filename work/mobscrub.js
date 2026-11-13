const { chromium, devices } = require('playwright');
(async()=>{const b=await chromium.launch();
for(const dev of ['iPhone 13','desktop']){const ctx=await b.newContext(dev==='desktop'?{viewport:{width:1440,height:900}}:{...devices[dev]});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://127.0.0.1:8766/index.html');await p.waitForTimeout(1500);if(dev!=='desktop')await p.touchscreen.tap(200,400);
const h=await p.evaluate(()=>innerHeight);let maxV=0;const rows=[];
const walk=async(from,to,step)=>{for(let f=from;step>0?f<=to:f>=to;f+=step){await p.evaluate(v=>scrollTo(0,v),f*h);await p.waitForTimeout(350);
 const st=await p.evaluate(()=>{const sc=[...document.querySelectorAll('.sw-scene')];return {n:document.querySelectorAll('.sw-scene__video').length,vis:sc.map((s,i)=>{const v=s.querySelector('video');return +s.style.opacity>0.5?i+':'+(v&&s.classList.contains('has-clip')?v.currentTime.toFixed(1):'STILL'):''}).filter(Boolean).join(' ')}});
 maxV=Math.max(maxV,st.n);rows.push(f.toFixed(2)+' ['+st.n+'] '+st.vis)}};
await walk(0,9,0.25);await walk(9,0,-0.5);
console.log(dev,'max videos alive',maxV,'stills while visible',rows.filter(r=>/STILL/.test(r)).length,'/',rows.length,errs);console.log(rows.filter((r,i)=>i%3==0||/STILL/.test(r)).join('\n'))}
await b.close()})();
