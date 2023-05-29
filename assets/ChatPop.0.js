var i = 0;
var txt = "I am a GPT powered AI bot. How can i help you today?";
var speed = 50;
var id = "";
var prmptOld = "";
var studentId = "1234567";
var newChat = true;

var chats = [
  {
    chatid: "12345c15d8622-69a9-4715-8945-b200be58d2b0",
    chattitle: "How do I contact HCT",
    dateadded: "2023-04-11T09:50:46",
    id: 42,
    isDeleted: "F",
    lastModifiedDate: "2023-04-11T09:50:46",
    studentid: "12345",
    answer:
      "1 - If you wish to contact an HCT college or department directly please visit [HCT Contact Directory](http://www.hct.ac.ae/contact/directory/) You also have the option to make a general inquiry to HCT by completing the details on the following page: [Contact HCT](http://www.hct.ac.ae/contact/) Source: https://hct.ac.ae/en/website-information/faq/",
  },
  {
    chatid: "12345c15d8622-69a9-4715-8945-b200be58d2b0",
    chattitle: "What are the entry requirements for HCT",
    dateadded: "2023-04-11T09:50:46",
    id: 43,
    isDeleted: "F",
    lastModifiedDate: "2023-04-11T09:50:46",
    studentid: "12345",
    answer:
      "1 - If you wish to contact an HCT college or department directly please visit [HCT Contact Directory](http://www.hct.ac.ae/contact/directory/) You also have the option to make a general inquiry to HCT by completing the details on the following page: [Contact HCT](http://www.hct.ac.ae/contact/) Source: https://hct.ac.ae/en/website-information/faq/",
  },
];

window.onload = (e) => {
  var main = document.getElementsByTagName("head")[0];
  main.innerHTML =
    main.innerHTML +
    '<script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script>';
};

