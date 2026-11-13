const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
for(const [l,w,h] of [['ko',1440,900],['en',1440,900],['ja',390,844]]){const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://127.0.0.1:8766/privacy.html?lang='+l);await p.waitForTimeout(1500);
console.log(l,await p.title(),'| overflow',await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth),'| visible doc',await p.evaluate(()=>[...document.querySelectorAll('[data-pp]')].filter(a=>!a.hidden).map(a=>a.dataset.pp).join()),errs);
await p.screenshot({path:`shots/pp-${l}-1.png`});await p.evaluate(h=>scrollTo(0,h*1.1),h);await p.waitForTimeout(900);await p.screenshot({path:`shots/pp-${l}-2.png`});
if(l==='ko'){await p.evaluate(()=>{const s=document.querySelectorAll('.pp-doc[data-pp=ko] section')[6];scrollTo(0,s.getBoundingClientRect().top+scrollY-100)});await p.waitForTimeout(900);await p.screenshot({path:'shots/pp-ko-3.png'});
 await p.click('a.ask');await p.waitForTimeout(1800);await p.screenshot({path:'shots/pp-ko-4.png'})}
await p.close()}
const p=await b.newPage({viewport:{width:1440,height:900}});await p.goto('http://127.0.0.1:8766/index.html');await p.waitForTimeout(1000);await p.evaluate(()=>scrollTo(0,document.body.scrollHeight));await p.waitForTimeout(800);
await p.click('.foot__privacy');await p.waitForLoadState('load');console.log('footer link ->',p.url());
await b.close()})();
