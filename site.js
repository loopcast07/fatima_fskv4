
const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.navlinks');
if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));

const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navlinks a').forEach(a=>{
  if(a.getAttribute('href')===path) a.classList.add('active');
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('form[data-demo]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const status=form.querySelector('.form-status');
    status.textContent='Thank you. This front-end form is ready to connect to the preferred inbox/CRM.';
    status.style.marginTop='10px';
  });
});


// V3 dynamic content rendering — edit content.js for future updates.
(() => {
  const c = window.FATIMA_CONTENT; if(!c) return;
  const writing = document.querySelector('#writing-list');
  if(writing) {
    writing.classList.add("writing-cards"); writing.classList.remove("dynamic-list");
    writing.innerHTML = c.writings.map((x,i)=>`<a class="writing-card visible" href="${x.url}" target="_blank" rel="noopener"><div class="writing-card-body"><span class="source">${x.publication} · ${x.theme}</span><h3 class="display">${x.title}</h3><p>${x.excerpt}</p><span class="eyebrow">Read article ↗</span></div></a>`).join('');
  }
  const press = document.querySelector('#press-grid');
  if(press) press.innerHTML = c.press.map(x=>`<a class="press-card visual-card visible" href="${x.url}" target="_blank" rel="noopener"><div class="visual-card-body"><span class="source">${x.source}</span><h3>${x.title}</h3><span class="eyebrow">Read coverage ↗</span></div></a>`).join('');
  const impact = document.querySelector('#impact-grid');
  if(impact) impact.innerHTML = c.impact.map(x=>`<a class="impact-card visual-card visible" href="${x.url}" target="_blank" rel="noopener"><div class="visual-card-body"><span class="source">${x.category}</span><h3>${x.title}</h3><p>${x.text}</p><span class="eyebrow">View moment ↗</span></div></a>`).join('');
  const wp = document.querySelector('#wp-journal-link'); if(wp) wp.href=c.wordpressBase;
})();


// V16 — direct book orders via WhatsApp
(function(){
  const form=document.getElementById('bookOrderForm');
  const bookSelect=document.getElementById('orderBook');
  document.querySelectorAll('.buy-direct').forEach(btn=>btn.addEventListener('click',()=>{if(bookSelect) bookSelect.value=btn.dataset.book||'Reflections';}));
  if(!form) return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const data=new FormData(form);
    const book=data.get('book');
    const price=book==='Shadowrift'?'PKR 3,500':'PKR 1,200';
    const msg=[
      'Hello Fatima, I would like to order a book from your website.',
      '',
      'Book: '+book,
      'Price: '+price,
      'Quantity: '+data.get('quantity'),
      'Name: '+data.get('name'),
      'Phone / WhatsApp: '+data.get('phone'),
      'City / Delivery Location: '+data.get('city'),
      data.get('notes')?'Notes: '+data.get('notes'):'',
      '',
      'Please let me know the delivery and payment details.'
    ].filter(Boolean).join('\n');
    window.open('https://wa.me/971555591421?text='+encodeURIComponent(msg),'_blank','noopener');
  });
})();
