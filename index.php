<?php
date_default_timezone_set("Asia/Tehran");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>title</title>
    <link rel="stylesheet" href="./css/main.css">
</head>
<body>
    <!-- <header>Messenger</header> -->
    <div class="container">
        <div class="navbar">
        <ul class="chats_list">
            <li class="chat">
                <img src="profile.jpg">
                <div class="chat-info">
                <h4>حنانه</h4>
                <p>خوبی عسلم؟</p>
                </div>            
            </li>
            <li class="chat">
                <img src="profile.jpg">
                <div class="chat-info">
                <h4>علی</h4>
                <p>من گوشم شکستس داداش...</p>
                </div>
            </li>
        </ul>
        </div>
        <div class="chatbox">
            <div class="chat-header">
                <img src="profile.jpg">
                <div class="Single-info">
                    <h4>حنانه</h4>
                    <p>آنلاین</p>
                </div> 
                <div class="more-button">
                    X
                </div>
            </div>
            <div class="chatmessage">
                <div class="message sent">سلام</div>
                <div class="message sent near">
                    <div class="message-text">خوبی؟ روبه‌راهی</div>
                    <div class="message-tale">
                        <div class="message-time"><?= date("G:i") ?></div>
                        <img src="./Base-assets/Image/seen.webp" class="message-seen">
                    </div>
                </div>
                <div class="message sent">سلام خوبی قربونت سلامت باشی بابااااا فدات</div>
                <div class="message recive">خوبی؟</div>
            </div>
            <div class="chat-input">
                <textarea id="messageInput" placeholder="پیام بنویسید..."></textarea>
                <button>ارسال</button>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="JS/main.js"></script>
</body>
</html>