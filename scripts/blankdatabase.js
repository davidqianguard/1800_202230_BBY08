db.collection("users").doc(user.uid).collection("transactionhistory").set({
    date: null,

  }).then(function () {
    console.log("New user blank transaction history added to firestore");
    window.location.assign("main.html"); //re-direct to main.html after signup
  })
  .catch(function (error) {
    console.log("Error adding blank transaction history: " + error);
  });