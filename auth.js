const q=new URLSearchParams(location.search);
const isRegister=q.get('mode')==='register';
const form=document.getElementById('authForm'),email=document.getElementById('email'),password=document.getElementById('password'),name=document.getElementById('name'),error=document.getElementById('error');
const DEMO_ACCOUNTS=[
 {id:'CUS-1',email:'customer@samudra.local',password:'customer123',name:'Customer Demo',shop:null},
 {id:'USR-2',email:'seller@samudra.local',password:'seller123',name:'Budi Seller',shop:{id:'SHOP-1',name:'Budi Store',domain:'budi-store',status:'active'}}
];
function users(){try{return JSON.parse(localStorage.getItem('samudra_users')||'[]')}catch(e){return[]}}
function saveUsers(v){localStorage.setItem('samudra_users',JSON.stringify(v))}
function sync(){
 document.body.classList.toggle('registering',isRegister);
 document.getElementById('authTitle').textContent=isRegister?'Buat Akun Samudra':'Masuk ke Samudra';
 document.getElementById('authSub').textContent='Satu akun untuk belanja. Jika nanti punya toko, akun yang sama dapat digunakan untuk Seller Center.';
 document.getElementById('submitText').textContent=isRegister?'Daftar':'Masuk';
 document.getElementById('switchText').textContent=isRegister?'Sudah punya akun?':'Belum punya akun?';
 document.getElementById('switchMode').textContent=isRegister?'Masuk':'Daftar';
}
function normalizeUser(u){return {id:u.id,email:u.email,name:u.name,shop:u.shop||null,status:u.status||'Aktif',loginAt:Date.now()}}
function redirect(){location.href='index.html'}
form.onsubmit=e=>{
 e.preventDefault();error.textContent='';const em=email.value.trim().toLowerCase(),pw=password.value;
 if(isRegister){
  if(!name.value.trim()){error.textContent='Nama lengkap wajib diisi.';return}
  const list=users(); if(list.some(x=>x.email===em)||DEMO_ACCOUNTS.some(x=>x.email===em)){error.textContent='Email sudah terdaftar.';return}
  const u={id:'USR-'+Date.now(),email:em,name:name.value.trim(),password:pw,shop:null,status:'Aktif'};list.push(u);saveUsers(list);localStorage.setItem('samudra_session',JSON.stringify(normalizeUser(u)));redirect();return;
 }
 let a=DEMO_ACCOUNTS.find(x=>x.email===em&&x.password===pw);
 if(!a)a=users().find(x=>x.email===em&&x.password===pw);
 if(!a){error.textContent='Email atau password salah.';return}
 const existing=users().find(x=>x.email===a.email);const merged={...a,...(existing||{}),shop:(existing?.shop||a.shop||null)};const u=normalizeUser(merged);localStorage.setItem('samudra_session',JSON.stringify(u));redirect();
};
document.getElementById('switchMode').onclick=()=>location.href=isRegister?'auth.html':'auth.html?mode=register';
const current=JSON.parse(localStorage.getItem('samudra_session')||'null');if(current)redirect();else sync();
