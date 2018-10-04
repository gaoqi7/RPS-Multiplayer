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
var redBtnClicked = false;
var blueBtnClicked = false;
var result = "";
// Initial Database
database.ref("/red").set({
  shoot: "",
  btn: false
});
database.ref("/blue").set({
  shoot: "",
  btn: false
});

database.ref("/result").set({
  output: ""
});

//Create an environment for retrieving the data
database.ref().on("value", function(ss) {
  var rr = ss.val().red.btn;
  if (rr) {
    $(".red").attr("disabled", "disabled");
  }
  if (rr === false) {
    $(".red").removeAttr("disabled");
  }
  var bb = ss.val().blue.btn;
  if (bb) {
    $(".blue").attr("disabled", "disabled");
  }
  if (rr === false) {
    $(".blue").removeAttr("disabled");
  }
});

// If Red Button Clicked ...
$(".red").on("click", function() {
  database.ref("/red").update({
    shoot: $(this).text(),
    //Use btn to broadcast the info that someone has picked red.
    btn: true
  });
  // before run whoWin, make sure all the data used by whoWin() are coming from database. not from local!
  database.ref("/red").on("value", function(snapshot) {
    redBtnClicked = snapshot.val().btn;
    localRedShoot = snapshot.val().shoot;
  });
  database.ref("/blue").on("value", function(snapshot) {
    blueBtnClicked = snapshot.val().btn;
    localBlueShoot = snapshot.val().shoot;
  });
  whoWin();
});

$(".blue").on("click", function() {
  database.ref("/blue").update({
    shoot: $(this).text(),
    btn: true
  });
  database.ref("/red").on("value", function(snapshot) {
    redBtnClicked = snapshot.val().btn;
    localRedShoot = snapshot.val().shoot;
  });
  database.ref("/blue").on("value", function(snapshot) {
    blueBtnClicked = snapshot.val().btn;
    localBlueShoot = snapshot.val().shoot;
  });
  whoWin();
});

function whoWin() {
  if (blueBtnClicked && redBtnClicked) {
    if (
      localRedShoot === "r" ||
      localRedShoot === "p" ||
      localRedShoot === "s"
    ) {
      if (localRedShoot === "r" && localBlueShoot === "s") {
        //adding TimeStamp can make database record always change,then I can always do something after record updated.
        database.ref("/result").set({
          output: "Red Win",
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      } else if (localRedShoot === "r" && localBlueShoot === "p") {
        database.ref("/result").set({
          output: "Blue Win",
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      } else if (localRedShoot === "s" && localBlueShoot === "r") {
        database.ref("/result").set({
          output: "Blue Win",
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      } else if (localRedShoot === "s" && localBlueShoot === "p") {
        database.ref("/result").set({
          output: "Red Win",
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      } else if (localRedShoot === "p" && localBlueShoot === "r") {
        database.ref("/result").set({
          output: "Red Win",
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      } else if (localRedShoot === "p" && localBlueShoot === "s") {
        database.ref("/result").set({
          output: "Blue Win",
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      } else if (localRedShoot === localBlueShoot) {
        database.ref("/result").set({
          output: "Ties",
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      }
    }
  }
}
database.ref("/result").on("value", function(snapshot) {
  $("#result").text(snapshot.val().output);
  // Reset Button State in Database
  database.ref("/red").update({ btn: false });
  database.ref("/blue").update({ btn: false });
});
