# Socket.IO Chat Uygulaması

Bu proje, Node.js, Express ve Socket.IO kullanarak basit bir gerçek zamanlı sohbet uygulaması oluşturmak için geliştirilmiştir.

## Kurulum

### Gereksinimler

- Node.js ve npm (Node Package Manager)

### Adımlar

1. **Projeyi klonlayın:**

   ```sh
   git clone https://github.com/kullanici_adi/socket-io-chat.git
   cd socket-io-chat
   ```

2. **Gerekli bağımlılıkları yükleyin:**

   ```sh
   npm install
   ```

3. **Sunucuyu başlatın:**

   ```sh
   node server.js
   ```

4. **Tarayıcınızı açın ve şu adrese gidin:**

   ```
   http://localhost:3000
   ```

## Proje Yapısı

- **server.js**: Ana sunucu dosyası. Express.js ve Socket.IO'yu yapılandırır ve başlatır.
- **public/**: Statik dosyaları içeren klasör.
  - **index.html**: HTML yapısını içeren dosya.
  - **script.js**: İstemci tarafı JavaScript dosyası. Socket.IO istemcisi ile etkileşime girer.

## server.js

Sunucu tarafında, Express.js ve Socket.IO kullanarak HTTP sunucusu oluşturulmuştur. Temel olaylar ve işlevler tanımlanmıştır.

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Statik dosyaları sunmak için Express'i yapılandırın
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

// Sunucuyu 3000 portunda dinlemeye başlat
server.listen(3000, () => {
    console.log('listening on *:3000');
});
```

## public/index.html

Basit bir HTML yapısı, kullanıcıların mesajlarını girmesi ve görüntülemesi için gerekli öğeleri içerir.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Socket.IO chat</title>
    <script src="https://cdn.socket.io/4.1.3/socket.io.min.js"></script>
</head>
<body>
    <ul id="messages"></ul>
    <form id="form" action="">
        <input id="input" autocomplete="off" /><button>Send</button>
    </form>
    <script src="/script.js"></script>
</body>
</html>
```

## public/script.js

İstemci tarafında, Socket.IO istemcisini kullanarak mesajları gönderen ve alan JavaScript kodunu içerir.

```javascript
document.addEventListener('DOMContentLoaded', function() {
    var socket = io();

    socket.on('chat message', function(msg){
        var item = document.createElement('li');
        item.innerText = msg; // Güvenli bir şekilde metni ekleyin
        document.getElementById('messages').appendChild(item);
    });

    var formElement = document.getElementById('form');
    if (formElement) {
        formElement.addEventListener('submit', function(e){
            e.preventDefault();
            var input = document.getElementById('input');
            var message = input.value.trim();
            if (message !== '') {
                socket.emit('chat message', message);
                input.value = '';
                var item = document.createElement('li');
                item.textContent = 'You: ' + message;
                document.getElementById('messages').appendChild(item);
            }
        });
    } else {
        console.error("Form element with id 'form' not found!");
    }
});
```
