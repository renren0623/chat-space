$(function() {

  function buildMessage(message){
    let image = message.image? `<img src=${message.image} alt="Test image">` : "";
    let text = message.text? `${message.text}` : "";
    let html = `<div class="message" id="message-${message.id}">
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
    let formData = new FormData(this);
    let url = $(this).attr('action');
    // $(this)[0].reset();
    // for (var [value] of formData.entries()) {
    //   console.log(value);
    // }

    // function test(){
      
    // }

    // test();


    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      let html = buildMessage(message);
      $(".messages").append(html);
      function scrollBottom(){
        var position = $(".messages").outerHeight();
        $('.right-message-room').animate({
          scrollTop: position
        }, 200);
      }
      scrollBottom();
    })

    .fail(function(){
      alert("送信されませんでした")
    })

    .always(() => {
      $("#new_message input").removeAttr("disabled");
    })

      // function test(message) {

        //   if(message.text == null) {
    //     alert("メッセージを入力してください")

    //   } else {

    //     $.ajax({
    //       url: url,
    //       type: "POST",
    //       data: formData,
    //       dataType: 'json',
    //       processData: false,
    //       contentType: false
    //     })

    //     .done(function(message){
    //       let html = buildMessage(message);
    //       $(".messages").append(html);
    //       function scrollBottom(){
    //         var position = $(".messages").outerHeight();
    //         $('.right-message-room').animate({
    //           scrollTop: position
    //         }, 200);
    //       }
    //       scrollBottom();
    //     })

    //     .fail(function(){
    //       alert("送信されませんでした")
    //     })

    //     .always(() => {
    //       $("#new_message input").removeAttr("disabled");
    //     })
    //   }
    // }
    // test();
  })
});