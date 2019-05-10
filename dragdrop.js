// Funkcija koju pozivam kada su mi svi divovi puni sa draggable images

function areAllDropsFilled() {
  return [].slice.call(document.querySelectorAll('.box2')).every(box => box.childNodes.length > 0);
}
// shuffle

function shuffle() {
  var container = document.getElementById("tasks");
  var elementsArray = Array.prototype.slice.call(container.getElementsByClassName('task'));
  elementsArray.forEach(function (element) {
    container.removeChild(element);
  });

  shuffleArray(elementsArray);
  elementsArray.forEach(function (element) {
    container.appendChild(element);
  })
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

let counter = 0;
let guessesLeft = 3;

// Function triggering drag events
$(function () {
  counter = 2;
  var result = {};
  $(".task").draggable({
      revert: function () {
        if (result.drag == result.drop) {
          return false;
        } else {
          return true;
        }
      },

      start: function (e) {
        result.drag = e.target.id.split("_")[1];
      }
    }, //end dragable

  );
  $(".box2").droppable({
    drop: function (event, ui) {
      var $this = $(this);
      result.drop = event.target.id.split("_")[1];
      if (result.drag == result.drop) {
        alert('true'),
          $(this).append(ui.draggable);
        //result.drag.setAttribute("draggable", false)
        // result.drag.draggable('disable')
        ui.draggable.position({
          my: "center",
          at: "center",
          of: $this,
          using: function (pos) {
            $(this).animate(pos, "slow", "linear");
          }
        }) //end postion


      } //end if statment
      else if (areAllDropsFilled()) {
        alert('you finished!');
      } else if (counter == 0) {
        alert('game over, try again')

      } else {
        counter -= 1;
        alert('false')
      }
    } //end drop function
  }) //end dropable

});