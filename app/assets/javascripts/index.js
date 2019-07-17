$(function() {
  var search_list = $("#user-search-result");
  var user_list = $("#chat-group-users");

  function appendUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `
    search_list.append(html);
  }

  function appendErrMsgHTML(msg) {
    var html =
      `
      <div class="chat-group-user clearfix">
        <p>${msg}</p>
      </div>
      `
      search_list.append(html);
  }

  function appendUserList(userId, userName) {
    var html = 
      `
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
        <input name='group[user_ids][]' type='hidden' value='${userId}'>
        <p class='chat-group-user__name'>${userName}</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
      </div>
      `
      user_list.append(html);

  }

  $('#user-search-field').on("keyup", function(e) {
    e.preventDefault();
    var input = $('#user-search-field').val();
    

    $.ajax({
      type: "GET",
      url: "/users",
      data: {
        user: input,
      },
      dataType: 'json',
    })
    .done(function(users) {
      search_list.empty();
      if (users.length > 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else {
        appendErrMsgHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on("click", ".chat-group-user__btn--add", function() {
    var userId = $(this).attr("data-user-id");
    var userName = $(this).attr("data-user-name");
    $(this).parent().remove();
    appendUserList(userId, userName);
  });

  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();    
  });

});