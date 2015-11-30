// window.onload = function() {

  var player1 = { name: 'player1', score: 501};
  var player2 = { name: 'player2', score: 501};
  var errorslist = [];

  var set_names = function() {
    $('#p1input label').text(player1.name + "'s score");
    $('#p2input label').text(player2.name + "'s score");
    $('#p1display h2').text(player1.name);
    $('#p2display h2').text(player2.name);
  }

  var generate_score_li = function(score) {
    htmlstring = "<li>" + score + "</li>"
    return htmlstring
  }

  var calculate_score = function(current_score, current_shot) {
    return (current_score - current_shot);
  }

  var take_shot = function(player, score) {
    var current_player = "player" + player;
    this[current_player].score = (calculate_score(this[current_player].score, score));
    $('#p' + player + 'list').append(generate_score_li(this[current_player].score));
  }

  var validate_move = function(player, move, current_score) {
    clear_errors();
    var valid_move = true
    var bad_moves = [179, 178, 176, 175, 173, 172, 169, 168, 166, 163];
    if (move > 180) { valid_move = false; 
      errorslist.push("You can't score higher than 180")
    };
    // if ((current_score - move) <0) { 
    //   valid_move = false;
    //   bust = true 
    //   errorslist.push("You are BUST!");
    // };
    // if ((current_score - move) == 1) { 
    //   valid_move = false;
    //   errorslist.push("You must finish on a double or treble")
    // };
    if ($.inArray(parseInt(move), bad_moves) >= 0) {
      valid_move = false;
      errorslist.push("That combination is not possible");
    };
    return valid_move;
  }

  var check_for_bust = function(current_score, move) {
      console.log("CS: " + current_score + "Move: " + move);
      if ((parseInt(current_score) - parseInt(move)) <0) { 
      bust = true 
      errorslist.push("You are BUST!");
      return true;
    };
      if ((current_score - move) == 1) { 
      valid_move = false;
      errorslist.push("You must finish on a double or treble")
      return true;
    };
  }

  $('#p1details').on('submit', function(e) {
    e.preventDefault();
    var move = $('#p1score').val();
    make_move(1, move);
  });

  $('#p2details').on('submit', function(e) {
    e.preventDefault();
    var move = $('#p2score').val();
    make_move(2, move);
  });

  $('#closewindow').click(function(){
    $('#welcome').slideUp();
  });

  $('#addnames').click(function(){
    $('#welcome').slideUp();
    $('#getnames').slideDown();
  });

  $('#names').on('submit', function(e) {
    e.preventDefault();
    player1.name = $('#p1name').val()
    player2.name = $('#p2name').val()
    set_names();
    $('#getnames').slideUp();
  });

  var switch_player = function() {
    $('#p1input').slideToggle(1000);
    $('#p2input').slideToggle(1000);
  }

  var make_move = function(player, rawmove) {
    var current_player = "player" + player;
    var move = move_value(rawmove);
    var bust = false;
    clear_errors();
    if (validate_move(current_player, move, this[current_player].score)) {
      if (check_for_bust(this[current_player].score, move)) {
        print_errors_list();
        take_shot(player, 0);
      } else {
        take_shot(player, move);
      }
      $('#p' + player +'score').val('');
      
      switch_player();
    } else {
      print_errors_list();
    }
    if (this[current_player].score == 0) {
    game_won(player, current_player);
  }
}

var game_won = function(player, current_player) {
  $('#p' + player + 'list').append(generate_score_li("Winner!"));
    alert(this[current_player].name + " wins");
    $('#p1input').slideUp(1000);
    $('#p2input').slideUp(1000);
    $('.score').focus();
  }

  var move_value = function(move) {
    var running_value = 0;
    if ($.isNumeric(move)) {
      running_value = move;
    } else {
      var moves_array = move.split(" ");
      $.each(moves_array, function(index, value) {
        var letter = moves_array[index].charAt(0).toLowerCase();
        var number = moves_array[index].replace(/\D/g,'');;
        switch (letter) {
          case "d":
          console.log(value+": " + (parseInt(number) * 2));
          running_value += (parseInt(number) * 2);
          break;
          case "t":
          console.log(value+": " + (parseInt(number) * 3));
          running_value += (parseInt(number) * 3);
          break;
          default:
          console.log("It's " + parseInt(number));
          running_value += parseInt(number);
        }
      });
    }
    return running_value;
  }

  var print_errors_list = function() {
    $.each(errorslist, function(i,v){
      $('#errorlist').append("<li>"+v+"</li>");
    });
    $('#errors').slideDown();
  };

  var clear_errors = function() {
    errorslist = [];
    $('#errors').slideUp();
    $('#errorlist li').remove();
  }

// };