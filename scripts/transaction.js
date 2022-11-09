function addTransaction() {
  console.log("in")
  let Item = document.getElementById("item").value;
  let Category = document.getElementById("category").value;
  let Cost = "$" + document.getElementById("cost").value;
  console.log(Item, Category, Cost);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid)
      var userID = user.uid;
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          // var userEmail = userDoc.data().email;
          db.collection("users").doc(user.uid).collection("transactions").add({
            item: Item,
            category: Category,
            cost: Cost,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }).then(() => {
            window.location.href = "thanks.html"; //new line added
          })
        })

    } else {
      // No user is signed in.
    }
  });
}