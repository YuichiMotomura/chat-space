$(function() {
  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      var html = `
      <div class="Main__messages__wrapper__message">
        <div class="Main__messages__wrapper__message__info" data-message-id="${message.id}">
          <div class="Main__messages__wrapper__message__info__userName">
            ${message.user_name}
          </div>
          <div class="Main__messages__wrapper__message__info__createdAt">
            ${message.created_at}
          </div>
        </div>
        <div class="Main__messages__wrapper__message__text">
          <p>${message.content}</p>
          <img src="${message.image.url}" alt="${message.image}">
        </div>
      </div>
      `
    } else if (message.content) {
      var html = `
      <div class="Main__messages__wrapper__message">
        <div class="Main__messages__wrapper__message__info" data-message-id="${message.id}">
          <div class="Main__messages__wrapper__message__info__userName">
            ${message.user_name}
          </div>
          <div class="Main__messages__wrapper__message__info__createdAt">
            ${message.created_at}
          </div>
        </div>
        <div class="Main__messages__wrapper__message__text">
          <p>${message.content}</p>
        </div>
      </div>
      `
    } else if (message.image) {
      var html = `
      <div class="Main__messages__wrapper__message">
        <div class="Main__messages__wrapper__message__info" data-message-id="${message.id}">
          <div class="Main__messages__wrapper__message__info__userName">
            ${message.user_name}
          </div>
          <div class="Main__messages__wrapper__message__info__createdAt">
            ${message.created_at}
          </div>
        </div>
        <div class="Main__messages__wrapper__message__text">
          <img src="${message.image.url}" alt="${message.image}">
        </div>
      </div>
      `
    };
    return html;
  }


  var reloadMessages = function() {
    // ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.Main__messages__wrapper__message__info:last').data('message-id');
    console.log(last_message_id);
    
    $.ajax({
      url: './api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id},
    })
    .done(function(messages) {
      // debugger;
      // 追加するHTMLの入れ物を作る
      if (messages.length !== 0) {
        var insertHTML = '';
        // 配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message) {
          insertHTML += buildMessageHTML(message);
        })
        // メッセージを追加
        $(".Main__messages__wrapper").append(insertHTML);

        // 新しく追加されたメッセ分だけスクロールする
        $('.Main__messages').animate({
          scrollTop: $('.Main__messages')[0].scrollHeight
        }, "fast");
      }
    })
    .fail(function() {
      console.log('error');
    })
  };
  if(document.URL.match(/groups\/\w+\/messages/)) {
  setInterval(reloadMessages, 5000);
}
});