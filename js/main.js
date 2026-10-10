// التبويبات وفتح التبويب المحفوظ
const tabs=[...document.querySelectorAll('nav.tabs button')];
function show(s,save){
  tabs.forEach(t=>t.setAttribute('aria-selected',String(t.dataset.s===s)));
  document.querySelectorAll('section.subject').forEach(sec=>sec.hidden=sec.id!==s);
  if(save){try{localStorage.setItem('tab',s)}catch(e){}}
}
tabs.forEach(t=>t.addEventListener('click',()=>{show(t.dataset.s,true);window.scrollTo({top:0});}));
document.querySelectorAll('.toc a').forEach(a=>a.addEventListener('click',e=>{
  const el=document.getElementById(a.getAttribute('href').slice(1)); if(el){e.preventDefault(); el.scrollIntoView();}
}));
let start='java';
const h=location.hash.slice(1);
const IDS=['java','sql','php','theory'];
if(IDS.includes(h)) start=h;
else { try{const v=localStorage.getItem('tab'); if(IDS.includes(v)) start=v;}catch(e){} }
show(start,false);
