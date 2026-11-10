const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const w=+process.argv[2]||1440,h=+process.argv[3]||900;
const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
await p.goto('http://127.0.0.1:8765/index.html');await p.waitForTimeout(2000);
for(const y of process.argv.slice(4)){await p.evaluate(v=>scrollTo(0,+v),y);await p.waitForTimeout(900);await p.screenshot({path:`shots/v-${w}-${y}.png`})}
await b.close()})();
