$(function() {
  
  function buildUsersHTML(users){
    var html = `<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${users.name}</p>
               <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${users.id}" data-user-name="${users.name}">追加</a>
               </div>`
               $("#user-search-result").append(html);
  }

  function appendNotUser(users){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${users}</p>
                </div>`
    return html;
  }

  function addUsers(id,name){
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
                  <input name="group[user_ids][]" type="hidden" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
  $("#chat-group-users").append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
     $("#user-search-result").empty();
     if (users.length !== 0) {
      users.forEach(function(user){
        buildUsersHTML(user)
        
      })
     }
     else {
      var html = appendNotUser("一致するユーザーがいません")
       $("#user-search-result").append(html);
     }
     })
     .fail(function() {
      alert("ユーザー検索に失敗しました");
   })
  });

  $(document).on("click",".user-search-add", function(e){
      e.preventDefault();
      $(this).parent().remove();
      var id = $(this).data("user-id");
      var name = $(this).data("user-name");
      addUsers(id,name);
   
  });

  $(document).on("click",".user-search-remove", function(users){
      $(this).parent().remove();
  });
});