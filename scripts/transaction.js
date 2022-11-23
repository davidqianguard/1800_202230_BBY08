function addTransaction() {
  console.log("in");
  var Item = document.getElementById("item").value;
  var Category = document.getElementById("category").value;
  var Cost = document.getElementById("cost").value;
  var Date = document.getElementById("date").value;
  console.log(Item, Category, "$" + Cost, Date);
  firebase.auth().onAuthStateChanged(user => {
    if (user && Item !== "" && Cost !== "" && Date !== "") {
      //alert("going to add soon");
      //alert(user.uid);
      db.collection("users").doc(user.uid)
        .collection("transactions")
        .add({
          item: Item,
          category: Category,
          cost: Cost,
          date: Date,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
          //alert("added");
          console.log("added new transaction!");
          window.location.href = "thanks.html";
        })
    } else {
      console.log("no one logged in");
      // No user is signed in.
    }
  });
}