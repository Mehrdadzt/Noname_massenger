let title = prompt("نام خود را بنویسید:") || "Guest";
let chatbox = document.querySelector('.chatbox');
let navbar = document.querySelector('.navbar');
let emptychat = document.querySelector('.emptychat');
let messageInput = document.getElementById("messageInput");
let sendButton = document.getElementById("sendButton");
let messageList = document.getElementById("message-list");
let chatRoom = document.getElementById("message-list");
let photoUpload = document.getElementById("photo-upload");
let photoUploadButton = document.getElementById("photo-upload-button");
let photoUploadPreview = document.getElementById("photo-upload-preview");
let photoUploadPreviewImage = document.querySelector("#photo-upload-preview img");
let room = location.search.slice(1);
let allMessages = [];
let combinedMessages = [];
let lastId = '0';
let repliedMessage = null;
let replyPreview = document.getElementById("reply-preview");
let replyPreviewClose = document.getElementById("reply-preview-close");
let replyPreviewHeader = document.getElementById("reply-header");
let replyPreviewText = document.getElementById("reply-text");

window.addEventListener('DOMContentLoaded', function () {
  checkLayout();
  SetButtomPadding();
})
//-- show our hide fullchat when innerWidth < 600 by resize | Mehrdad Salimi
window.addEventListener("resize", function () {
  checkLayout();
});
// ===================== Clear Reply ===================== // Mehrdad Salimi
function clearReply() {
  repliedMessage = null;
  replyPreview.style.display = "none";
}
replyPreviewClose.addEventListener("click", () => {
  clearReply();
  SetButtomPadding();
})

// ===================== Reply function ===================== // Mehrdad Salimi
function replyMessage(idx) {
  let combinedMessage = combinedMessages[idx]
  if (!combinedMessage) {
    return null;
  }
  repliedMessage = combinedMessage.id;
  replyPreviewHeader.innerText = "در جواب " + combinedMessage.sender;
  replyPreviewText.innerHTML = combinedMessage.content;
  replyPreview.style.display = "flex";
}

// ===================== Send Message ===================== // Mehrdad Salimi
function sendMessage(message, file = null, fileType = null) {
  console.log('Sending:', { message, file, fileType });
  if (file) {
    return uploadFile(file, fileType).then(filePath => {
      return sendMessageToServer(message, filePath, fileType);
    });
  }
  return sendMessageToServer(message, null, null);
}
// ==================================== // Mehrdad Salimi
sendButton.addEventListener('click', function () {
  if (recordBtn.classList.contains('recording')) {
    stopRecording();
    sendMessage(messageInput.value, recordedBlob, 'voice');
    return;
  } else if (recordedBlob) {
    sendMessage(messageInput.value, recordedBlob, 'voice');
    return;
  }
  if (photoUpload.files[0]) {
    sendMessage(messageInput.value, photoUpload.files[0], 'image');
    return;
  }
  if (messageInput.value.trim() !== '') {
    //send-data
    sendMessage(messageInput.value);
    messageList.scrollTop = messageList.scrollHeight;
    //--------------------//
    photoUploadButton.classList.add('in')
    photoUploadButton.classList.remove('out')
    recordBtn.classList.add('in')
    recordBtn.classList.remove('out')
    messageInput.value = '';
    messageInput.style.height = 'auto'
    SetButtomPadding();
    return;
  };
});
// ===================== Send Message to SQL ===================== // Mehrdad salimi
function sendMessageToServer(message, filePath = null, fileType = null) {
  let paramsObject = {
    room,
    title,
    message
  };

  // اضافه کردن اطلاعات فایل
  if (filePath) {
    paramsObject['filePath'] = filePath;
    paramsObject['fileType'] = fileType;
  }

  // اضافه کردن reply
  if (repliedMessage) {
    paramsObject['replyId'] = repliedMessage;
  }

  const params = new URLSearchParams(paramsObject);

  return fetch('./system/sendMessage.php?' + params.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Message sent:', data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    })
    .finally(() => {
      clearPhotoUpload();
      clearReply();
    });
}
// ===================== Upload File ===================== // Mehrdad salimi
function uploadFile(file, fileType) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    if (fileType == 'voice') formData.append('file', file, 'voice.webm');
    else formData.append('file', file);
    formData.append('fileType', fileType);
    formData.append('room', room);
    fetch('./system/uploadFile.php', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) throw new Error('Upload failed');
        return response.json();
      })
      .then(data => {
        if (data.success) {
          resolve(data.filePath);
        } else {
          reject(new Error(data.error || 'Upload failed'));
        }
      })
      .catch(error => {
        console.error('Upload error:', error);
        reject(error);
      });
  });
}

// ===================== Get Message function ===================== //
getMessages = () => {
  const params = new URLSearchParams({ room, lastId });
  fetch('./system/getMessages.php?' + params.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      response.json().then(addMessages)
    })
    .catch(error => console.error('Error:', error))
    .finally(() => setTimeout(getMessages, 10));
}
getMessages();