$(document).ready(function () {
  $("head").append(`
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <script src="
        https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js
        "></script>
  `);

  var one = 1;
  var body = `
  <div id="container">
    <!-- Main Menu -->
    <div id="main" class="chat-content position-relative" style="display:none">
      <div class="main-container col-md-12 pt-3 pl-3 pr-3 pb-3">
        <div id="closeIcon" class="text-right close-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="26.671" height="26.671" viewBox="0 0 26.671 26.671">
            <path id="create-account"
              d="M17.737,8.085l-6.5-.122-.122-6.5A1.309,1.309,0,0,0,9.837.185L9,.169A1.2,1.2,0,0,0,7.777,1.4L7.9,7.9,1.4,7.779A1.2,1.2,0,0,0,.169,9.006l.016.833a1.309,1.309,0,0,0,1.275,1.275l6.5.122.122,6.5A1.309,1.309,0,0,0,9.36,19.012l.833.016A1.2,1.2,0,0,0,11.421,17.8L11.3,11.3l6.5.122a1.2,1.2,0,0,0,1.228-1.228l-.016-.832A1.31,1.31,0,0,0,17.737,8.085Z"
              transform="translate(13.335 -0.239) rotate(45)" fill="#fff" />
          </svg>
        </div>
        <div class="text-center main-help">
          <img src="https://chatbottesting.cts.ae/assets/robot-icon.png" class="robot-image" alt="robot" />
          <p class="main-title">how can I help you?</p>
        </div>
      </div>
      <div id="newQuestion" class="main-new-chat row mx-4">
        <div class="col-10">
          <p class="main-new-ask">Ask Us A New Question</p>
        </div>
        <div class="col-2 text-right">
          <!-- <img src="https://chatbottesting.cts.ae/send.png" class="send" alt="send" /> -->
          <img id="sendIcon" src="https://chatbottesting.cts.ae/assets/send.png" />
          <img class="float-right" id="sendIcon2" src="https://chatbottesting.cts.ae/assets/send-yellow.png" />
        </div>
      </div>
      <div id="prevChats" class="main-prev-chat row mx-4 position-absolute">
        <div class="col-10">
          <p class="main-new-ask">Your Previous Chats</p>
        </div>
        <div class="col-2 text-right my-auto">
          <img src="https://chatbottesting.cts.ae/assets/arrow-small.png" class="arrow-small" />
          <img src="https://chatbottesting.cts.ae/assets/arrow-small-yellow.png" class="arrow-small-yellow" />
        </div>
      </div>
      <div class="main-terms row mx-4 position-absolute">
        <div class="col-10">
          <p class="main-new-ask">Terms And Conditions</p>
        </div>
        <div class="col-2 text-right my-auto">
          <img src="https://chatbottesting.cts.ae/assets/arrow-small.png" class="arrow-small" />
          <img src="https://chatbottesting.cts.ae/assets/arrow-small-yellow.png" class="arrow-small-yellow" />
        </div>
      </div>
    </div>

    <!-- Previous Conversations -->
    <div id="previousConversations" class="chat-content position-relative" style="display:none">
      <div class="row chat-header m-auto justify-content-between">
        <div class="col-2 my-auto pl-1 back-container py-1">
          <div id="goBack2" class="go-back">
            <img src="https://chatbottesting.cts.ae/assets/arrow-left-white.png" class="arrow-left-white mr-1" />
            <img src="https://chatbottesting.cts.ae/assets/arrow-left-yellow.png" class="arrow-left-yellow mr-1" />
            <span class="mb-0">Go Back</span>
          </div>
        </div>
        <div class="col-5 my-auto">
          <span class="mb-0 chatbox-title">YOUR PREVIOUS CHATS</span>
        </div>
        <div id="closeIcon2" class="col-md-1 col-2 my-auto close-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="26.671" height="26.671" viewBox="0 0 26.671 26.671">
            <path id="create-account"
              d="M17.737,8.085l-6.5-.122-.122-6.5A1.309,1.309,0,0,0,9.837.185L9,.169A1.2,1.2,0,0,0,7.777,1.4L7.9,7.9,1.4,7.779A1.2,1.2,0,0,0,.169,9.006l.016.833a1.309,1.309,0,0,0,1.275,1.275l6.5.122.122,6.5A1.309,1.309,0,0,0,9.36,19.012l.833.016A1.2,1.2,0,0,0,11.421,17.8L11.3,11.3l6.5.122a1.2,1.2,0,0,0,1.228-1.228l-.016-.832A1.31,1.31,0,0,0,17.737,8.085Z"
              transform="translate(13.335 -0.239) rotate(45)" fill="#fff" />
          </svg>
        </div>
      </div>
      <div id="prevChatsContainer" class="col-md-12 py-2 px-4">
        <div class="position-relative search-input-container">
          <input onkeyup="searchRooms(this)" id="searchInput" class="search-input" type="text"
            placeholder="| Search For Asked Questions" />
          <img class="search-img search-blue" src="https://chatbottesting.cts.ae/assets/search-icon-blue.png" />
          <img class="search-img search-yellow" src="https://chatbottesting.cts.ae/assets/search-icon-yellow.png" />
        </div>
        <div id="prevContainer">
        </div>
      </div>
    </div>

    <!-- Chat Conversation -->
    <div id="chatConversation" class="chat-content position-relative" style="display:none">
      <div class="row chat-header m-auto justify-content-between">
        <div class="col-10 my-auto pl-1 py-1">
          <div id="goBack" class="go-back">
            <img src="https://chatbottesting.cts.ae/assets/arrow-left-white.png" class="arrow-left-white mr-1" />
            <img src="https://chatbottesting.cts.ae/assets/arrow-left-yellow.png" class="arrow-left-yellow mr-1" />
            <span class="mb-0">Go Back</span>
          </div>
        </div>
        <div id="closeIcon3" class="col-md-1 col-2 my-auto close-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="26.671" height="26.671" viewBox="0 0 26.671 26.671">
            <path id="create-account"
              d="M17.737,8.085l-6.5-.122-.122-6.5A1.309,1.309,0,0,0,9.837.185L9,.169A1.2,1.2,0,0,0,7.777,1.4L7.9,7.9,1.4,7.779A1.2,1.2,0,0,0,.169,9.006l.016.833a1.309,1.309,0,0,0,1.275,1.275l6.5.122.122,6.5A1.309,1.309,0,0,0,9.36,19.012l.833.016A1.2,1.2,0,0,0,11.421,17.8L11.3,11.3l6.5.122a1.2,1.2,0,0,0,1.228-1.228l-.016-.832A1.31,1.31,0,0,0,17.737,8.085Z"
              transform="translate(13.335 -0.239) rotate(45)" fill="#fff" />
          </svg>
        </div>
        <div id="chatActions" class="w-100 d-none">
          <div class="row mx-0 my-2">
            <div id="deleteChat" class="col text-center chat-action-icon mx-2 py-1">
              <img src="https://chatbottesting.cts.ae/assets/delete-icon.png" alt="delete" />
              <span>Delete</span>
            </div>
            <div id="downloadChat" class="col text-center chat-action-icon mx-2 py-1">
              <img src="https://chatbottesting.cts.ae/assets/download-icon.png" alt="download" />
              <span>Download</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 chats pt-3 pl-2 pr-3 pb-3">
        <div id="fullchat">
        </div>
      </div>
      <div class="col-md-12 p-2 input-container">
        <div class="row">
          <div class="col-10 col-md-11 pl-3">
            <input id="newmessage" class="message-input border-0 px-4" placeholder="Type your message!"
              style="font-size:18px;" />
            <input id="PromptResponse" name="PromptResponse" type="hidden" value="0" />
          </div>
          <div class="col-2 col-md-1 pl-2">
            <div class="send-icon float-right">
              <img src="https://chatbottesting.cts.ae/assets/e-icon.png" class="e-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="hide-chat-box bot-icon justify-cotent-center float-right">
    <svg xmlns="http://www.w3.org/2000/svg" width="34.161" height="33.097" viewBox="0 0 34.161 33.097">
      <g id="bot" transform="translate(0 -7.973)">
        <g id="Page-1_9_" transform="translate(0 7.973)">
          <g id="_x30_10---Chat-Bot-Head">
            <path id="Shape_60_"
              d="M0,248.607v3.416a1.708,1.708,0,0,0,1.708,1.708h.569V246.9H1.708A1.708,1.708,0,0,0,0,248.607Z"
              transform="translate(0 -230.958)" fill="#fff" />
            <path id="Shape_59_"
              d="M478.436,246.9h-.569v6.832h.569a1.708,1.708,0,0,0,1.708-1.708v-3.416A1.708,1.708,0,0,0,478.436,246.9Z"
              transform="translate(-445.984 -230.958)" fill="#fff" />
            <path id="Shape_58_"
              d="M219.023,10.819a2.856,2.856,0,0,1-2.277,2.79v2.9h-1.139v-2.9a2.847,2.847,0,1,1,3.416-2.79Z"
              transform="translate(-199.096 -7.973)" fill="#fff" />
            <circle id="Oval_17_" cx="1.708" cy="1.708" r="1.708" transform="translate(22.204 15.941)" fill="#fff" />
            <circle id="Oval_16_" cx="1.708" cy="1.708" r="1.708" transform="translate(8.54 15.941)" fill="#fff" />
            <path id="Shape_57_"
              d="M75.112,153.033h-20.5a3.416,3.416,0,0,0-3.416,3.416v12.526a3.416,3.416,0,0,0,3.4,3.416.574.574,0,0,1,.581.569v2.921a.569.569,0,0,0,.885.474l5.662-3.774a1.139,1.139,0,0,1,.629-.191h12.75a3.416,3.416,0,0,0,3.416-3.416V156.449a3.416,3.416,0,0,0-3.416-3.416Zm-17.08,10.818A2.847,2.847,0,1,1,60.879,161,2.847,2.847,0,0,1,58.032,163.851Zm10.162,2.01a3.8,3.8,0,0,1-3.33,1.406,3.8,3.8,0,0,1-3.33-1.406.569.569,0,0,1,.961-.61,2.781,2.781,0,0,0,2.368.878,2.77,2.77,0,0,0,2.369-.879.574.574,0,0,1,.785-.163A.565.565,0,0,1,68.194,165.86Zm3.5-2.01A2.847,2.847,0,1,1,74.543,161,2.847,2.847,0,0,1,71.7,163.851Z"
              transform="translate(-47.784 -143.355)" fill="#fff" />
          </g>
        </g>
      </g>
    </svg>
  </div>
`;

  $(".chat-main").append(body);
  typeWriter();
  $("#sendmessage").disabled = true;
  fetchChats();

  $("#chatMain").on("click", ".hide-chat-box", function () {
    if ($("#main").is(":visible")) {
      $("#main").toggle();
    } else if ($("#previousConversations").is(":visible")) {
      $("#previousConversations").toggle();
    } else if ($("#chatConversation").is(":visible")) {
      $("#chatConversation").toggle();
    } else {
      $("#main").toggle();
    }
    $(this).toggleClass("bot-icon-light-blue");
  });

  $("#chatMain").on("click", "#closeIcon", function () {
    $("#main").toggle();
    $(".hide-chat-box").removeClass("bot-icon-light-blue");
  });

  $("#chatMain").on("click", "#closeIcon2", function () {
    $("#previousConversations").toggle();
    $(".hide-chat-box").removeClass("bot-icon-light-blue");
  });

  $("#chatMain").on("click", "#closeIcon3", function () {
    $("#chatConversation").toggle();
    $(".hide-chat-box").removeClass("bot-icon-light-blue");
  });

  $("#chatMain").on("click", "#newQuestion", function () {
    id = "";
    prmptOld = "";
    $("#fullchat").html("");
    typeWriter();
    $("#chatConversation").toggle();
    $("#main").toggle();
  });

  $("#chatMain").on("click", "#prevChats", function () {
    $("#previousConversations").toggle();
    $("#main").toggle();
  });

  $("#chatMain").on("click", "#goBack", function () {
    $("#chatConversation").toggle();

    if (true === newChat) {
      $("#main").toggle();
    } else {
      $("#chatActions").toggleClass("d-none", "d-block");
      $("#previousConversations").toggle();
    }
  });

  $("#chatMain").on("click", "#goBack2", function () {
    $("#previousConversations").toggle();
    $("#main").toggle();
  });

  $("#chatMain").on("click", "#deleteChat", function () {
    console.log("id: ", id);
    $("#chatConversation").toggle();
    $("#chatActions").toggleClass("d-none", "d-block");
    $("#previousConversations").toggle();
    chats = chats.filter(function (item) {
      return item.chatid != id;
    });
    $(`#${id}`).remove();
    fetchChats();
  });

  $("#chatMain").on("click", "#downloadChat", function () {
    $.get(
      `https://chatbottesting.cts.ae/api/api/Chatbot/GetChatFile/${id}`,
      function (data) {
        var newTab = window.open(data, "_blank");
        newTab.location;
      }
    );
  });

  $("#prevChatsContainer").on("click", ".prev-chat-container", function () {
    id = this.id;
    newChat = false;
    $("#fullchat").html("");

    $("#chatActions").toggleClass("d-none", "d-block");

    $.getJSON(
      `https://chatbottesting.cts.ae/api/api/Chatbot/ChatListData/${this.id}`,
      (data) => {
        data.reverse().map((message) => {
          var div = document.createElement("div");
          if ("Bot" === message?.prompter) {
            div = `
          <div class="row message-container">
          <div class="col-md-2 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 31 31">
              <g id="Group_19120" data-name="Group 19120" transform="translate(-1553.001 -517)">
                <g id="up_button" data-name="up button" transform="translate(1553.033 517)">
                  <rect id="Rectangle_5107" data-name="Rectangle 5107" width="31" height="31" rx="15.5" transform="translate(-0.032)" fill="rgba(255,255,255,0.1)"/>
                  <g id="bot" transform="translate(0.806 0.412)">
                    <path id="Path_10282" data-name="Path 10282" d="M2.168,45.44A3.673,3.673,0,0,0,1.435,46C.38,47.054.335,48.394.273,50.25s-.107,3.215.863,4.272a3.085,3.085,0,0,0,1.674,1,.345.345,0,0,0,.377-.5,10.365,10.365,0,0,1-1.371-5.106,10.138,10.138,0,0,1,.842-4.037.345.345,0,0,0-.488-.432Z" transform="translate(-0.245 -35.02)" fill="#020a58"/>
                    <path id="Path_10283" data-name="Path 10283" d="M114.74,55.014a.345.345,0,0,0,.377.5,3.085,3.085,0,0,0,1.674-1c.971-1.057.925-2.405.863-4.272s-.108-3.2-1.163-4.247a3.673,3.673,0,0,0-.733-.563.345.345,0,0,0-.488.432,10.138,10.138,0,0,1,.841,4.036,10.365,10.365,0,0,1-1.371,5.106Z" transform="translate(-88.543 -35.019)" fill="#020a58"/>
                    <path id="Path_10284" data-name="Path 10284" d="M18.011,24.907c5.971-.018,8.71.038,9.375,0s7.36-4.785,7.36-10.025c0-5.821-5.338-10.572-11.967-10.733V2.924a1.485,1.485,0,1,0-.686,0V4.149c-6.633.158-11.974,4.91-11.974,10.733,0,4.454,3.154,8.436,7.892,10.025Zm4.422-2.369a1.028,1.028,0,1,1,1.028-1.028A1.028,1.028,0,0,1,22.432,22.538Zm0-16.34a9.2,9.2,0,0,1,9.059,10.453,4.141,4.141,0,0,1-4.106,3.715c-2.477-.007-2.477-1.382-4.953-1.382s-2.477,1.376-4.953,1.382a4.141,4.141,0,0,1-4.106-3.715A9.2,9.2,0,0,1,22.432,6.2Z" transform="translate(-7.863 0.006)" fill="#020a58"/>
                    <path id="Path_10285" data-name="Path 10285" d="M52.415,61.472a3.213,3.213,0,0,0,4.712,0,1.387,1.387,0,0,0-.011-1.933,1.409,1.409,0,0,0-1.942.009.568.568,0,0,1-.4.213.6.6,0,0,1-.4-.21,1.4,1.4,0,0,0-1.942-.014,1.387,1.387,0,0,0-.014,1.936Z" transform="translate(-40.195 -45.634)" fill="#020a58"/>
                    <path id="Path_10286" data-name="Path 10286" d="M76.367,45.982a1.4,1.4,0,0,0,1.376-1.41c0-.382,0-1.14,0-1.52a1.4,1.4,0,0,0-1.373-1.412A1.382,1.382,0,0,0,75,43.011v1.6A1.379,1.379,0,0,0,76.367,45.982Z" transform="translate(-57.917 -32.123)" fill="#020a58"/>
                    <path id="Path_10287" data-name="Path 10287" d="M42.373,45.982a1.382,1.382,0,0,0,1.369-1.371v-1.6a1.382,1.382,0,0,0-1.369-1.371A1.4,1.4,0,0,0,41,43.052c0,.379,0,1.138,0,1.52a1.4,1.4,0,0,0,1.373,1.41Z" transform="translate(-31.687 -32.123)" fill="#020a58"/>
                  </g>
                </g>
              </g>
            </svg>
            <p class="sender mb-0">HCT AI</p>
          </div>
          <div class="col-md-8 ml-2">
            <div id="message">
              <p class="mb-0 message-text">${message?.chatprompt}</p>
            </div>
          </div>
        </div>
        `;
          } else {
            div.innerHTML = `
          <div class="row justify-content-end message-container">
            <div class="col-md-8 receiver-message">
              <div id="message2">
                <p class="mb-0 message-text">${message?.chatprompt}</p>
              </div>
            </div>
          </div>
          `;
          }
          prmptOld = message?.chatprompt.toString();
          $("#fullchat").append(div);
        });
      }
    );
    $("#chatMain").scrollTop($(".chats")[0].scrollHeight);
    $("#chatConversation").toggle();
    $("#previousConversations").toggle();
  });

  $("#chatMain").on("click", ".send-icon", function () {
    var ip = $("#newmessage").val();
    if (0 == ip.length) {
      return;
    }
    WorkOutResponses(ip);
  });

  $("#newmessage").keypress(function (event) {
    var ip = $("#newmessage").val();
    if (0 == ip.length) {
      return;
    }
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      WorkOutResponses(ip);
    }
  });
});

