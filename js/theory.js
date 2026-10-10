// عرض قسم النظري
let thSubj="java";
function knownKey(s,i){return "known-"+s+"-"+i}
function getKnown(s,i){try{return localStorage.getItem(knownKey(s,i))==="1"}catch(e){return false}}
function setKnown(s,i,v){try{v?localStorage.setItem(knownKey(s,i),"1"):localStorage.removeItem(knownKey(s,i))}catch(e){}}
function updProgress(){
  const n=TH[thSubj].length; let k=0; TH[thSubj].forEach((_,i)=>{if(getKnown(thSubj,i))k++});
  document.querySelector('#theory .th-progress').textContent='تعرف '+k+' من '+n+' سؤال في '+SUBJ[thSubj];
}
function renderTheory(){
  const fb=document.querySelector('#theory .th-subj'); fb.innerHTML='';
  Object.entries(SUBJ).forEach(([k,l])=>{
    const b=document.createElement('button'); b.type='button'; b.textContent=l;
    b.setAttribute('aria-pressed',String(thSubj===k));
    b.addEventListener('click',()=>{thSubj=k;renderTheory();}); fb.appendChild(b);
  });
  const box=document.querySelector('#theory .th-list'); box.innerHTML='';
  TH[thSubj].forEach((it,i)=>{
    const d=document.createElement('div'); d.className='th'+(getKnown(thSubj,i)?' known':'');
    const top=document.createElement('div'); top.className='th-top';
    const p=document.createElement('p'); p.textContent=(i+1)+'. '+it.q;
    const lb=document.createElement('label'); const cb=document.createElement('input'); cb.type='checkbox'; cb.id='known-'+thSubj+'-'+i;
    cb.checked=getKnown(thSubj,i);
    cb.addEventListener('change',()=>{setKnown(thSubj,i,cb.checked); d.classList.toggle('known',cb.checked); updProgress();});
    lb.append(cb,document.createTextNode('أعرفها'));
    top.append(p,lb); d.appendChild(top);
    const ta=document.createElement('textarea'); ta.className='th-ans'; ta.id='th-ans-'+thSubj+'-'+i;
    ta.setAttribute('aria-label','إجابتك للسؤال '+(i+1)); ta.placeholder='اكتب إجابتك هنا...';
    const ak='th-ans-'+thSubj+'-'+i;
    try{ta.value=localStorage.getItem(ak)||''}catch(e){}
    ta.addEventListener('input',()=>{try{localStorage.setItem(ak,ta.value)}catch(e){}});
    d.appendChild(ta);
    const gb=document.createElement('button'); gb.type='button'; gb.className='grade-btn'; gb.textContent='صحّح إجابتي';
    const gr=document.createElement('div'); gr.className='grade-out'; gr.hidden=true;
    gb.addEventListener('click',()=>gradeAnswer(it,ta.value,gr,gb));
    d.append(gb,gr);
    const det=document.createElement('details'); const sm=document.createElement('summary'); sm.textContent='الإجابة';
    const ul=document.createElement('ul'); it.a.forEach(x=>{const li=document.createElement('li'); li.textContent=x; ul.appendChild(li);});
    det.append(sm,ul); d.appendChild(det); box.appendChild(d);
  });
  updProgress(); renderTF();
}
function renderTF(){
  const box=document.querySelector('#theory .tf-list'); box.innerHTML='';
  const score=document.querySelector('[data-score="tf"]'); let right=0;
  const list=TF[thSubj]; const upd=()=>score.textContent=right+' / '+list.length;
  list.forEach((it,i)=>{
    const d=document.createElement('div'); d.className='q';
    const p=document.createElement('p'); p.textContent=(i+1)+'. '+it.s; d.appendChild(p);
    const row=document.createElement('div'); row.className='tf-row';
    const why=document.createElement('div'); why.className='why'; why.hidden=true;
    [[true,'صح'],[false,'خطأ']].forEach(([val,lab])=>{
      const b=document.createElement('button'); b.type='button'; b.className='opt'; b.textContent=lab;
      b.addEventListener('click',()=>{
        row.querySelectorAll('button').forEach(x=>{x.disabled=true; if((x.textContent==='صح')===it.t)x.classList.add('right');});
        const ok=val===it.t; if(ok)right++; else b.classList.add('wrong'); upd();
        why.innerHTML=''; const bb=document.createElement('b'); bb.textContent=ok?'إجابتك صحيحة. ':'إجابتك خاطئة. الصحيح: '+(it.t?'صح':'خطأ')+'. ';
        why.append(bb,document.createTextNode(it.w)); why.hidden=false;
      });
      row.appendChild(b);
    });
    d.append(row,why); box.appendChild(d);
  });
  upd();
}
document.querySelector('[data-reset-tf]').addEventListener('click',renderTF);
renderTheory();

