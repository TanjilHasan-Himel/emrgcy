const services = [
    { id: 'national', title: 'National Emergency Number', subtitle: 'National Emergency', phone: '999', badge: 'All', icon: './assets/emergency.png', iconBg: 'bg-red' },
    { id: 'police', title: 'Police Helpline Number', subtitle: 'Police', phone: '999', badge: 'Police', icon: './assets/police.png', iconBg: 'bg-blue' },
    { id: 'fire', title: 'Fire Service Number', subtitle: 'Fire Service', phone: '999', badge: 'Fire', icon: './assets/fire-service.png', iconBg: 'bg-pink' },
    { id: 'ambul', title: 'Ambulance Service', subtitle: 'Ambulance', phone: '1994-999999', badge: 'Health', icon: './assets/ambulance.png', iconBg: 'bg-red' },
    { id: 'women', title: 'Women & Child Helpline', subtitle: 'Women & Child Helpline', phone: '109', badge: 'Help', icon: './assets/heart.png', iconBg: 'bg-pink' },
    { id: 'anti', title: 'Anti-Corruption Helpline', subtitle: 'Anti-Corruption', phone: '106', badge: 'Govt.', icon: './assets/logo-dark.png', iconBg: 'bg-yellow' },
    { id: 'electric', title: 'Electricity Helpline', subtitle: 'Electricity Outage', phone: '16216', badge: 'Electricity', icon: './assets/logo.png', iconBg: 'bg-yellow' },
    { id: 'brac', title: 'Brac Helpline', subtitle: 'Brac', phone: '16445', badge: 'NGO', icon: './assets/brac.png', iconBg: 'bg-pink' },
    { id: 'rail', title: 'Bangladesh Railway Helpline', subtitle: 'Bangladesh Railway', phone: '16318', badge: 'Travel', icon: './assets/Bangladesh-Railway.png', iconBg: 'bg-green' }
];

let coins = 100, likes = 0, copies = 0;
const history = [];

const $ = (s, c = document) => c.querySelector(s);

function nowTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
function updateNav() {
    $('#coinCount').textContent = coins;
    $('#heartCount').textContent = likes;
    $('#copyCount').textContent = copies;
}
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    const t = document.createElement('textarea');
    t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t);
    return Promise.resolve();
}
function addHistoryItem(title, phone) {
    history.unshift({ title, phone, time: nowTime() });
    renderHistory();
}
function renderHistory() {
    const box = $('#historyList');
    box.innerHTML = '';
    if (!history.length) { box.innerHTML = '<p class="time">No calls yet.</p>'; return; }
    history.forEach(h => {
        const row = document.createElement('div');
        row.className = 'history-item';
        row.innerHTML = `
      <div>
        <h4>${h.title}</h4>
        <p>${h.phone}</p>
      </div>
      <span class="time">${h.time}</span>
    `;
        box.appendChild(row);
    });
}
function makeCard(s) {
    const el = document.createElement('article');
    el.className = 'service-card';
    el.innerHTML = `
    <div class="card-header">
      <div class="card-icon ${s.iconBg}">
        <img src="${s.icon}" alt="">
      </div>
      <button class="love-btn" title="Love">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </button>
    </div>

    <div class="card-titles">
      <h4>${s.title}</h4>
      <p>${s.subtitle}</p>
    </div>

    <div class="card-number">${s.phone}</div>
    <span class="card-badge">${s.badge}</span>

    <div class="card-actions">
      <button class="btn copy-btn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
        Copy
      </button>
      <button class="btn call-btn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1v3.61a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.61a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.01l-2.32 2.22Z"/></svg>
        Call
      </button>
    </div>
  `;

    el.querySelector('.love-btn').addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('loved');
        likes += 1; updateNav();
    });
    el.querySelector('.copy-btn').addEventListener('click', async () => {
        await copyToClipboard(s.phone);
        copies += 1; updateNav();
        alert(`Number ${s.phone} copied.`);
    });
    el.querySelector('.call-btn').addEventListener('click', () => {
        if (coins < 20) { alert('Not enough coins (need 20).'); return; }
        coins -= 20; updateNav();
        alert(`Calling ${s.title} at ${s.phone}...`);
        addHistoryItem(s.title, s.phone);
    });

    return el;
}

function init() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const wrap = document.getElementById('cardContainer');
    services.forEach(s => wrap.appendChild(makeCard(s)));

    renderHistory();
    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
        if (!history.length) return;
        if (confirm('Clear all call history?')) {
            history.splice(0, history.length);
            renderHistory();
        }
    });

    updateNav();
}
document.addEventListener('DOMContentLoaded', init);
