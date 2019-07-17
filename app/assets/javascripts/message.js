$(function() {

  function buildMessage(message){
    var image = message.image? `<img src=${message.image} alt="Test image">` : "";
    var text = message.text? `${message.text}` : "";
    var html = `<div class="message" id="message-${message.id}">
                  <div class="message-top">
                    <div class="sender-name">
                      ${message.name}
                    </div>
                    <p class="send-date">${message.created_at}</p>
                  </div>
                  <div class="message-contents">
                    <div class="message-text">
                      ${text}
                    </div>
                    <div class="message-image">
                      ${image}
                    </div>
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    var inputText = formData.get("message[text]")
    var inputImage = formData.get('message[image]').name

    if(!(inputText == "" && inputImage == "")) {

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(message){
        var html = buildMessage(message);
        var messageArea = $(".messages")
        messageArea.append(html);
        function scrollBottom(){
          let position = messageArea.outerHeight();
          $('.right-message-room').animate({
            scrollTop: position
          }, 200);
        }

        scrollBottom();
      })

      .fail(function(){
        alert("送信されませんでした")
      })

      .always(function(){
        $(".send-button").prop('disabled', false);
        $(".new_message")[0].reset();
      })

    } else {
      alert("メッセージを入力してください");
      return false;
    }

  })
});