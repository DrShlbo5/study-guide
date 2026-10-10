// تصحيح الإجابات المقالية (Claude إن توفر، وإلا بالكلمات المفتاحية)
/* ===== تصحيح الإجابات المقالية ===== */
const STOP=new Set("من في على الى عن مع او ثم هو هي التي الذي ذلك هذا هذه كل لا ما اذا بين عند قبل بعد يتم تكون يكون كان لكن حتى انه انها مثل عدد اي وهي وهو بها له لها فيها منها عليها الا the and for are with that this from not".split(" "));
function normAr(s){return s.toLowerCase().replace(/[ً-ْـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي');}
function stemAr(w){
  w=w.replace(/^(وال|بال|كال|فال|لل|ال)/,'');
  if(w.length>4) w=w.replace(/^[وبلف]/,'');
  if(w.length>4) w=w.replace(/(ات|ين|ون|ها|ه)$/,'');
  return w;
}
function stemsOf(text){return normAr(text).split(/[^\p{L}\p{N}]+/u).filter(w=>w.length>=2).map(stemAr);}
function stemHit(k,stems){const p=k.slice(0,Math.min(4,k.length)); return stems.some(s=>s===k||(s.length>=3&&(s.startsWith(p)||k.startsWith(s.slice(0,Math.min(4,s.length))))));}
function keywords(lines){
  const seen=new Set(), out=[];
  normAr(lines.join(' ')).split(/[^\p{L}\p{N}]+/u).forEach(w=>{
    if(w.length<3||STOP.has(w)) return; const s=stemAr(w); if(s.length<2||seen.has(s)) return; seen.add(s); out.push({w,s});
  });
  return out;
}
function localGrade(it,ans){
  const kw=keywords(it.a), st=stemsOf(ans);
  const hit=kw.filter(k=>stemHit(k.s,st)), miss=kw.filter(k=>!stemHit(k.s,st));
  const pct=kw.length?Math.min(100,Math.round(100*hit.length/(kw.length*0.7))):0;
  return {pct,miss:miss.slice(0,10).map(k=>k.w)};
}
let sampleP=null;
function getSample(){ if(!sampleP) sampleP=(window.claude&&window.claude.use)?window.claude.use("sample").catch(()=>null):Promise.resolve(null); return sampleP; }
function showGrade(out,score,verdict,feedback,miss,by){
  out.innerHTML='';
  const head=document.createElement('div'); head.className='grade-head '+(score>=7?'good':score>=4?'mid':'low');
  head.textContent=verdict+' · '+score+' / 10'; out.appendChild(head);
  if(feedback){const p=document.createElement('p'); p.textContent=feedback; out.appendChild(p);}
  if(miss&&miss.length){const p=document.createElement('p'); p.className='miss'; p.textContent='نقاط ناقصة: '+miss.join('، '); out.appendChild(p);}
  const s=document.createElement('p'); s.className='by'; s.textContent=by; out.appendChild(s);
  out.hidden=false;
}
async function gradeAnswer(it,ans,out,btn){
  if(ans.trim().length<3){out.hidden=false; out.innerHTML=''; const p=document.createElement('p'); p.textContent='اكتب إجابتك أولاً.'; out.appendChild(p); return;}
  btn.disabled=true; btn.textContent='يصحّح...';
  const sample=await getSample();
  if(sample){
    try{
      const r=await sample.json([{role:"user",content:
"أنت مصحح لاختبار نظري لطالب في كلية تقنية. قارن إجابة الطالب بالإجابة النموذجية وقيّم المعنى لا الألفاظ، واقبل الصياغة المختلفة إذا كان المعنى صحيحاً.\n"+
"السؤال: "+it.q+"\nالإجابة النموذجية: "+it.a.join(" | ")+"\nإجابة الطالب: "+ans+"\n"+
"أرجع JSON فقط بالشكل: {\"score\": رقم من 0 إلى 10, \"verdict\": \"كلمتين بالعربي مثل إجابة ممتازة أو ناقصة أو خاطئة\", \"feedback\": \"جملة أو جملتين بالعربي توضح الخطأ أو النقص\", \"missing\": [\"نقاط ناقصة قصيرة\"]}"}],{modelTier:"quick"});
      const sc=Math.max(0,Math.min(10,Math.round(Number(r.score)||0)));
      showGrade(out,sc,String(r.verdict||''),String(r.feedback||''),Array.isArray(r.missing)?r.missing.map(String):[],'صححها Claude');
      btn.disabled=false; btn.textContent='صحّح مرة ثانية'; return;
    }catch(e){ if(e&&e.code==='not_granted') sampleP=Promise.resolve(null); }
  }
  const g=localGrade(it,ans), sc=Math.round(g.pct/10);
  showGrade(out,sc,sc>=7?'إجابة جيدة':sc>=4?'إجابة ناقصة':'إجابة ضعيفة','',g.miss,'تصحيح تلقائي بالكلمات المفتاحية: يقارن كلماتك بكلمات الإجابة النموذجية، فراجعها بنفسك أيضاً.');
  btn.disabled=false; btn.textContent='صحّح مرة ثانية';
}
