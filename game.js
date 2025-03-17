var jet = document.getElementById("jet");
var board = document.getElementById("board");

window.addEventListener("keydown", e => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  var top = parseInt(window.getComputedStyle(jet).getPropertyValue("top"));
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 10 + "px";
  } else if (e.key == "ArrowRight" && left <= 450) {
    jet.style.left = left + 10 + "px";
  } else if (e.key == "ArrowUp" && top > 0) {
    jet.style.top = top - 10 + "px";
  } else if (e.key == "ArrowDown" && top > 0) {
    jet.style.top = top + 10 + "px";
  }

  if (e.keyCode == 32) {
    var bullets = document.createElement("div");
    bullets.classList.add("bullets");
    board.appendChild(bullets);

    var moveBullets = setInterval(() => {
      var rocks = document.getElementsByClassName("rocks");
      for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        var rocksBound = rock.getBoundingClientRect();
        var bulletsBound = bullets.getBoundingClientRect();

        if (
          bulletsBound.left >= rocksBound.left &&
          bulletsBound.right <= rocksBound.right &&
          bulletsBound.top <= rocksBound.top &&
          bulletsBound.bottom <= rocksBound.bottom
        ) {
          rock.parentElement.removeChild(rock);
          bullets.parentElement.removeChild(bullets);

          document.getElementById("points").innerHTML =
            parseInt(document.getElementById("points").innerHTML) + 100;
        }
      }

      var bulletBottom = parseInt(
        window.getComputedStyle(bullets).getPropertyValue("bottom")
      );

      if (bulletBottom >= 500) {
        clearInterval(moveBullets);
      }

      bullets.style.left = left + "px";
      bullets.style.bottom = bulletBottom + 3 + "px";
    });
  }
});

var generateRocks = setInterval(() => {
  var rock = document.createElement("div");
  rock.classList.add("rocks");
  var rocksTop = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  rock.style.left = Math.floor(Math.random() * 460) + "px";
  board.appendChild(rock);
}, 1500);

var moveRocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");
  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {
      var rock = rocks[i];
      var rocksTop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );

      if (rocksTop >= 475) {
        alert("Game Over");
        clearInterval(moveRocks);
        window.location.reload();
      }
      rock.style.top = rocksTop + 25 + "px";
    }
  }
}, 450);
