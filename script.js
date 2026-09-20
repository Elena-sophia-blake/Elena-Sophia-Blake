/* ======================================================
   ELENA SOPHIA BLAKE — WEBSITE JAVASCRIPT
   ====================================================== */
document.addEventListener('DOMContentLoaded',()=>{

  // ===== PRELOADER =====
  const pre=document.getElementById('preloader');
  const kill=()=>{pre.classList.add('out');heroAnim()};
  window.addEventListener('load',()=>setTimeout(kill,2500));
  setTimeout(()=>{if(!pre.classList.contains('out'))kill()},4800);

  // ===== CURSOR =====
  const cD=document.getElementById('curDot'),cR=document.getElementById('curRing');
  if(matchMedia('(hover:hover) and (pointer:fine)').matches&&cD&&cR){
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cD.style.left=mx-3+'px';cD.style.top=my-3+'px'});
    !function loop(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;cR.style.left=rx-17+'px';cR.style.top=ry-17+'px';requestAnimationFrame(loop)}();
    document.querySelectorAll('a,button,.sc,.gc,.fq-q,.ec,.tc,input,textarea,select').forEach(el=>{
      el.addEventListener('mouseenter',()=>cR.classList.add('h'));
      el.addEventListener('mouseleave',()=>cR.classList.remove('h'));
    });
  }

  // ===== PARTICLES =====
  const cv=document.getElementById('particles'),cx=cv.getContext('2d');let pp=[];
  const rz=()=>{cv.width=innerWidth;cv.height=innerHeight};rz();addEventListener('resize',rz);
  class Pt{constructor(){this.r()}r(){this.x=Math.random()*cv.width;this.y=Math.random()*cv.height;this.s=Math.random()*1.6+.3;this.vx=(Math.random()-.5)*.26;this.vy=(Math.random()-.5)*.26;this.o=Math.random()*.26+.04}u(){this.x+=this.vx;this.y+=this.vy;if(this.x<-8||this.x>cv.width+8||this.y<-8||this.y>cv.height+8)this.r()}d(){cx.beginPath();cx.arc(this.x,this.y,this.s,0,Math.PI*2);cx.fillStyle=`rgba(201,168,76,${this.o})`;cx.fill()}}
  for(let i=0;i<(innerWidth<768?22:42);i++)pp.push(new Pt);
  !function draw(){cx.clearRect(0,0,cv.width,cv.height);pp.forEach(p=>{p.u();p.d()});requestAnimationFrame(draw)}();

  // ===== SCROLL HANDLING =====
  const sBar=document.getElementById('scrollBar'),nav=document.getElementById('nav'),btt=document.getElementById('btt');
  let tk=false;
  const onS=()=>{if(tk)return;tk=true;requestAnimationFrame(()=>{
    const s=scrollY,h=document.documentElement.scrollHeight-innerHeight;
    sBar.style.width=(s/h*100)+'%';
    nav.classList.toggle('stuck',s>48);
    btt.classList.toggle('show',s>380);
    doRv();countUp();hlNav();
    tk=false;
  })};
  addEventListener('scroll',onS);
  btt.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  // ===== REVEAL =====
  const rvEls=document.querySelectorAll('.rv');
  function doRv(){rvEls.forEach((el,i)=>{if(el.getBoundingClientRect().top<innerHeight-65&&!el.classList.contains('v'))setTimeout(()=>el.classList.add('v'),(i%5)*65)})}
  doRv();

  // ===== HERO ANIM =====
  function heroAnim(){document.querySelectorAll('.ah').forEach((el,i)=>{setTimeout(()=>{el.style.transition=`opacity .8s ease ${i*.13}s,transform .8s ease ${i*.13}s`;el.classList.add('v')},130)})}

  // ===== COUNTERS =====
  let counted=false;
  function countUp(){if(counted)return;const b=document.querySelector('.hero-stats');if(!b||b.getBoundingClientRect().top>innerHeight-70)return;counted=true;
    document.querySelectorAll('.st-n[data-to]').forEach(el=>{const tgt=+el.dataset.to,dur=2000,t0=performance.now();
      !function step(now){const p=Math.min((now-t0)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.floor(e*tgt);p<1?requestAnimationFrame(step):el.textContent=tgt}(t0)})
  }countUp();

  // ===== HAMBURGER =====
  const bg=document.getElementById('burger'),mo=document.getElementById('mobMenu');
  bg.addEventListener('click',()=>{bg.classList.toggle('on');mo.classList.toggle('open');document.body.style.overflow=mo.classList.contains('open')?'hidden':''});
  document.querySelectorAll('[data-m],[data-n]').forEach(a=>a.addEventListener('click',()=>{bg.classList.remove('on');mo.classList.remove('open');document.body.style.overflow=''}));

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)scrollTo({top:t.offsetTop-72,behavior:'smooth'})}));

  // ===== ACTIVE NAV =====
  const secs=document.querySelectorAll('section[id]'),nls=document.querySelectorAll('.nav-link[data-n]');
  function hlNav(){const y=scrollY;secs.forEach(s=>{const t=s.offsetTop-108;if(y>=t&&y<t+s.offsetHeight){const id=s.id;nls.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+id))}})}

  // ===== FAQ =====
  document.querySelectorAll('.fq').forEach(item=>{item.querySelector('.fq-q').addEventListener('click',()=>{const was=item.classList.contains('open');document.querySelectorAll('.fq').forEach(i=>i.classList.remove('open'));if(!was)item.classList.add('open')})});

  // ===== SERVICES FILTER =====
  const fbs=document.querySelectorAll('.fb'),scs=document.querySelectorAll('.sc');
  fbs.forEach(b=>b.addEventListener('click',()=>{fbs.forEach(x=>x.classList.remove('act'));b.classList.add('act');const f=b.dataset.f;
    scs.forEach(c=>{const show=f==='all'||c.dataset.c===f;c.classList.toggle('hid',!show);if(show)c.style.animation='cardIn .42s ease forwards'})}));

  // ===== FORM =====
  const form=document.getElementById('cntForm');
  if(form)form.addEventListener('submit',e=>{
    e.preventDefault();
    const btn=document.getElementById('subBtn'),txt=document.getElementById('subTxt');
    txt.textContent='Sending...';btn.style.opacity='.65';btn.disabled=true;
    fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
    .then(r=>{if(r.ok){txt.textContent='Sent Successfully! ✨';btn.style.background='linear-gradient(135deg,#2ecc71,#27ae60)';btn.style.opacity='1';form.reset();setTimeout(()=>{txt.textContent='Send My Project Details';btn.style.background='';btn.disabled=false},5500)}else throw 0})
    .catch(()=>{txt.textContent='Error — Try Again';btn.style.background='linear-gradient(135deg,#e74c3c,#c0392b)';btn.style.opacity='1';setTimeout(()=>{txt.textContent='Send My Project Details';btn.style.background='';btn.disabled=false},4000)})
  });

  // ===== KEYFRAME INJECTION =====
  const s=document.createElement('style');s.textContent='@keyframes cardIn{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}';document.head.appendChild(s);
});