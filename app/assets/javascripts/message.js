$(function() {
  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<image class="lower-info__image" src=${message.image}>`
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__upper-info">
                    <p class ="message__upper-info__talker">${message.user_name}</p>
                    <p class="message__upper-info__date">${message.time}</p>
                  </div>
                  <div class="message__lower-info">
                    <p class="message-text">${message.content}</p>
                    ${imagehtml}
                  </div>
                </div>`
    return html;
  }

  function ScrollToNewMessage() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }

  function form_reset() {
    $('#new_message')[0].reset();
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      ScrollToNewMessage();
      form_reset(); 
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    });
  });

  var buildMessageHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-id="${message.id}">'
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.time}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img src="${message.image}" class="lower-message__image" >
                    </div>
                  </div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.time}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-id=${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.time}
                      </div>
                    </div>
                    <div class="lower-message">
                      <img src="${message.image}" class="lower-message__image" >
                    </div>
                  </div>`
    };
    return html;
  };

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
        insertHTML = buildHTML(message);
      })
      $('.messages').append(insertHTML);
      ScrollToNewMessage();
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  }
  setInterval(reloadMessages, 5000);
});