function typeWriter(type = "HCT AI") {
  var div = document.createElement("div");
  i = 0;

  if ("HCT AI" == type) {
    div.innerHTML = `
    <div class="row message-container">
      <div class="col-md-2 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 31 31">
          <g id="Group_19120" data-name="Group 19120" transform="translate(-1553.001 -517)">
            <g id="up_button" data-name="up button" transform="translate(1553.033 517)">
              <rect id="Rectangle_5107" data-name="Rectangle 5107" width="31" height="31" rx="15.5" transform="translate(-0.032)" fill="rgba(255,255,255,0.1)"/>
              <g id="bot" transform="translate(0.806 0.412)">
                <path id="Path_10282" data-name="Path 10282" d="M2.168,45.44A3.673,3.673,0,0,0,1.435,46C.38,47.054.335,48.394.273,50.25s-.107,3.215.863,4.272a3.085,3.085,0,0,0,1.674,1,.345.345,0,0,0,.377-.5,10.365,10.365,0,0,1-1.371-5.106,10.138,10.138,0,0,1,.842-4.037.345.345,0,0,0-.488-.432Z" transform="translate(-0.245 -35.02)" fill="#020a58"/>
                <path id="Path_10283" data-name="Path 10283" d="M114.74,55.014a.345.345,0,0,0,.377.5,3.085,3.085,0,0,0,1.674-1c.971-1.057.925-2.405.863-4.272s-.108-3.2-1.163-4.247a3.673,3.673,0,0,0-.733-.563.345.345,0,0,0-.488.432,10.138,10.138,0,0,1,.841,4.036,10.365,10.365,0,0,1-1.371,5.106Z" transform="translate(-88.543 -35.019)" fill="#020a58"/>
                <path id="Path_10284" data-name="Path 10284" d="M18.011,24.907c5.971-.018,8.71.038,9.375,0s7.36-4.785,7.36-10.025c0-5.821-5.338-10.572-11.967-10.733V2.924a1.485,1.485,0,1,0-.686,0V4.149c-6.633.158-11.974,4.91-11.974,10.733,0,4.454,3.154,8.436,7.892,10.025Zm4.422-2.369a1.028,1.028,0,1,1,1.028-1.028A1.028,1.028,0,0,1,22.432,22.538Zm0-16.34a9.2,9.2,0,0,1,9.059,10.453,4.141,4.141,0,0,1-4.106,3.715c-2.477-.007-2.477-1.382-4.953-1.382s-2.477,1.376-4.953,1.382a4.141,4.141,0,0,1-4.106-3.715A9.2,9.2,0,0,1,22.432,6.2Z" transform="translate(-7.863 0.006)" fill="#020a58"/>
                <path id="Path_10285" data-name="Path 10285" d="M52.415,61.472a3.213,3.213,0,0,0,4.712,0,1.387,1.387,0,0,0-.011-1.933,1.409,1.409,0,0,0-1.942.009.568.568,0,0,1-.4.213.6.6,0,0,1-.4-.21,1.4,1.4,0,0,0-1.942-.014,1.387,1.387,0,0,0-.014,1.936Z" transform="translate(-40.195 -45.634)" fill="#020a58"/>
                <path id="Path_10286" data-name="Path 10286" d="M76.367,45.982a1.4,1.4,0,0,0,1.376-1.41c0-.382,0-1.14,0-1.52a1.4,1.4,0,0,0-1.373-1.412A1.382,1.382,0,0,0,75,43.011v1.6A1.379,1.379,0,0,0,76.367,45.982Z" transform="translate(-57.917 -32.123)" fill="#020a58"/>
                <path id="Path_10287" data-name="Path 10287" d="M42.373,45.982a1.382,1.382,0,0,0,1.369-1.371v-1.6a1.382,1.382,0,0,0-1.369-1.371A1.4,1.4,0,0,0,41,43.052c0,.379,0,1.138,0,1.52a1.4,1.4,0,0,0,1.373,1.41Z" transform="translate(-31.687 -32.123)" fill="#020a58"/>
              </g>
            </g>
          </g>
        </svg>
        <p class="sender mb-0">${type}</p>
      </div>
      <div class="col-md-8 ml-2">
        <div id="message">
          <p class="mb-0 message-text"></p>
        </div>
      </div>
    </div>
    `;
  } else {
    div.innerHTML = `
    <div class="row justify-content-end message-container">
      <div class="col-md-8 receiver-message">
        <div id="message2">
          <p class="mb-0 message-text"></p>
        </div>
      </div>
    </div>
    `;
  }
  $("#fullchat").append(div);
  $("#chatMain").scrollTop($(".chats")[0].scrollHeight);
  typeText();
}

