function cutContent(content) {
    content = content.replace(/\n|<br[^>]*>/ig, " ")
    return content
}

function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '…';
};

function formatDate(timestamp, type = 1) {
    let date = new Date(timestamp);
    const year = date.getMonth();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // ماه 2 رقمی
    const day = String(date.getDate()).padStart(2, '0');        // روز 2 رقمی
    const hours = String(date.getHours()).padStart(2, '0');     // ساعت 2 رقمی
    const minutes = String(date.getMinutes()).padStart(2, '0'); // دقیقه 2 رقمی
    const seconds = String(date.getSeconds()).padStart(2, '0'); // ثانیه 2 رقمی
    switch (type) {
        case 1:
            return `${hours}:${minutes}`;
        case 2:
            return minutes;
        default:
            break;
    }
}

function checkLayout() {

    if (window.innerWidth < 600) {
        if (getComputedStyle(chatbox).display === "none") {
            chatbox.style.display = "none";
            emptychat.style.display = "none";
            navbar.style.display = "flex";
            navbar.style.width = "100%";
        } else {
            navbar.style.display = "none";
            emptychat.style.display = "none";
        }
    } else {
        navbar.style.width = "300px";
        navbar.style.display = "flex";
        chatbox.style.width = "calc(100% - 300px)";
        if (getComputedStyle(chatbox).display === "none") {
            chatbox.style.display = "none";
            emptychat.style.display = "grid";
        } else {
            chatbox.style.display = "flex";
            emptychat.style.display = "none";
        }
    };
}

function SetButtomPadding() {
    let Fullchatinput = document.querySelector('.chat-input');
    if(window.innerWidth > 600) chatRoom.style.paddingBottom = Fullchatinput.offsetHeight + "px";
    else chatRoom.style.paddingBottom = Fullchatinput.offsetHeight + 18 + "px";
}