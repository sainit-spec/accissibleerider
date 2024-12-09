document.getElementById('ride-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;

    // Confirm the booking (for demonstration purposes)
    document.getElementById('confirmation').innerText = `Ride booked from ${pickup} to ${dropoff}.`;
    
    // Provide voice feedback for confirmation
    if (document.getElementById('voice-command').checked) {
        const confirmationMessage = `Ride booked from ${pickup} to ${dropoff}.`;
        alert(confirmationMessage);
    }

    // Reset the form
    this.reset();
});

document.getElementById('settings-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const voiceCommandEnabled = document.getElementById('voice-command').checked;
    const screenReaderModeEnabled = document.getElementById('screen-reader-mode').checked;
    const largeTextEnabled = document.getElementById('large-text').checked;
    const voiceFeedback = document.getElementById('voice-feedback').value;

    console.log('Settings saved:', {
        voiceCommandEnabled,
        screenReaderModeEnabled,
        largeTextEnabled,
        voiceFeedback
    });

    alert('Settings have been saved successfully!');
});

// Voice command functionality
function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onstart = function() {
        console.log('Voice recognition started. Speak now.');
    };
    
    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(command);
    };

    recognition.start();
}

function handleVoiceCommand(command) {
    if (command.includes('book a ride to')) {
        const destination = command.split('book a ride to')[1].trim();
        document.getElementById('dropoff').value = destination;
        alert(`Booking a ride to ${destination}`);
        // Here you would trigger the booking process
    }
}

document.getElementById('start-voice-button').addEventListener('click', startVoiceRecognition);
const startButton = document.getElementById('start-interaction');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const recordButton = document.getElementById('record-response');

const questions = [
    "Where do you want to go?",
    "What type of transport would you like? (bus, cab, metro)",
    "Do you require any accessibility options?"
];

let currentQuestionIndex = 0;

startButton.addEventListener('click', () => {
    questionContainer.style.display = 'block';
    currentQuestionIndex = 0; // Reset index for new interaction
    askQuestion(); // Ask the first question
});

function askQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionElement.textContent = questions[currentQuestionIndex];
        speak(questions[currentQuestionIndex]); // Speak the current question
    } else {
        questionElement.textContent = "Thank you for your responses!";
        questionContainer.style.display = 'none';
    }
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US'; // Set the language
    window.speechSynthesis.speak(speech); // Speak the text
}

recordButton.addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
        const userResponse = event.results[0][0].transcript;
        console.log(`User said: ${userResponse}`);
        currentQuestionIndex++;
        askQuestion(); // Ask the next question
    };

    recognition.onerror = (event) => {
        console.error('Error occurred in recognition: ' + event.error);
    };
});
document.addEventListener('DOMContentLoaded', () => {
    const screenReaderCheckbox = document.getElementById('screen-reader-mode');

    screenReaderCheckbox.addEventListener('change', () => {
        if (screenReaderCheckbox.checked) {
            enableScreenReaderMode();
        } else {
            disableScreenReaderMode();
        }
    });

    function enableScreenReaderMode() {
        const contentToRead = document.body.innerText;
        const speech = new SpeechSynthesisUtterance(contentToRead);
        speech.lang = 'en-US';
        speech.rate = 1; // Adjust rate as needed
        speech.pitch = 1; // Adjust pitch as needed
        window.speechSynthesis.speak(speech);
        alert("Screen Reader Mode enabled. Content is being read aloud.");
    }

    function disableScreenReaderMode() {
        window.speechSynthesis.cancel();
        alert("Screen Reader Mode disabled.");
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const largeTextCheckbox = document.getElementById('large-text');
    const bodyElement = document.body;

    largeTextCheckbox.addEventListener('change', () => {
        if (largeTextCheckbox.checked) {
            enableLargeText();
        } else {
            disableLargeText();
        }
    });

    function enableLargeText() {
        bodyElement.style.fontSize = '1.5em'; // Increases the font size
        alert("Large Text Mode enabled.");
    }

    function disableLargeText() {
        bodyElement.style.fontSize = ''; // Resets to default font size
        alert("Large Text Mode disabled.");
    }
});