function typeText() {
  if (i < txt.length) {
    var lastmessage = $(".message-container").find(".message-text").last();
    lastmessage.html(lastmessage.html() + txt.charAt(i));
    i++;
    setTimeout(typeText, speed);
  }
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function WorkOutResponses(ip) {
  StartWriter(ip, "You");
  var prompt = encodeURIComponent(ip);

  if (prmptOld.length > 0) {
    // var oldprompt = encodeURIComponent($(prmptOld));
    var oldprompt = encodeURIComponent(prmptOld);
  } else {
    var oldprompt = encodeURIComponent($("#PromptResponse").val());
  }
  if (id.length > 0) {
    var chatId = id;
  } else {
    var chatId = studentId + uuidv4();
  }

  $.ajax({
    url: `https://chatbottesting.cts.ae/api/Chat/GetAnswer/${prompt}`,
    success: function (data) {
      $("#PromptResponse").val(data); // this will set hidden field value
      StartWriter(data, "HCT AI");
    },
  });
  id = chatId;
}

function StartWriter(prompt, mperson) {
  txt = prompt;
  typeWriter(mperson);
  $("#newmessage").val("");
}

function fetchChats() {
  var div = document.createElement("div");
  div = ``;
  console.log("chats: ", chats);
  chats.map((chat) => {
    div = `
      <div class="row mx-0 mt-3 prev-chat-container" id='${chat?.chatid}'>
        <div class="col-10 chat-list-item">
          <p class="chat-title mb-0">${chat?.chattitle}</p>
          <p class="chat-date mb-0">Created Date : ${moment(
            chat?.dateadded
          ).format("DD MMMM YYYY")}</p>
          <p class="chat-date">Last Modified : ${moment(
            chat?.lastModifiedDate
          ).format("DD MMMM YYYY")}</p>
          </div>
        <div class="col-2 text-right my-auto">
          <img class="prev-chat-arrow-small" src="https://chatbottesting.cts.ae/assets/arrow-small.png" />
          <img class="prev-chat-arrow-yellow" src="https://chatbottesting.cts.ae/assets/arrow-small-yellow.png" />
        </div>
      </div>
      `;
    $("#prevContainer").append(div);
  });
}

// function fetchChats() {
//   $.getJSON(
//     `https://chatbottesting.cts.ae/api/api/ChatBot/ChatList/${studentId}`,
//     (data) => {
//       console.log("data: ", data);
//       chats.map((chat) => {
//         var div = document.createElement("div");
//         div = `
//       <div class="row mx-0 mt-3 prev-chat-container" id='${chat?.chatid}'>
//         <div class="col-10 chat-list-item">
//           <p class="chat-title mb-0">${chat?.chattitle}</p>
//           <p class="chat-date mb-0">Created Date : ${moment(
//             chat?.dateadded
//           ).format("DD MMMM YYYY")}</p>
//           <p class="chat-date">Last Modified : ${moment(
//             chat?.lastModifiedDate
//           ).format("DD MMMM YYYY")}</p>
//           </div>
//         <div class="col-2 text-right my-auto">
//           <img class="prev-chat-arrow-small" src="https://chatbottesting.cts.ae/assets/arrow-small.png" />
//           <img class="prev-chat-arrow-yellow" src="https://chatbottesting.cts.ae/assets/arrow-small-yellow.png" />
//         </div>
//       </div>
//       `;
//         $("#prevContainer").append(div);
//       });
//     }
//   );
// }

function searchRooms(e) {
  var SearchText = e.value;
  $("#prevContainer").html("");
  if (SearchText == "" || SearchText == " ") {
    $.getJSON(
      `https://chatbottesting.cts.ae/api/api/ChatBot/ChatList/${studentId}`,
      (data) => {
        data.map((chat) => {
          var div = document.createElement("div");
          div = `
        <div class="row mx-0 mt-3 prev-chat-container" id='${chat?.chatid}'>
          <div class="col-10 chat-list-item">
            <p class="chat-title mb-0">${chat?.chattitle}</p>
            <p class="chat-date mb-0">Created Date : ${moment(
              chat?.dateadded
            ).format("DD MMMM YYYY")}</p>
            <p class="chat-date">Last Modified : ${moment(
              chat?.lastModifiedDate
            ).format("DD MMMM YYYY")}</p>
            </div>
          <div class="col-2 text-right my-auto">
            <img class="prev-chat-arrow-small" src="https://chatbottesting.cts.ae/assets/arrow-small.png" />
            <img class="prev-chat-arrow-yellow" src="https://chatbottesting.cts.ae/assets/arrow-small-yellow.png" />
          </div>
        </div>
        `;
          $("#prevContainer").append(div);
        });
      }
    );
  } else {
    $.getJSON(
      `https://chatbottesting.cts.ae/api/api/ChatBot/SearchChatList/${SearchText}/${studentId}`,
      (data) => {
        data.map((chat) => {
          var div = document.createElement("div");
          div = `
      <div class="row mx-0 mt-3 prev-chat-container" id='${chat?.chatid}'>
        <div class="col-10 chat-list-item">
          <p class="chat-title mb-0">${chat?.chattitle}</p>
          <p class="chat-date mb-0">Created Date : ${moment(
            chat?.dateadded
          ).format("DD MMMM YYYY")}</p>
          <p class="chat-date">Last Modified : ${moment(
            chat?.lastModifiedDate
          ).format("DD MMMM YYYY")}</p>
        </div>
        <div class="col-2 text-right my-auto">
          <img class="prev-chat-arrow-small" src="https://chatbottesting.cts.ae/assets/arrow-small.png" />
          <img class="prev-chat-arrow-yellow" src="https://chatbottesting.cts.ae/assets/arrow-small-yellow.png" />
        </div>
      </div>
      `;
          $("#prevContainer").append(div);
        });
      }
    );
  }
}