class VoicePlayer {
  constructor(element) {
    this.container = element;
    this.audioSrc = element.dataset.src;
    this.playBtn = element.querySelector('.play-btn');
    this.progress = element.querySelector('.progress');
    this.durationEl = element.querySelector('.duration');

    this.audio = new Audio(this.audioSrc);
    this.isPlaying = false;

    this.init();
  }

  init() {
    this.playBtn.addEventListener('click', () => this.toggle());

    this.audio.addEventListener('timeupdate', () => {
      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      this.progress.style.width = percent + '%';
      this.durationEl.textContent = this.formatTime(this.audio.currentTime);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.playBtn.querySelector('.icon').textContent = '▶';
      this.progress.style.width = '0%';
    });

    // زمان کل
    this.audio.addEventListener('loadedmetadata', () => {
      this.durationEl.textContent = this.formatTime(this.audio.duration);
    });
  }

  toggle() {
    if (this.isPlaying) {
      this.audio.pause();
      this.playBtn.querySelector('.icon').textContent = '▶';
    } else {
      this.audio.play();
      this.playBtn.querySelector('.icon').textContent = '⏸';
    }
    this.isPlaying = !this.isPlaying;
  }

  formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }
}

addMessages = messages => {
  let newMessages = []
  let deletedMessages
  messages.forEach(message => {
    if (message.deleteMessages) {
      deletedMessages = message.deleteMessages
    } else {
      allMessages.push(message)
      newMessages.push(message)
    }
  })
  allMessages = allMessages.slice(-100)
  lastId = allMessages.length > 0 ? allMessages[allMessages.length - 1].id : null

  newMessages.forEach((message, index) => {
    let lastCombinedMessageIdx = combinedMessages.length - 1
    let lastCombinedMessage = lastCombinedMessageIdx >= 0 ? combinedMessages[lastCombinedMessageIdx] : null

    let newCombinedMessageIdx = combinedMessages.length
    combinedMessages.push({ ...message })
    let sor = (title == message.sender) ? "sent" : "recive";

    const messageli = document.createElement('li');
    messageli.classList.add("message", sor);
    if (lastCombinedMessage && (message.sender == lastCombinedMessage.sender) && ((message.timestamp - lastCombinedMessage.timestamp) <= 180000)) messageli.classList.add("near");
    // ===================== ADD Reply Part =====================//
    if (message.replyId) {
      const index = combinedMessages.findIndex(m => m.id === message.replyId);
      if (index !== -1) {
        const reply = document.createElement('div');
        reply.classList.add("reply", sor);
        reply.innerText = (combinedMessages[index].content == '') ? "خالی" : combinedMessages[index].content;
        messageli.appendChild(reply)
      }
    };
    // =================== ADD Message Content ===================//
    switch (message.file_type) {
      case 'voice':
        const messagevoice = document.createElement('div');
        messagevoice.className = "voice-message";
        messagevoice.dataset.src = message.file_path;
        const duration = message.duration || 0;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        messagevoice.innerHTML = `
        <button class="play-btn"><span>▶</span></button>
        <div style="display: flex;flex: 1;gap: 5px;flex-direction: column;">
          <div class="waveform">
            <div class="progress"></div>
          </div>
          <span class="duration">${minutes}:${seconds.toString().padStart(2, '0')}</span>
        </div>
        `;
        // اتصال پلیر
        new VoicePlayer(messagevoice);
        messageli.appendChild(messagevoice);
        break;
      case 'image':
        const inlineimage = document.createElement('img');
        inlineimage.src = message.file_path;
        inlineimage.className = "inlineimage";
        messageli.appendChild(inlineimage);
        break;
      case 'file':

        break;
      default:
        const messagetext = document.createElement('div');
        messagetext.className = "message-text";
        messagetext.innerHTML = message.content;
        messageli.appendChild(messagetext);
        break;
    }
    //-------
    const messagetale = document.createElement('div');
    messagetale.className = "message-tale";
    //--------
    const messagetime = document.createElement('div');
    messagetime.className = "message-time";
    messagetime.innerText = formatDate(message.timestamp);
    messagetale.appendChild(messagetime);
    //---------
    if (sor == "sent") {
      const messageseen = document.createElement('img');
      messageseen.src = "./Base-assets/Image/sent.webp";
      messageseen.className = "message-seen";
      messagetale.appendChild(messageseen);
    }
    messageli.appendChild(messagetale);
    messageList.appendChild(messageli);
    // ===================== Message Reply ===================== // Mehrdad Salimi
    messageli.addEventListener("dblclick", () => {
      replyMessage(newCombinedMessageIdx);
      SetButtomPadding();
      messageList.scrollTop = messageList.scrollHeight;
    })
    // ===================== Message Menu ===================== // Mehrdad Salimi
    if (sor == "sent") {
      const menu = document.querySelector('.message-menu');
      messageli.addEventListener('click', (e) => {
        menu.style.top = e.clientY + 5 + "px";
        menu.style.display = 'flex';
        if (e.clientX < menu.offsetWidth) {
          menu.style.left = e.clientX + 1 + "px";
          menu.style.borderRadius = '0px 10px 10px 10px';
        } else {
          menu.style.left = e.clientX - (menu.offsetWidth + 1) + "px";
          menu.style.borderRadius = '10px 0px 10px 10px';
        }
        document.querySelector('.BlackBack').style.display = 'block';
        document.querySelector('.BlackBack').setAttribute("MassegeId", message.id);
        messageli.style.zIndex = 9;
        messageli.style.boxShadow = 'rgba(255, 255, 255, 0.3) 0px 0px 14px 0px';
        document.querySelector("#Delete-massege").setAttribute("MassegeId", message.id)
        document.querySelector("#Edit-massege").setAttribute("MassegeId", message.id)
      });
    }
    // ============================ //
  })
  deletedMessages.forEach((message) => {
    const index = combinedMessages.findIndex(m => m.id === message.message_id);
    if (index !== -1) {
      document.querySelector("#message-list").children[index].remove();
      combinedMessages.splice(index, 1);
    }
  })
  if (newMessages.length !== 0) messageList.scrollTop = messageList.scrollHeight;
  SetButtomPadding();
}
document.querySelector('.BlackBack').addEventListener('click', (e) => {
  const index = combinedMessages.findIndex(m => m.id == e.target.attributes.massegeid.nodeValue);
  document.querySelector("#message-list").children[index].style.zIndex = '';
  document.querySelector("#message-list").children[index].style.boxShadow = '';
  e.target.style.display = 'none';
  document.querySelector('.message-menu').style.display = 'none';
});
// ===================== Delete function ===================== //  Mehrdad Salimi
document.querySelector("#Delete-massege").addEventListener('click', (e) => {
  messageId = (e.target.localName === "span") ? e.target.attributes.massegeid.nodeValue : e.target.parentElement.attributes.massegeid.nodeValue;
  DeleteMessage(messageId);
  document.querySelector('.BlackBack').style.display = 'none';
  document.querySelector('.message-menu').style.display = 'none';
})
function DeleteMessage(idx) {
  const index = combinedMessages.findIndex(m => m.id === idx);
  const params = new URLSearchParams({ room, idx });
  fetch('./system/DeleteMessage.php?' + params.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      document.querySelector("#message-list").children[index].remove();
      combinedMessages.splice(index, 1);
    })
    .catch(error => console.error('Error:', error))
}

