var player1 = { name: 'p1', score: 501};
var player2 = { name:'p2', score: 501};

var generate_score_li = function(score) {
  htmlstring = "<li>" + score + "</li>"
  return htmlstring
}

var calculate_score = function(current_score, current_shot) {
  return (current_score - current_shot);
}

var take_shot = function(player, score) {
  if (player == "player1") {
    player1.score = (calculate_score(player1.score, score))
    $('#p1list').append(generate_score_li(player1.score));
  } else {
    player2.score = (calculate_score(player2.score, score))
    $('#p2list').append(generate_score_li(player2.score));
  }
}

var validate_move = function(player, move, current_score) {
  console.log("Move:");
  console.log("player " + player);
  console.log("move " + move);
  console.log("current_score " + current_score);
  var valid_move = true
  var bad_moves = [179, 178, 176, 175, 173, 172, 169, 168, 166, 163];
  // check score is within range
  if (move > 180) { valid_move = false; };
  if ((current_score - move) <0) { valid_move = false; };
  if ((current_score - move) == 1) { valid_move = false};
  if ($.inArray(parseInt(move), bad_moves) >= 0) {valid_move = false};
  return valid_move
}

$('#p1details').on('submit', function(e) {
  e.preventDefault();
  var move = $('#p1score').val();
  make_move(1, move);
  if (player1.score == 0) {alert(player1.name + " wins")}
});

$('#p2details').on('submit', function(e) {
  e.preventDefault();
  var move = $('#p2score').val();
  make_move(2, move);
  if (player2.score == 0) {alert(player2.name + " wins")}
});

var switch_player = function() {
  $('#p1input').slideToggle(1000);
  $('#p2input').slideToggle(1000);
}

var make_move = function(player, move) {
    var current_player = "player" + player;
    if (validate_move(current_player, move, current_player.score)) {;
    take_shot("player" + player, move);
    $('#p' + player +'score').val('');
    switch_player();
  } else {
    alert('bad move');
  }

  if (player1.score == 0) {alert(player1.name + " wins")};
}