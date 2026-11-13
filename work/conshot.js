const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:900}});await p.goto('http://127.0.0.1:8766/index.html');await p.waitForTimeout(1200);
await p.click('a.ask');await p.waitForTimeout(2600);await p.screenshot({path:'shots/con-ko.png'});
const q=await b.newPage({viewport:{width:1440,height:900}});await q.goto('http://127.0.0.1:8766/privacy.html?lang=en');await q.waitForTimeout(1000);
await q.click('a.ask');await q.waitForLoadState('load');await q.waitForTimeout(2600);console.log('from privacy ->',q.url());await q.screenshot({path:'shots/con-en.png'});
const m=await b.newPage({viewport:{width:390,height:844}});await m.goto('http://127.0.0.1:8766/index.html?lang=ko');await m.waitForTimeout(1200);await m.click('a.ask');await m.waitForTimeout(2600);await m.screenshot({path:'shots/con-m.png'});
console.log('overflow', await m.evaluate(()=>document.documentElement.scrollWidth-innerWidth));await b.close()})();
