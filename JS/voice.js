let mediaRecorder;
let audioChunks = [];
let recordedBlob = null;
let recordingTimer = null;
let recordingSeconds = 0;

const recordBtn = document.getElementById('recordVoice');
const recordingIndicator = document.getElementById('recordingIndicator');
const voicePreview = document.getElementById('voicePreview');
const voiceAudio = document.getElementById('voiceAudio');
const recordingTime = document.getElementById('recordingTime');
// const status = document.getElementById('status');

// شروع/توقف ضبط
recordBtn.addEventListener('click', async () => {
    if (recordBtn.classList.contains('recording')) {
        stopRecording();
    } else {
        await startRecording();
    }
});

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            recordedBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(recordedBlob);
            voiceAudio.src = audioUrl;

            // voicePreview.classList.remove('hidden');
            // recordingIndicator.classList.add('hidden');
            // messageInput.classList.add('hidden');

            stream.getTracks().forEach(track => track.stop());
            // showStatus('ویس ضبط شد! آماده ارسال', 'success');
        };

        mediaRecorder.start();

        // تغییر ظاهر
        recordBtn.classList.add('recording');
        photoUploadButton.classList.remove('in');
        photoUploadButton.classList.add('out');
        recordingIndicator.classList.remove('hidden');
        voicePreview.classList.add('hidden');
        messageInput.classList.add('hidden');

        // تایمر
        recordingSeconds = 0;
        recordingTimer = setInterval(() => {
            recordingSeconds++;
            const min = Math.floor(recordingSeconds / 60).toString().padStart(2, '0');
            const sec = (recordingSeconds % 60).toString().padStart(2, '0');
            recordingTime.textContent = `${min}:${sec}`;
        }, 1000);

    } catch (error) {
        console.error(error);
        // showStatus('دسترسی به میکروفون ممکن نیست!', 'error');
    }
}

function stopRecording(cancel = 1) {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
    switch (cancel) {
        case 1:
            photoUploadButton.classList.remove('in')
            photoUploadButton.classList.add('out')
            voicePreview.classList.remove('hidden');
            recordingIndicator.classList.add('hidden');
            messageInput.classList.add('hidden');
            break;
        case 2:
            voicePreview.classList.add('hidden');
            photoUploadButton.classList.remove('out');
            photoUploadButton.classList.add('in');
            recordingIndicator.classList.add('hidden');
            messageInput.classList.remove('hidden');
            break;
        default:
            break;
    }

    recordBtn.classList.remove('recording');
    recordingSeconds = 0;
    recordingTime.textContent = `00:00`;
    clearInterval(recordingTimer);
}

// لغو ضبط
document.getElementById('cancelRecording').addEventListener('click', () => {
    stopRecording(2);
    audioChunks = [];
    recordedBlob = null;
    recordingIndicator.classList.add('hidden');
    voicePreview.classList.add('hidden');
    messageInput.classList.remove('hidden');
    // showStatus('ضبط لغو شد', 'error');
});

// حذف ویس
document.getElementById('deleteVoice').addEventListener('click', () => {
    recordedBlob = null;
    audioChunks = [];
    voicePreview.classList.add('hidden');
    messageInput.classList.remove('hidden');
    photoUploadButton.classList.remove('out');
    photoUploadButton.classList.add('in');
    voiceAudio.src = '';
    // showStatus('ویس حذف شد', 'error');
});

// ارسال ویس (شبیه‌سازی)
document.getElementById('sendVoice').addEventListener('click', () => {
    if (!recordedBlob) return;

    // اینجا باید fetch بزنی به سرور
    // showStatus('ویس ارسال شد! ✓', 'success');

    // پاک کردن
    setTimeout(() => {
        recordedBlob = null;
        audioChunks = [];
        voicePreview.classList.add('hidden');
        voiceAudio.src = '';
    }, 1500);
});

// function showStatus(message, type) {
//     status.textContent = message;
//     status.className = `status ${type}`;
//     status.classList.remove('hidden');

//     setTimeout(() => {
//         status.classList.add('hidden');
//     }, 3000);
// }