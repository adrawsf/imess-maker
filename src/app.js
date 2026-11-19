(function(){
const KEY='imsg-au-v4';
const $=s=>document.getElementById(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let uid=0;const nid=()=>Date.now().toString(36)+(uid++).toString(36);
const nowHM=()=>{const d=new Date();return String(d.getHours()).padStart(2,'0')+'.'+String(d.getMinutes()).padStart(2,'0')};
const WALLS={none:'',senja:'linear-gradient(160deg,#FFB38A 0%,#FF7EA8 45%,#8A6CFF 100%)',laut:'linear-gradient(170deg,#7FD6F5 0%,#2F86E0 50%,#152E7A 100%)',
  lavender:'linear-gradient(165deg,#F3E8FF 0%,#C9B6FF 50%,#8F86E8 100%)',matcha:'linear-gradient(165deg,#EEF7DA 0%,#B5D88E 55%,#6E9F5A 100%)',
  malam:'radial-gradient(120% 70% at 80% 20%,#6D5BA8 0%,transparent 60%),linear-gradient(170deg,#1B2140 0%,#2B2350 55%,#0B0C14 100%)'};
const WNAMES={none:'Default',senja:'Senja',laut:'Laut',lavender:'Lavender',matcha:'Matcha',malam:'Malam',custom:'Foto'};
const DARKWALL={laut:1,malam:1,custom:1};

const I={
  back:'<svg width="13" height="22" viewBox="0 0 13 22" fill="none"><path d="M11 2 2 11l9 9" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  vid:'<svg width="26" height="18" viewBox="0 0 26 18" fill="none"><rect x="1.2" y="2" width="16" height="14" rx="3.8" stroke="currentColor" stroke-width="2"/><path d="m18.5 7 5.3-3.2c.7-.4 1.2 0 1.2.7v9c0 .7-.5 1.1-1.2.7L18.5 11" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  plus:'<svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2v14M2 9h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  mic:'<svg width="14" height="20" viewBox="0 0 14 20" fill="none"><rect x="3.5" y="1" width="7" height="11.5" rx="3.5" fill="currentColor"/><path d="M1 9.5a6 6 0 0 0 12 0M7 15.5V19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  micBig:'<svg width="20" height="28" viewBox="0 0 14 20" fill="none"><rect x="3.5" y="1" width="7" height="11.5" rx="3.5" fill="currentColor"/><path d="M1 9.5a6 6 0 0 0 12 0M7 15.5V19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  up:'<svg width="14" height="16" viewBox="0 0 14 16"><path d="M7 14V2M2 7l5-5 5 5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chev:'<svg width="6" height="10" viewBox="0 0 6 10"><path d="m1 1 4 4-4 4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>',
  chevG:'<svg width="8" height="13" viewBox="0 0 8 13"><path d="m1.5 1.5 5 5-5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/></svg>',
  sig:'<svg width="19" height="12" viewBox="0 0 19 12" fill="currentColor"><rect x="0" y="8" width="3.2" height="4" rx="1"/><rect x="5" y="5.5" width="3.2" height="6.5" rx="1"/><rect x="10" y="3" width="3.2" height="9" rx="1"/><rect x="15" y="0" width="3.2" height="12" rx="1"/></svg>',
  wifi:'<svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.6c2.4 0 4.6.9 6.3 2.5l1.3-1.3A10.6 10.6 0 0 0 8.5.8 10.6 10.6 0 0 0 .9 3.8l1.3 1.3a8.9 8.9 0 0 1 6.3-2.5Z"/><path d="M8.5 6.2c1.4 0 2.7.5 3.7 1.4l1.3-1.3a7.1 7.1 0 0 0-10 0l1.3 1.3c1-.9 2.3-1.4 3.7-1.4Z"/><path d="M8.5 9.6c.5 0 1 .2 1.3.5L8.5 11.6 7.2 10.1c.3-.3.8-.5 1.3-.5Z"/></svg>',
  tail:'<svg class="t" viewBox="0 0 13 18" aria-hidden="true"><path d="M0 0C.8 8 5 13.6 13 16.4 8.6 18 3.8 18.3 0 18Z" fill="currentColor"/></svg>',
  compose:'<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M17.5 2.5a2.1 2.1 0 0 1 3 3L11 15l-4 1 1-4Z"/></svg>',
  search:'<svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="7" cy="7" r="5.5"/><path d="m11.2 11.2 4.3 4.3"/></svg>',
  x:'<svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  check:'<svg width="16" height="13" viewBox="0 0 16 13"><path d="M1.5 7 6 11.5 14.5 1.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  reply:'<svg width="20" height="18" viewBox="0 0 20 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2 2 8l6 6"/><path d="M2 8h9a7 7 0 0 1 7 7v1"/></svg>',
  copy:'<svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="5" width="11" height="13" rx="2.5"/><path d="M12 5V3.5A1.5 1.5 0 0 0 10.5 2h-7A1.5 1.5 0 0 0 2 3.5v10A1.5 1.5 0 0 0 3.5 15H5"/></svg>',
  pencil:'<svg width="19" height="19" viewBox="0 0 19 19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M13 2.5a2.1 2.1 0 0 1 3 3L6 15.5l-4 1 1-4Z"/></svg>',
  undo:'<svg width="20" height="18" viewBox="0 0 20 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 2 6l4 4"/><path d="M2 6h10a6 6 0 0 1 0 12H8"/></svg>',
  swap:'<svg width="20" height="18" viewBox="0 0 20 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2l4 4-4 4M18 6H6M6 16l-4-4 4-4M2 12h12"/></svg>',
  clock:'<svg width="19" height="19" viewBox="0 0 19 19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="9.5" cy="9.5" r="8"/><path d="M9.5 5v5l3 2"/></svg>',
  trash:'<svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5h14M7 5V3h4v2M4 5l1 13h8l1-13"/></svg>',
  photo:'<svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"><rect x="1" y="1" width="14" height="12" rx="2.5"/><path d="m1.5 11 4-4 3 3 2-2 4 4"/><circle cx="11" cy="4.5" r="1.2" fill="#fff"/></svg>',
  dots:'<svg width="16" height="4" viewBox="0 0 16 4" fill="#fff"><circle cx="2" cy="2" r="1.8"/><circle cx="8" cy="2" r="1.8"/><circle cx="14" cy="2" r="1.8"/></svg>',
  clockW:'<svg width="15" height="15" viewBox="0 0 19 19" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><circle cx="9.5" cy="9.5" r="8"/><path d="M9.5 5v5l3 2"/></svg>',
  wave:'<svg width="16" height="14" viewBox="0 0 16 14" fill="#fff"><rect x="1" y="5" width="2" height="4" rx="1"/><rect x="4.5" y="2" width="2" height="10" rx="1"/><rect x="8" y="0" width="2" height="14" rx="1"/><rect x="11.5" y="3.5" width="2" height="7" rx="1"/></svg>',
  play:'<svg width="12" height="14" viewBox="0 0 12 14"><path d="M1 1.5v11a1 1 0 0 0 1.5.9l9-5.5a1 1 0 0 0 0-1.8l-9-5.5A1 1 0 0 0 1 1.5Z" fill="currentColor"/></svg>',
  plane:'<svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M15.5 1.5 1.5 7l5.6 2.4L9.5 15Z"/><path d="m7.1 9.4 3.3-3.3" stroke-linecap="round"/></svg>',
  moon:'<svg width="14" height="14" viewBox="0 0 14 14"><path d="M12.6 9.4A6 6 0 0 1 4.6 1.4 6 6 0 1 0 12.6 9.4Z" fill="currentColor"/></svg>',
  shift:'<svg width="22" height="20" viewBox="0 0 22 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M11 2 2 11h5v7h8v-7h5Z"/></svg>',
  shiftOn:'<svg width="22" height="20" viewBox="0 0 22 20" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M11 2 2 11h5v7h8v-7h5Z"/></svg>',
  bksp:'<svg width="26" height="19" viewBox="0 0 26 19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M8 1.5h14.5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8L1.5 9.5Z"/><path d="m11.5 6 7 7M18.5 6l-7 7"/></svg>',
  ret:'<svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6a3 3 0 0 1-3 3H3"/><path d="m7 6-4 5 4 5"/></svg>',
  smile:'<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="currentColor"/><circle cx="10.5" cy="12" r="2" fill="var(--kb-bg)"/><circle cx="19.5" cy="12" r="2" fill="var(--kb-bg)"/><path d="M8 17.5c1.2 3.4 4 5.2 7 5.2s5.8-1.8 7-5.2Z" fill="var(--kb-bg)"/></svg>',
  aa:'<svg width="22" height="18" viewBox="0 0 22 18" fill="currentColor"><path d="M0 4h7v1.6H0zM0 8h5v1.6H0zM0 12h7v1.6H0z"/><path d="M14.5 1h2l5.5 16h-2.2l-1.4-4.2h-6L11 17H8.8Zm-1.4 10h4.8L15.5 3.6Z"/></svg>'
};

/* ---------- state ---------- */
const newChat=(name,o)=>Object.assign({id:nid(),name,avatar:null,group:false,members:[],pinned:false,unread:false,wall:'none',wallImg:null,status:'read',statusText:'',
  typing:false,silenced:false,sms:false,at:Date.now(),msgs:[]},o);
function sample(){
  const m=(from,text,o)=>Object.assign({id:nid(),from,text,t:''},o);
  const a=[m('time','Hari Ini 22.47'),m('them','udah tidur belum',{t:'22.47'}),m('them','gue di depan kos lo',{t:'22.47'}),m('me','HAH',{t:'22.48'}),
    m('me','ngapain malem malem gini 😭',{t:'22.48'}),m('them','jaket lo ketinggalan di mobil gue tadi',{t:'22.49',react:'‼️'}),m('me','besok aja kan bisa',{t:'22.49'})];
  const q=m('them','besok gue ke bandung. turun bentar',{t:'22.50'});a.push(q);
  a.push(m('me','5 menit. jangan pencet klakson',{t:'22.51',replyTo:q.id,react:'👍'}));
  const mem=[{id:nid(),name:'Haikal',avatar:null},{id:nid(),name:'Sasa',avatar:null},{id:nid(),name:'Jevan',avatar:null}];
  const g=[m('time','Kamis 20.24'),m('them','woy siapa yang ngabisin indomie gue di dapur',{who:mem[0].id,t:'20.24'}),m('them','bukan gue sumpah',{who:mem[1].id,t:'20.25'}),
    m('me','gue liat jevan bawa mangkok tadi 🫣',{t:'20.26'}),m('time','Jumat 10.32'),m('them','',{who:mem[2].id,voice:{dur:'0:07'},t:'10.32'}),
    m('them','udah gue ganti 2 bungkus ya. puas lo pada',{who:mem[2].id,t:'10.33',react:'😂'}),m('me','🤘',{t:'10.40'})];
  return{time:nowHM(),batt:64,mode:'light',kbOn:true,open:null,chats:[
    newChat('Arsen',{pinned:true,statusText:'22.51',msgs:a,silenced:true}),
    newChat('Anak Kos Melati',{group:true,members:mem,pinned:true,wall:'malam',status:'none',msgs:g,at:Date.now()-1e6}),
    newChat('Mama',{status:'sent',msgs:[m('time','Hari Ini 19.02'),m('them','dek udah makan?',{t:'19.02'}),m('me','udah ma',{t:'19.10'})],at:Date.now()-4e6}),
    newChat('Kak Nara',{unread:true,msgs:[m('time','Hari Ini 21.15'),m('them','dek besok kumpul jam 7 ya, jangan telat lagi',{t:'21.15'})],at:Date.now()-2e6}),
    newChat('Dimas',{status:'none',sms:true,msgs:[m('time','Kemarin 16.40'),m('me','bro catetan termo lo masih ada ga',{t:'16.40'}),m('them','ada, besok gue bawa',{t:'16.52'})],at:Date.now()-9e7})
  ]};
}
function load(){let d=null;try{d=JSON.parse(localStorage.getItem(KEY))||JSON.parse(localStorage.getItem('imsg-au-v3'))}catch(e){}
  if(!d||!Array.isArray(d.chats))return sample();
  d.chats=d.chats.map(c=>newChat(c.name,c));if(d.kbOn===undefined)d.kbOn=true;return d}
let S=load();
let as='me',tray=[],replyTo=null,editing=null,K=1,query='';
/* di luar Telegram, script-nya tetap ke-load tapi platform-nya 'unknown' */
const TG=window.Telegram&&Telegram.WebApp&&Telegram.WebApp.platform!=='unknown'?Telegram.WebApp:null;
let st;function save(){clearTimeout(st);st=setTimeout(()=>{let ok=true;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){ok=false}$('saveWarn').hidden=ok;$('panelBtn').classList.toggle('warn',!ok)},300)}
const cur=()=>S.chats.find(c=>c.id===S.open);
const findMsg=id=>{const c=cur();return c?c.msgs.find(m=>m.id===id):null};
const member=(c,id)=>c.group?(c.members.find(x=>x.id===id)||{name:'?',avatar:null}):{name:c.name,avatar:c.avatar};
const senderName=(c,m)=>m.from==='me'?'Aku':member(c,m.who).name;
function senders(c){if(!c)return[];return[{id:'me',name:'Aku',me:1},...(c.group?c.members.map(x=>({id:x.id,name:x.name})):[{id:'them',name:c.name}])]}

/* ---------- static icons ---------- */
$('composeBtn').innerHTML=I.compose;$('searchIco').innerHTML=I.search;$('plus').innerHTML=I.plus;$('mic').innerHTML=I.mic;
$('send').innerHTML=I.up;$('vid').innerHTML=I.vid;$('nmChev').innerHTML=I.chev;$('rbarX').innerHTML=I.x;

const isEmoji=t=>{const s=(t||'').trim();if(!s||s.length>12)return false;
  try{return /^(\p{Extended_Pictographic}|\p{Emoji_Component}|‍|️)+$/u.test(s)&&[...new Intl.Segmenter().segment(s)].length<=3}catch(e){return false}};
const boldFirst=t=>{const m=String(t).match(/^(\S+)(.*)$/s);return m?'<b>'+esc(m[1])+'</b>'+esc(m[2]):esc(t)};
const initial=n=>esc(((n||'?').trim()[0]||'?').toUpperCase());
const avHTML=c=>c.avatar?`<img src="${c.avatar}" alt="">`:(c.group?initial(c.name):initial(c.name));
const avCls=c=>'av'+(c.group&&!c.avatar?' gav':'');
const preview=c=>{const ms=c.msgs.filter(m=>m.from!=='time');const m=ms[ms.length-1];if(!m)return'';
  if(m.unsent)return senderName(c,m).replace(/^Aku$/,'Kamu')+' membatalkan pengiriman pesan';
  let t=m.voice?'Pesan Suara':(!m.text&&m.imgs)?(m.imgs.length>1?m.imgs.length+' Foto':'Foto'):m.text;
  return c.group&&m.from==='them'?member(c,m.who).name+': '+t:t};
const lastT=c=>{const ms=c.msgs.filter(m=>m.from!=='time'&&m.t);return ms.length?ms[ms.length-1].t:''};
function waveHTML(seed){let h=0;for(const ch of seed)h=(h*31+ch.charCodeAt(0))>>>0;let s='';
  for(let i=0;i<34;i++){h=(h*1103515245+12345)>>>0;const v=4+((h>>>8)%22);s+=`<i style="height:${v}px"></i>`}return s}

/* ---------- render ---------- */
function renderStatus(){
  $('screen').classList.toggle('ph-dark',S.mode==='dark');$('screen').classList.toggle('ph-light',S.mode!=='dark');
  $('sbTime').textContent=S.time;
  $('sbRight').innerHTML=`${I.sig}${I.wifi}<span class="batt"><i style="width:${Math.max(4,Math.min(100,+S.batt||0))}%"></i></span>`;
  $('kbBtn').setAttribute('aria-pressed',!!S.kbOn);$('kbBtn').textContent='Keyboard iOS: '+(S.kbOn?'Nyala':'Mati');
}
function renderList(){
  const q=query.trim().toLowerCase();
  const match=c=>!q||c.name.toLowerCase().includes(q)||c.msgs.some(m=>(m.text||'').toLowerCase().includes(q));
  const pins=S.chats.filter(c=>c.pinned&&match(c));
  const rest=S.chats.filter(c=>!c.pinned&&match(c)).sort((a,b)=>b.at-a.at);
  $('pins').hidden=!pins.length;
  $('pins').innerHTML=pins.map(c=>`<div class="pin" data-chat="${c.id}">${c.unread?'<span class="udot"></span>':''}<div class="${avCls(c)}">${avHTML(c)}</div><small>${esc(c.name)}</small></div>`).join('');
  $('rows').innerHTML=rest.length?rest.map(c=>`<div class="crow" data-chat="${c.id}">${c.unread?'<span class="udot"></span>':'<span></span>'}<div class="${avCls(c)}">${avHTML(c)}</div>
    <div class="cmain"><div class="ctop"><b>${esc(c.name)}</b><span class="ctime">${esc(lastT(c))}${I.chevG}</span></div><div class="cprev">${esc(preview(c))}</div></div></div>`).join('')
    :(pins.length?'':`<div class="lempty">${q?'Nggak ada yang cocok.':'Belum ada percakapan.<br>Ketuk ikon tulis di kanan atas buat mulai chat.'}</div>`);
  save();
}
function renderWho(){const c=cur();const box=$('whoBtns');$('whoChip').hidden=!c;
  if(!c){box.innerHTML='<span class="none">Buka chat dulu.</span>';return}
  const list=senders(c);if(!list.some(x=>x.id===as))as='me';
  box.innerHTML=list.map(x=>`<button type="button" data-as="${x.id}" aria-pressed="${as===x.id}"><i class="dot" style="background:${x.me?'var(--accent)':'#9A9AA0'}"></i><span>${esc(x.name)}</span></button>`).join('');
  const x=list.find(y=>y.id===as);$('whoName').textContent=x.name;$('whoDot').style.background=x.me?'var(--accent)':'#9A9AA0';
}
function nextAs(back){const l=senders(cur());if(l.length){const i=l.findIndex(x=>x.id===as);setAs(l[(i+(back?l.length-1:1))%l.length].id)}}
$('whoBtns').addEventListener('click',e=>{const b=e.target.closest('[data-as]');if(b){setAs(b.dataset.as);closePanel();if(!matchMedia('(pointer:coarse)').matches)inp.focus()}});
$('whoChip').onclick=()=>nextAs();
function renderChatChrome(){
  const c=cur();if(!c)return;
  let w='';if(c.wall==='custom'&&c.wallImg)w=`<div class="wall" style="background-image:url('${c.wallImg}')"></div>`;else if(WALLS[c.wall])w=`<div class="wall" style="background:${WALLS[c.wall]}"></div>`;
  $('wall').innerHTML=w;$('fades').hidden=!!w;$('vChat').classList.toggle('haswall',!!w);$('vChat').classList.toggle('sms',!!c.sms);
  $('screen').classList.toggle('walldark',!!w&&!!DARKWALL[c.wall]);
  const n=S.chats.filter(x=>x.unread&&x.id!==c.id).length;
  $('back').className='back glass press'+(n?'':' only');$('back').innerHTML=I.back+(n?`<span>${n}</span>`:'');
  $('av').className=avCls(c);$('av').innerHTML=avHTML(c);$('nm').textContent=c.name;
  inp.placeholder=replyTo?'Balas':(c.sms?'Pesan Teks • SMS':'iMessage');
  renderWho();
}
/* posisi kartu di tumpukan; d = jarak dari kartu depan (pecahan waktu digeser).
   kartu sebelumnya (d<0) nyapu ke kiri dulu baru nyelip ke belakang, kartu berikutnya (d>0) cuma maju dari kanan */
/* tiap foto punya miring & geser sendiri biar tumpukannya berantakan; yang di depan miringnya dikurangin */
const STK=[[1.5,0],[-5.5,-8],[5,-12],[-2,-16],[4,-6],[-4,-10]];
function stkStyle(d,j){const a=Math.abs(d),n=Math.min(a,3),s=1-.07*n,[r0,y0]=STK[j%STK.length],w=.35+.65*Math.min(a,1);
  let x=Math.sign(d)*n*17;if(d<0&&d>-1)x-=150*Math.sin(Math.PI*a);
  return`transform:translate(${x.toFixed(1)}px,${(y0*Math.min(a,1)).toFixed(1)}px) rotate(${(r0*w).toFixed(2)}deg) scale(${s.toFixed(3)});z-index:${100-Math.round(a*10)};opacity:${a>3.5?0:1}`}
function picsHTML(c,m,tap){if(!m.imgs||!m.imgs.length)return'';const n=m.imgs.length;
  if(n===1)return`<div class="pics n1"><img src="${m.imgs[0]}" ${tap?'data-img="0"':''} alt=""></div>`;
  const k=Math.min(m.pi||0,n-1);
  const cards=m.imgs.map((s,j)=>`<img src="${s}" ${tap?`data-img="${j}"`:''} alt="" style="${stkStyle(j-k,j)}">`).join('');
  const who=m.from==='me'?'Kamu':esc(senderName(c,m));
  return`<div class="stlabel">${who} mengirim ${n} foto</div><div class="stackwrap"><span class="share glass">${I.plane}</span><div class="stack"${tap?' data-stack':''}>${cards}</div></div>`}
/* geser tumpukan foto */
let sw=null;
$('thread').addEventListener('pointerdown',e=>{const st=e.target.closest('[data-stack]');if(!st||e.button>0)return;
  const m=findMsg(st.closest('.line').dataset.id);if(!m)return;
  sw={st,m,x:e.clientX,y:e.clientY,k:Math.min(m.pi||0,m.imgs.length-1),p:null,moved:false}});
$('thread').addEventListener('pointermove',e=>{if(!sw)return;const dx=(e.clientX-sw.x)/K,dy=(e.clientY-sw.y)/K;
  if(!sw.moved){if(Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)){sw=null;return}if(Math.abs(dx)<8)return;sw.moved=true;sw.st.classList.add('drag');try{sw.st.setPointerCapture(e.pointerId)}catch(_){}}
  const n=sw.m.imgs.length;let p=sw.k-dx/170;if(p<0)p*=.3;if(p>n-1)p=n-1+(p-n+1)*.3;sw.p=p;
  sw.st.querySelectorAll('img').forEach((im,j)=>im.style.cssText=stkStyle(j-p,j))});
['pointerup','pointercancel'].forEach(v=>$('thread').addEventListener(v,()=>{if(!sw)return;const s=sw;sw=null;if(!s.moved)return;
  s.st.classList.remove('drag');const n=s.m.imgs.length;
  let k=Math.round(s.p);if(k===s.k&&Math.abs(s.p-s.k)>.18)k=s.k+Math.sign(s.p-s.k);
  k=Math.max(0,Math.min(n-1,k));s.m.pi=k;save();
  s.st.querySelectorAll('img').forEach((im,j)=>im.style.cssText=stkStyle(j-k,j));
  swEnd=Date.now()}));
let swEnd=0;
function renderThread(scroll){
  const c=cur();if(!c)return;
  const th=$('thread');const atB=th.scrollHeight-th.scrollTop-th.clientHeight<60;
  const ms=c.msgs;
  const run=m=>!m?null:m.from==='time'?'time':m.unsent?'sys':(m.from==='them'&&c.group?'them:'+m.who:m.from);
  let h='';
  if(!ms.length&&!c.typing)h=`<div class="empty">Mulai percakapan sama ${esc(c.name)}.</div>`;
  for(let i=0;i<ms.length;i++){const m=ms[i],k=run(m);
    if(k==='time'){h+=`<div class="ts" data-ts="${m.id}">${boldFirst(m.text)}</div>`;continue}
    if(k==='sys'){h+=`<div class="sysm" data-sys="${m.id}">${m.from==='me'?'Kamu':esc(senderName(c,m))} membatalkan pengiriman pesan</div>`;continue}
    const nx=ms[i+1];const nk=nx?run(nx):(c.typing?(c.group?'them:'+c.typing:'them'):null);
    const first=run(ms[i-1])!==k||!!m.replyTo;const last=nk!==k||!!(nx&&nx.replyTo);
    const g=c.group&&m.from==='them';
    const emo=isEmoji(m.text);let quote='';
    if(m.replyTo){const o=ms.find(x=>x.id===m.replyTo);if(o)quote=`<div class="qwrap ${o.from}"><div class="quote">${esc(o.unsent?'Pesan dibatalkan':(o.voice?'Pesan Suara':o.text||'Foto'))}</div></div><div class="qline"></div>`}
    const pics=picsHTML(c,m,true);
    let bub='';
    if(m.voice)bub=`<div class="bub voice${last?' tail':''}"><span class="vplay">${I.play}</span><span class="wave">${waveHTML(m.id)}</span><span class="vdur">${esc(m.voice.dur)}</span>${last?I.tail:''}</div>`;
    else if(m.text)bub=`<div class="bub${last&&!emo?' tail':''}${emo?' emoji':''}">${esc(m.text)}${last?I.tail:''}</div>`;
    const mem=g?member(c,m.who):null;
    h+=`<div class="line ${m.from} ${first?'gap':'tight'}${m.react?' hasreact':''}${g?' g':''}" data-id="${m.id}">${g&&first?`<div class="sname">${esc(mem.name)}</div>`:''}${quote}<div class="hit${m.imgs&&m.imgs.length>1?' has-stack':''}">${pics}${bub}${m.react?`<span class="react">${esc(m.react)}</span>`:''}</div>${m.edited?'<div class="edtag">Diedit</div>':''}${g&&last?`<div class="av sav">${mem.avatar?`<img src="${mem.avatar}" alt="">`:initial(mem.name)}</div>`:''}</div>`}
  const real=ms.filter(m=>m.from!=='time'&&!m.unsent);const lm=real[real.length-1];
  if(lm&&lm.from==='me'&&!c.typing&&c.status!=='none')h+=`<div class="line me"><div class="rcpt" data-rcpt="1">${c.status==='read'&&!c.sms?'<b>Dibaca</b>'+(c.statusText?' '+esc(c.statusText):''):'<b>Terkirim</b>'}</div></div>`;
  if(c.typing){const g=c.group;const mem=g?member(c,c.typing):null;const lastRun=lm?run(lm):null;const tk=g?'them:'+c.typing:'them';
    h+=`<div class="line them ${lastRun===tk?'tight':'gap'}${g?' g':''}">${g&&lastRun!==tk?`<div class="sname">${esc(mem.name)}</div>`:''}<div class="hit" data-typing="1"><div class="bub tail typing"><i></i><i></i><i></i>${I.tail}</div></div>${g?`<div class="av sav">${mem.avatar?`<img src="${mem.avatar}" alt="">`:initial(mem.name)}</div>`:''}</div>`}
  if(c.silenced&&!c.group)h+=`<div class="sil" data-sil="1">${I.moon}${esc(c.name)} menyenyapkan notifikasi</div>`;
  $('tin').innerHTML=h;
  if(scroll==='bottom'||(scroll!=='keep'&&atB)){th.scrollTop=th.scrollHeight;
    $('tin').querySelectorAll('img').forEach(im=>{if(!im.complete)im.addEventListener('load',()=>{th.scrollTop=th.scrollHeight},{once:true})})}
  save();
}

/* ---------- navigation ---------- */
function openChat(id){const c=S.chats.find(x=>x.id===id);if(!c)return;S.open=id;c.unread=false;as='me';
  closeLayer();hideKb();resetCompose();renderChatChrome();renderThread('bottom');
  $('screen').classList.add('chat-open');
  requestAnimationFrame(()=>{$('thread').scrollTop=1e6});renderList()}
function goBack(){closeLayer();hideKb();resetCompose();S.open=null;$('screen').classList.remove('chat-open','walldark');inp.blur();renderWho();renderList()}
$('back').onclick=goBack;

/* ---------- compose ---------- */
const inp=$('inp');
function setAs(v){as=v;renderWho();syncInput()}
function syncInput(){
  inp.style.height='32px';inp.style.height=Math.min(120,inp.scrollHeight)+'px';
  const has=inp.value.trim().length>0||tray.length>0;$('mic').hidden=has;$('send').hidden=!has;
  $('send').classList.toggle('as-them',as!=='me'&&!editing);
  $('tray').hidden=!tray.length;
  $('tray').innerHTML=tray.map((s,i)=>`<div class="ti"><img src="${s}" alt=""><button type="button" data-rm="${i}" aria-label="Hapus foto">${I.x}</button></div>`).join('');
  const rb=$('rbar');const c=cur();
  if(editing){rb.hidden=false;$('rbarT').textContent='Mengedit pesan';$('rbarS').textContent=(findMsg(editing)||{}).text||''}
  else rb.hidden=true;
  renderFocus();
  requestAnimationFrame(()=>{const th=$('thread');const atB=th.scrollHeight-th.scrollTop-th.clientHeight<120;$('tin').style.setProperty('--padb',($('barwrap').offsetHeight+(kbVis?348:44))+'px');if(atB)th.scrollTop=th.scrollHeight});
}
function focusLine(c,m,first,last){
  const g=c.group&&m.from==='them';const mem=g?member(c,m.who):null;const emo=isEmoji(m.text);
  const pics=picsHTML(c,m,false);
  let bub='';
  if(m.unsent)return`<div class="sysm">${m.from==='me'?'Kamu':esc(senderName(c,m))} membatalkan pengiriman pesan</div>`;
  if(m.voice)bub=`<div class="bub voice${last?' tail':''}"><span class="vplay">${I.play}</span><span class="wave">${waveHTML(m.id)}</span><span class="vdur">${esc(m.voice.dur)}</span>${last?I.tail:''}</div>`;
  else if(m.text)bub=`<div class="bub${last&&!emo?' tail':''}${emo?' emoji':''}">${esc(m.text)}${last?I.tail:''}</div>`;
  return`<div class="line ${m.from} ${first?'gap':'tight'}${m.react?' hasreact':''}${g?' g':''}">${g&&first?`<div class="sname">${esc(mem.name)}</div>`:''}<div class="hit${m.imgs&&m.imgs.length>1?' has-stack':''}">${pics}${bub}${m.react?`<span class="react">${esc(m.react)}</span>`:''}</div>${g&&last?`<div class="av sav">${mem.avatar?`<img src="${mem.avatar}" alt="">`:initial(mem.name)}</div>`:''}</div>`}
function renderFocus(){
  const c=cur();const o=replyTo&&c?findMsg(replyTo):null;
  $('vChat').classList.toggle('reply-on',!!o&&!editing);
  if(c)inp.placeholder=o&&!editing?'Balas':(c.sms?'Pesan Teks • SMS':'iMessage');
  if(!o||editing){$('focus').innerHTML='';return}
  const list=[o,...c.msgs.filter(m=>m.replyTo===o.id)];
  const key=m=>m.from==='them'&&c.group?'them:'+m.who:m.from;
  $('focus').innerHTML=list.map((m,i)=>focusLine(c,m,i===0||key(list[i-1])!==key(m),i===list.length-1||key(list[i+1])!==key(m))).join('')
    +(c.silenced&&!c.group?`<div class="sil">${I.moon}${esc(c.name)} menyenyapkan notifikasi</div>`:'');
  requestAnimationFrame(()=>{$('vChat').style.setProperty('--fb',($('barwrap').offsetHeight+(kbVis?340:30)+10)+'px');$('focus').scrollTop=1e6});
}
$('focusbg').addEventListener('click',()=>{replyTo=null;syncInput();renderThread('keep')});
function resetCompose(){tray=[];replyTo=null;editing=null;inp.value='';syncInput()}
$('tray').addEventListener('click',e=>{const b=e.target.closest('[data-rm]');if(b){tray.splice(+b.dataset.rm,1);syncInput()}});
$('rbarX').onclick=()=>{if(editing)inp.value='';editing=null;replyTo=null;syncInput();inp.focus()};
function pushMsg(c,o){const m=Object.assign({id:nid(),from:as==='me'?'me':'them',text:'',t:S.time},o);if(c.group&&m.from==='them')m.who=as;
  if(!c.msgs.length)c.msgs.push({id:nid(),from:'time',text:'Hari Ini '+S.time});
  c.msgs.push(m);if(m.from==='them'&&c.typing&&(!c.group||c.typing===as))c.typing=false;
  if(m.from==='me'&&c.status==='read')c.statusText=S.time;c.at=Date.now();return m}
function send(){
  const c=cur();if(!c)return;const text=inp.value.replace(/\s+$/,'');
  if(editing){const m=findMsg(editing);if(m&&text.trim()&&text!==m.text){m.text=text;m.edited=true}editing=null;inp.value='';syncInput();renderThread('keep');return}
  if(!text.trim()&&!tray.length)return;
  if(tray.length)pushMsg(c,{imgs:tray.slice(),replyTo});
  if(text.trim())pushMsg(c,{text,replyTo});
  tray=[];inp.value='';syncInput();renderThread(replyTo?'keep':'bottom');renderList();if(kbVis)renderKb();
}
inp.addEventListener('input',()=>{syncInput();if(kbVis)renderKb()});
inp.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();send()}
  else if(e.key==='Tab'){e.preventDefault();nextAs(e.shiftKey)}
  else if(e.key==='Escape'){if(editing||replyTo)$('rbarX').click();else hideKb()}});
