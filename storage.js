const fields = ['name', 'birthday', 'time', 'phone', 'zodiac', 'gender', 'email', 'university', 'course', 'education'];

function loadDraft() {
    let raw = localStorage.getItem('birthdayFormData');
    if (raw) {
        let data = JSON.parse(raw);
        fields.forEach(id => {
            let el = document.getElementById(id);
            if (data[id] !== undefined) el.value = data[id];
        });
    }
}

function saveDraft() {
    let data = {};
    fields.forEach(id => data[id] = document.getElementById(id).value);
    localStorage.setItem('birthdayFormData', JSON.stringify(data));
}

function saveToHistory() {
    let history = JSON.parse(localStorage.getItem('submissions')) || [];
    let current = {};
    fields.forEach(id => current[id] = document.getElementById(id).value);
    current.timestamp = new Date().toISOString();
    history.push(current);
    localStorage.setItem('submissions', JSON.stringify(history));
}

function clearDraft() {
    localStorage.removeItem('birthdayFormData');
    fields.forEach(id => {
        let el = document.getElementById(id);
        if (el.tagName === 'SELECT') el.selectedIndex = 0;
        else el.value = '';
    });
}

document.querySelector('form').addEventListener('submit', function(e) {
    saveToHistory();
    saveDraft();
});

if (localStorage.getItem('birthdayFormData')) {
    if (confirm('Load previously saved draft?')) loadDraft();
}