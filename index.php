<?php
date_default_timezone_set("Asia/Tehran");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mas</title>
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="./css/animate.min.css">
    <link rel="icon" href="./favicon.ico">
</head>

<body>
    <div class ="BlackBack"></div>
    <div class="message-menu">
        <span id="Delete-massege">
            <img src="./Base-assets/Icons/Delete.webp" alt="Delete">
            <p>حذف</p>
        </span>
        <span id="Edit-massege">
            <img src="./Base-assets/Icons/Edit.webp" alt="Edit">
            <p>ویرایش</p>
        </span>
    </div>

    <div class="container" id="container">
        <div class="navbar">
            <div class="header-nav">
                <h1>Messenger</h1>
                <div class="search-option">x</div>
            </div>
            <ul class="chats_list">
                <li class="chat-item">
                    <img src="./uploads/Profiles/profile.jpg">
                    <div class="chat-info">
                        <h4>حنانه</h4>
                        <p>خوبی عسلم؟</p>
                    </div>
                </li>
                <li class="chat-item">
                    <img src="./uploads/Profiles/2003fa4a-0d22-3df3-9b55-4153f86b6095.jpg">
                    <div class="chat-info">
                        <h4>علی</h4>
                        <p>من گوشم شکستس داداش...</p>
                    </div>
                </li>
            </ul>
            <div class="bottom-right-setting">
                <div class="text-more">
                    اینجا یه دنیای جدیده...
                </div>
            </div>
        </div>
        <div class="emptychat">
            <p>هیچ چتی را انتخاب نکردید...</p>
        </div>
        <div class="chatbox">
            <div class="chat-header">
                <img src="./uploads/Profiles/profile.jpg">
                <div class="Single-info">
                    <h4>حنا</h4>
                    <p>آنلاین</p>
                </div>
                <div class="more-button" id="close-button">x</div>
            </div>
            <ul class="chatmessage" id="message-list">

            </ul>
            <div class="chat-input">
                <div id="photo-upload-preview">
                    <div class="photo-upload-remove">×</div>
                    <img class="photo-upload-image" src>
                </div>
                <div class="reply-preview" id="reply-preview">
                    <div class="reply-cancel" id="reply-preview-close">x</div>
                    <div class="reply-Details">
                        <span class="reply-header" id="reply-header"></span>
                        <span class="reply-text" id="reply-text"></span>
                    </div>
                </div>
                <div class="main-input">
                    <input type="file" class="hidden" id="photo-upload" accept=".png, .jpg, .jpeg, .gif, .webp">
                    <svg viewBox="0 0 24 24" id="recordVoice" class="voice-btn">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.124 15.3915H11.8754C9.49848 15.3915 7.56483 13.4155 7.56483 10.9876V6.40382C7.56483 3.97592 9.49848 2 11.8754 2H12.124C14.5009 2 16.4346 3.97592 16.4346 6.40382V6.9118C16.4346 7.30879 16.1195 7.63077 15.731 7.63077H13.8551C13.4666 7.63077 13.1515 7.30879 13.1515 6.9118C13.1515 6.51482 13.4666 6.19283 13.8551 6.19283H15.0196C14.9129 4.65589 13.6554 3.43894 12.124 3.43894H11.8754C10.2745 3.43894 8.97299 4.76889 8.97299 6.40382V10.9876C8.97299 12.6226 10.2745 13.9525 11.8754 13.9525H12.124C13.7249 13.9525 15.0264 12.6226 15.0264 10.9876V10.8236H12.9166C12.5281 10.8236 12.213 10.5007 12.213 10.1047C12.213 9.70669 12.5281 9.3847 12.9166 9.3847H15.731C16.1195 9.3847 16.4346 9.70669 16.4346 10.1047V10.9876C16.4346 13.4155 14.5009 15.3915 12.124 15.3915ZM9.07975 17.0359C6.81437 15.8899 5.40816 13.575 5.40816 10.9941C5.40816 10.5972 5.09208 10.2742 4.70359 10.2742C4.3151 10.2742 4 10.5972 4 10.9941C4 14.126 5.7076 16.9349 8.45543 18.3238C8.55524 18.3758 8.6619 18.3988 8.76661 18.3988C9.02593 18.3988 9.27547 18.2528 9.39877 17.9999C9.571 17.6419 9.42715 17.2119 9.07975 17.0359ZM19.2964 10.2745C18.9079 10.2745 18.5928 10.5965 18.5928 10.9944C18.5928 14.7083 15.6346 17.7302 12.0002 17.7302C11.6107 17.7302 11.2966 18.0522 11.2966 18.4501V21.28C11.2966 21.677 11.6107 22 12.0002 22C12.3887 22 12.7038 21.677 12.7038 21.28V19.1321C16.7864 18.7661 20 15.2583 20 10.9944C20 10.5965 19.6849 10.2745 19.2964 10.2745Z" fill="#8582a3"></path>
                    </svg>

                    <div id="recordingIndicator" class="recording-indicator hidden">
                        <p id="cancelRecording">لغو</p>
                        <span id="recordingTime">00:00</span>
                        <span class="recording-dot"></span>
                    </div>

                    <div id="voicePreview" class="voice-preview hidden">
                        <audio id="voiceAudio" controls></audio>
                        <button id="deleteVoice" class="action-btn delete-btn">✕</button>
                    </div>

                    <textarea id="messageInput" placeholder="پیام بنویسید..." rows="1"></textarea>
                    <div style="display: flex;gap: 5px;padding-top: 5px;padding-left: 5px;">
                        <svg id="photo-upload-button" class="photo-upload-btn" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.245 8.675C11.245 10.045 10.13 11.16 8.75997 11.16C7.38897 11.16 6.27497 10.045 6.27497 8.675C6.27497 7.305 7.38897 6.189 8.75997 6.189C10.13 6.189 11.245 7.305 11.245 8.675ZM19.4004 14.0876C19.6334 14.3136 19.8004 14.5716 19.9104 14.8466C20.2434 15.6786 20.0704 16.6786 19.7144 17.5026C19.2924 18.4836 18.4844 19.2246 17.4664 19.5486C17.0144 19.6936 16.5404 19.7556 16.0674 19.7556H7.68637C6.85237 19.7556 6.11437 19.5616 5.50937 19.1976C5.13037 18.9696 5.06337 18.4446 5.34437 18.1026C5.81437 17.5326 6.27837 16.9606 6.74637 16.3836C7.63837 15.2796 8.23937 14.9596 8.90737 15.2406C9.17837 15.3566 9.45037 15.5316 9.73037 15.7156C10.4764 16.2096 11.5134 16.8876 12.8794 16.1516C13.8131 15.641 14.3551 14.7674 14.8269 14.0069L14.8364 13.9916C14.8681 13.9407 14.8996 13.8898 14.931 13.8391C15.0914 13.5799 15.2494 13.3246 15.4284 13.0896C15.6504 12.7986 16.4744 11.8886 17.5394 12.5366C18.2184 12.9446 18.7894 13.4966 19.4004 14.0876Z" fill="#8582a3"style="transform-origin: center;transform: scale(1.20);"/>
                        </svg>
                        <svg viewBox="0 0 24 24" fill="none" id="sendButton">
                            <path d="M21.4274 2.5783C20.9274 2.0673 20.1874 1.8783 19.4974 2.0783L3.40742 6.7273C2.67942 6.9293 2.16342 7.5063 2.02442 8.2383C1.88242 8.9843 2.37842 9.9323 3.02642 10.3283L8.05742 13.4003C8.57342 13.7163 9.23942 13.6373 9.66642 13.2093L15.4274 7.4483C15.7174 7.1473 16.1974 7.1473 16.4874 7.4483C16.7774 7.7373 16.7774 8.2083 16.4874 8.5083L10.7164 14.2693C10.2884 14.6973 10.2084 15.3613 10.5234 15.8783L13.5974 20.9283C13.9574 21.5273 14.5774 21.8683 15.2574 21.8683C15.3374 21.8683 15.4274 21.8683 15.5074 21.8573C16.2874 21.7583 16.9074 21.2273 17.1374 20.4773L21.9074 4.5083C22.1174 3.8283 21.9274 3.0883 21.4274 2.5783Z" fill="#dddcde" />
                            <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M3.01049 16.8078C2.81849 16.8078 2.62649 16.7348 2.48049 16.5878C2.18749 16.2948 2.18749 15.8208 2.48049 15.5278L3.84549 14.1618C4.13849 13.8698 4.61349 13.8698 4.90649 14.1618C5.19849 14.4548 5.19849 14.9298 4.90649 15.2228L3.54049 16.5878C3.39449 16.7348 3.20249 16.8078 3.01049 16.8078ZM6.77169 18.0002C6.57969 18.0002 6.38769 17.9272 6.24169 17.7802C5.94869 17.4872 5.94869 17.0132 6.24169 16.7202L7.60669 15.3542C7.89969 15.0622 8.37469 15.0622 8.66769 15.3542C8.95969 15.6472 8.95969 16.1222 8.66769 16.4152L7.30169 17.7802C7.15569 17.9272 6.96369 18.0002 6.77169 18.0002ZM7.02539 21.5682C7.17139 21.7152 7.36339 21.7882 7.55539 21.7882C7.74739 21.7882 7.93939 21.7152 8.08539 21.5682L9.45139 20.2032C9.74339 19.9102 9.74339 19.4352 9.45139 19.1422C9.15839 18.8502 8.68339 18.8502 8.39039 19.1422L7.02539 20.5082C6.73239 20.8012 6.73239 21.2752 7.02539 21.5682Z" fill="#dddcde" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="JS/function.js"></script>
        <script type="text/javascript" src="JS/main.js"></script>
        <script type="text/javascript" src="JS/voice.js"></script>
</body>

</html>