$(function() {
  function buildPost(post) {
    var content = post.content ?  `<p>${post.content}</p>` :  "";
    var image = post.image.url ? `<img src="${post.image_url}" alt="${post.image}">` : "";
    var html =
              `<div class="Main__messages__wrapper__message">
                <div class="Main__messages__wrapper__message__info">
                  <div class="Main__messages__wrapper__message__info__userName">
                    ${post.name}
                  </div>
                  <div class="Main__messages__wrapper__message__info__createdAt">
                    ${post.date}
                  </div>
                </div>
                <div class="Main__messages__wrapper__message__text">
                  ${content}
                  ${image}
                </div>
              </div>`
    return html;
  }

  function appendFalshMsg(msg) {
    var html =
              `<div class="notice">${msg}</div>`
    return html;
  }


  $("#new_message").on("submit", function(e) {
    // preventで、元のmessages#createは呼ばないようにする
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    // Ajaxで、messages#createを呼ぶ
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(post) {
      var html1 = buildPost(post);
      var html2 = appendFalshMsg("メッセージが送信されました");
      $('.Main__messages__wrapper').append(html1);
      $('.notification').append(html2);
      $('#message_content').val('');
      $('.Main__messages').animate({
        scrollTop: $('.Main__messages')[0].scrollHeight
      }, "fast");
    })
    .fail(function(){
      alert("メッセージを入力してください");
    })
    // 送信後に,SENDボタンがdisabledになるのを防ぐ
    .always(function(){
      $('.Main__form__sendBtn').removeAttr("disabled");
    })
  });

});