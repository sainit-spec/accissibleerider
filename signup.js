document.addEventListener('DOMContentLoaded', () => {
    // Enable Large Text
    const largeTextCheckbox = document.getElementById('enable-large-text');
    const bodyElement = document.body;

    largeTextCheckbox.addEventListener('change', () => {
        if (largeTextCheckbox.checked) {
            bodyElement.style.fontSize = '1.5em';
            alert("Large Text Mode enabled.");
        } else {
            bodyElement.style.fontSize = '';
            alert("Large Text Mode disabled.");
        }
    });

    // Enable Screen Reader
    const screenReaderCheckbox = document.getElementById('enable-screen-reader');

    screenReaderCheckbox.addEventListener('change', () => {
        if (screenReaderCheckbox.checked) {
            enableScreenReaderMode();
        } else {
            disableScreenReaderMode();
        }
    });

    function enableScreenReaderMode() {
        const formContent = document.getElementById('signup-form').innerText;
        const speech = new SpeechSynthesisUtterance(formContent);
        speech.lang = 'en-US';
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
        alert("Screen Reader Mode enabled. Reading form content aloud.");
    }

    function disableScreenReaderMode() {
        window.speechSynthesis.cancel();
        alert("Screen Reader Mode disabled.");
    }
});
