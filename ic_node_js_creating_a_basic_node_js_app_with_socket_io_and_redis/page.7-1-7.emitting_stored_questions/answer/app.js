let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

let redis = require('redis');
let redisClient = redis.createClient();

io.sockets.on('connection', function(client) {

  redisClient.lrange('questions', 0, -1, function(err, questions){
    questions.forEach(function(question){
       client.emit('question', question);
    });
  });

  client.on('answer', function(question, answer) {
    client.broadcast.emit('answer', question, answer);
  });

  client.on('question', function(question) {
    if(!client.question_asked) {
      client.question_asked = true;
      client.broadcast.emit('question', question);
      redisClient.lpush("questions", question);
    }
  });
});
