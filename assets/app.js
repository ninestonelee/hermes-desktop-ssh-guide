(function(){
  const KEY='hdssh-guide-v1';
  const st=JSON.parse(localStorage.getItem(KEY)||'{"done":{},"tasks":{}}');
  const save=()=>localStorage.setItem(KEY,JSON.stringify(st));
  const pages=[...document.querySelectorAll('.page')];
  const links=[...document.querySelectorAll('nav.side a[data-p]')];
  const ids=pages.map(p=>p.id);

  // theme
  const th=localStorage.getItem(KEY+'-theme');
  if(th) document.documentElement.dataset.theme=th;
  document.getElementById('themeBtn').onclick=()=>{
    const n=document.documentElement.dataset.theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=n; localStorage.setItem(KEY+'-theme',n);
  };
  document.getElementById('printBtn').onclick=()=>window.print();
  const side=document.querySelector('nav.side');
  document.getElementById('menuBtn').onclick=()=>side.classList.toggle('open');

  // tasks
  document.querySelectorAll('.task').forEach((t,i)=>{
    const pid=t.closest('.page').id; const k=pid+':'+[...t.closest('.page').querySelectorAll('.task')].indexOf(t);
    const cb=t.querySelector('input');
    cb.checked=!!st.tasks[k]; t.classList.toggle('on',cb.checked);
    t.addEventListener('click',e=>{ if(e.target!==cb) cb.checked=!cb.checked; st.tasks[k]=cb.checked; t.classList.toggle('on',cb.checked); save(); counts(); });
  });
  function counts(){
    links.forEach(a=>{
      const p=document.getElementById(a.dataset.p); const ts=p.querySelectorAll('.task'); const c=a.querySelector('.cnt');
      if(ts.length&&c){ let n=0; ts.forEach((t,i)=>{ if(st.tasks[p.id+':'+i]) n++; }); c.textContent=n+'/'+ts.length; }
      a.classList.toggle('done',!!st.done[a.dataset.p]);
    });
    const total=pages.filter(p=>p.querySelector('.done')).length; const d=pages.filter(p=>st.done[p.id]).length;
    const pct=total?Math.round(d/total*100):0;
    document.querySelector('.prog .fill').style.width=pct+'%';
    document.querySelector('.prog span').textContent='진행 '+pct+'%';
  }

  // done buttons
  pages.forEach(p=>{
    const box=p.querySelector('.done'); if(!box) return;
    const b=box.querySelector('button');
    const paint=()=>{ b.classList.toggle('is',!!st.done[p.id]); b.textContent=st.done[p.id]?'✓ 완료했어요':'이 단계 완료'; };
    paint();
    b.onclick=()=>{ st.done[p.id]=!st.done[p.id]; save(); paint(); counts(); if(st.done[p.id]){ const i=ids.indexOf(p.id); if(i<ids.length-1) setTimeout(()=>go(ids[i+1]),350);} };
  });

  // pager
  pages.forEach((p,i)=>{
    const pg=document.createElement('div'); pg.className='pager';
    if(i>0){ const a=document.createElement('a'); a.href='#'+ids[i-1]; a.innerHTML='<small>← 이전</small>'+pages[i-1].dataset.t; pg.appendChild(a); }
    if(i<pages.length-1){ const a=document.createElement('a'); a.className='nx'; a.href='#'+ids[i+1]; a.innerHTML='<small>다음 →</small>'+pages[i+1].dataset.t; pg.appendChild(a); }
    p.appendChild(pg);
  });

  // copy buttons
  document.querySelectorAll('.cb').forEach(cb=>{
    const btn=document.createElement('button'); btn.className='copy'; btn.textContent='복사';
    btn.onclick=()=>{ const t=cb.querySelector('code').innerText; navigator.clipboard.writeText(t).then(()=>{btn.textContent='복사됨';setTimeout(()=>btn.textContent='복사',1200)}); };
    cb.appendChild(btn);
  });

  // lightbox
  const lb=document.createElement('div'); lb.className='lb'; lb.innerHTML='<img alt="">'; document.body.appendChild(lb);
  document.querySelectorAll('figure img').forEach(img=>img.onclick=()=>{ lb.querySelector('img').src=img.src; lb.classList.add('show'); });
  lb.onclick=()=>lb.classList.remove('show');

  // search
  const q=document.getElementById('q'); const empty=document.querySelector('.side .empty');
  q&&q.addEventListener('input',()=>{
    const v=q.value.trim().toLowerCase(); let any=false;
    links.forEach(a=>{ const p=document.getElementById(a.dataset.p); const hit=!v||p.innerText.toLowerCase().includes(v)||a.innerText.toLowerCase().includes(v); a.style.display=hit?'':'none'; any=any||hit; });
    empty.style.display=any?'none':'block';
  });

  function go(id){
    if(!ids.includes(id)) id=ids[0];
    pages.forEach(p=>p.classList.toggle('show',p.id===id));
    links.forEach(a=>a.classList.toggle('on',a.dataset.p===id));
    if(location.hash!=='#'+id) history.replaceState(null,'','#'+id);
    window.scrollTo(0,0); requestAnimationFrame(()=>window.scrollTo(0,0)); setTimeout(()=>window.scrollTo(0,0),60); side.classList.remove('open');
    const on=document.querySelector('nav.side a.on'); if(on){ const r=on.offsetTop; if(r<side.scrollTop||r>side.scrollTop+side.clientHeight-60) side.scrollTop=r-120; }
  }
  window.addEventListener('hashchange',()=>go(location.hash.slice(1)));
  document.addEventListener('keydown',e=>{
    if(e.target.tagName==='INPUT') return;
    const i=ids.indexOf(location.hash.slice(1)||ids[0]);
    if(e.key==='ArrowRight'&&i<ids.length-1) go(ids[i+1]);
    if(e.key==='ArrowLeft'&&i>0) go(ids[i-1]);
  });
  counts(); go(location.hash.slice(1)||ids[0]);
  window.addEventListener('load',()=>setTimeout(()=>window.scrollTo(0,0),0));
})();
