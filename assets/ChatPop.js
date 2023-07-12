var i = 0;
var txt = "I am a GPT powered AI bot. How can i help you today?";
var speed = 20;
var id = "";
var prmptOld = "";
var newChat = true;
var state = "";
var ncid = getCookie("encid");
var cookieCheckId = undefined;
var height = "30px";
var error = "";

var handledCookie = false;

var decrypted = "";
// var ncid = "4hZ0qO1J11PRakfMTjw8lw2";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function decryptCookie(e) {
  var count = 0;
  $.ajax({
    headers: {
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "script-src 'self'",
    },
    url: `https://ctsbe.hct.ac.ae/api/Chatbot/DS/${ncid}`,
    type: "GET",
    contentType: "application/json; charset=utf-8",
    retries: 2,
    success: (data) => {
      console.log("data: ", data);
      decrypted = data;
      fetchChats();
      $("#prevChats").show();
    },
    error: () => {
      count = count + 1;
      console.log("Error", count);
      if (count == 5) {
        $("#prevChats").hide();
      }
      // $("#error").text("Error, please refresh the page.");
    },
  });
}

$(document).ready(function () {
  var handleCookie = function () {
    if (!getCookie("encid")) {
    } else {
      clearInterval(cookieCheckId); // Unset the check
      handledCookie = true; // Set the cookie handled
      ncid = getCookie("encid");
    }
  };

  handleCookie();

  if (handledCookie) {
    decryptCookie();
  }

  if (!handledCookie) {
    cookieCheckId = setInterval(handleCookie, 5000); // Handle the cookies
  }

  $(function () {
    $("#newmessage").keyup(function (e) {
      var length = $(this).val().length;
      var height = $(this).height();
      if (length > 57 && height == 26) {
        $("#newmessage").css("height", "50px");
      }
      if (length > 107 && height == 46) {
        $("#newmessage").css("height", "orm70px");
      }
      if (length < 107 && height > 50) {
        $("#newmessage").css("height", "50px");
      }
      if (length < 57 && height > 26) {
        $("#newmessage").css("height", "30px");
      }
    });

    $("#prevChatSearch").keydown(function (e) {
      var keycode = e.keyCode ? e.keyCode : e.which;
      var searchText = $("#prevChatSearch").val();
      console.log(searchText);
      console.log(searchText.length);
      if (keycode == 13 && searchText.length == 0) {
        e.preventDefault();
        return false;
      }
      if (e.which === 32 && this.selectionStart === 0) {
        e.preventDefault();
      }
      searchText = searchText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      if (0 == searchText.length) {
        return;
      }
      // if (keycode == 13) {
      //   $(".send-icon").click();
      // }
      console.log("oi");

      searchRooms(searchText);

      if (keycode == 13) {
        e.preventDefault();
        return false;
      }
    });
  });
  var body = `
  <div id="container">
    <!-- Main Menu -->
    <div id="main" class="chat-content position-relative" style="display:none">
      <div class="main-container col-md-12 pt-3 pl-3 pr-3 pb-3">
        <div class="row justify-content-end">
          <div id="minimize" class="text-right minimize-icon col-1">
            <img src="https://chatbottesting.cts.ae/assets/minimize-icon.png" alt="minimize" />
          </div>
          <div id="closeIcon" class="text-right close-icon col-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="26.671" height="26.671" viewBox="0 0 26.671 26.671">
              <path id="create-account"
                d="M17.737,8.085l-6.5-.122-.122-6.5A1.309,1.309,0,0,0,9.837.185L9,.169A1.2,1.2,0,0,0,7.777,1.4L7.9,7.9,1.4,7.779A1.2,1.2,0,0,0,.169,9.006l.016.833a1.309,1.309,0,0,0,1.275,1.275l6.5.122.122,6.5A1.309,1.309,0,0,0,9.36,19.012l.833.016A1.2,1.2,0,0,0,11.421,17.8L11.3,11.3l6.5.122a1.2,1.2,0,0,0,1.228-1.228l-.016-.832A1.31,1.31,0,0,0,17.737,8.085Z"
                transform="translate(13.335 -0.239) rotate(45)" fill="#fff" />
            </svg>
          </div>
        </div>
        <div class="text-center main-help">
          <img src="https://chatbottesting.cts.ae/assets/HCTSage-sm.png" class="robot-image" alt="robot" />
          <p class="main-title">how can I help you?</p>
          <p id="error" class="disclaimer"></p>
        </div>
      </div>
      <div id="newQuestion" class="main-new-chat row mx-4">
        <div class="col-10">
          <p class="main-new-ask">Start a New Chat</p>
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
      <div id="termsBtn" class="main-terms row mx-4 position-absolute">
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
        <div class="row">
          <div id="minimize2" class="text-right minimize-icon2 col-1">
            <img src="https://chatbottesting.cts.ae/assets/minimize-icon.png" alt="minimize" />
          </div>
          <div id="closeIcon2" class="col-1 my-auto close-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26.671" height="26.671" viewBox="0 0 26.671 26.671">
              <path id="create-account"
                d="M17.737,8.085l-6.5-.122-.122-6.5A1.309,1.309,0,0,0,9.837.185L9,.169A1.2,1.2,0,0,0,7.777,1.4L7.9,7.9,1.4,7.779A1.2,1.2,0,0,0,.169,9.006l.016.833a1.309,1.309,0,0,0,1.275,1.275l6.5.122.122,6.5A1.309,1.309,0,0,0,9.36,19.012l.833.016A1.2,1.2,0,0,0,11.421,17.8L11.3,11.3l6.5.122a1.2,1.2,0,0,0,1.228-1.228l-.016-.832A1.31,1.31,0,0,0,17.737,8.085Z"
                transform="translate(13.335 -0.239) rotate(45)" fill="#fff" />
            </svg>
          </div>
        </div>
      </div>
      <div id="prevChatsContainer" class="col-md-12 py-2 px-4">
        <div class="position-relative search-input-container">
        <textarea  rows={1} id="prevChatSearch" class="search-input" 
            placeholder="Search For Asked Questions" ></textarea>
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
        <div class="row">
          <div id="minimize3" class="text-right minimize-icon2 col-1">
            <img src="https://chatbottesting.cts.ae/assets/minimize-icon.png" alt="minimize" />
          </div>
        <div id="closeIcon3" class="col-1 my-auto close-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="26.671" height="26.671" viewBox="0 0 26.671 26.671">
            <path id="create-account"
              d="M17.737,8.085l-6.5-.122-.122-6.5A1.309,1.309,0,0,0,9.837.185L9,.169A1.2,1.2,0,0,0,7.777,1.4L7.9,7.9,1.4,7.779A1.2,1.2,0,0,0,.169,9.006l.016.833a1.309,1.309,0,0,0,1.275,1.275l6.5.122.122,6.5A1.309,1.309,0,0,0,9.36,19.012l.833.016A1.2,1.2,0,0,0,11.421,17.8L11.3,11.3l6.5.122a1.2,1.2,0,0,0,1.228-1.228l-.016-.832A1.31,1.31,0,0,0,17.737,8.085Z"
              transform="translate(13.335 -0.239) rotate(45)" fill="#fff" />
          </svg>
        </div>
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
      <div id="chats" class="col-md-12 chats pt-3 pl-2 pr-3 pb-3">
      <input type="hidden" id="pendingResponse" value="0">
        <div id="fullchat">
       
        </div>
      </div>
      <div class="col-md-12 p-2 input-container">
        <div class="row">
          <div class="col-10 col-md-11 pl-3">
            <textarea rows={1} type="text" id="newmessage" class="message-input border-0 px-4" placeholder="Type your message!"
              style="font-size:18px;"></textarea>
            <small class="disclaimer pl-4">Disclaimer: Please validate answers from ChatGPT independently and avoid sharing sensitive data.</small>
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

    <!-- Terms & Conditions -->
    <div id="terms" class="chat-content position-relative" style="display:none">
    <div class="row chat-header m-auto justify-content-between">
        <div class="col-2 my-auto pl-1 back-container py-1">
          <div id="goBack3" class="go-back">
            <img src="https://chatbottesting.cts.ae/assets/arrow-left-white.png" class="arrow-left-white mr-1" />
            <img src="https://chatbottesting.cts.ae/assets/arrow-left-yellow.png" class="arrow-left-yellow mr-1" />
            <span class="mb-0">Go Back</span>
          </div>
        </div>
        <div class="col-5 my-auto">
          <span class="mb-0 chatbox-title">TERMS & CONDITIONS</span>
        </div>
        <div class="row">
          <div id="minimize4" class="text-right minimize-icon2 col-1">
            <img src="https://chatbottesting.cts.ae/assets/minimize-icon.png" alt="minimize" />
          </div>
          <div id="closeIcon4" class="col-1 my-auto close-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26.671" height="26.671" viewBox="0 0 26.671 26.671">
              <path id="create-account"
                d="M17.737,8.085l-6.5-.122-.122-6.5A1.309,1.309,0,0,0,9.837.185L9,.169A1.2,1.2,0,0,0,7.777,1.4L7.9,7.9,1.4,7.779A1.2,1.2,0,0,0,.169,9.006l.016.833a1.309,1.309,0,0,0,1.275,1.275l6.5.122.122,6.5A1.309,1.309,0,0,0,9.36,19.012l.833.016A1.2,1.2,0,0,0,11.421,17.8L11.3,11.3l6.5.122a1.2,1.2,0,0,0,1.228-1.228l-.016-.832A1.31,1.31,0,0,0,17.737,8.085Z"
                transform="translate(13.335 -0.239) rotate(45)" fill="#fff" />
            </svg>
          </div>
        </div>
      </div>
      <div class="p-4">
        <h5 class="terms-title">Terms and Conditions</h5>
        <ul class="terms">
          <li>Authorized Use: ChatGPT is for current HCT students' educational purposes only.</li>
          <li>Responsible Use: Do not misuse ChatGPT for unlawful or unethical purposes.</li>
          <li>Privacy: Your interactions may be collected and handled in accordance with data protection laws.</li>
          <li>Academic Integrity: Maintain academic honesty and avoid plagiarism or cheating.</li>
          <li>Limitations: ChatGPT is not a substitute for human expertise. Verify information independently.</li>
          <li>Availability: Service may be temporarily unavailable due to technical issues or maintenance.</li>
          <li>Modifications: HCT may update these terms, so review them periodically.</li>
          <li>Intellectual Property: HCT retains all rights to ChatGPT; no reproduction or modification without permission.</li>
          <li>Termination: HCT can terminate access to ChatGPT for violations of these terms.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="hide-chat-box bot-icon justify-cotent-center float-right">
    <img id="botSvg" src="https://chatbottesting.cts.ae/assets/HCTSage-sm.png" alt="bot" />
    <img class="close-button" src="https://chatbottesting.cts.ae/assets/close-icon.png" alt="close" />
  </div>
`;

  $(".chat-main").append(body);
  typeWriter();
  $("#sendmessage").disabled = true;
  getCookie();
  fetchChats();

  $("#chatMain").on("click", ".hide-chat-box", function () {
    if (
      "previous" === state &&
      $("#previousConversations").css("visibility") === "collapse"
    ) {
      $("#previousConversations").css("visibility", "visible");
    } else if (
      "previous" === state &&
      $("#previousConversations").is(":visible")
    ) {
      $("#previousConversations").css("visibility", "collapse");
    } else if (
      "previous" === state &&
      $("#chatConversation").css("visibility") === "collapse"
    ) {
      $("#chatConversation").css("visibility", "visible");
    } else if ("previous" === state && $("#chatConversation").is(":visible")) {
      $("#chatConversation").css("visibility", "collapse");
    } else if (
      "chatConversation" === state &&
      $("#chatConversation").css("visibility") === "collapse"
    ) {
      $("#chatConversation").css("visibility", "visible");
    } else if (
      "chatConversation" === state &&
      $("#chatConversation").is(":visible")
    ) {
      $("#chatConversation").css("visibility", "collapse");
    } else if (
      "terms" === state &&
      $("#terms").css("visibility") === "collapse"
    ) {
      $("#terms").css("visibility", "visible");
    } else if ("terms" === state && $("#terms").is(":visible")) {
      $("#terms").css("visibility", "collapse");
    } else {
      $("#main").toggle();
    }

    $(this).toggleClass("bot-icon-light-blue");

    $("#botSvg").toggle();
    $(".close-button").toggle();
  });

  $("#chatMain").on("click", "#closeIcon", function () {
    state = "";
    $("#main").toggle();
    $(".hide-chat-box").removeClass("bot-icon-light-blue");
    $("#botSvg").toggle();
    $(".close-button").toggle();
  });

  $("#chatMain").on("click", "#minimize", function () {
    state = "";
    $("#main").toggle();
    $(".hide-chat-box").removeClass("bot-icon-light-blue");
    $("#botSvg").toggle();
    $(".close-button").toggle();
  });

  $("#chatMain").on("click", "#closeIcon2", function () {
    state = "";
    $("#previousConversations").toggle();
    $(".hide-chat-box").removeClass("bot-icon-light-blue");
    $("#botSvg").toggle();
    $(".close-button").toggle();
  });

  $("#chatMain").on("click", "#minimize2", function () {
    state = "previous";
    $("#previousConversations").css("visibility", "collapse");
    $(".hide-chat-box").removeClass("bot-icon-light-blue");
    $("#botSvg").toggle();
    $(".close-button").toggle();
  });

  $("#chatMain").on("click", "#closeIcon3", function () {
    state = "";
    $("#chatConversation").toggle();
    $(".hide-chat-box").removeClass("bot-icon-light-blue");
    $("#botSvg").toggle();
    $(".close-button").toggle();
  });

  $("#chatMain").on("click", "#closeIcon4", function () {
    state = "";
    $("#terms").toggle();
    $(".hide-chat-box").removeClass("bot-icon-light-blue");
    $("#botSvg").toggle();
    $(".close-button").toggle();
  });

  $("#chatMain").on("click", "#minimize3", function () {
    state = "chatConversation";
    $("#chatConversation").css("visibility", "collapse");
    $(".hide-chat-box").removeClass("bot-icon-light-blue");
    $("#botSvg").toggle();
    $(".close-button").toggle();
  });

  $("#chatMain").on("click", "#minimize4", function () {
    state = "terms";
    $("#terms").css("visibility", "collapse");
    $(".hide-chat-box").removeClass("bot-icon-light-blue");
    $("#botSvg").toggle();
    $(".close-button").toggle();
  });

  $("#chatMain").on("click", "#newQuestion", function () {
    id = "";
    txt = "I am a GPT powered AI bot. How can i help you today?";
    prmptOld = "";
    state = "chatConversation";
    newChat = true;
    $("#fullchat").html("");
    $("#PromptResponse").val(0);
    $("#chats").removeClass("chats2");
    typeWriter();
    $("#chatConversation").toggle();
    $("#main").toggle();
  });

  $("#chatMain").on("click", "#prevChats", function () {
    state = "previous";
    $("#previousConversations").toggle();
    $("#main").toggle();
  });

  $("#chatMain").on("click", "#termsBtn", function () {
    state = "terms";
    $("#terms").toggle();
    $("#main").toggle();
  });

  $("#chatMain").on("click", "#goBack", function () {
    console.log($("#pendingResponse").val());
    if ($("#pendingResponse").val() == "0") {
      return;
    }

    $("#chatConversation").toggle();
    $("#newmessage").val("");
    if (true === newChat) {
      $("#main").toggle();
      $("#chats").removeClass("chats2");
    } else {
      $("#chatActions").toggleClass("d-none", "d-block");
      $("#chats").addClass("chats2");
      $("#previousConversations").toggle();
    }
  });

  $("#chatMain").on("click", "#goBack2", function () {
    if ($("#pendingResponse").val() == "0") {
      return;
    }
    $("#previousConversations").toggle();
    $("#prevChatSearch").val("").trigger("keyup");
    $("#newmessage").val("");
    $("#main").toggle();
  });

  $("#chatMain").on("click", "#goBack3", function () {
    if ($("#pendingResponse").val() == "0") {
      return;
    }
    $("#newmessage").val("");
    $("#terms").toggle();
    $("#main").toggle();
  });

  $("#chatMain").on("click", "#deleteChat", function () {
    $.ajax({
      headers: {
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "script-src 'self'",
      },
      url: `https://ctsbe.hct.ac.ae/api/Chatbot/DeleteChat/${id}`,
      type: "DELETE",
      success: function (result) {
        if (true === result) {
          $("#prevContainer").html("");
          fetchChats();
          $("#chatConversation").toggle();
          $("#chatActions").toggleClass("d-none", "d-block");
          $("#chats").addClass("chats2");
          $("#previousConversations").toggle();
        }
      },
    });
  });

  $("#chatMain").on("click", "#downloadChat", function () {
    $.get(
      `https://ctsbe.hct.ac.ae/api/Chatbot/GetChatFile/${id}`,
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
    $("#chats").addClass("chats2");

    $.ajax({
      headers: {
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "script-src 'self'",
      },
      url: `https://ctsbe.hct.ac.ae/api/Chatbot/ChatListData/${id}`,
      type: "GET",
      success: function (data) {
        data.reverse().map((message) => {
          var div = document.createElement("div");
          if ("Bot" === message?.prompter) {
            div = `
          <div class="row message-container">
          <div class="col-md-2 text-center">
          <img src="https://chatbottesting.cts.ae/assets/HCTSage-sm.png" class="robot-image-sm" alt="robot" />
            <p class="sender mb-0">HCT GPT</p>
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
      },
    });
    $("#chatMain").scrollTop($(".chats")[0].scrollHeight);
    $("#chatConversation").toggle();
    $("#previousConversations").toggle();
  });

  $("#chatMain").on("click", ".send-icon", function () {
    var ip = $("#newmessage").val();
    ip = ip.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (0 == ip.length) {
      return;
    }
    WorkOutResponses(ip);
  });

  $("#newmessage").keydown(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    var ip = $("#newmessage").val();

    if (keycode == 13 && ip.length == 0) {
      event.preventDefault();
      return false;
    }

    if (event.which === 32 && this.selectionStart === 0) {
      event.preventDefault();
    }
    ip = ip.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (0 == ip.length) {
      return;
    }
    if (keycode == 13 && $("#pendingResponse").val() != "0") {
      $(".send-icon").click();
    }
    if (keycode == 13) {
      event.preventDefault();
      return false;
    }
  });
});

function typeWriter(type = "HCT GPT") {
  var div = document.createElement("div");
  i = 0;
  $("#pendingResponse").val(0);
  if ("HCT GPT" == type) {
    div.innerHTML = `
    <div class="row message-container">
      <div class="col-md-2 text-center">
      <img src="https://chatbottesting.cts.ae/assets/HCTSage-sm.png" class="robot-image-sm" alt="robot" />

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
    $(".chats").scrollTop($(".chats")[0].scrollHeight);
    var lastmessage = $(".message-container").find(".message-text").last();
    lastmessage.html(lastmessage.html() + txt.charAt(i));
    i++;
    setTimeout(typeText, speed);
  } else {
    $("#pendingResponse").val(1);
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

async function WorkOutResponses(ip) {
  if (/\S/.test(ip)) {
    await StartWriter(ip, "You");

    var prompt = ip;

    console.log(prmptOld);
    if (prmptOld.length > 0) {
      var oldprompt = prmptOld;
    } else {
      var oldprompt = $("#PromptResponse").val();
    }
    if (id.length > 0) {
      var chatId = id;
    } else {
      var chatId = decrypted + uuidv4();
    }

    $.ajax({
      headers: {
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "script-src 'self'",
      },
      url: `https://ctsbe.hct.ac.ae/api/Chatbot/RateLimitChecker`,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      error: (error) => {
        return;
      },
    });

    if (decrypted != "") {
      $.ajax({
        headers: {
          "X-Content-Type-Options": "nosniff",
          "Content-Security-Policy": "script-src 'self'",
        },
        url: `https://ctsbe.hct.ac.ae/api/Chatbot/Chat`,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          studentId: decrypted,
          chatId: chatId,
          oldPrompt: oldprompt.replace(/^\\n/gm, ""),
          prompt: prompt.replace(/^\n/gm, ""),
        }),
        success: (data) => {
          $("#PromptResponse").val(data); // this will set hidden field value
          fetchChats();
          awaitMessageDone(data);
        },
        error: (error) => {
          // alert(error?.statusText);
          fetchChats();
        },
      });
    }
    id = chatId;
  }
}

function awaitMessageDone(data) {
  if ($("#pendingResponse").val() == "0") {
    setTimeout(() => {
      awaitMessageDone();
    }, 500);
  } else {
    StartWriter(data, "HCT GPT");
  }
}

async function StartWriter(prompt, mperson) {
  txt = prompt;
  typeWriter(mperson);
  $("#newmessage").val("");
}

function fetchChats() {
  if (handledCookie) {
    $("#prevContainer").html("");
    $.ajax({
      headers: {
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "script-src 'self'",
      },
      url: `https://ctsbe.hct.ac.ae/api/ChatBot/ChatList/${decrypted}`,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      retries: 2,
      success: (data) => {
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
      },
      error: function () {
        // $("#error").text("Error, please refresh the page.");
      },
    });
  }
}

function searchRooms(SearchText) {
  // var SearchText = e.value;
  // console.log(e.key);
  // console.log(e.keyCode);
  // if ((e.key === "Enter" || e.keyCode === 13) && SearchText.trim() == "") {
  //   alert("dsf");
  //   return;
  // }

  console.log("searching /...");
  if (SearchText.trim() == "") {
    $.ajax({
      headers: {
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "script-src 'self'",
      },
      url: `https://ctsbe.hct.ac.ae/api/ChatBot/ChatList/${decrypted}`,
      type: "GET",
      success: function (data) {
        $("#prevContainer").html("");
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
      },
    });
  } else {
    $.ajax({
      headers: {
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "script-src 'self'",
      },
      url: `https://ctsbe.hct.ac.ae/api/ChatBot/SearchChatList/${SearchText}/${decrypted}`,
      type: "GET",
      success: function (data) {
        $("#prevContainer").html("");
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
      },
    });
  }
}
