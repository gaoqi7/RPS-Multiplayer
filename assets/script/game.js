// Initialize Firebase
var config = {
  apiKey: "AIzaSyCEIgHANrB21IlOfInSOrszpgVXJeI12Mg",
  authDomain: "gaoqi7db.firebaseapp.com",
  databaseURL: "https://gaoqi7db.firebaseio.com",
  projectId: "gaoqi7db",
  storageBucket: "gaoqi7db.appspot.com",
  messagingSenderId: "412167082221"
};
firebase.initializeApp(config);
var database = firebase.database();
var localRedShoot = "";
var localBlueShoot = "";
var redState = false;
var blueState = false;
$(".red").on("click", function() {
  database.ref("/playerRed").set({
    shoot: $(this).text()
  });
  localRedShoot = $(this).text();
  redState = true;
  console.log("red choose " + localRedShoot);
  $(".red").attr("disabled", "disabled");
  whoWin();
});

$(".blue").click(function() {
  database.ref("/playerBlue").set({
    shoot: $(this).text()
  });
  localBlueShoot = $(this).text();
  $(this).addClass("done");
  blueState = true;
  console.log("blue choose " + localBlueShoot);
  $(".blue").attr("disabled", "disabled");

  whoWin();
});

function whoWin() {
  console.log(redState);
  console.log(blueState);

  if (blueState && redState) {
    if (
      localRedShoot === "r" ||
      localRedShoot === "p" ||
      localRedShoot === "s"
    ) {
      if (localRedShoot === "r" && localBlueShoot === "s") {
        alert("Red Win");
      } else if (localRedShoot === "r" && localBlueShoot === "p") {
        alert("Red Lose");
      } else if (localRedShoot === "s" && localBlueShoot === "r") {
        alert("Red Lose");
      } else if (localRedShoot === "s" && localBlueShoot === "p") {
        alert("Red Win");
      } else if (localRedShoot === "p" && localBlueShoot === "r") {
        alert("Red Win");
      } else if (localRedShoot === "p" && localBlueShoot === "s") {
        alert("Red Lose");
      } else if (localRedShoot === localBlueShoot) {
        alert("ties");
      }
    }
    redState = false;
    blueState = false;
    $(".red").removeAttr("disabled");
    $(".blue").removeAttr("disabled");
  }
}
