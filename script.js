const M=[
["Makanan","🍛","Nasi Goreng Kampung","Telur mata sapi, kerupuk, acar segar",28],
["Makanan","🍢","Sate Ayam Madura","10 tusuk, bumbu kacang pekat",30],
["Makanan","🥩","Rendang Sapi","Dimasak 6 jam, bumbu meresap",42],
["Makanan","🍲","Soto Betawi","Kuah santan gurih, daging empuk",35],
["Makanan","🍜","Mie Ayam Bakso","Mie kenyal, bakso urat, pangsit",25],
["Makanan","🥗","Gado-Gado","Sayur rebus, lontong, bumbu kacang",24],
["Makanan","🍗","Ayam Geprek","Ayam krispi, sambal bawang pedas",27],
["Makanan","🍚","Nasi Uduk Komplit","Orek tempe, telur, ayam goreng",29],
["Camilan","🍌","Pisang Goreng Keju","Renyah di luar, lumer di dalam",16],
["Camilan","🥟","Batagor","Ikan tenggiri, saus kacang jeruk limau",22],
["Camilan","🍘","Tempe Mendoan","Tepung bumbu, setengah matang",12],
["Camilan","🌯","Risoles Mayo","Isi sayur, ayam, dan telur",14],
["Camilan","🍟","Kentang Balado","Kentang goreng, sambal balado manis pedas",18],
["Camilan","🥠","Cireng Rujak","Kenyal gurih, cocol sambal rujak",15],
["Minuman","🧋","Es Teh Manis","Teh melati, gula batu, es batu",8],
["Minuman","☕","Es Kopi Susu Gula Aren","Espresso, susu segar, gula aren",22],
["Minuman","🍧","Es Cendol","Santan, gula merah, cendol pandan",18],
["Minuman","🫖","Wedang Jahe","Jahe bakar, serai, madu hangat",14],
["Minuman","🍊","Es Jeruk Peras","Jeruk segar diperas langsung",12],
["Minuman","🥥","Es Kelapa Muda","Daging kelapa muda, sirup gula",17],
["Minuman","🥑","Jus Alpukat","Alpukat mentega, susu cokelat",20],
["Minuman","🍵","Teh Tarik","Teh pekat, susu kental, busa tebal",15],
["Dessert","🟢","Klepon","Isi gula merah, taburan kelapa",12],
["Dessert","🍨","Es Campur","Alpukat, kelapa, cincau, sirup merah",20],
["Dessert","🍰","Kue Lapis","Lembut, manis, berlapis warna",13],
["Dessert","🥞","Martabak Manis","Cokelat, keju, kacang, susu",35]
];
const cats=["Semua","Makanan","Camilan","Minuman","Dessert"],cart={};let cur="Semua";
const rp=n=>"Rp "+(n*1000).toLocaleString("id-ID");
belt.innerHTML=(M.map(m=>m[1]+" "+m[2]).join("  ✦  ")+"  ✦  ").repeat(2);
function tabs(){document.getElementById("tabs").innerHTML=cats.map(c=>`<button aria-pressed="${c==cur}" data-c="${c}">${c}</button>`).join("")}
function grid(){document.getElementById("grid").innerHTML=M.map((m,i)=>[m,i]).filter(([m])=>cur=="Semua"||m[0]==cur).map(([m,i],k)=>
`<article class="item" style="animation-delay:${k*30}ms"><span class="em" aria-hidden="true">${m[1]}</span><h3>${m[2]}</h3><p>${m[3]}</p>
<div class="row"><span class="price">${rp(m[4])}</span><div class="qty"><button data-i="${i}" data-d="-1" aria-label="Kurangi ${m[2]}">−</button><b>${cart[i]||0}</b><button data-i="${i}" data-d="1" aria-label="Tambah ${m[2]}">+</button></div></div></article>`).join("")}
function bar(){let q=0,t=0;for(const i in cart){q+=cart[i];t+=cart[i]*M[i][4]}
sum.textContent=q+" item · "+rp(t);document.getElementById("bar").classList.toggle("on",q>0)}
tabs();grid();
document.getElementById("tabs").onclick=e=>{const c=e.target.dataset.c;if(c){cur=c;tabs();grid()}};
document.getElementById("grid").onclick=e=>{const b=e.target.closest("button[data-i]");if(!b)return;
const i=b.dataset.i;cart[i]=Math.max(0,(cart[i]||0)+ +b.dataset.d);if(!cart[i])delete cart[i];
b.parentElement.querySelector("b").textContent=cart[i]||0;bar()};
order.onclick=()=>{sum.textContent="Pesanan diterima. Terima kasih!";order.hidden=true;setTimeout(()=>{for(const k in cart)delete cart[k];order.hidden=false;grid();bar()},2200)};