inp.addEventListener('focus',()=>showKb());
$('field').addEventListener('pointerdown',e=>{if(e.target===inp||e.target.closest('button'))return;e.preventDefault();inp.focus()});
$('send').addEventListener('pointerdown',e=>e.preventDefault());
$('send').onclick=()=>send();

const readImg=(file,max)=>new Promise(res=>{const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{
  const k=Math.min(1,max/Math.max(im.width,im.height));const cv=document.createElement('canvas');cv.width=Math.round(im.width*k);cv.height=Math.round(im.height*k);
  cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);res(cv.toDataURL('image/jpeg',.85))};im.onerror=()=>res(null);im.src=fr.result};fr.readAsDataURL(file)});
async function addFiles(files){for(const f of files){if(!f.type.startsWith('image/'))continue;const d=await readImg(f,1000);if(d)tray.push(d)}syncInput()}
$('fImg').addEventListener('change',e=>{addFiles([...e.target.files]);e.target.value=''});
inp.addEventListener('paste',e=>{const fs=[...(e.clipboardData?.files||[])].filter(f=>f.type.startsWith('image/'));if(fs.length){e.preventDefault();addFiles(fs)}});
$('vChat').addEventListener('dragover',e=>{e.preventDefault()});
$('vChat').addEventListener('drop',e=>{e.preventDefault();addFiles([...e.dataTransfer.files])});
let oneCb=null;$('fOne').addEventListener('change',async e=>{const f=e.target.files[0];e.target.value='';if(f&&oneCb){const d=await readImg(f,1400);if(d)oneCb(d)}});
const pickOne=cb=>{oneCb=cb;$('fOne').click()};

