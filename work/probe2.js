const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:+process.argv[2]||390,height:844}});
await p.goto('http://127.0.0.1:8765/index.html');await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const vw=innerWidth;const out=[];
for(const e of document.querySelectorAll('body *')){const q=e.getBoundingClientRect();if(q.width&&(q.right>vw+1||e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflowX==='visible'&&q.left+e.scrollWidth>vw+1)){out.push((e.tagName+'.'+String(e.className).slice(0,40)+' L'+Math.round(q.left)+' R'+Math.round(q.right)+' sw'+e.scrollWidth+' cw'+e.clientWidth))}}
return {sw:document.documentElement.scrollWidth,out:out.slice(0,14)}});
console.log(JSON.stringify(r,null,1));await b.close()})();
