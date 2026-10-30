const {chromium}=require('C:/Users/56749/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/playwright-core');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Users/56749/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'}), out=[];
 for(const [device,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const result={device,routes:{}};
  for(const [name,path] of [['home','/'],['services','/servicios'],['about','/nosotros'],['university','/university'],['contact','/contacto']]){
   const p=await b.newPage({viewport});const errors=[];p.on('pageerror',e=>errors.push(e.message));const response=await p.goto('http://127.0.0.1:5175'+path,{waitUntil:'networkidle'});
   const data={status:response.status(),ctaCount:await p.locator('.call-to-action').count(),footerCount:await p.locator('.site-footer').count(),scrollWidth:await p.evaluate(()=>document.documentElement.scrollWidth),errors};
   if(name==='contact'){
    data.hero=await p.locator('.contact-page__hero').evaluate(el=>{const r=el.getBoundingClientRect(), img=el.querySelector('img'), ir=img.getBoundingClientRect();return {height:Math.round(r.height),y:Math.round(r.y),imageSrc:img.getAttribute('src'),imageLoaded:img.complete&&img.naturalWidth>0,natural:[img.naturalWidth,img.naturalHeight],rendered:[Math.round(ir.width),Math.round(ir.height)],ratio:(ir.width/ir.height).toFixed(3)}});
    data.title=await p.locator('.contact-page__copy h1').innerText();data.description=await p.locator('.contact-page__copy p').innerText();data.active=await p.locator('.nav-link--contact').getAttribute('aria-current');
    await p.screenshot({path:`output/playwright/contact-implementation/contact-${device}.png`,animations:'disabled'});
   }
   if(data.ctaCount){
    const cta=p.locator('.call-to-action');await cta.scrollIntoViewIfNeeded();await p.waitForTimeout(650);
    data.cta=await cta.evaluate(el=>{const h=el.querySelector('h2').getBoundingClientRect(),a=el.querySelector('a'),r=a.getBoundingClientRect(),s=getComputedStyle(el);return {text:el.querySelector('h2').innerText,button:a.innerText.trim(),href:a.getAttribute('href'),height:Math.round(el.getBoundingClientRect().height),buttonBox:[Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)],titleBox:[Math.round(h.x),Math.round(h.y),Math.round(h.width),Math.round(h.height)],layout:s.display,background:s.backgroundColor}});
    await cta.screenshot({path:`output/playwright/contact-implementation/cta-${name}-${device}.png`,animations:'disabled'});
   }
   const f=p.locator('.site-footer');if(await f.count()){data.footer=await f.evaluate(el=>({text:el.innerText.replace(/\s+/g,' ').trim(),size:[Math.round(el.getBoundingClientRect().width),Math.round(el.getBoundingClientRect().height)],background:getComputedStyle(el).backgroundColor}));}
   result.routes[name]=data; await p.close();
  }
  out.push(result);
 }
 console.log(JSON.stringify(out,null,2));await b.close();
})();