/* ---------- iOS keyboard ---------- */
let kbVis=false,kbMode='abc',shift=0,lastShift=0;
const ROWS={abc:['qwertyuiop','asdfghjkl','zxcvbnm'],n123:['1234567890','-/:;()Rp&@"','.,?!\''],sym:['[]{}#%^*+=','_\\|~<>€$£•','.,?!\'']};
const EMO='😭😂🤣🥺😊🥰😍😘😳🫣🙄😤😡🤬😴🤔🫠😅🙏👍👎🤘👀💀🔥✨❤️🖤💔🤍💙🫶👋🤝💅🍜☕️🎂🎉🌙⭐️🌧️🏠🚗'.match(/\p{Extended_Pictographic}️?/gu)||[];
const WORDS='aku gue gua lo lu kamu kak dek yang udah belum iya iyaa nggak gak ga banget kok sih dong deh aja lagi mau tau tahu kenapa apa gimana sama juga tapi terus jadi nanti besok sekarang tadi maaf makasih oke otw ya wkwk wkwkwk anjir anjay cok bro sis sayang kangen beneran serius hah hehe haha jangan bisa boleh kapan dimana siapa mana ngapain lagian emang masa kayak gitu gini bentar sebentar ketemu pulang tidur makan'.split(' ');
function curWord(){const a=inp.selectionStart??inp.value.length;const mt=inp.value.slice(0,a).match(/(\S+)$/);return mt?mt[1]:''}
function suggestions(){const w=curWord();const lw=w.toLowerCase();
  if(!w){const prev=(inp.value.trim().split(/\s+/).pop()||'').toLowerCase();const pool={aku:['mau','udah','lagi'],gue:['udah','lagi','mau'],lo:['dimana','udah','lagi']}[prev];return pool||['aku','gue','iya']}
  const m=WORDS.filter(x=>x.startsWith(lw)&&x!==lw).slice(0,2);while(m.length<2)m.push(['ya','sih'][m.length]);return['“'+w+'”',...m]}
