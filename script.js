function updateTime() {
    const now = new Date();
    const utcTime = now.toUTCString().split(' ')[4];
    document.getElementById('utcTime').innerText = utcTime;
}

function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255).toString(16).padStart(2, '0').toUpperCase();
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0').toUpperCase();
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0').toUpperCase();

    return `#${r}${g}${b}`;
}

function generateRainbowText() {
    let input = document.getElementById('inputText').value;
    const saturation = document.getElementById('saturation').value;
    const lightness = document.getElementById('lightness').value;
    let result = '';
    let preview = '';
    let charCount = 0;

    // Remove special characters, punctuation, and spaces
    input = input.replace(/[^\w]|_/g, "");

    const length = input.length;
    for (let i = 0; i < length && charCount < 20; i++) {
        const char = input[i];
        const hue = (i / length) * 360;
        const color = hslToHex(hue, saturation, lightness);
        result += `<color=${color}>${char}</color>`;
        preview += `<span style="color:${color}; font-weight:bold;">${char}</span>`;
        charCount++;
    }

    document.getElementById('outputText').value = result;
    document.getElementById('preview').innerHTML = preview;
}

function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    outputText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Copied to clipboard");
}

updateTime();
setInterval(updateTime, 1000);
