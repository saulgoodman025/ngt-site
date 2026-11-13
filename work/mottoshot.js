const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
for(const l of ['ja','zh','ko']){const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await p.goto('http://127.0.0.1:8766/index.html?lang='+l);await p.waitForTimeout(1500);
await p.screenshot({path:`shots/motto-${l}.png`,clip:{x:0,y:230,width:1440,height:420}});
await p.evaluate(()=>scrollTo(0,document.body.scrollHeight));await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const e=document.querySelector('.foot__motto').getBoundingClientRect();return {y:e.top,h:e.height}});
await p.screenshot({path:`shots/fmotto-${l}.png`,clip:{x:0,y:Math.max(0,r.y-20),width:1440,height:r.h+40}});await p.close()}
await b.close()})();