function keyHTML(ch){const show=kbMode==='abc'&&shift?ch.toUpperCase():ch;return`<button class="k" type="button" data-c="${esc(ch)}" aria-label="${esc(show)}">${esc(show)}</button>`}
function renderKb(){if(!kbVis)return;let h='';
  const sg=suggestions();h+=`<div class="sug">${sg.map((s,i)=>`${i?'<i></i>':''}<button type="button" data-sug="${i}">${esc(s)}</button>`).join('')}<i></i><span class="aa">${I.aa}</span></div>`;
  if(kbMode==='emoji'){h+=`<div class="egrid">${EMO.map(e=>`<button type="button" data-c="${e}">${e}</button>`).join('')}</div>
    <div class="krow"><button class="k fn wide lbl" type="button" data-k="abc">ABC</button><button class="k" type="button" data-k="sp" aria-label="spasi"></button><button class="k fn" type="button" data-k="bk" aria-label="hapus">${I.bksp}</button></div>`}
  else{const R=ROWS[kbMode];
    h+=`<div class="krow first">${[...R[0]].map(keyHTML).join('')}</div>`;
    h+=`<div class="krow${kbMode==='abc'?' r2':''}">${[...R[1]].map(keyHTML).join('')}</div>`;
    const left=kbMode==='abc'?`<button class="k fn${shift?' on':''}" type="button" data-k="shift" aria-label="shift">${shift?I.shiftOn:I.shift}</button>`:`<button class="k fn lbl" type="button" data-k="${kbMode==='n123'?'sym':'n123'}">${kbMode==='n123'?'#+=':'123'}</button>`;
    h+=`<div class="krow">${left}<span class="gap1"></span>${[...R[2]].map(keyHTML).join('')}<span class="gap1"></span><button class="k fn" type="button" data-k="bk" aria-label="hapus">${I.bksp}</button></div>`;
    h+=`<div class="krow"><button class="k fn wide lbl" type="button" data-k="${kbMode==='abc'?'n123':'abc'}">${kbMode==='abc'?'123':'ABC'}</button><button class="k" type="button" data-k="sp" aria-label="spasi"></button><button class="k fn wide" type="button" data-k="ret" aria-label="baris baru">${I.ret}</button></div>`}
  h+=`<div class="kbot"><button type="button" data-k="emoji" aria-label="emoji">${I.smile}</button><button type="button" data-k="mic" aria-label="dikte">${I.micBig}</button></div>`;
  $('kb').innerHTML=h}
