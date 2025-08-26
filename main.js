// شاشة تحميل
window.addEventListener("load",()=>{
  const loader=document.getElementById("loader");
  loader.style.opacity="0";
  setTimeout(()=>loader.style.display="none",800);
});

// السنة الحالية
document.getElementById('y').textContent = new Date().getFullYear();

// زر الرجوع للأعلى
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", ()=>{
  if(document.documentElement.scrollTop > 200){ topBtn.style.display="block"; }
  else { topBtn.style.display="none"; }
});
topBtn.addEventListener("click", ()=> window.scrollTo({top:0,behavior:'smooth'}));

// انيميشن عند التمرير
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add("show"); } });
},{threshold:0.2});
sections.forEach(sec=>observer.observe(sec));

// تبديل الثيم + حفظ التفضيل
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if(savedTheme === "light"){ document.body.setAttribute("data-theme","light"); themeToggle.textContent="🌑"; }
themeToggle.addEventListener("click", ()=>{
  if(document.body.getAttribute("data-theme")==="light"){
    document.body.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme","dark");
  }else{
    document.body.setAttribute("data-theme","light");
    themeToggle.textContent = "🌑";
    localStorage.setItem("theme","light");
  }
});

// خلفية جزيئات بسيطة (Canvas)
(function(){
  const particlesDiv = document.getElementById("particles");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  particlesDiv.appendChild(canvas);

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  let particles = [];
  class Particle{
    constructor(){
      this.reset();
    }
    reset(){
      this.x = Math.random()*canvas.width;
      this.y = Math.random()*canvas.height;
      this.r = Math.random()*2 + 1;
      this.dx = (Math.random()-0.5)*0.6;
      this.dy = (Math.random()-0.5)*0.6;
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle = "rgba(0,224,199,0.7)";
      ctx.fill();
    }
    update(){
      this.x+=this.dx; this.y+=this.dy;
      if(this.x<0||this.x>canvas.width) this.dx*=-1;
      if(this.y<0||this.y>canvas.height) this.dy*=-1;
      this.draw();
    }
  }

  function init(){
    particles = [];
    const count = Math.min(120, Math.floor(canvas.width*canvas.height/15000));
    for(let i=0;i<count;i++) particles.push(new Particle());
  }
  init();

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>p.update());
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", ()=>{ resize(); init(); });
})();
