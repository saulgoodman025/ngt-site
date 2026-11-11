const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const w=+process.argv[2]||1440,h=+process.argv[3]||900;
const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://127.0.0.1:8766/index.html');await p.waitForTimeout(1500);
const base=await p.evaluate(()=>document.getElementById('film-world').getBoundingClientRect().top+scrollY);
const H=await p.evaluate(()=>document.getElementById('film-world').offsetHeight);
console.log('base',base,'height',H);
for(const f of process.argv.slice(4)){await p.evaluate(v=>scrollTo(0,v),base+ +f*h);await p.waitForTimeout(1800);await p.screenshot({path:`shots/film-${w}-${f}.png`});
 const st=await p.evaluate(()=>[...document.querySelectorAll('.sw-scene')].map(s=>{const v=s.querySelector('video');return [(+s.style.opacity).toFixed(2), v?v.currentTime.toFixed(2):'-', v&&v.seekable.length?v.seekable.end(0).toFixed(1):'-']}));console.log(f,JSON.stringify(st))}
console.log('errors',errs.slice(0,5));await b.close()})();