function showKb(){if(!S.kbOn||!cur())return;if(!kbVis){kbVis=true;kbMode='abc';shift=0}$('vChat').classList.add('kb-on');renderKb();syncInput();
  setTimeout(()=>{const th=$('thread');th.scrollTop=th.scrollHeight},320)}
function hideKb(){if(!kbVis)return;kbVis=false;$('vChat').classList.remove('kb-on');syncInput()}
function ins(s){const a=inp.selectionStart??inp.value.length,b=inp.selectionEnd??a;inp.setRangeText(s,a,b,'end');syncInput()}
function bk(){const a=inp.selectionStart??inp.value.length,b=inp.selectionEnd??a;
  if(a!==b){inp.setRangeText('',a,b,'end')}else if(a>0){let before=inp.value.slice(0,a);let parts;try{parts=[...new Intl.Segmenter().segment(before)].map(x=>x.segment)}catch(e){parts=[...before]}parts.pop();const nb=parts.join('');inp.setRangeText('',nb.length,a,'end')}
  syncInput()}
let rep=null,repT=null;const stopRep=()=>{clearTimeout(repT);clearInterval(rep);repT=rep=null;$('kb').querySelectorAll('.down').forEach(x=>x.classList.remove('down'))};
$('kb').addEventListener('pointerdown',e=>{e.preventDefault();const b=e.target.closest('button');if(!b)return;
  if(document.activeElement!==inp)inp.focus({preventScroll:true});
  b.classList.add('down');
  if(b.dataset.c!==undefined){let ch=b.dataset.c;if(kbMode==='abc'&&shift)ch=ch.toUpperCase();ins(ch);if(shift===1)shift=0;
    if(kbMode!=='abc'&&kbMode!=='emoji'&&ch==="'"){kbMode='abc'}renderKb();return}
  if(b.dataset.sug!==undefined){const s=suggestions()[+b.dataset.sug].replace(/[“”]/g,'');const w=curWord();const a=inp.selectionStart;inp.setRangeText(s+' ',a-w.length,a,'end');syncInput();renderKb();return}
  const k=b.dataset.k;
  if(k==='bk'){bk();renderKb();repT=setTimeout(()=>{rep=setInterval(()=>{bk()},70)},420);return}
  if(k==='sp'){ins(' ');if(kbMode!=='abc'&&kbMode!=='emoji')kbMode='abc';renderKb();return}
  if(k==='ret'){ins('\n');renderKb();return}
  if(k==='shift'){const n=Date.now();shift=shift===0?(n-lastShift<300?2:1):(n-lastShift<300&&shift===1?2:0);lastShift=n;renderKb();return}
  if(k==='abc'||k==='n123'||k==='sym'||k==='emoji'){kbMode=k;renderKb();return}
});
['pointerup','pointercancel','pointerleave'].forEach(v=>$('kb').addEventListener(v,()=>{if(rep||repT)renderKb();stopRep()}));
$('kbBtn').onclick=()=>{S.kbOn=!S.kbOn;inp.inputMode=S.kbOn?'none':'text';if(!S.kbOn)hideKb();else if(document.activeElement===inp)showKb();renderStatus();save()};

/* ---------- layers ---------- */
const L=$('layer');
function closeLayer(){L.innerHTML='';$('screen').classList.remove('ctx-on');document.querySelectorAll('.line[style*="visibility"]').forEach(x=>x.style.visibility='')}
function rel(el){const r=el.getBoundingClientRect(),s=$('screen').getBoundingClientRect();return{x:(r.left-s.left)/K,y:(r.top-s.top)/K,w:r.width/K,h:r.height/K}}
function sheet({title,body,bind,onDone}){
  inp.blur();hideKb();
  L.innerHTML=`<div class="dim" data-close></div><div class="sheet" role="dialog" aria-label="${esc(title)}"><div class="sh-head"><button class="gcirc glass press" type="button" data-close aria-label="Tutup">${I.x}</button><div class="sh-title">${esc(title)}</div><button class="gcirc ok press" type="button" data-done aria-label="Selesai">${I.check}</button></div><div class="sh-body">${body}</div></div>`;
  const sh=L.querySelector('.sheet');requestAnimationFrame(()=>sh.classList.add('in'));
  L.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeLayer);
  L.querySelector('[data-done]').onclick=()=>{onDone&&onDone();closeLayer()};
  bind&&bind(sh);
}
function holdable(root,sel,cb){
  let t=null,sx=0,sy=0;root._held=false;
  root.addEventListener('pointerdown',e=>{const el=e.target.closest(sel);if(!el||e.button>0)return;root._held=false;sx=e.clientX;sy=e.clientY;
    t=setTimeout(()=>{root._held=true;t=null;cb(el)},430)});
  root.addEventListener('pointermove',e=>{if(t&&(Math.abs(e.clientX-sx)>8||Math.abs(e.clientY-sy)>8)){clearTimeout(t);t=null}});
  ['pointerup','pointercancel','pointerleave'].forEach(v=>root.addEventListener(v,()=>{if(t){clearTimeout(t);t=null}}));
  root.addEventListener('contextmenu',e=>{const el=e.target.closest(sel);if(!el)return;e.preventDefault();if(!root._held)cb(el)});
  root.addEventListener('dblclick',e=>{const el=e.target.closest(sel);if(el)cb(el)});
}

