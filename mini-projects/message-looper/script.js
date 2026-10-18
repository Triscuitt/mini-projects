const textInput = document.getElementById("textInput");
const looper = document.getElementById("looper");
const submitBtn = document.getElementById("submitMsg");
const outputDiv = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");

submitBtn.addEventListener('click', submit);
copyBtn.addEventListener('click', copyToClipboard);
incrementBtn.addEventListener('click', increment);
decrementBtn.addEventListener('click', decrement);
looper.addEventListener('input', validateNumberInput);

function validateNumberInput(e) {
    // Remove any non-numeric characters
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
}

function increment() {
    const current = parseInt(looper.value) || 0;
    looper.value = current + 1;
}

function decrement() {
    const current = parseInt(looper.value) || 0;
    if (current > 1) {
        looper.value = current - 1;
    }
}

function submit() {
    const message = textInput.value.trim();
    const times = parseInt(looper.value);

    // Validate inputs
    if (!message) {
        alert("Please enter a message");
        return;
    }

    if (!times || times < 1) {
        alert("Please enter a valid number of times");
        return;
    }

    // Build the output
    let output = "";
    for (let i = 0; i < times; i++) {
        output += message + "\n";
    }

    // Display result
    console.log(output);
    outputDiv.textContent = output;

    // Show copy button
    copyBtn.classList.remove('hidden');

    // Clear inputs
    textInput.value = "";
    looper.value = "";
}

function copyToClipboard() {
    const text = outputDiv.textContent;

    if (!text) {
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "✓ Copied!";
        copyBtn.style.background = "linear-gradient(135deg, #48bb78 0%, #38a169 100%)";

        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = "";
        }, 2000);
    }).catch(() => {
        alert("Failed to copy to clipboard");
    });
}