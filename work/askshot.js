const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const cols=[['#ff8a1f','#1a0f00'],['#ffc53d','#1f1500'],['#2fd4a7','#04241b'],['#ffffff','#071224']];
for(let i=0;i<cols.length;i++){const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8766/index.html?lang=ko');await p.waitForTimeout(1200);
await p.evaluate(c=>{document.documentElement.style.setProperty('--ask-bg',c[0]);document.documentElement.style.setProperty('--ask-ink',c[1]);scrollTo(0,1.56*900)},cols[i]);await p.waitForTimeout(1800);
await p.screenshot({path:`shots/ask-${i+1}.png`,clip:{x:760,y:0,width:680,height:72}});await p.close()}
const p=await b.newPage({viewport:{width:1440,height:900}});await p.goto('http://127.0.0.1:8766/index.html');await p.waitForTimeout(1200);
await p.click('a.ask');await p.waitForTimeout(2200);await p.screenshot({path:'shots/ask-land.png'});
const m=await b.newPage({viewport:{width:390,height:844}});await m.goto('http://127.0.0.1:8766/index.html');await m.waitForTimeout(1200);await m.screenshot({path:'shots/ask-m.png',clip:{x:0,y:0,width:390,height:120}});
console.log('overflow m', await m.evaluate(()=>document.documentElement.scrollWidth-innerWidth));
await b.close()})();
