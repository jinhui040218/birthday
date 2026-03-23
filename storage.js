// All field IDs that should be saved
const fields = ['name', 'birthday', 'time', 'phone', 'zodiac', 'gender', 'email', 'university', 'course', 'education'];

// Load the last saved draft (if any)
function loadDraft() {
    const raw = localStorage.getItem('birthdayFormData');
    if (raw) {
        const data = JSON.parse(raw);
        fields.forEach(id => {
            const el = document.getElementById(id);
            if (el && data[id] !== undefined) el.value = data[id];
        });
    }
}

// Save current form data as a draft (overwrites previous draft)
function saveDraft() {
    const data = {};
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) data[id] = el.value;
    });
    localStorage.setItem('birthdayFormData', JSON.stringify(data));
}

// Save the current submission to the history list
function saveToHistory() {
    let history = JSON.parse(localStorage.getItem('submissions')) || [];
    const current = {};
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) current[id] = el.value;
    });
    current.timestamp = new Date().toISOString(); // add submission time
    history.push(current);
    localStorage.setItem('submissions', JSON.stringify(history));
}

// Clear the draft after successful submission
function clearDraft() {
    localStorage.removeItem('birthdayFormData');
    // Optionally reset the form fields (you may not want this if user might need to submit another)
    // fields.forEach(id => {
    //     const el = document.getElementById(id);
    //     if (el.tagName === 'SELECT') el.selectedIndex = 0;
    //     else el.value = '';
    // });
}

// Intercept the form submission
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        // Save this submission to history (local storage)
        saveToHistory();
        // Update the draft with the submitted data
        saveDraft();
        // The form will continue to submit to Formspree
        // After submission, the page will redirect to _next, so no need to clear draft here
        // But we can clear the draft if we want the next visit to start fresh:
        // clearDraft();
    });
}

// On page load, ask if user wants to load a previously saved draft
if (localStorage.getItem('birthdayFormData')) {
    if (confirm('Load previously saved draft?')) {
        loadDraft();
    }
}