/* ---- highlight / context menu ---- */
const TB=['❤️','👍','👎','😂','‼️','❓','😭'];
function openCtx(line){
  const m=findMsg(line.dataset.id);const c=cur();if(!m||!c)return;
  const hit=line.querySelector('.hit');if(!hit)return;const r=rel(hit);
  const list=senders(c);const nxt=list[(list.findIndex(x=>x.id===(m.from==='me'?'me':(c.group?m.who:'them')))+1)%list.length];
  const items=[['reply','Balas',I.reply]];
  if(m.text)items.push(['copy','Salin',I.copy],['edit','Edit',I.pencil]);
  items.push(['unsend','Batalkan Kirim',I.undo],['swap','Jadikan pesan '+nxt.name,I.swap],['time','Sisipkan Waktu di Atas',I.clock],['del','Hapus',I.trash]);
  const menuH=items.length*44,barH=50,gap=10,topMin=64,botMax=$('screen').offsetHeight-40;
  let top=r.y;if(top-barH-gap<topMin)top=topMin+barH+gap;if(top+r.h+gap+menuH>botMax)top=Math.max(topMin+barH+gap,botMax-menuH-gap-r.h);
  const side=m.from==='me'?'right:14px':`left:${c.group?50:14}px`;
  $('screen').classList.add('ctx-on');line.style.visibility='hidden';
  L.innerHTML=`<div class="ctxdim" data-close></div>
   <div class="tb glass" style="${side};top:${top-barH-gap}px">${TB.map(e=>`<button type="button" data-r="${e}" aria-pressed="${m.react===e}">${e}</button>`).join('')}</div>
   <div class="ctx-b ${m.from}${$('vChat').classList.contains('haswall')?' haswall':''}" style="left:${r.x}px;top:${top}px;width:${r.w}px;--me:${c.sms?'#34C759':'#0B84FE'}">${hit.outerHTML}</div>
   <div class="cmenu" style="${side};top:${Math.min(top+r.h+gap,botMax-menuH)}px">${items.map(([a,l,ic])=>`<button type="button" data-a="${a}" class="${a==='del'||a==='unsend'?'red':''}"><span>${esc(l)}</span>${ic}</button>`).join('')}</div>`;
  L.querySelector('[data-close]').onclick=closeLayer;
  L.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{m.react=m.react===b.dataset.r?null:b.dataset.r;closeLayer();renderThread('keep')});
  L.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const a=b.dataset.a,M=c.msgs,i=M.indexOf(m);closeLayer();
    if(a==='reply'){editing=null;replyTo=m.id;syncInput();inp.focus();return}
    if(a==='copy'){try{navigator.clipboard.writeText(m.text).catch(()=>{})}catch(e){}return}
    if(a==='edit'){replyTo=null;editing=m.id;inp.value=m.text;syncInput();inp.focus();return}
    if(a==='unsend'){m.unsent=true;m.react=null}
    if(a==='swap'){if(nxt.id==='me'){m.from='me';delete m.who}else{m.from='them';if(c.group)m.who=nxt.id}}
    if(a==='time')M.splice(i,0,{id:nid(),from:'time',text:'Hari Ini '+(m.t||S.time)});
    if(a==='del')M.splice(i,1);
    renderThread('keep');renderList()});
}
holdable($('tin'),'.line[data-id]',openCtx);
$('thread').addEventListener('click',e=>{
  if($('tin')._held){$('tin')._held=false;return}
  if(Date.now()-swEnd<350)return;
  const c=cur();if(!c)return;
  const img=e.target.closest('[data-img]');if(img){hideKb();const mm=findMsg(img.closest('.line').dataset.id);const imgs=mm&&mm.imgs?mm.imgs:[img.src];const st=+img.dataset.img||0;
    L.innerHTML=`<div class="viewer"><button class="gcirc press" type="button" data-close aria-label="Tutup">${I.x}</button><div class="gal">${imgs.map(s=>`<div><img src="${s}" alt=""></div>`).join('')}</div>${imgs.length>1?`<div class="gcount" id="gcount">${st+1} dari ${imgs.length}</div>`:''}</div>`;
    const gal=L.querySelector('.gal');gal.scrollLeft=st*393;gal.addEventListener('scroll',()=>{const g=$('gcount');if(g)g.textContent=(Math.round(gal.scrollLeft/393)+1)+' dari '+imgs.length});
    L.querySelectorAll('[data-close]').forEach(x=>x.onclick=closeLayer);return}
  if(e.target.closest('[data-typing]')){c.typing=false;renderThread('keep');return}
  if(e.target.closest('[data-rcpt]')||e.target.closest('[data-sil]'))return infoSheet();
  const ts=e.target.closest('[data-ts]');if(ts){const m=findMsg(ts.dataset.ts);
    sheet({title:'Penanda Waktu',body:`<div class="grp"><div class="cell left"><input type="text" id="tsTxt" value="${esc(m.text)}" aria-label="Teks penanda waktu"></div></div><p class="shnote">Kata pertama otomatis tebal, kayak <b>Kamis</b> 20.24.</p><div class="grp"><div class="cell"><button class="cbtn red" type="button" id="tsDel">Hapus Penanda Waktu</button></div></div>`,
      bind:()=>{$('tsDel').onclick=()=>{c.msgs.splice(c.msgs.indexOf(m),1);closeLayer();renderThread('keep')};$('tsTxt').onkeydown=e=>{if(e.key==='Enter')L.querySelector('[data-done]').click()}},
      onDone:()=>{m.text=$('tsTxt').value;renderThread('keep')}});return}
  const sy=e.target.closest('[data-sys]');if(sy){const m=findMsg(sy.dataset.sys);
    sheet({title:'Pesan Dibatalkan',body:`<div class="grp"><div class="cell"><button class="cbtn" type="button" id="syR">Kembalikan Pesan</button></div><div class="cell"><button class="cbtn red" type="button" id="syD">Hapus</button></div></div>`,
      bind:()=>{$('syR').onclick=()=>{m.unsent=false;closeLayer();renderThread('keep');renderList()};$('syD').onclick=()=>{c.msgs.splice(c.msgs.indexOf(m),1);closeLayer();renderThread('keep');renderList()}}});return}
  const qw=e.target.closest('.qwrap');if(qw){const ln=qw.closest('.line');const m=findMsg(ln.dataset.id);if(m&&m.replyTo&&findMsg(m.replyTo)){editing=null;replyTo=m.replyTo;syncInput();inp.focus()}return}
  if(!e.target.closest('.hit')){inp.blur();hideKb()}
});

/* ---- plus menu ---- */
$('plus').onclick=()=>{const c=cur();if(!c)return;
  const bottom=$('barwrap').offsetHeight+(kbVis?348:38);
  L.innerHTML=`<div class="ctxdim" style="background:transparent" data-close></div><div class="pmenu glass" style="bottom:${bottom}px">
    <button type="button" data-a="img"><span class="ic" style="background:linear-gradient(#FFB340,#FF5E7E)">${I.photo}</span>Foto</button>
    <button type="button" data-a="voice"><span class="ic" style="background:#FF3B30">${I.wave}</span>Pesan Suara</button>
    <button type="button" data-a="time"><span class="ic" style="background:#8E8E93">${I.clockW}</span>Penanda Waktu</button>
    <button type="button" data-a="typing"><span class="ic" style="background:#34C759">${I.dots}</span>${c.typing?'Stop Mengetik':'Sedang Mengetik'}</button></div>`;
  L.querySelector('[data-close]').onclick=closeLayer;
  L.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const a=b.dataset.a;closeLayer();
    if(a==='img')$('fImg').click();
    if(a==='voice')sheet({title:'Pesan Suara',body:`<div class="grp"><div class="cell"><span>Durasi</span><input type="text" id="vdur" value="0:07" maxlength="5"></div></div><p class="shnote">Dikirim sebagai ${esc((senders(c).find(x=>x.id===as)||{name:'Aku'}).name)}. Ganti pengirim di bawah HP kalau perlu.</p>`,
      bind:()=>{$('vdur').onkeydown=e=>{if(e.key==='Enter')L.querySelector('[data-done]').click()}},
      onDone:()=>{pushMsg(c,{voice:{dur:$('vdur').value||'0:07'}});renderThread('bottom');renderList()}});
    if(a==='time'){c.msgs.push({id:nid(),from:'time',text:'Hari Ini '+S.time});renderThread('bottom')}
    if(a==='typing'){if(c.typing)c.typing=false;else c.typing=c.group?(as!=='me'?as:(c.members[0]||{}).id||false):true;renderThread('bottom')}})};

