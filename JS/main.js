    const textarea = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    textarea.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });

    sendButton.addEventListener('click', function () {
      if (textarea.value.trim() !== '') {
        const message = document.createElement('div');
        message.className = 'message sent';
        message.textContent = textarea.value;
        document.querySelector('.chat-messages').appendChild(message);
        textarea.value = '';
        textarea.style.height = '40px';
      }
    });

    textarea.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendButton.click();
      }
    });