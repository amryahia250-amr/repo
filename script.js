// ===== بيانات قابلة للتعديل =====
const TOPICS = [
  {t:"الحركة والسرعة", d:"الإزاحة والسرعة والعجلة وقوانين الحركة."},
  {t:"قوانين نيوتن", d:"القصور الذاتي، القوة والعجلة، الفعل ورد الفعل."},
  {t:"الشغل والطاقة", d:"الشغل والقدرة وحفظ الطاقة."},
  {t:"الموجات والصوت", d:"خصائص الموجات والتداخل والرنين."},
  {t:"الكهرباء", d:"التيار والجهد والمقاومة وقانون أوم."},
  {t:"المغناطيسية", d:"المجال المغناطيسي والحث الكهرومغناطيسي."}
];
const CONTACTS = [
  {label:"واتساب", url:"https://wa.me/qr/BRER4NKYCIRAM1"},
  {label:"يوتيوب", url:"https://youtube.com/@physics_mr_osama?si=H8Sn35w2FjXft7bE"},
  {label:"فيسبوك", url:"https://facebook.com/"}
];

// ===== الوحدات والتواصل =====
document.getElementById("topicGrid").innerHTML =
  TOPICS.map(x=>`<article class="topic"><h3>${x.t}</h3><p>${x.d}</p></article>`).join("");
document.getElementById("contactLinks").innerHTML =
  CONTACTS.map(c=>`<a href="${c.url}" target="_blank" rel="noopener">${c.label}</a>`).join("");
document.getElementById("yr").textContent = new Date().getFullYear();

// ===== خلفية: موجة البندولات =====
(function(){
  const cv = document.getElementById("wave"), cx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const N = 16;
  function size(){ const r = devicePixelRatio||1; cv.width = cv.clientWidth*r; cv.height = cv.clientHeight*r; }
  addEventListener("resize", size); size();
  function draw(t){
    const w = cv.width, h = cv.height, accent = getComputedStyle(document.documentElement).getPropertyValue("--accent");
    cx.clearRect(0,0,w,h);
    cx.fillStyle = accent; cx.globalAlpha = .55;
    for(let i=0;i<N;i++){
      const y = h*(0.12 + 0.76*i/(N-1));
      const x = w/2 + (w*0.42)*Math.sin(2*Math.PI*(51+i)/60*t/1000*0.6);
      cx.fillRect(w*0.08, y-0.5, w*0.84, 1);
      cx.beginPath(); cx.arc(x, y, Math.max(4,w*0.006), 0, 7); cx.fill();
    }
    if(!reduce) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

// ===== معمل المقذوفات =====
(function(){
  const cv = document.getElementById("proj"), cx = cv.getContext("2d");
  const vI = document.getElementById("v"), aI = document.getElementById("a"), g = 9.81;
  function render(){
    const v = +vI.value, a = +aI.value*Math.PI/180;
    document.getElementById("vOut").textContent = v;
    document.getElementById("aOut").textContent = aI.value;
    const R = v*v*Math.sin(2*a)/g, H = (v*Math.sin(a))**2/(2*g);
    document.getElementById("range").textContent = R.toFixed(1);
    document.getElementById("height").textContent = H.toFixed(1);
    const W = cv.width, Hh = cv.height, pad = 30;
    const scale = Math.min((W-2*pad)/Math.max(R,1), (Hh-2*pad)/Math.max(H,1));
    const css = getComputedStyle(document.documentElement);
    cx.clearRect(0,0,W,Hh);
    cx.strokeStyle = css.getPropertyValue("--line"); cx.beginPath(); cx.moveTo(pad,Hh-pad); cx.lineTo(W-pad,Hh-pad); cx.stroke();
    cx.strokeStyle = css.getPropertyValue("--accent2"); cx.lineWidth = 3; cx.beginPath();
    const T = 2*v*Math.sin(a)/g;
    for(let i=0;i<=80;i++){
      const t = T*i/80, x = v*Math.cos(a)*t, y = v*Math.sin(a)*t - g*t*t/2;
      const px = pad + x*scale, py = Hh - pad - y*scale;
      i? cx.lineTo(px,py) : cx.moveTo(px,py);
    }
    cx.stroke();
  }
  vI.addEventListener("input", render); aI.addEventListener("input", render); render();
})();
