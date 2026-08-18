
const projectPrices = {
  "Tub-to-shower conversion": 9000,
  "Tub replacement + new tile shower": 9000,
  "Complete secondary bathroom remodel": 13000,
  "Tub & shower to large walk-in shower": 16000,
  "Primary bathroom remodel": 16000,
  "Other": 0
};

const upgradePrices = {
  "Handheld wand":300,
  "Rain head":250,
  "4 body sprays":600,
  "6 body sprays":800,
  "Independent component controls":250,
  "Shower bench":500,
  "Shower niche":300,
  "Grab bar":250
};

function money(v){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v)}

function updateCalculator(){
  const p = document.getElementById('calcProject');
  if(!p) return;
  let total = projectPrices[p.value] || 0;
  document.querySelectorAll('[data-calc-upgrade]:checked').forEach(x => total += Number(x.dataset.price || 0));
  document.getElementById('calcTotal').textContent = total ? money(total) : 'Select a project';
}
document.addEventListener('change', e=>{
  if(e.target.id==='calcProject' || e.target.matches('[data-calc-upgrade]')) updateCalculator();
});

function budgetCeiling(v){
  const map = {
    "Under $10,000":9999,
    "$10,000–$25,000":25000,
    "$25,000–$50,000":50000,
    "$50,000–$100,000":100000,
    "$100,000+":250000,
    "I'm not sure yet":Infinity
  };
  return map[v] ?? Infinity;
}
function routeLead(form){
  const project = form.project_type.value;
  const timeline = form.timeline.value;
  const budget = form.budget.value;
  const base = projectPrices[project] || 0;
  const ceiling = budgetCeiling(budget);
  const scopeMismatch = base && ceiling < base;
  let category = "Review";
  if(["3–6 months","More than 6 months","I'm currently planning/researching"].includes(timeline)){
    category = "Future Follow-Up";
  } else if(!scopeMismatch && ["As soon as possible","Within 30 days","1–3 months"].includes(timeline)){
    category = "Priority Lead";
  }
  if(project==="Other" || scopeMismatch) category = timeline.includes("month") && timeline!=="1–3 months" ? "Future Follow-Up" : "Review";
  form.lead_category.value = category;
  form.estimated_starting_investment.value = getFormEstimate(form);
  return category;
}
function getFormEstimate(form){
  const project = form.project_type.value;
  let total = projectPrices[project] || 0;
  form.querySelectorAll('input[name="upgrades"]:checked').forEach(x=>{
    total += upgradePrices[x.value] || 0;
  });
  return total ? money(total) : "Needs review";
}
document.addEventListener('DOMContentLoaded',()=>{
  updateCalculator();
  const form = document.getElementById('intakeForm');
  if(form){
    const preview = document.getElementById('scorePreview');
    form.addEventListener('change',()=>{
      const category = routeLead(form);
      const est = getFormEstimate(form);
      preview.innerHTML = `<strong>Estimated starting investment:</strong> ${est}<br><span>This is a planning estimate, not a quote. Final pricing depends on site conditions and selections.</span>`;
    });
    form.addEventListener('submit',()=>routeLead(form));
  }
});

// Lightweight scroll-triggered reveals. Progressive enhancement: content remains usable without JS.
document.addEventListener('DOMContentLoaded',()=>{
  const items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)) { items.forEach(x=>x.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  },{threshold:.14});
  items.forEach(x=>observer.observe(x));
});
