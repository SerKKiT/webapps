// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDdd_A_rEKtbsrYJYEmjs0EL7JniZW53Lo",
  authDomain: "chatweb-6dcad.firebaseapp.com",
  projectId: "chatweb-6dcad",
  storageBucket: "chatweb-6dcad.appspot.com",
  messagingSenderId: "74221357747",
  appId: "1:74221357747:web:9325a8f905b9bfe1c33ec6",
  databaseURL: "https://chatweb-6dcad-default-rtdb.firebaseio.com/",
};
firebase.initializeApp(firebaseConfig);
// Get the chat ID from the URL
var videoName = window.location.href.split('?')[1]; // Extract the videoName from the URL
var sanitizedVideoName = videoName.replace(/[.#$[\]/]/g, "-"); // Remove invalid characters from videoName
var chatId = encodeURIComponent(sanitizedVideoName); // Encode the sanitized videoName as the chatId

// Get a reference to the database for the specific chat ID
var database = firebase.database().ref("chats/" + chatId);
// Function to send a message
function sendMessage(event) {
  if (event.type === "click" || event.key === "Enter") {
    event.preventDefault();

    var usernameInput = document.getElementById("usernameInput");
    var messageInput = document.getElementById("messageInput");
    var username = usernameInput.value;
    var message = messageInput.value;

    if (username.trim() !== "" && message.trim() !== "") {
      var newMessageRef = database.push();
      newMessageRef.set({
        username: username,
        message: message
      });
      messageInput.value = "";
    }
  }
}

function sendMessagebutton() {
  var usernameInput = document.getElementById("usernameInput");
  var messageInput = document.getElementById("messageInput");
  var username = usernameInput.value;
  var message = messageInput.value;

  if (username.trim() !== "" && message.trim() !== "") {
    var newMessageRef = database.push();
    newMessageRef.set({
      username: username,
      message: message
    });
    messageInput.value = "";
  }
}






// Function to display messages
function displayMessage(message) {
  var chatDiv = document.getElementById("chat");
  var messageP = document.createElement("p");
  messageP.innerText = message.username + ": " + message.message;
  chatDiv.appendChild(messageP);

  // Scroll to the bottom of the chat
  chatDiv.scrollTop = chatDiv.scrollHeight;
}



// Listen for new messages in the specific chat
database.on("child_added", function(snapshot) {
  var message = snapshot.val();
  displayMessage(message);
});