/* ---- info sheet ---- */
function infoSheet(){const c=cur();if(!c)return;
  const memRows=c.group?c.members.map(x=>`<div class="cell"><button class="av" type="button" data-mav="${x.id}" aria-label="Foto ${esc(x.name)}">${x.avatar?`<img src="${x.avatar}" alt="">`:initial(x.name)}</button><input type="text" data-mname="${x.id}" value="${esc(x.name)}" style="text-align:left" aria-label="Nama anggota"><button class="rm" type="button" data-mrm="${x.id}" aria-label="Keluarkan">${I.x}</button></div>`).join('')+`<div class="cell"><button class="cbtn" type="button" id="mAdd">Tambah Anggota</button></div>`:'';
  sheet({title:c.group?'Info Grup':'Info',body:`<div class="bigav"><div class="${avCls(c)}">${avHTML(c)}</div><button type="button" id="ciPhoto">${c.avatar?'Ganti Foto':'Tambah Foto'}</button>${c.avatar?'<button type="button" id="ciPhotoDel" style="color:var(--p-red)">Hapus Foto</button>':''}</div>
    <div class="grp"><div class="cell"><span>${c.group?'Nama Grup':'Nama'}</span><input type="text" id="ciName" value="${esc(c.name)}" maxlength="40"></div>
      <div class="cell"><span>Latar Chat</span><select id="ciWall">${Object.keys(WNAMES).map(k=>`<option value="${k}" ${c.wall===k?'selected':''}>${WNAMES[k]}</option>`).join('')}</select></div>
      ${c.group?'':`<div class="cell"><span>Jenis</span><select id="ciSms"><option value="0">iMessage</option><option value="1">SMS (hijau)</option></select></div>`}</div>
    ${c.group?`<p class="glabel">${c.members.length} Anggota</p><div class="grp">${memRows}</div><p class="shnote">Ketuk foto anggota buat ganti fotonya.</p>`:''}
    <div class="grp"><div class="cell"><span>Status Pesan</span><select id="ciSt"><option value="none">Tidak Ada</option><option value="sent">Terkirim</option><option value="read">Dibaca</option></select></div>
      <div class="cell" id="ciTimeRow"><span>Jam Dibaca</span><input type="text" id="ciTime" value="${esc(c.statusText)}" placeholder="22.51"></div>
      ${c.group?'':`<div class="cell"><span>Notifikasi Disenyapkan</span><span style="flex:1"></span><input type="checkbox" class="chk" id="ciSil" ${c.silenced?'checked':''}></div>`}
      <div class="cell"><span>Sematkan</span><span style="flex:1"></span><input type="checkbox" class="chk" id="ciPin" ${c.pinned?'checked':''}></div></div>
    <div class="grp"><div class="cell"><button class="cbtn red" type="button" id="ciDel">Hapus Percakapan</button></div></div>`,
   bind:sh=>{
    $('ciSt').value=c.status;$('ciTimeRow').hidden=c.status!=='read';if($('ciSms'))$('ciSms').value=c.sms?'1':'0';
    const ap=()=>{c.name=$('ciName').value||'Tanpa Nama';c.status=$('ciSt').value;c.statusText=$('ciTime').value;c.pinned=$('ciPin').checked;
      if($('ciSil'))c.silenced=$('ciSil').checked;if($('ciSms'))c.sms=$('ciSms').value==='1';$('ciTimeRow').hidden=c.status!=='read';renderChatChrome();renderThread('keep');renderList()};
    ['ciName','ciTime'].forEach(k=>$(k).oninput=ap);['ciSt','ciPin','ciSil','ciSms'].forEach(k=>{if($(k))$(k).onchange=ap});
    $('ciWall').onchange=()=>{const v=$('ciWall').value;if(v==='custom'){pickOne(d=>{c.wallImg=d;c.wall='custom';renderChatChrome();renderThread('keep')});if(!c.wallImg)$('ciWall').value=c.wall}else{c.wall=v;renderChatChrome();renderThread('keep')}};
    $('ciPhoto').onclick=()=>pickOne(d=>{c.avatar=d;renderChatChrome();renderList();infoSheet()});
    if($('ciPhotoDel'))$('ciPhotoDel').onclick=()=>{c.avatar=null;renderChatChrome();renderList();infoSheet()};
    sh.querySelectorAll('[data-mname]').forEach(x=>x.oninput=()=>{const mm=c.members.find(y=>y.id===x.dataset.mname);if(mm){mm.name=x.value||'?';renderWho();renderThread('keep');renderList()}});
    sh.querySelectorAll('[data-mav]').forEach(x=>x.onclick=()=>{const mm=c.members.find(y=>y.id===x.dataset.mav);pickOne(d=>{mm.avatar=d;renderThread('keep');infoSheet()})});
    sh.querySelectorAll('[data-mrm]').forEach(x=>x.onclick=()=>{if(c.members.length<=1)return;c.members=c.members.filter(y=>y.id!==x.dataset.mrm);if(as===x.dataset.mrm)as='me';renderWho();renderThread('keep');infoSheet()});
    if($('mAdd'))$('mAdd').onclick=()=>{c.members.push({id:nid(),name:'Anggota '+(c.members.length+1),avatar:null});renderWho();infoSheet();setTimeout(()=>{const ins=L.querySelectorAll('[data-mname]');ins[ins.length-1]?.select()},380)};
    let arm=0;$('ciDel').onclick=e=>{if(!arm){arm=1;e.target.textContent='Ketuk lagi buat hapus';return}S.chats=S.chats.filter(x=>x!==c);goBack()};
   }});
}
$('who').onclick=infoSheet;

/* ---- list interactions ---- */
holdable($('lin'),'[data-chat]',el=>{const c=S.chats.find(x=>x.id===el.dataset.chat);if(!c)return;
  sheet({title:c.name,body:`<div class="grp">
    <div class="cell"><button class="cbtn" type="button" data-a="pin">${c.pinned?'Lepas Sematan':'Sematkan'}</button></div>
    <div class="cell"><button class="cbtn" type="button" data-a="read">${c.unread?'Tandai Sudah Dibaca':'Tandai Belum Dibaca'}</button></div></div>
    <div class="grp"><div class="cell"><button class="cbtn red" type="button" data-a="del">Hapus Percakapan</button></div></div>`,
   bind:sh=>{let arm=0;sh.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const a=b.dataset.a;
     if(a==='del'&&!arm){arm=1;b.textContent='Ketuk lagi buat hapus';return}
     if(a==='pin')c.pinned=!c.pinned;if(a==='read')c.unread=!c.unread;if(a==='del')S.chats=S.chats.filter(x=>x!==c);closeLayer();renderList()})}})});
$('lin').addEventListener('click',e=>{if($('lin')._held){$('lin')._held=false;return}const el=e.target.closest('[data-chat]');if(el)openChat(el.dataset.chat)});
$('search').addEventListener('input',e=>{query=e.target.value;renderList()});
$('composeBtn').onclick=()=>sheet({title:'Pesan Baru',body:`<div class="grp"><div class="cell left"><span style="color:var(--p-sub)">Ke:</span><input type="text" id="toName" placeholder="Nama, pisahkan pakai koma" maxlength="160"></div>
    <div class="cell left" id="gnRow" hidden><span style="color:var(--p-sub)">Grup:</span><input type="text" id="gName" placeholder="Nama grup (opsional)" maxlength="40"></div></div>
   <p class="shnote" style="margin-top:0">Satu nama buat chat pribadi. Beberapa nama dipisah koma (Haikal, Sasa, Jevan) jadi group chat.</p>`,
  bind:()=>{setTimeout(()=>$('toName').focus(),300);$('toName').oninput=()=>{$('gnRow').hidden=$('toName').value.split(',').filter(s=>s.trim()).length<2};
    $('toName').onkeydown=e=>{if(e.key==='Enter')L.querySelector('[data-done]').click()}},
  onDone:()=>{const names=$('toName').value.split(',').map(s=>s.trim()).filter(Boolean);if(!names.length)return;let c;
    if(names.length===1){c=S.chats.find(x=>!x.group&&x.name.toLowerCase()===names[0].toLowerCase());if(!c){c=newChat(names[0],{status:'sent'});S.chats.unshift(c)}}
    else{c=newChat($('gName').value.trim()||names.join(', '),{group:true,status:'none',members:names.map(n=>({id:nid(),name:n,avatar:null}))});S.chats.unshift(c)}
    setTimeout(()=>{openChat(c.id);setTimeout(()=>inp.focus(),400)},0)}});
$('editBtn').onclick=()=>{sheet({title:'Edit',body:`<div class="grp"><div class="cell"><button class="cbtn" type="button" id="exReset">Isi Ulang Chat Contoh</button></div><div class="cell"><button class="cbtn red" type="button" id="exClear">Hapus Semua Percakapan</button></div></div>`,
  bind:()=>{let a1=0,a2=0;$('exReset').onclick=e=>{if(!a1){a1=1;e.target.textContent='Ketuk lagi, chat sekarang bakal ditimpa';return}S=sample();closeLayer();renderAll()};
    $('exClear').onclick=e=>{if(!a2){a2=1;e.target.textContent='Ketuk lagi buat hapus semua';return}S.chats=[];closeLayer();renderList()}}})};

/* ---------- page settings ---------- */
const ov=$('ov'),pop=$('pop');
function openPop(html,bind){pop.innerHTML=html;ov.hidden=false;bind&&bind();const f=pop.querySelector('input,button');f&&f.focus()}
function closePop(){ov.hidden=true;pop.innerHTML=''}
ov.addEventListener('click',e=>{if(e.target===ov)closePop()});
addEventListener('keydown',e=>{if(e.key==='Escape'){if(!ov.hidden)closePop();else if(!$('panelOv').hidden)closePanel();else if(L.innerHTML)closeLayer()}});

/* ---------- panel pengaturan & mode ---------- */
function openPanel(){hideKb();inp.blur();$('panelOv').hidden=false}
function closePanel(){$('panelOv').hidden=true}
$('panelBtn').onclick=openPanel;$('panelX').onclick=closePanel;
$('panelOv').addEventListener('click',e=>{if(e.target===$('panelOv'))closePanel()});
/* Mode Edit: ada tombol ganti pengirim. Mode Pakai: bersih kayak iMessage beneran, buat dipakai atau direkam */
function setView(v){S.view=v==='play'?'play':'edit';const play=S.view==='play';
  document.documentElement.classList.toggle('m-play',play);
  document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===S.view));
  $('modeHint').textContent=play?'Tampilannya bersih kayak iMessage beneran, cocok buat direkam. Pengirim yang aktif tetap dipakai pas ngirim. Tombol pengaturan tetap ada di pinggir kanan, cuma dibikin samar.':'Tombol kecil di pinggir kanan buat ganti pengirim. Status bar palsu tetap tampil biar hasil export sama persis.';
  if(TG&&TG.isVersionAtLeast&&TG.isVersionAtLeast('8.0')&&/ios|android/.test(TG.platform)){try{play?TG.requestFullscreen():TG.isFullscreen&&TG.exitFullscreen()}catch(e){}}
  save()}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{setView(b.dataset.view);closePanel()});
