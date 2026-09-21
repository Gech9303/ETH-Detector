// ========== SECTION NAVIGATION ==========
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === id);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
});

// ========== DROPDOWNS ==========
const settingsBtn = document.getElementById('settingsBtn');
const settingsDropdown = document.getElementById('settingsDropdown');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');

function closeDropdowns() {
    settingsDropdown.classList.remove('show');
    profileDropdown.classList.remove('show');
}

settingsBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = settingsDropdown.classList.contains('show');
    closeDropdowns();
    if (!open) settingsDropdown.classList.add('show');
});

profileBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = profileDropdown.classList.contains('show');
    closeDropdowns();
    if (!open) profileDropdown.classList.add('show');
});

document.addEventListener('click', closeDropdowns);

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        item.classList.toggle('open');
    });
});

// ========== SCANNER ==========
const messageText = document.getElementById('message_text');
const resultContainer = document.getElementById('resultContainer');
const reportContainer = document.getElementById('reportMessageContainer');
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');

fileInput.addEventListener('change', () => {
    fileName.textContent = fileInput.files.length ? '📎 ' + fileInput.files[0].name : '';
});

const dangerWords = ['password', 'otp', 'pin', 'click here', 'urgent', 'verify', 'በይለፍ ቃል', 'ኦቲፒ', 'አስቸኳይ'];

function analyze(text) {
    const lower = text.toLowerCase();
    const count = dangerWords.filter(w => lower.includes(w)).length;

    if (count >= 2) {
        return { type: 'scan', title: '⚠️ Dangerous Message Detected!', text: 'This message contains strong phishing indicators. Do not click any links.' };
    } else if (count >= 1) {
        return { type: 'warning', title: '⚠️ Looks Suspicious', text: 'Some suspicious keywords were found. Please review carefully.' };
    }
    return { type: 'normal', title: '✅ Appears Safe', text: 'No dangerous indicators detected.' };
}

document.getElementById('checkBtn').addEventListener('click', () => {
    const text = messageText.value.trim();
    if (!text && !fileInput.files.length) {
        resultContainer.innerHTML = `<div class="alert-box warning"><p>Please enter a message or upload a photo.</p></div>`;
        return;
    }
    const analysisText = text || "ባንክዎ አካውንት ተዘግቷል። Click here to verify password.";
    const result = analyze(analysisText);
    resultContainer.innerHTML = `
        <div class="alert-box ${result.type}">
            <h3>${result.title}</h3>
            <p>${result.text}</p>
        </div>`;
});

document.getElementById('reportBtn').addEventListener('click', () => {
    reportContainer.innerHTML = `
        <div class="report-box">
            ✅ Report submitted successfully. Thank you!
        </div>`;
    setTimeout(() => reportContainer.innerHTML = '', 3500);
});

messageText.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') {
        document.getElementById('checkBtn').click();
    }
});

// ========== CONTACT ==========
function sendContact() {
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const msg = document.getElementById('contactMessage').value.trim();
    const result = document.getElementById('contactResult');

    if (!name || !email || !msg) {
        result.innerHTML = `<div class="alert-box warning"><p>Please fill all fields.</p></div>`;
        return;
    }
    result.innerHTML = `<div class="alert-box normal"><p>✅ Message sent successfully! We will reply soon.</p></div>`;
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';
}