// ===================== Photo Upload ===================== //  Mehrdad Salimi
photoUploadButton.addEventListener("click", () => photoUpload.click())
photoUpload.addEventListener("input", () => {
  recordBtn.classList.remove('in');
  recordBtn.classList.add('out');
  document.querySelector('.chat-input').style.paddingBottom = '4px';
  photoUploadPreview.style.display = 'flex';
  photoUploadPreviewImage.src = URL.createObjectURL(photoUpload.files[0]);
  SetButtomPadding();
});

function clearPhotoUpload() {
  recordBtn.classList.add('in');
  recordBtn.classList.remove('out');
  document.querySelector('.chat-input').style.paddingBottom = '';
  photoUpload.value = ''
  photoUploadPreview.style.display = 'none'
  photoUploadPreviewImage.src = ''
  SetButtomPadding();
}
photoUploadPreview.addEventListener("click", () => clearPhotoUpload())



document.getElementById("close-button").addEventListener("click", function () {
  chatbox.style.display = "none";
  checkLayout();
});

navbar.addEventListener("click", function (event) {
  let clickedchat = event.target.closest(".chat-item");
  if (!clickedchat) return;
  chatbox.style.display = "flex";
  emptychat.style.display = "none";
  checkLayout();
  SetButtomPadding();
  messageList.scrollTop = messageList.scrollHeight;
});

messageInput.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
  if (messageInput.value == '') {
    photoUploadButton.classList.add('in')
    photoUploadButton.classList.remove('out')
    recordBtn.classList.add('in')
    recordBtn.classList.remove('out')
  } else {
    photoUploadButton.classList.remove('in')
    photoUploadButton.classList.add('out')
    recordBtn.classList.remove('in')
    recordBtn.classList.add('out')
  }
});

messageInput.addEventListener('focus', function () {
  this.style.fontSize = "13.5px";
});

messageInput.addEventListener('blur', function () {
  if (messageInput.value == '') {
    photoUploadButton.classList.add('in')
    photoUploadButton.classList.remove('out')
    recordBtn.classList.add('in')
    recordBtn.classList.remove('out')
  }
  this.style.fontSize = "13px";
});

messageInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" & event.shiftKey) {
    event.preventDefault();
    sendButton.click();
  }
  if (event.key === "Enter") {
    SetButtomPadding();
    return;
  }
});

messageInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    SetButtomPadding();
    return;
  }
});


// ============== Not Now ===================//
// function sendAction(action) {
//     const params = new URLSearchParams({ room, title, action });
//     fetch('./sendAction.php?' + params.toString(), {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     }).then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//     })
//         .then(data => console.log(data))
//         .catch(error => console.error('Error:', error));
// }
// function userJoins() {
//     sendAction("کاربر وارد چت شد!");
// }

// function userLefts() {
//     sendAction("کاربر از چت خارج شد!");
// }

// window.addEventListener('beforeunload', () => {
//     sendAction("کاربر از چت خارج شد!");
// });
// userJoins(title);
