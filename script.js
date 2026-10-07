/* =============================================
   BIRTHDAY WEBSITE - script.js
   ============================================= */

/* ── Screen Navigation ─────────────────────── */
function goTo(num) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const next = document.getElementById('screen-' + num);
  next.classList.add('active');

  if (num === 1) initStars('stars-1'); initFloats();
  if (num === 2) { initStars('stars-2'); }
  if (num === 3) { startFireworks(); setTimeout(drawCake, 100); candlesBlown = false; }
}

function goToMain() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const main = document.getElementById('screen-4');
  main.classList.add('active');
  buildHeartGrid();
  showSection('memories');
}

/* ── Section Switching ─────────────────────── */
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active-section'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-nav'));
  document.getElementById('section-' + name).classList.add('active-section');
  event.currentTarget && event.currentTarget.classList.add('active-nav');

  const navBtns = document.querySelectorAll('.nav-btn');
  const map = { memories: 0, poem: 1, melody: 2 };
  if (map[name] !== undefined) navBtns[map[name]].classList.add('active-nav');
}

/* ── Pixel Stars ───────────────────────────── */
function initStars(containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  const count = window.innerWidth < 480 ? 30 : 60;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() < 0.3 ? 4 : 2;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation-delay:${Math.random()*3}s;
      animation-duration:${1.5 + Math.random()*2}s;
    `;
    c.appendChild(s);
  }
}

/* ── Floating pixels (Screen 1) ────────────── */
function initFloats() {
  const container = document.getElementById('floats-1');
  if (!container) return;
  container.innerHTML = '';
  const shapes = ['♥','★','✦','◆','▲'];
  const colors = ['#d9a0c0','#f3a6c0','#f6dfd3','#cda8d1','#8b4a9b'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'floating-pixel';
    p.textContent = shapes[Math.floor(Math.random()*shapes.length)];
    p.style.cssText = `
      left:${Math.random()*100}%;
      bottom:-20px;
      font-size:${10 + Math.random()*14}px;
      color:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${4 + Math.random()*6}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(p);
  }
}

/* ── Gift Box Open ─────────────────────────── */
function openGift() {
  const btn = document.getElementById('open-btn');
  btn.disabled = true;
  btn.querySelector('.btn-label').textContent = '✨';

  const lid = document.getElementById('gift-lid');
  lid.classList.add('opening');

  setTimeout(() => goTo(3), 900);
}

/* ── Pixel Mascot: MOONDY 🐰 ───────────────── */
function drawMascot(canvasId, w, h) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = w;
  canvas.height = h;
  ctx.imageSmoothingEnabled = false;

  const COLS = 24, ROWS = 28;
  const sx = w / COLS, sy = h / ROWS;

  // Warna Moondy
  const _  = null;
  const W_ = '#fff8f5';  // putih wajah & telinga kiri
  const B  = '#7b3f87';  // biru border & telinga kanan
  const Bl = '#b978a9';  // biru muda highlight
  const K  = '#28152f';  // biru gelap outline
  const Pk = '#ead7e8';  // putih-biru telinga kiri
  const Ey = '#9d5b91';  // mata biru tipis

  // Grid 24×28 — Moondy
  const grid = [
    // telinga kanan (biru) kiri, telinga kiri (putih) kanan
    [_,_,_,B,B,B,_,_,_,_,_,_,_,_,_,_,_,_,Pk,Pk,Pk,_,_,_],
    [_,_,B,B,B,B,B,_,_,_,_,_,_,_,_,_,_,Pk,Pk,Pk,Pk,Pk,_,_],
    [_,_,B,K,B,B,B,_,_,_,_,_,_,_,_,_,_,Pk,W_,Pk,Pk,Pk,_,_],
    [_,_,_,B,B,B,_,_,_,_,_,_,_,_,_,_,_,_,Pk,Pk,Pk,_,_,_],
    [_,_,_,W_,B,_,_,_,_,_,_,_,_,_,_,_,_,_,W_,Pk,_,_,_,_],
    // rambut gelombang 3 biji
    [_,_,_,K,B,K,_,K,B,K,_,_,K,B,K,_,_,_,_,_,_,_,_,_],
    [_,_,K,B,B,B,K,B,B,B,K,K,B,B,B,K,_,_,_,_,_,_,_,_],
    [_,_,K,B,B,B,B,B,B,B,B,B,B,B,B,K,_,_,_,_,_,_,_,_],
    // kepala bulat atas
    [_,_,K,B,B,B,B,B,B,B,B,B,B,B,B,B,K,_,_,_,_,_,_,_],
    [_,K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_],
    // mata tipis panjang
    [K,B,W_,W_,Ey,Ey,Ey,W_,W_,W_,W_,W_,Ey,Ey,Ey,W_,W_,W_,B,K,_,_,_,_],
    [K,B,W_,W_,Ey,Ey,Ey,W_,W_,W_,W_,W_,Ey,Ey,Ey,W_,W_,W_,B,K,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_],
    [_,K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_,_],
    [_,K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_,_],
    [_,_,K,B,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,B,K,_,_,_,_,_,_,_],
    [_,_,K,B,B,B,B,B,B,B,B,B,B,B,B,B,K,_,_,_,_,_,_,_],
    // badan kecil
    [_,_,_,K,B,B,B,B,B,B,B,B,B,B,B,K,_,_,_,_,_,_,_,_],
    [_,_,_,K,B,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_,_,_,_],
    [_,_,_,K,B,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_,_,_,_],
    [_,_,_,_,K,B,B,B,B,B,B,B,B,K,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,K,K,_,_,_,_,K,K,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  ];

  grid.forEach((row, y) => {
    row.forEach((color, x) => {
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.round(x * sx), Math.round(y * sy), Math.ceil(sx), Math.ceil(sy));
      }
    });
  });
}

