const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1280,height:720},recordVideo:{dir:'work/rec',size:{width:1280,height:720}}});
const p=await ctx.newPage();await p.goto('http://127.0.0.1:8766/index.html');await p.waitForTimeout(3000);
await p.evaluate(async()=>{const H=innerHeight,end=2.3*H,T=9000,t0=performance.now();await new Promise(r=>{(function f(n){const k=Math.min(1,(n-t0)/T);scrollTo(0,end*k);k<1?requestAnimationFrame(f):r()})(t0)})});
await p.waitForTimeout(800);await ctx.close();await b.close()})();
