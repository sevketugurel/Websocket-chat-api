document.addEventListener('DOMContentLoaded', function() {
  var socket = io(); 
  socket.on('chat message', function(msg){
      var item = document.createElement('li');
      item.innerText = msg;  
      document.getElementById('messages').appendChild(item);
  });

  // Form öğesini kontrol et
  var formElement = document.getElementById('form');
  if (formElement) {
      formElement.addEventListener('submit', function(e){
          e.preventDefault(); 
          var input = document.getElementById('input');
          var message = input.value.trim(); 
          if (message !== '') { // 
              socket.emit('chat message', message); 
              input.value = ''; // Giriş kutusunu temizle
              // Gönderilen mesajı doğrudan sohbet kutusuna ekle
              var item = document.createElement('li');
              item.textContent = 'You: ' + message;
              document.getElementById('messages').appendChild(item);
          }
      });
  } else {
      console.error("Form element bulunamadı!");
  }
});