/* ── Fireworks ─────────────────────────────── */
let fireworksInterval = null;

function startFireworks() {
  const container = document.getElementById('fireworks');
  if (!container) return;
  container.innerHTML = '';

  function launchOne() {
    const colors = ['#f6dfd3','#f3a6c0','#cda8d1','#d9a0c0','#d97d9f','#ffffff'];
    const x = 10 + Math.random() * 80;
    const y = 10 + Math.random() * 60;

    for (let i = 0; i < 14; i++) {
      const spark = document.createElement('div');
      const angle = (i / 14) * 360;
      const dist = 40 + Math.random() * 60;
      const size = 4 + Math.floor(Math.random() * 4);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const dur = 0.6 + Math.random() * 0.5;

      spark.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        background:${color};
        left:${x}%; top:${y}%;
        border-radius:${Math.random()>0.5?'0':'50%'};
        animation: sparkFly${i} ${dur}s ease-out forwards;
      `;

      const rad = angle * Math.PI / 180;
      const dx = Math.cos(rad) * dist;
      const dy = Math.sin(rad) * dist;

      const keyframes = `
        @keyframes sparkFly${i} {
          0%   { transform: translate(0,0) scale(1); opacity:1; }
          100% { transform: translate(${dx}px,${dy}px) scale(0); opacity:0; }
        }
      `;
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);

      container.appendChild(spark);
      setTimeout(() => { spark.remove(); style.remove(); }, (dur + 0.1) * 1000);
    }
  }

  launchOne();
  fireworksInterval = setInterval(launchOne, 700);
  setTimeout(() => { clearInterval(fireworksInterval); }, 8000);
}

/* ── Heart Grid ────────────────────────────── */

// =============================================
// DATA FOTO — isi di sini!
// path  : lokasi file foto (kosongkan jika belum ada)
// title : judul yang muncul di halaman detail
// desc  : paragraf/cerita yang muncul di halaman detail
// =============================================
const PHOTOS = [
  { path: 'sendiri1.jpeg', title: 'Baddie',  desc: 'BUSETT BADDIE SIAPAA INI CANTIK BGTTTT' },
  { path: 'sendiri5.jpeg', title: 'First pap',  desc: 'Ini Pap pertama kamuu btw wkwwk, jujurr waktu pertama kali aku liat kayaa "DAYMMM, AKU MUNGKIN BERKALI KALI BILANG AKU SUKA BGT SAMA MATA KAMUU, TAPII INI KAMU FOTO AGA MEREMM KOK BISA SECANTIKK DAN SEMANISS ITUU?!?" and somehow this was one of the pics that made me realize i was actually falling for youu wkwk' },
  { path: 'sendiri3.jpeg', title: 'Beauty',  desc: 'Ini pertama kali kamu ngirimin aku hasil kamu yang abiss nyoba make up btw, dann CANTIKK BGTT?!?. mungkin waktu itu kamu mikir kalo kamu sekadar nunjukin make up ke aku, tanpa kamu sadar kalo aku seneng bgt karena ternyata aku jadi salah satu orang yang pengen kamu ajak berbagi ha lhal kecil di hari hari kamu wkwkwk' },
  { path: 'bareng3.jpeg', title: 'it`s our first datee??!',  desc: 'Ini pertama kali kita ngedatee, jujur aga gugup waktu itu awokoawk, mana ngajaknya juga gajelas bgt hehehe, udamah gitu aku kepergok temen lagiii, jadi maluww wkwkwk, It`s such a great time sihh, dari situ juga aku bisa sejauh ini sama kamu soalnyaa, i hope we can recreate our firstdate somedayy sayangg' },
  { path: 'bareng6.jpeg', title: 'Photobooth',  desc: 'makasii yaa ud mau ngajak aku bikin kenangan yang jujur sampe sekarang juga masi sering keinget teruss. and it was such a cherish experience for me sayangg. oiyaa it`s my first time photobooth sama cewe hehe. ' },
  { path: 'bareng2.jpeg', title: 'Pikaco wangkelang',  desc: 'Ini waktu kita ke pikaco wangkelang, seperti biasa kita nyasar dulu wkwkwk, cuma tetep seruu, dan itu juga mungkin jadi salah satu perjalanan yang paling aku ingett, di sana buat pertama kalinya, mungkin kamu bener bener nunjukin sisi kamu yang paling lemah ke aku, kamu cerita banyak hal yang selama ini mungkin ga gampang buat kamu ceritain, aku juga masih inget waktu kamu akhirnya gakuat dan sampe nangis. Jujur waktu itu aku gatau mau mgapain selain dengerin kamu. tapi dari situ aku tau, di balik kamu yang aku kenall, ternyata ada banyak yang kamu pendem sendiri. aku seneng banget kamu mau percaya ke aku sampe kamu mau nunjukin sisi kamu yang lemah. buat aku si kamu ngga harus selalu kuat di depan aku, kalau suatu waktu kamu capek, bingung, takut, atau bahkan cm pgn nangis, aku cumaa pengen kamu tau kalo kamu aman di samping akuu. ANJAI ' },
  { path: 'sendiri2.jpeg', title: 'Nari',  desc: 'Sumpah dehh, ini pertama kali aku liat kamu yang udah full make up buat narii, jujur aku amazee bgtt waktu ituu, teruss km juga jadii cantikk bgtt?!? apalagi aku literally salah satu orang pertama yang liat kamu ud siap gitu?!?!? such a pleasure sumpahh. walaupun si olip sm kakaknyaa uda lia duluan tapii yakk wkwk' },
  { path: 'sendiri12.jpeg', title: 'Apanih gtw',  desc: 'Gatau ini aku masukin ajaa soalnya jadi walpapper hp aku sampe sekarang akwowkakwaok, walaupun aku kesel soalnya bukan jalan sm aku sikk🤬 😤' },
  { path: 'sendiri13.jpeg', title: 'RORO JONGGRANGG',  desc: 'Bener bener mahadasyatt Allahuakbar kabira walhamdulillahi katsira, awawkokaokwoakw, Cantikk bgt ini bandung bondowoso juga bakal nyesel pasti kalo dia mau jadiin kamu patung wkwkwkwk, Ternyata emg kamu cocok terus mau pake kostum apapun itu yaa anjir..' },
  { path: 'sendiri8.jpeg', title: 'CINDOOO', desc: 'KAMU LUCU BGTTT WWKKKWKWK, walaupun kasian juga sebenernyaa mata kamu lg bengkak dan sakit gitu sii😭, tapi somehow kamu yang lagi sakit mata gitu tetep keliatan cantik di akuu wkwkwkwk.' },
  { path: 'sendiri9.jpeg', title: 'Bidadari DAYAKK', desc: 'Aku masih inget bgtt waktu kamu mau fashion show pake baju adat dayak inii. dr kamu yang dilema mau pake hijab atau engga, sampe kita yang kebingungan nyari golokk wkwkk. Jujur aku pengenn bgtt liat kamu waktu itu, karena dr cerita dan persiapannya aja ud kebayang seberapa cantiknya kamu waktu pake kostum ituu. Tapi sayang bgtt waktu itu aku gabisa liat huhu😭' },
  { path: 'bareng1.jpeg', title: 'Muncakkk', desc: 'Aku masih inget waktu kamu bilang pgn bgtt muncakk, dan akhirnya kita beneran muncak bareng. jujur aku seneng bisa jadi orang yang nemenin kamu ngewujudin wishlist ini, walaupun waktu itu masih banyak kurangnya, kita nyasar la, keujanan la, capek bgt, apalagi kamu tiduu WKWKWKKWK, cuma kita tetep ketawa ketawa teruss, dan aku seneng ngeliat kamu senengg. semogaa di masa depan masih banyak wishlist kita yang bisa kita lakuin bareng barengg yaaaa. ' },
  { path: 'bareng5.jpeg', title: 'Graduation', desc: 'Aku masih inget bgttt waktu kamu dateng ke wisuda akuu. jujur aku disitu seneng bgt bisa liat kamu hadir dan ikut ngerayain di salah satu hari yang penting buat aku. Andd the first flower from u. aku tau mungkin ini bukan bunga pertama yang aku dapet. but it`s my first flower that i got from someone that i`ve loved, aku juga masih inget kamu bilang katanya bunganya salahh. Tapi lucunya aku waktu itu gapeduli bunganya salah, aku tetep seneng banget nerima bunga ini dari kamuu wkwkwk. karenaa pada akhirnya it`s not because of what it was, but because of who it came from. ' },
  { path: 'bareng7.jpeg', title: 'Pizza date', desc: 'Aku gaada foto lagii aowkoakwawk, Seruu bgttt ini sumpahhh, ini bener bener salah satu date paling seru buat aku sii wkwk, kapann kapann kita coba lagi activity date yang seru kaya gini yaaa' },
  { path: 'sendiri10.jpeg', title: 'Bocil', desc: 'Aku gaada foto bocil kamuu, jd pake yang gembull ini aja yakk lucu bgt sumpahh wkwk. Kadang aku suka mikir anak kecil ini percaya ga ya? kalo dia bakal ngelewatin banyak hal yang dia gapernah bayangin, ketemu banyak orang, kehilangan banyak hal, ketemu hal baru, jatuh, sakit, nyerah, sampe akhirnya bangkit lagi, ketawa, seneng, dan tetep berjalan sampe sekarang. kira kira dia bakal percaya ga yaa? dia bakal bangga ga ya sama diri dia? i hope she would. because she made it this far, because she`s been through so much, and she still became someone so beautiful.' },
];

// Layout hati — koordinat dalam satuan unit (U)
// [foto-index, col, row, colspan, rowspan]
// Grid: kolom 0-7, baris 0-8. 1 unit = U px (dihitung JS)
//
// Berdasarkan referensi gambar & koreksi:
// - Foto 1,2 tepat di atas foto 4
// - Foto 7,8 sama kecil, foto 8 di bawah foto 7
// - Foto 13 sama besar seperti foto 5, mengisi area kanan
// - Foto 15 di bawah foto 13, di samping foto 12
// - Foto 14 geser kanan, ujung bawah foto 12
//
// [idx, col, row, cspan, rspan]
const HEART_LAYOUT = [
  // kolom dikurangi 1 dari sebelumnya agar mulai dari 0, pas di layar HP
  [0,  1, 0, 1, 1],  // foto1
  [1,  2, 0, 1, 1],  // foto2
  [2,  0, 1, 1, 1],  // foto3
  [3,  1, 1, 2, 2],  // foto4
  [9,  0, 2, 1, 1],  // foto10
  [4,  4, 0, 2, 2],  // foto5
  [5,  6, 1, 1, 1],  // foto6
  [6,  3, 1, 1, 1],  // foto7
  [7,  3, 2, 1, 1],  // foto8
  [8,  6, 2, 1, 1],  // foto9
  [10, 1, 3, 1, 1],  // foto11
  [11, 2, 3, 2, 2],  // foto12
  [12, 4, 2, 2, 2],  // foto13
  [13, 3, 5, 1, 1],  // foto14
  [14, 4, 4, 1, 1],  // foto15
];

function buildHeartGrid() {
  const wrapper = document.querySelector('.heart-grid-wrapper');
  const grid    = document.getElementById('heart-grid');
  if (!grid || grid.children.length > 0) return;

  const COLS = 7;
  const ROWS = 7;

  // Selalu scale dari LEBAR wrapper — tidak pernah overflow ke kanan
  const availW = wrapper.clientWidth * 0.96;
  const GAP    = Math.max(4, Math.round(availW * 0.018));
  const U      = Math.floor((availW - GAP * (COLS - 1)) / COLS);

  const totalW = U * COLS + GAP * (COLS - 1);
  const totalH = U * ROWS + GAP * (ROWS - 1);

  grid.style.width  = totalW + 'px';
  grid.style.height = totalH + 'px';

  HEART_LAYOUT.forEach(([idx, col, row, cspan, rspan]) => {
    const photo = PHOTOS[idx];
    const cell  = document.createElement('div');
    cell.className = 'hcell';

    const x = col * (U + GAP);
    const y = row * (U + GAP);
    const w = U * cspan + GAP * (cspan - 1);
    const h = U * rspan + GAP * (rspan - 1);

    cell.style.left   = x + 'px';
    cell.style.top    = y + 'px';
    cell.style.width  = w + 'px';
    cell.style.height = h + 'px';

    if (photo.path) {
      const img = document.createElement('img');
      img.src = photo.path;
      img.alt = photo.title;
      cell.appendChild(img);
    } else {
      cell.innerHTML = `
        <div class="hplaceholder">
          <div class="hicon">📷</div>
          <div class="hnum">FOTO ${idx + 1}</div>
        </div>`;
    }

    cell.addEventListener('click', () => openDetail(idx));
    grid.appendChild(cell);
  });
}

/* ── Photo Detail ──────────────────────────── */
function openDetail(idx) {
  const photo  = PHOTOS[idx];
  const overlay = document.getElementById('photo-detail');
  const img    = document.getElementById('detail-img');
  const wrap   = img.parentElement;
  const title  = document.getElementById('detail-title');
  const desc   = document.getElementById('detail-desc');

  if (photo.path) {
    img.src = photo.path;
    img.style.display = 'block';
    wrap.classList.remove('empty');
  } else {
    img.src = '';
    img.style.display = 'none';
    wrap.classList.add('empty');
    wrap.textContent = '📷';
  }

  title.textContent = photo.title;
  desc.textContent  = photo.desc;
  overlay.classList.add('open');
  overlay.scrollTop = 0;
}

function closeDetail() {
  document.getElementById('photo-detail').classList.remove('open');
}

/* ── Init ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initStars('stars-1');
  initFloats();
});

/* ── Cake & Candles ────────────────────────── */
let candlesBlown = false;

function drawCake() {
  const canvas = document.getElementById('cake-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const COLS = 24, ROWS = 18;
  const sx = canvas.width / COLS;
  const sy = canvas.height / ROWS;
  const _ = null, W = '#fff8f5', B = '#5d2a73', Bl = '#8b4a9b';
  const P = '#f3a6c0', Y = '#f6dfd3', K = '#28152f';
  const g = [
    [_,_,_,_,_,W,W,W,W,W,W,W,W,W,W,W,W,W,W,_,_,_,_,_],
    [_,_,_,_,W,W,P,W,W,P,W,W,P,W,W,P,W,W,W,W,_,_,_,_],
    [_,_,_,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,_,_,_],
    [_,_,_,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,_,_,_],
    [_,_,K,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,K,_,_,_],
    [_,_,K,Bl,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,Bl,K,_,_,_],
    [_,_,K,Bl,B,Y,B,B,P,B,B,Y,B,B,P,B,B,Y,B,Bl,K,_,_,_],
    [_,_,K,Bl,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,Bl,K,_,_,_],
    [_,_,_,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,_,_,_],
    [_,_,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,_,_],
    [_,_,W,W,P,W,W,P,W,W,P,W,W,P,W,W,P,W,W,P,W,W,_,_],
    [_,_,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,_,_],
    [_,_,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,_,_],
    [_,K,B,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,B,K,_],
    [_,K,B,Bl,B,B,Y,B,B,P,B,B,B,B,P,B,B,Y,B,B,Bl,B,K,_],
    [_,K,B,Bl,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,Bl,B,K,_],
    [_,K,B,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,B,K,_],
    [_,_,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,_],
  ];
  g.forEach((row, y) => {
    row.forEach((color, x) => {
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.round(x*sx), Math.round(y*sy), Math.ceil(sx), Math.ceil(sy));
      }
    });
  });
}

function blowCandles() {
  if (candlesBlown) return;
  candlesBlown = true;
  const flames = document.querySelectorAll('.flame');
  const candles = document.querySelectorAll('.candle');
  flames.forEach((flame, i) => {
    setTimeout(() => {
      flame.classList.add('blown');
      setTimeout(() => {
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        candles[i].appendChild(smoke);
        setTimeout(() => smoke.remove(), 1000);
      }, 300);
    }, i * 180);
  });
  setTimeout(() => {
    const btn = document.getElementById('blow-btn');
    btn.querySelector('.btn-label').textContent = '✨';
    setTimeout(goToMain, 800);
  }, flames.length * 180 + 600);
}
