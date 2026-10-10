// عرض مسائل PHP وحفظ الحلول في المتصفح
let probFilter="all";
function draftKey(i){return "prob-draft-"+i}
function renderProbs(){
  const fb=document.querySelector('#prob .filter'); fb.innerHTML='';
  [["all","الكل"],...Object.entries(TAGS)].forEach(([k,l])=>{
    const b=document.createElement('button'); b.type='button'; b.textContent=l;
    b.setAttribute('aria-pressed',String(probFilter===k));
    b.addEventListener('click',()=>{probFilter=k;renderProbs();}); fb.appendChild(b);
  });
  const box=document.querySelector('#prob .probs'); box.innerHTML='';
  PROBS.forEach((p,i)=>{
    if(probFilter!=="all" && !p.tags.includes(probFilter)) return;
    const d=document.createElement('div'); d.className='prob';
    const h=document.createElement('h3'); h.textContent='مسألة '+(i+1)+': '+p.t;
    const lv=document.createElement('span'); lv.className='lvl'; lv.textContent='مثل '+p.lvl; h.appendChild(lv); d.appendChild(h);
    p.q.split('\n').forEach(line=>{const pp=document.createElement('p'); pp.textContent=line; d.appendChild(pp);});
    const nd=document.createElement('div'); nd.className='needs'; nd.appendChild(document.createTextNode('تحتاج:'));
    p.tags.forEach(t=>{const s=document.createElement('span'); s.className='tag'; s.textContent=TAGS[t]; nd.appendChild(s);});
    d.appendChild(nd);
    const ta=document.createElement('textarea'); ta.id='ans-'+i; ta.setAttribute('aria-label','حلك للمسألة '+(i+1));
    ta.placeholder='<?php\n  // اكتب حلك هنا\n?>'; ta.spellcheck=false;
    try{ta.value=localStorage.getItem(draftKey(i))||''}catch(e){}
    ta.addEventListener('input',()=>{try{localStorage.setItem(draftKey(i),ta.value)}catch(e){}});
    d.appendChild(ta);
    const dh=document.createElement('details'); const sh=document.createElement('summary'); sh.textContent='تلميح';
    const ph=document.createElement('p'); ph.textContent=p.h; dh.append(sh,ph); d.appendChild(dh);
    const ds=document.createElement('details'); const ss=document.createElement('summary'); ss.textContent='الحل';
    const pre=document.createElement('pre'); const c=document.createElement('code'); c.textContent=p.s; pre.appendChild(c);
    ds.append(ss,pre); d.appendChild(ds);
    box.appendChild(d);
  });
}
renderProbs();

