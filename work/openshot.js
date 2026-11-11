const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const w=+process.argv[2]||1440,h=+process.argv[3]||900;
const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://127.0.0.1:8766/index.html');await p.waitForTimeout(2500);
for(const f of process.argv.slice(4)){await p.evaluate(v=>scrollTo(0,v),+f*h);await p.waitForTimeout(1500);await p.screenshot({path:`shots/open-${w}-${f}.png`})}
console.log('errors',errs.slice(0,3), await p.evaluate(()=>document.getElementById('film-world').offsetHeight/innerHeight));await b.close()})();
