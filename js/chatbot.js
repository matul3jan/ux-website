// Get the chat bot icon and window elements
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotWindow = document.getElementById('chatbot-window');

// Add a click event listener to the chat bot icon to toggle the chat bot window
chatbotIcon.addEventListener('click', () => {
    chatbotWindow.style.display = chatbotWindow.style.display === 'none' ? 'block' : 'none';
});

// Get the chatbot input and send button elements
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSendButton = document.getElementById('chatbot-send');

// Add a click event listener to the chatbot send button to send the user's message
chatbotSendButton.addEventListener('click', () => {
    const message = chatbotInput.value.trim();

    // If the message is not empty, add it to the chatbot messages container and clear the input
    if (message !== '') {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
        chatbotInput.value = '';

        // Add the reply message to the messages container after a short delay
        setTimeout(() => {
            const replyMessageElement = document.createElement('div');
            replyMessageElement.classList.add('message', 'reply');
            replyMessageElement.textContent = 'Send us your query & we will contact you shortly';
            messagesContainer.appendChild(replyMessageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 2000);
    }
});

const contactForm = document.getElementById('contact-us-form');
const contactPopup = document.getElementById('contact-popup');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent default form submission behavior
    // show the popup message
    contactPopup.style.display = 'block';

    // reset the form
    contactForm.reset();

    // hide the popup message after 3 seconds
    setTimeout(function () {
        contactPopup.style.display = 'none';
    }, 5000);
});
