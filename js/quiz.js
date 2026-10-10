// عرض اختبارات "اختبر نفسك"
function renderQuiz(s){
  const box=document.querySelector('[data-quiz="'+s+'"]'); box.innerHTML='';
  const st={right:0,done:0};
  const score=document.querySelector('[data-score="'+s+'"]');
  const upd=()=>score.textContent=st.right+' / '+QUIZ[s].length;
  QUIZ[s].forEach((it,qi)=>{
    const d=document.createElement('div'); d.className='q';
    const p=document.createElement('p'); p.textContent=(qi+1)+'. '+it.q; d.appendChild(p);
    if(it.code){const pre=document.createElement('pre');const c=document.createElement('code');c.textContent=it.code;pre.appendChild(c);d.appendChild(pre);}
    const ops=document.createElement('div'); ops.className='opts';
    const why=document.createElement('div'); why.className='why'; why.hidden=true;
    it.o.forEach((t,oi)=>{
      const b=document.createElement('button'); b.className='opt'; b.type='button'; b.textContent=t;
      if(/^[\x20-\x7E]+$/.test(t)) b.classList.add('ltr');
      b.addEventListener('click',()=>{
        ops.querySelectorAll('button').forEach((x,xi)=>{x.disabled=true; if(xi===it.a)x.classList.add('right');});
        if(oi===it.a) st.right++; else b.classList.add('wrong');
        st.done++; upd();
        why.innerHTML=''; const bb=document.createElement('b'); bb.textContent=(oi===it.a?'صح. ':'خطأ. الجواب: '+it.o[it.a]+'. ');
        why.appendChild(bb); why.appendChild(document.createTextNode(it.w)); why.hidden=false;
      });
      ops.appendChild(b);
    });
    d.appendChild(ops); d.appendChild(why); box.appendChild(d);
  });
  upd();
}
Object.keys(QUIZ).forEach(renderQuiz);
document.querySelectorAll('[data-reset]').forEach(b=>b.addEventListener('click',()=>renderQuiz(b.dataset.reset)));

