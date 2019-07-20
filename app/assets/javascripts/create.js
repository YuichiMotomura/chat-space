$(function() {
  function buildPost(post) {
    var content = post.content ?  `<p>${post.content}</p>` :  "";
    var image = post.image.url ? `<img src="${post.image_url}" alt="${post.image}">` : "";
    var html =
              `<div class="Main__messages__wrapper__message">
                <div class="Main__messages__wrapper__message__info" data-message-id="${post.id}">
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
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

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
      var form = $('#new_message')[0];
      $('.Main__messages__wrapper').append(html1);
      $('.notification').append(html2);
      form.reset();
      $('.Main__messages').animate({
        scrollTop: $('.Main__messages')[0].scrollHeight
      }, "fast");
    })
    .fail(function(){
      alert("メッセージを入力してください");
    })
    .always(function(){
      $('.Main__form__sendBtn').removeAttr("disabled");
    })
  });

});