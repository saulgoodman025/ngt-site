const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const [,,lang='ko',w='1440',h='900',tag='d']=process.argv;
const p=await b.newPage({viewport:{width:+w,height:+h}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://127.0.0.1:8766/index.html?lang='+lang);await p.waitForTimeout(1500);
console.log(await p.title(), '| lang', await p.evaluate(()=>document.documentElement.lang), '| overflowX', await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth));
const ids=['tech','company','industries','capacity','history','quality','contact'];
for(const id of ids){await p.evaluate(i=>{const e=document.getElementById(i);scrollTo(0,e.getBoundingClientRect().top+scrollY-72)},id);await p.waitForTimeout(2600);
 const hh=await p.evaluate(i=>document.getElementById(i).offsetHeight,id);
 await p.screenshot({path:`shots/pg-${tag}-${lang}-${id}.png`});console.log(id,hh)}
console.log('errors',errs.slice(0,5));await b.close()})();
