const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://127.0.0.1:8765/index.html');await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const o={sw:document.documentElement.scrollWidth};
for(const s of ['.nav__bar','.nav__logo','.nav__logo img','.nav__links','.nav__actions','.nav__actions .btn','.nav__toggle']){const e=document.querySelector(s);if(!e){o[s]=null;continue}const q=e.getBoundingClientRect();const cs=getComputedStyle(e);o[s]=[Math.round(q.left),Math.round(q.right),cs.display,cs.gridColumn||'',cs.gridTemplateColumns?.slice(0,60)]}
// widest overflowing elements
const wide=[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>392).slice(0,8).map(e=>e.tagName+'.'+e.className+' '+Math.round(e.getBoundingClientRect().right));o.wide=wide;return o});
console.log(JSON.stringify(r,null,1));await b.close()})();
