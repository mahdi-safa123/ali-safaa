import { supabase } from './supabase.js';

// toast
const toast = (msg)=>{
  const t = document.createElement('div');
  t.textContent = msg; t.setAttribute('role','status');
  t.style.cssText = 'position:fixed; bottom:20px; left:20px; background:#0b1220; border:1px solid rgba(148,163,184,.3); padding:12px 14px; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,.35); z-index:9999';
  document.body.appendChild(t); setTimeout(()=>t.remove(),3200);
};

// أزرار مبالغ التبرع
const amountInput = document.getElementById('amount');
const pills = document.querySelectorAll('.pill');
pills.forEach(p=>{
  p.addEventListener('click', ()=>{
    pills.forEach(x=>x.classList.remove('active'));
    p.classList.add('active');
    amountInput.value = p.dataset.amount;
    amountInput.focus();
  })
})

// تمرير ناعم
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  })
})

// نماذج مع Supabase
document.getElementById('donationForm')?.addEventListener('submit', async e=>{
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    phone: form.phone.value,
    amount: parseFloat(form.amount.value),
    method: form.method.value,
    created_at: new Date().toISOString()
  };
  const { error } = await supabase.from('donations').insert([data]);
  if(error){ alert('حدث خطأ: '+error.message); return; }
  toast('تم استلام التبرع بنجاح! شكراً لدعمك.');
  form.reset(); pills.forEach(x=>x.classList.remove('active'));
})

document.getElementById('volForm')?.addEventListener('submit', async e=>{
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.vname.value,
    city: form.vcity.value,
    phone: form.vphone.value,
    skills: form.vskills.value,
    note: form.vnote.value || null,
    created_at: new Date().toISOString()
  };
  const { error } = await supabase.from('volunteers').insert([data]);
  if(error){ alert('حدث خطأ: '+error.message); return; }
  toast('شكراً لتطوّعك! سنعود إليك قريباً.');
  form.reset();
})

document.getElementById('reportForm')?.addEventListener('submit', async e=>{
  e.preventDefault();
  const form = e.target;
  const data = {
    type: form.rtype.value,
    location: form.rloc.value,
    reporter_phone: form.rphone.value,
    description: form.rdesc.value,
    created_at: new Date().toISOString()
  };
  const { error } = await supabase.from('reports').insert([data]);
  if(error){ alert('حدث خطأ: '+error.message); return; }
  toast('تم استلام البلاغ، شكراً لحرصك.');
  form.reset();
})

document.getElementById('year').textContent = new Date().getFullYear();
