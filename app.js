const categories=['Semua','Elektronik','Fashion','Rumah Tangga','Kecantikan','Ibu & Bayi','Olahraga','Otomotif','Buku'];
const seedProducts=[
{id:1,name:'Headphone Bluetooth Bass Pro',price:249000,category:'Elektronik',location:'Jakarta',emoji:'🎧',sold:'1,2rb',discount:40,flash:true},
{id:2,name:'Smartwatch Layar AMOLED',price:389000,category:'Elektronik',location:'Bandung',emoji:'⌚',sold:'856',discount:35,flash:true},
{id:3,name:'Sepatu Lari Ringan Unisex',price:215000,category:'Olahraga',location:'Surabaya',emoji:'👟',sold:'2,3rb',discount:50,flash:true},
{id:4,name:'Paket Skincare Brightening',price:129000,category:'Kecantikan',location:'Jakarta Selatan',emoji:'🧴',sold:'3,1rb',discount:30,flash:true},
{id:5,name:'Laptop Ultrabook 14 Inch',price:6499000,category:'Elektronik',location:'Jakarta Barat',emoji:'💻',sold:'412'},
{id:6,name:'Tas Ransel Anti Air 25L',price:175000,category:'Fashion',location:'Bandung',emoji:'🎒',sold:'1,4rb'},
{id:7,name:'Kursi Kerja Ergonomis',price:890000,category:'Rumah Tangga',location:'Surabaya',emoji:'🪑',sold:'670'},
{id:8,name:'Kamera Mirrorless Entry Level',price:4250000,category:'Elektronik',location:'Jakarta Selatan',emoji:'📷',sold:'289'},
{id:9,name:'Set Sprei Katun Premium',price:225000,category:'Rumah Tangga',location:'Semarang',emoji:'🛏️',sold:'920'},
{id:10,name:'Mainan Edukasi Anak',price:95000,category:'Ibu & Bayi',location:'Yogyakarta',emoji:'🧸',sold:'2,1rb'},
{id:11,name:'Jaket Outdoor Waterproof',price:315000,category:'Fashion',location:'Malang',emoji:'🧥',sold:'733'},
{id:12,name:'Buku Belajar Bahasa Inggris',price:79000,category:'Buku',location:'Depok',emoji:'📚',sold:'1,8rb'}
];
seedProducts.forEach((p,i)=>{if(!p.sellerId)p.sellerId=i<6?'SHOP-1':'SHOP-2'});
let products=JSON.parse(localStorage.getItem('samudra_products')||'null') || seedProducts;
products=products.filter(p=>p.active!==false);
let cart=JSON.parse(localStorage.getItem('samudra_cart')||'[]');
let activeCategory='Semua';let searchTerm='';
const $=id=>document.getElementById(id);
const rupiah=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
function saveCart(){localStorage.setItem('samudra_cart',JSON.stringify(cart));updateCartCount()}
function updateCartCount(){$('cartCount').textContent=cart.reduce((s,x)=>s+x.qty,0)}
function renderCategories(){
 $('categoryNav').innerHTML=categories.slice(1).map(c=>`<button data-cat="${c}">${c}</button>`).join('');
 $('categoryChips').innerHTML=categories.slice(1).map(c=>`<button class="chip" data-cat="${c}"><div class="ico">${({Elektronik:'📱',Fashion:'👕','Rumah Tangga':'🛋️',Kecantikan:'💄','Ibu & Bayi':'🍼',Olahraga:'⚽',Otomotif:'🚗',Buku:'📚'})[c]}</div><span>${c}</span></button>`).join('');
 document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>setCategory(b.dataset.cat)));
}
function setCategory(cat){activeCategory=cat;renderProducts();$('productsSection').scrollIntoView({behavior:'smooth'});}
function getFiltered(){return products.filter(p=>(activeCategory==='Semua'||p.category===activeCategory)&&(!searchTerm||`${p.name} ${p.category} ${p.location}`.toLowerCase().includes(searchTerm.toLowerCase())))}
function card(p){return `<article class="card"><div class="thumb">${p.emoji}</div><div class="info"><div class="name">${p.name}</div><div class="price">${rupiah(p.price)}</div><div class="meta">${p.location} • Terjual ${p.sold}</div>${p.discount?`<span class="badge">-${p.discount}%</span>`:''}<button class="add-btn" data-add="${p.id}">+ Keranjang</button></div></article>`}
function renderProducts(){
 const flash=products.filter(p=>p.flash);$('flashProducts').innerHTML=flash.map(card).join('');
 const list=getFiltered();$('productGrid').innerHTML=list.length?list.map(card).join(''):`<div class="empty">Produk tidak ditemukan. Coba kata kunci atau kategori lain.</div>`;
 $('productTitle').textContent=searchTerm?`Hasil pencarian: “${searchTerm}”`:activeCategory==='Semua'?'Rekomendasi Untukmu':activeCategory;
 document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>addToCart(Number(b.dataset.add))));
}
function addToCart(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();toast(`${p.name} ditambahkan ke keranjang`)}
function cartTotal(){return cart.reduce((s,x)=>{const p=products.find(p=>p.id===x.id);return s+p.price*x.qty},0)}
function openModal(html){$('modalContent').innerHTML=html;$('modal').classList.add('open')}
function closeModal(){$('modal').classList.remove('open')}
function openCart(){
 if(!cart.length)return openModal('<h3>Keranjang Belanja</h3><div class="empty">Keranjang masih kosong.</div>');
 openModal(`<h3>Keranjang Belanja</h3>${cart.map(x=>{const p=products.find(p=>p.id===x.id);return `<div class="cart-item"><div class="emoji">${p.emoji}</div><div class="cart-item-main"><b>${p.name}</b><div>${rupiah(p.price)}</div><div class="qty"><button data-dec="${p.id}">−</button><span>${x.qty}</span><button data-inc="${p.id}">+</button><button data-remove="${p.id}">Hapus</button></div></div></div>`}).join('')}<div class="total"><span>Total</span><span>${rupiah(cartTotal())}</span></div><button class="primary-full" id="checkoutBtn">Checkout</button>`);
 document.querySelectorAll('[data-inc]').forEach(b=>b.onclick=()=>changeQty(Number(b.dataset.inc),1));document.querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>changeQty(Number(b.dataset.dec),-1));document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>removeCart(Number(b.dataset.remove)));$('checkoutBtn').onclick=openCheckout;
}
function changeQty(id,d){const i=cart.find(x=>x.id===id);if(!i)return;i.qty+=d;if(i.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();openCart()}
function removeCart(id){cart=cart.filter(x=>x.id!==id);saveCart();openCart()}
function openCheckout(){
 if(!cart.length)return;openModal(`<h3>Checkout</h3><form id="checkoutForm"><div class="form-group"><label>Nama penerima</label><input required name="name" placeholder="Nama lengkap"></div><div class="form-group"><label>Alamat pengiriman</label><input required name="address" placeholder="Alamat lengkap"></div><div class="form-group"><label>Metode pengiriman</label><select name="shipping"><option>Reguler</option><option>Express</option></select></div><div class="form-group"><label>Metode pembayaran</label><select name="payment"><option>Transfer Bank</option><option>QRIS</option><option>COD</option></select></div><div class="total"><span>Total</span><span>${rupiah(cartTotal())}</span></div><button class="primary-full">Buat Pesanan</button></form>`);
 $('checkoutForm').onsubmit=e=>{e.preventDefault();const id='SAM-'+Date.now().toString().slice(-8);const sess=getSession();const order={id,total:cartTotal(),status:'Menunggu pembayaran',createdAt:new Date().toISOString(),customerId:sess?.id||null,items:cart.map(i=>({productId:i.id,qty:i.qty,sellerId:products.find(p=>p.id===i.id)?.sellerId||null})),...Object.fromEntries(new FormData(e.target))};localStorage.setItem('samudra_last_order',JSON.stringify(order));const allOrders=JSON.parse(localStorage.getItem('samudra_orders')||'[]');allOrders.push(order);localStorage.setItem('samudra_orders',JSON.stringify(allOrders));cart=[];saveCart();openModal(`<h3>Pesanan Berhasil Dibuat</h3><p>Nomor pesanan: <b>${id}</b></p><p style="margin-top:10px">Status: Menunggu pembayaran.</p><button class="primary-full" style="margin-top:18px" id="doneBtn">Selesai</button>`);$('doneBtn').onclick=closeModal;toast('Pesanan berhasil dibuat')}
}
function getSession(){try{return JSON.parse(localStorage.getItem('samudra_session')||'null')}catch(e){return null}}
function syncAccountUI(){
 const s=getSession(); const btn=$('loginBtn'),reg=$('registerBtn'),menu=$('profileMenu');
 const adminLink=document.querySelector('.admin-footer-link'),adminSep=document.querySelector('.admin-footer-sep'); if(!btn||!reg||!menu)return;
 if(s){
   btn.hidden=true;reg.hidden=true;menu.hidden=false;
   const hasActiveShop=s.shop&&s.shop.status==='active';
   $('profileLabel').textContent=hasActiveShop?'Toko Saya':'Profil';
   $('profileNameTop').textContent=s.name||'Pengguna';
   $('profileRoleTop').textContent=hasActiveShop?'Customer • Seller':'Customer';
   const initial=(s.name||'U').charAt(0).toUpperCase();$('profileAvatar').textContent=initial;$('profileAvatarLarge').textContent=initial;
   $('profileAccountLink').hidden=false;$('profileSellerLink').hidden=!hasActiveShop;
   if(adminLink)adminLink.hidden=true;if(adminSep)adminSep.hidden=true;
 }else{
   btn.hidden=false;reg.hidden=false;menu.hidden=true;btn.textContent='Masuk';btn.onclick=openLogin;
   if(adminLink)adminLink.hidden=false;if(adminSep)adminSep.hidden=false;
 }
}
function setupProfileMenu(){
 const trigger=$('profileTrigger'),dropdown=$('profileDropdown');if(!trigger||!dropdown)return;
 trigger.onclick=()=>dropdown.classList.toggle('open');document.addEventListener('click',e=>{if(!e.target.closest('#profileMenu'))dropdown.classList.remove('open')});
 $('profileLogout').onclick=()=>{localStorage.removeItem('samudra_session');syncAccountUI();toast('Anda telah keluar dari akun')};
}
function openLogin(){location.href='auth.html'}
function openRegister(){location.href='auth.html?mode=register'}
function openSeller(){
 const s=getSession();
 if(!s){location.href='auth.html';return}
 if(s.shop&&s.shop.status==='active'){location.href='seller.html';return}
 if(s.shop&&s.shop.status==='pending'){openModal(`<h3>Pengajuan Toko Sedang Diverifikasi</h3><p>Status toko Anda masih <b>Pending Verification</b>. Admin akan memeriksa data toko sebelum Seller Center diaktifkan.</p><button class="primary-full" id="shopStatusBtn">Lihat Status Toko</button>`);$('shopStatusBtn').onclick=()=>location.href='buka-toko.html';return}
 location.href='buka-toko.html';
}
function openHelp(){openModal('<h3>Pusat Bantuan</h3><p>Gunakan pencarian untuk menemukan produk, tambahkan produk ke keranjang, lalu checkout. Untuk demo ini data keranjang dan pesanan disimpan di browser menggunakan localStorage.</p>')}
function track(){const o=JSON.parse(localStorage.getItem('samudra_last_order')||'null');openModal(o?`<h3>Lacak Pesanan</h3><p>Nomor: <b>${o.id}</b></p><p style="margin-top:10px">Status: <b>${o.status}</b></p>`:'<h3>Lacak Pesanan</h3><div class="empty">Belum ada pesanan pada browser ini.</div>')}
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
let seconds=2*3600+14*60+8;setInterval(()=>{seconds=Math.max(0,seconds-1);const h=String(Math.floor(seconds/3600)).padStart(2,'0'),m=String(Math.floor(seconds%3600/60)).padStart(2,'0'),s=String(seconds%60).padStart(2,'0');$('timer').innerHTML=`<span>${h}</span><span>:</span><span>${m}</span><span>:</span><span>${s}</span>`},1000);
$('searchForm').onsubmit=e=>{e.preventDefault();searchTerm=$('searchInput').value.trim();activeCategory='Semua';renderProducts();$('productsSection').scrollIntoView({behavior:'smooth'})};$('cartBtn').onclick=openCart;$('loginBtn').onclick=openLogin;$('registerBtn').onclick=openRegister;setupProfileMenu();$('helpBtn').onclick=openHelp;$('shopBtn').onclick=()=>{$('productsSection').scrollIntoView({behavior:'smooth'})};$('sellerBtn').onclick=openSeller;$('sellerBannerBtn').onclick=openSeller;$('footerSeller').onclick=openSeller;$('footerHelp').onclick=openHelp;$('trackBtn').onclick=track;$('returnBtn').onclick=()=>openModal('<h3>Pengembalian</h3><p>Fitur pengembalian pada versi demo dapat dikembangkan setelah modul pesanan dan verifikasi seller terhubung ke backend.</p>');$('resetFilter').onclick=()=>{activeCategory='Semua';searchTerm='';$('searchInput').value='';renderProducts()};$('closeModal').onclick=closeModal;$('modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
renderCategories();renderProducts();updateCartCount();syncAccountUI();
