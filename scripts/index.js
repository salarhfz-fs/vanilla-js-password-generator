console.log(`
Random password generator in Vanilla JS 😍
Author: Salar Hafezi 🫡 <salar.hfz@gmail.com>
Github repo: https://github.com/salarhfz-fs/vanilla-js-password-generator 😎
`);
// Constants
let DEFAULT_PASSWORD_LENGTH = 15; // It can be set by user
const ALLOWED_CHARS = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
    "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
    "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g",
    "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2",
    "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@",
    "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+",
    "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">",
    ".", "?", "/"
];
const password_input_states = [];
// DOM queries
const generate_btn = document.getElementById('generate-btn');
const password_els = document.querySelectorAll('.password');
password_els.forEach(_ => password_input_states.push({ is_copying: false }));
// Event handlers
function handleGeneratePassword() {
    for (let i = 0; i < password_els.length; i++) {
        password_els[i].value = createPasswordFromOfLength();
    }
}

function handleCopyToClipboard({ target }) {
    const password_input_idx = parseInt(target.getAttribute('data-index'));
    if (!target.value || password_input_states[password_input_idx].is_copying) return;
    password_input_states[password_input_idx].is_copying = true;
    target.classList.add('password-reverse');
    target.select();
    target.setSelectionRange(0, 99999); // For mobile devices
    const password = target.value;
    navigator.clipboard.writeText(password); // Copy the text inside the text field
    target.value = 'Copied!';
    setTimeout(() => {
        target.classList.remove('password-reverse');
        target.value = password;
        password_input_states[password_input_idx].is_copying = false;
    }, 1000);
}

generate_btn.addEventListener('click', handleGeneratePassword);
password_els.forEach(function (el) {
    el.addEventListener('click', handleCopyToClipboard);
});

// Helpers
function getRandomIntegerInRange(min, max) {
    if ([min, max].every(num => Number.isInteger(num)) && min <= max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return null;
}

function createPasswordFromOfLength(allowed_chars = ALLOWED_CHARS, password_length = DEFAULT_PASSWORD_LENGTH) {
    const str_arr = [];
    for (let i = 0; i < password_length; i++) {
        str_arr.push(allowed_chars[getRandomIntegerInRange(0, allowed_chars.length - 1)]);
    }
    return str_arr.join('');
}
