//js for form
console.log("app.js ready to display the form");

//global vars
var emailField = 'Field3';
var reactionField = 'Field8';
var commentField = 'Field2';
var reaction = '';
var reactions = [ 'shocked', 'sad', 'angry', 'thoughtful'];
var timeout;

//
// functions start
//
3
var emojiClick = function(event) {
  // remove the selected class from all the buttons inside #emoji-button
  var kids = document.getElementById('emoji-button').children;

  for(var i = 0 ; i < kids.length ; i++) {

    kids[i].classList.remove('selected');
  }
  // work out which is the one button that has been clicked (ie the event target)
  var button = event.currentTarget;

  // update the value of reaction
  reaction = button.id;

  // add the selected class to the button which has been clicked
  button.classList.add('selected');
}

var sendData = function() {

  var message = 'Sending, please wait';
  document.getElementById('response').innerHTML = message;

    var data = {
  		Field8: reaction,
		  Field2: document.getElementById('reaction-text').innerHTML,
      Field3: document.getElementById('email').value
    };

    console.log(data);

    $.ajax({
      method: "POST",
      url: "https://traidtest.wufoo.com/api/v3/forms/z1fo42ir16coxbu/entries.json",
      data: data,
      username: '22CA-0WFA-5XA2-HFB1',
      password: 'F98-8Ld-tKw-JRK',
      dataType: "json"
    })
    .done(function( msg ) {
      console.log('done');

      // SUCCESS OR ERROR MESSAGE
         console.log(msg);
       if (msg.Success === 1) {
        document.getElementById('reaction-page').style.opacity = 0;
        document.getElementById('success').style.opacity = 1;
        document.getElementById('success').style.zIndex = 60;
        document.getElementById('replay').onclick = function () {
            location.href = "..//choose-a-film/index.html";
        };
        } else if (msg.Success === 0) {
          //figure out the error
          if (msg.FieldErrors[0].ID === emailField) {
            document.getElementById('reaction-page').style.opacity = 0;
            document.getElementById('email-error').style.opacity = 1;
            document.getElementById('email-error').style.zIndex = 60;
            document.getElementById('emailResubmit').onclick = function () {
              document.getElementById('reaction-page').style.opacity = 1;
              document.getElementById('email-error').style.opacity = 0;
              document.getElementById('email-error').style.zIndex = 10;
            };
          } else if (msg.FieldErrors[0].ID === reactionField) {
            document.getElementById('reaction-page').style.opacity = 0;
            document.getElementById('emoji-error').style.opacity = 1;
            document.getElementById('emoji-error').style.zIndex = 60;
            document.getElementById('emoji-resubmit').onclick = function () {
              document.getElementById('reaction-page').style.opacity = 1;
              document.getElementById('emoji-error').style.opacity = 0;
              document.getElementById('emoji-error').style.zIndex = 10;
            };
          } else {
            message = msg.FieldErrors[0].ErrorText;
            document.getElementById('reaction-page').style.opacity = 0;
            document.getElementById('comment-error').style.opacity = 1;
            document.getElementById('comment-error').style.zIndex = 60;
            document.getElementById('comment-resubmit').onclick = function () {
              document.getElementById('reaction-page').style.opacity = 1;
              document.getElementById('comment-error').style.opacity = 0;
              document.getElementById('comment-error').style.zIndex = 10;
            };
        }
      } else {
        console.log('else');
          message = 'unknown error has occurred';
      }
      // document.getElementById('reaction-page').style.opacity = 0;
      // document.getElementById('response').style.opacity = 1;
    })
    .fail(function() {
      //sommink goes here too prolly

      console.log('fucker')
      document.getElementById('reaction-page').style.opacity = 0;
      document.getElementById('response').style.opacity = 1;
      document.getElementById('connection-error').style.opacity = 1;
      document.getElementById('connection-error').style.zIndex = 654;
      document.getElementById('connection-resubmit').addEventListener('click', function() {
        console.log('dfjgsuijnmf');
        document.getElementById('reaction-page').style.opacity = 1;
        document.getElementById('connection-error').style.opacity = 0;
        document.getElementById('connection-error').style.zIndex = 10;
      });
    });
};
// -- Screen Saver Timer --

var goHome = function() {
    location.href = '../index.html';
    clearTimeout(timeout);
}

var clear = function() {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
    setTimer();
  }
};

var setTimer = function() {
  timeout = setTimeout(goHome, 100000);
};

//
// functions end
//

//
//Event Listeners start
//

//go back button
var goBackForm = document.getElementById('go-back');
goBackForm.addEventListener('click', function() {
  location.href = "..//choose-a-film/index.html";
});

document.getElementById('send').addEventListener('click', sendData);

//loop through emojis to add events
for (var i = 0; i < reactions.length; i++) {
  var currentReaction = reactions[i];
  var currentButton = document.getElementById(currentReaction);
  currentButton.addEventListener('click', emojiClick);
}

// SENDING DATA TO WUFOO & adding emoji 'selected'
var reset = function() {
  shocked.getElementsByTagName('img')[0].src='../images/emojis/1f62e.png';
  sad.getElementsByTagName('img')[0].src='../images/emojis/1f625.png';
  angry.getElementsByTagName('img')[0].src='../images/emojis/1f621.png';
  thoughtful.getElementsByTagName('img')[0].src='../images/emojis/1f914.png';
}

document.addEventListener('keypress', clear);
document.addEventListener('touch', clear);

//
//event listeners end
//

setTimer();
