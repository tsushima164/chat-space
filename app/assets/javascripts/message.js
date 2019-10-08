$(function() {
  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<image class="lower-info__image" src=${message.image}>`
    var html = `<div class="message">
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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.input-box__text').val('');
      $('.hidden').val('');
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    });
  });
});