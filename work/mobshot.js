const { chromium, devices } = require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();const reqs=[];const errs=[];
p.on('request',r=>{if(/\.mp4/.test(r.url()))reqs.push(r.url().split('/').pop())});p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://127.0.0.1:8766/index.html');await p.waitForTimeout(2000);
const h=await p.evaluate(()=>innerHeight);
for(const f of [1.2,3.8,5.3,8.9]){await p.evaluate(v=>scrollTo(0,v),f*h);await p.waitForTimeout(2500);await p.screenshot({path:`shots/mob-${f}.png`});}
console.log('clips',[...new Set(reqs)].join(' '));console.log('video size',await p.evaluate(()=>{const v=document.querySelector('.sw-scene__video');return v?v.videoWidth+'x'+v.videoHeight:'none'}),errs);
await b.close()})();
