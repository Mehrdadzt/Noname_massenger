    const textarea = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const container = document.querySelector(".chatmessage");
    const chatinput = document.querySelector(".chat-input");
    const truereply = document.getElementById('true-reply');

    textarea.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });

    textarea.addEventListener('focus' , function(){
      this.style.fontSize = "13.5px";
    });

    textarea.addEventListener('blur' , function(){
      this.style.fontSize = "13px";
    });

    sendButton.addEventListener('click', function () {
      if (textarea.value.trim() !== '') {
        const message = document.createElement('div');
        message.classList.add("message" , "sent");
        //-------
        const messagetext = document.createElement('div');
        messagetext.className = "message-text";
        messagetext.innerText = textarea.value;
        //-------
        const messagetale = document.createElement('div');
        messagetale.className = "message-tale";
        //--------
        const messagetime = document.createElement('div');
        messagetime.className = "message-time";
        const now = new Date();
        messagetime.innerText = formatDate(now);
        //---------
        const messageseen = document.createElement('img');
        messageseen.src = "./Base-assets/Image/sending.webp";
        messageseen.className = "message-seen";
        messagetale.appendChild(messagetime);
        messagetale.appendChild(messageseen);
        if(truereply.style.display === 'block'){
          const reply = document.createElement('div');
          reply.classList.add("reply" , "sent");
          reply.innerText = truereply.innerText;
          message.appendChild(reply)
        };
        message.appendChild(messagetext);
        message.appendChild(messagetale);
        container.appendChild(message);
        container.scrollTop = container.scrollHeight;
        //--------------------//
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