$('settingsBtn').onclick=()=>openPop(`<h3>Status bar & mode</h3><div class="form">
  <div class="row2"><label>Jam<input type="text" id="oTime" maxlength="8" value="${esc(S.time)}"></label><label>Baterai %<input type="number" id="oBatt" min="1" max="100" value="${+S.batt}"></label></div>
  <label>Mode HP<select id="oMode"><option value="light">Terang</option><option value="dark">Gelap</option></select></label>
  <div class="row"><button class="sbtn" type="button" id="oNow">Pakai jam sekarang</button><span style="flex:1"></span><button class="sbtn primary" type="button" id="oOk">Selesai</button></div></div>`,()=>{
  $('oMode').value=S.mode;
  const ap=()=>{S.time=$('oTime').value;S.batt=$('oBatt').value;S.mode=$('oMode').value;renderStatus();save()};
  ['oTime','oBatt'].forEach(k=>$(k).oninput=ap);$('oMode').onchange=ap;
  $('oNow').onclick=()=>{$('oTime').value=nowHM();ap()};$('oOk').onclick=closePop});

/* ---------- scale ---------- */
/* layar HP (lebar <= 600): #screen tetap selebar 393, tingginya ngikutin layar. Layar lebar: 393×852 di tengah */
function fit(){const vw=document.documentElement.clientWidth,vh=TG&&TG.viewportHeight||innerHeight,full=vw<=600;
  document.documentElement.classList.toggle('full',full);
  let H=852,pad=0;if(full){K=vw/393;
    /* fullscreen Telegram: tombol Telegram ada di atas, jadi header iMessage digeser ke bawahnya */
    if(TG&&TG.isFullscreen)pad=Math.max(0,Math.round(((TG.safeAreaInset||{}).top||0)+((TG.contentSafeAreaInset||{}).top||0)-50*K));
    H=Math.max(560,Math.round((vh-pad)/K))}else K=Math.min(1,(vh-32)/852);
  document.querySelector('.stage').style.paddingTop=pad?pad+'px':'';
  const s=$('screen');s.style.height=H+'px';s.style.transform=`scale(${K})`;
  const b=$('scaleBox');b.style.width=393*K+'px';b.style.height=H*K+'px';
  const r=full?0:28*K;b.style.borderRadius=r+'px';b.parentElement.style.borderRadius=r+'px'}
addEventListener('resize',fit);

/* ---------- export ---------- */
let lastBlob=null;
$('exportBtn').addEventListener('click',async()=>{const b=$('exportBtn');b.disabled=true;b.textContent='Lagi bikin…';
  const chat=$('screen').classList.contains('chat-open');const sc=chat?$('thread'):$('lscroll'),inner=chat?$('tin'):$('lin');const top0=sc.scrollTop;
  const hadFocus=document.activeElement===inp;
  /* tinggi layar di HP bisa beda, jadi waktu export dipaksa 852. Chat tetap nempel ke bawah kayak yang kelihatan */
  const scr=$('screen'),H0=scr.style.height,gap=sc.scrollHeight-sc.scrollTop-sc.clientHeight;
  scr.style.height='852px';scr.classList.add('exporting');
  const top=chat?Math.max(0,sc.scrollHeight-sc.clientHeight-gap):top0;
  try{
    if(!window.htmlToImage)throw 0;
    sc.style.overflow='hidden';sc.scrollTop=0;inner.style.transform=`translateY(${-top}px)`;
    (chat?$('vList'):$('vChat')).style.visibility='hidden';
    const blob=await htmlToImage.toBlob($('screen'),{width:393,height:852,pixelRatio:3,skipFonts:true,style:{transform:'none'}});
    lastBlob=blob;const url=URL.createObjectURL(blob);
    openPop(`<h3>Gambar siap</h3><div class="form"><img class="out" src="${url}" alt="Hasil export">
      <p class="hint" style="text-align:left">${TG?'Ketuk "Kirim ke chat" biar gambarnya dikirim bot ke chat Telegram kamu, terus simpan dari situ.':'Klik kanan lalu "Simpan gambar", atau tahan lama gambarnya di HP.'} Yang ke-export persis tampilan layar sekarang, termasuk keyboard dan menu highlight kalau lagi kebuka.</p>
      <div class="row">${TG?'<button class="sbtn primary" type="button" id="tgs">Kirim ke chat</button>':''}<button class="sbtn${TG?'':' primary'}" type="button" id="cp">Salin gambar</button><button class="sbtn" type="button" id="cl">Tutup</button><span class="hint" id="cpMsg"></span></div></div>`,()=>{
      $('cl').onclick=closePop;
      if(TG)$('tgs').onclick=async()=>{const b=$('tgs'),msg=$('cpMsg');b.disabled=true;msg.textContent='Lagi ngirim…';
        const go=async()=>{let r='fail';try{r=await tgSend(lastBlob)}catch(e){}
          if(r==='ok'){msg.textContent='Terkirim. Cek chat bot-nya.';try{TG.HapticFeedback.notificationOccurred('success')}catch(e){}}
          else if(r==='blocked'&&TG.requestWriteAccess){msg.textContent='Izinin bot kirim pesan dulu.';TG.requestWriteAccess(ok=>{if(ok){msg.textContent='Lagi ngirim…';go()}else{msg.textContent='Bot belum diizinin kirim pesan.';b.disabled=false}});return}
          else msg.textContent='Gagal ngirim. Coba lagi, atau screenshot layar HP-nya.';
          b.disabled=false};
        go()};
      $('cp').onclick=async()=>{try{await navigator.clipboard.write([new ClipboardItem({'image/png':lastBlob})]);$('cpMsg').textContent='Tersalin'}catch(e){$('cpMsg').textContent='Nggak bisa disalin di sini. Simpan lewat klik kanan.'}}});
  }catch(e){openPop(`<h3>Export gagal</h3><div class="form"><p class="hint" style="text-align:left">Coba lagi, atau screenshot langsung layar HP-nya.</p><div class="row"><button class="sbtn" type="button" id="cl">Tutup</button></div></div>`,()=>$('cl').onclick=closePop)}
  scr.style.height=H0;scr.classList.remove('exporting');
  inner.style.transform='';sc.style.overflow='';sc.scrollTop=top0;$('vList').style.visibility='';$('vChat').style.visibility='';
  b.disabled=false;b.textContent='Export PNG'});

/* ---------- Telegram Mini App ---------- */
function tgSetup(){if(!TG)return;const root=document.documentElement;root.classList.add('tg');
  try{TG.ready();TG.expand();TG.disableVerticalSwipes&&TG.disableVerticalSwipes()}catch(e){}
  const theme=()=>{root.dataset.theme=TG.colorScheme==='dark'?'dark':'light';
    const bg=getComputedStyle(root).getPropertyValue('--bg').trim();try{TG.setHeaderColor(bg);TG.setBackgroundColor(bg);TG.setBottomBarColor&&TG.setBottomBarColor(bg)}catch(e){}};
  theme();TG.onEvent('themeChanged',theme);TG.onEvent('viewportChanged',fit);
  /* tombol Back Telegram: tutup popup, lalu layer di HP, lalu balik ke daftar chat */
  const pov=$('panelOv');
  const sync=()=>{const on=!ov.hidden||!pov.hidden||!!L.innerHTML||$('screen').classList.contains('chat-open');try{on?TG.BackButton.show():TG.BackButton.hide()}catch(e){}};
  TG.BackButton.onClick(()=>{if(!ov.hidden)closePop();else if(!pov.hidden)closePanel();else if(L.innerHTML)closeLayer();else if(cur())goBack();sync()});
  try{TG.SettingsButton.show();TG.SettingsButton.onClick(openPanel)}catch(e){}
  ['fullscreenChanged','safeAreaChanged','contentSafeAreaChanged'].forEach(v=>TG.onEvent(v,fit));
  const mo=new MutationObserver(sync);mo.observe(ov,{attributes:true,attributeFilter:['hidden']});mo.observe(pov,{attributes:true,attributeFilter:['hidden']});mo.observe(L,{childList:true});mo.observe($('screen'),{attributes:true,attributeFilter:['class']});
  sync()}
/* kirim hasil export ke chat bot (lewat api/send), karena simpan gambar dari webview Telegram sering nggak bisa */
async function tgSend(blob){let body=blob,name='au-chat-'+Date.now()+'.png';
  if(blob.size>4.3e6){body=await new Promise(r=>{const im=new Image();im.onload=()=>{const cv=document.createElement('canvas');cv.width=im.width;cv.height=im.height;cv.getContext('2d').drawImage(im,0,0);URL.revokeObjectURL(im.src);cv.toBlob(r,'image/jpeg',.95)};im.src=URL.createObjectURL(blob)});name=name.replace('.png','.jpg')}
  const r=await fetch('api/send?name='+encodeURIComponent(name),{method:'POST',headers:{'Content-Type':body.type,'X-Init-Data':TG.initData},body});
  if(r.ok)return'ok';return r.status===403?'blocked':'fail'}

function renderAll(){renderStatus();inp.inputMode=S.kbOn?'none':'text';renderList();
  if(cur()){$('screen').classList.add('chat-open');renderChatChrome();renderThread('bottom')}else{S.open=null;$('screen').classList.remove('chat-open','walldark');renderWho()}syncInput()}
tgSetup();setView(S.view);renderAll();fit();
requestAnimationFrame(()=>{$('thread').scrollTop=1e6});
})();
