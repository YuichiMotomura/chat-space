$(function() {
  var buildMessageHTML = function(message) {
    var content = message.content ? `<p>${message.content}</p>` : "";
    var image = message.image.url ? `<img src="${message.image.url}" alt="${message.image}">` : "";
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
        ${content}
        ${image}
      </div>
    </div>
    `
    return html;
  }

  var reloadMessages = function() {
    last_message_id = $('.Main__messages__wrapper__message__info:last').data('message-id');
    
    $.ajax({
      url: './api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id},
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML += buildMessageHTML(message);
        })
        $(".Main__messages__wrapper").append(insertHTML);

        $('.Main__messages').animate({
          scrollTop: $('.Main__messages')[0].scrollHeight
        }, "fast");
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
  };
  if(document.URL.match(/groups\/\w+\/messages/)) {
  setInterval(reloadMessages, 5000);
}
});