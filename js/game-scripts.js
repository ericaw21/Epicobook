//Back-end
function Game(numberOfAccounts) {
  this.studentCards = [];
  this.numberOfAccounts = numberOfAccounts;
  this.turn = 1;
  this.flip = 0;
}

function Player(points) {
  this.points = 0;
  this.click = 0;
}

var twoClicks = [];
var turnAddOne = 0;

Player.prototype.turnCompare = function() {
  if (twoClicks[0] === twoClicks[1]) {
    this.points ++;
    turnAddOne = 0;
    for (var i = 0; i < 2; i ++) {
      $("." + twoClicks[i]).off();
    }
  } else {
    turnAddOne = 1;
    for (var i = 0; i < 2; i ++) {
      $("." + twoClicks[i]).children("img, p").addClass("hidden");
    }
  }
}

Player.prototype.turn = function() {
  if (twoClicks.length === 2) {
    this.click ++;
    this.turnCompare(twoClicks);
    return twoClicks = [];
  } else {
    this.click ++;
  }
}

Game.prototype.clearCards = function() {
  this.studentCards = [];
}

Game.prototype.addCard = function(accountItems) {
  this.studentCards.push(accountItems);
}

Game.prototype.turnChange = function() {
  if (turnAddOne === 1) {
    this.turn += turnAddOne;
  }
}

// Game.prototype.endGame = function() {
//   if (this.turn === )
// }

function random(max) {
  return Math.floor(Math.random() * max);
}

// Fisher-yates shuffle, found on google
function shuffle(array) {
  var m = array.length, t, i;

  // while m is not negative
  while (m) {

    // grab random number subtract 1 from m
    i = Math.floor(Math.random() * m--);

    // make copy of the last element in the array
    t = array[m];
    // overwrite last array element with the element found at random i
    array[m] = array[i];
    // overwrite array[i] with copy of last element
    array[i] = t;
  }
  // return shuffled array
  return array;
}

//Front-end
var selectStudents = function() {
  var accountTotal = accounts.length;
  for (var index = 2; index <= accountTotal; index ++) {
    $(".student-number").append("<option>" + index + "</option>");
  }
};

$(document).ready(function() {
  selectStudents();

  $("#new-game").submit(function(event) {
    event.preventDefault();
    $("div#game-board").empty();
    var userInput = $(".student-number").val();
    var currentGame = new Game(userInput);
    var playerNumber = $("#player-numbers").val();
    if (playerNumber === "two-player") {
      $(".player-one-display").show();
      $(".player-two-display").show();
    } else {
      $(".player-one-display").show();
    }

    var playerOne = new Player(0);
    var playerTwo = new Player(0);
    $("#player-one-score").text(playerOne.points);
    $("#player-two-score").text(playerTwo.points);
    currentGame.clearCards();

    for (var index = 1; index <= userInput; index ++) {
      var tempRandomNumber = random(accounts.length);
      var namePicNumAssociation = [];
      var pictureDisplay = "<img src='" + accounts[tempRandomNumber].pictureURL + "' alt='student image' class='hidden'>";
      namePicNumAssociation.push(pictureDisplay);
      namePicNumAssociation.push(tempRandomNumber);
      currentGame.addCard(namePicNumAssociation);
      namePicNumAssociation = [];
      var nameDisplay = "<p class='hidden'>" + accounts[tempRandomNumber].firstName + "</p>";
      namePicNumAssociation.push(nameDisplay);
      namePicNumAssociation.push(tempRandomNumber);
      currentGame.addCard(namePicNumAssociation);
    }
    shuffle(currentGame.studentCards);

    currentGame.studentCards.forEach(function(cardItem) {
      var itemToDisplay = cardItem[0];
      var classNumber = cardItem[1].toString();
      $("#game-board").append("<div>" + itemToDisplay + "</div>");
      $("div#game-board").children("div").last().addClass(classNumber);

      if (currentGame.turn % 2 === 0 && playerNumber === "two-player") {
        $("div#game-board div").last().click(function() {
          $(this).children("img, p").show();
          twoClicks.push($(this).last().attr("class"));
          currentGame.flip ++;
          playerTwo.turn();
          $("#player-one-score").text(playerOne.points);
          $("#player-two-score").text(playerTwo.points);
        });
      } else {
        $("div#game-board div").last().click(function() {
          $(this).children("img, p").removeClass("hidden");
          twoClicks.push($(this).last().attr("class"));
          currentGame.flip ++;
          playerOne.turn();
          $("#player-one-score").text(playerOne.points);
          $("#player-two-score").text(playerTwo.points);
        });
      }

    }); // end of forEach function

    // function endGame(gameTile) {
    //   $("div#game-board div").each(function() {
    //     var shownTile = $(this).children("img, p").isVisible();
    //     if ()
    // }


  }); // end of submit


}); // end of $(document).ready
