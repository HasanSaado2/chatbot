var i = 0;
var txt = 'I am a GPT3 powered AI bot. How can i help you today?';
var speed = 50;
var id = '';
var prmptOld = '';
var studentId = '12345';
var newChat = true;

$(document).ready(function () {
  typeWriter();
  $("#sendmessage").disabled = true;
  fetchChats();
});

$('.hide-chat-box').click(function () {
  if ($('#main').is(':visible')) {
    $("#main").toggle();
  }
  else if ($('#previousConversations').is(':visible')) {
    $("#previousConversations").toggle();
  }
  else if ($('#chatConversation').is(':visible')) {
    $("#chatConversation").toggle();
  }
  else {
    $("#main").toggle();
  }
  $(this).toggleClass('bot-icon-light-blue');
});

$('#closeIcon').click(function () {
  $("#main").toggle();
  $('.hide-chat-box').removeClass('bot-icon-light-blue');
});

$('#closeIcon2').click(function () {
  $('#previousConversations').toggle();
  $('.hide-chat-box').removeClass('bot-icon-light-blue');
});

$('#closeIcon3').click(function () {
  $('#chatConversation').toggle();
  $('.hide-chat-box').removeClass('bot-icon-light-blue');
});

$('#newQuestion').click(function () {
  id = '';
  prmptOld = '';
  $('#fullchat').html('');
  typeWriter();
  $('#chatConversation').toggle();
  $('#main').toggle();
});

$('#prevChats').click(function () {
  $('#previousConversations').toggle();
  $('#main').toggle();
});

$('#goBack').click(function () {
  $('#chatConversation').toggle();
  if (true === newChat) {
    $('#main').toggle();
  } else {
    $('#chatActions').toggleClass('d-none', 'd-block');
    $('#previousConversations').toggle();
  }
});

$('#goBack2').click(function () {
  $('#previousConversations').toggle();
  $('#main').toggle();
});

$('#deleteChat').click(function () {
  $.ajax({
    url: `https://chatbottesting.cts.ae/api/api/Chatbot/DeleteChat/${id}`,
    type: 'DELETE',
    success: function (result) {
      if (true === result) {
        $('#prevContainer').html('');
        fetchChats();
        $('#chatConversation').toggle();
        $('#chatActions').toggleClass('d-none', 'd-block');
        $('#previousConversations').toggle();
      }
    }
  });
});

$('#downloadChat').click(function () {
  $.get(`https://chatbottesting.cts.ae/api/api/Chatbot/GetChatFile/${id}`, function (data) {
    var newTab = window.open(data, '_blank');
    newTab.location;
  });
});

$('#prevChatsContainer').on('click', '.prev-chat-container', function () {
  id = this.id;
  newChat = false;
  $('#fullchat').html('');

  $('#chatActions').toggleClass('d-none', 'd-block');

  $.getJSON(`https://chatbottesting.cts.ae/api/api/Chatbot/ChatListData/${this.id}`, (data) => {
    data.reverse().map((message) => {
      var div = document.createElement('div');
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
          <p class="sender mb-0">Marwa</p>
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
  });
  $('.chats').scrollTop($('.chats')[0].scrollHeight);
  $('#chatConversation').toggle();
  $('#previousConversations').toggle();
});

function typeWriter(type = 'Marwa') {
  var div = document.createElement('div');
  i = 0;

  if ('Marwa' == type) {
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
  $('.chats').scrollTop($('.chats')[0].scrollHeight);
  typeText();
}

function typeText() {
  if (i < txt.length) {
    var lastmessage = $('.message-container').find('.message-text').last()
    lastmessage.html(lastmessage.html() + txt.charAt(i))
    i++;
    setTimeout(typeText, speed);
  }
}

$(".send-icon").click(function () {
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
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    WorkOutResponses(ip);
  }
});

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function WorkOutResponses(ip) {
  StartWriter(ip, 'You');
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

  $.getJSON(`https://chatbottesting.cts.ae/api/api/Chatbot/Chat/${studentId}/${chatId}/${oldprompt.replace(/\\\//g, "")}/${prompt}`, (data) => {
    $("#PromptResponse").val(data); // this will set hidden field value
    StartWriter(data, 'Marwa');
  });
  id = chatId;
}

function StartWriter(prompt, mperson) {
  txt = prompt;
  typeWriter(mperson);
  $("#newmessage").val("");
}

function fetchChats() {
  $.getJSON(`https://chatbottesting.cts.ae/api/api/ChatBot/ChatList/${studentId}`, (data) => {
    data.map((chat) => {
      var div = document.createElement('div');
      div = `
      <div class="row mx-0 mt-3 prev-chat-container" id='${chat?.chatid}'>
        <div class="col-10 chat-list-item">
          <p class="chat-title mb-0">${chat?.chattitle}</p>
          <p class="chat-date mb-0">Created Date : ${moment(chat?.dateadded).format('DD MMMM YYYY')}</p>
          <p class="chat-date">Last Modified : ${moment(chat?.lastModifiedDate).format('DD MMMM YYYY')}</p>
          </div>
        <div class="col-2 text-right my-auto">
          <img class="prev-chat-arrow-small" src="./assets/arrow-small.png" />
          <img class="prev-chat-arrow-yellow" src="./assets/arrow-small-yellow.png" />
        </div>
      </div>
      `;
      $("#prevContainer").append(div);
    });
  });
}

function searchRooms(e) {
  var SearchText = e.value;
  $("#prevContainer").html('');
  if (SearchText == "" || SearchText == " ") {
    $.getJSON(`https://chatbottesting.cts.ae/api/api/ChatBot/ChatList/${studentId}`, (data) => {
      data.map((chat) => {
        var div = document.createElement('div');
        div = `
        <div class="row mx-0 mt-3 prev-chat-container" id='${chat?.chatid}'>
          <div class="col-10 chat-list-item">
            <p class="chat-title mb-0">${chat?.chattitle}</p>
            <p class="chat-date mb-0">Created Date : ${moment(chat?.dateadded).format('DD MMMM YYYY')}</p>
            <p class="chat-date">Last Modified : ${moment(chat?.lastModifiedDate).format('DD MMMM YYYY')}</p>
            </div>
          <div class="col-2 text-right my-auto">
            <img class="prev-chat-arrow-small" src="./assets/arrow-small.png" />
            <img class="prev-chat-arrow-yellow" src="./assets/arrow-small-yellow.png" />
          </div>
        </div>
        `;
        $("#prevContainer").append(div);
      });
    });
  } else {
    $.getJSON(`https://chatbottesting.cts.ae/api/api/ChatBot/SearchChatList/${SearchText}/${studentId}`, (data) => {
      data.map((chat) => {
        var div = document.createElement('div');
        div = `
      <div class="row mx-0 mt-3 prev-chat-container" id='${chat?.chatid}'>
        <div class="col-10 chat-list-item">
          <p class="chat-title mb-0">${chat?.chattitle}</p>
          <p class="chat-date mb-0">Created Date : ${moment(chat?.dateadded).format('DD MMMM YYYY')}</p>
          <p class="chat-date">Last Modified : ${moment(chat?.lastModifiedDate).format('DD MMMM YYYY')}</p>
        </div>
        <div class="col-2 text-right my-auto">
          <img class="prev-chat-arrow-small" src="./assets/arrow-small.png" />
          <img class="prev-chat-arrow-yellow" src="./assets/arrow-small-yellow.png" />
        </div>
      </div>
      `;
        $("#prevContainer").append(div);
      });
    });
  }
}
