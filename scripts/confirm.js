function getTransactionData() {
  var Item = localStorage.getItem("item");
  var Category = localStorage.getItem("category");
  var Cost = localStorage.getItem("cost");
  var Date = localStorage.getItem("date");

  document.getElementById("item").innerHTML = Item;
  document.getElementById("category").innerHTML = Category;
  document.getElementById("cost").innerHTML = Cost;
  document.getElementById("date").innerHTML = Date;
}
getTransactionData();

function addTransaction() {
  firebase.auth().onAuthStateChanged(user => {
    db.collection("users").doc(user.uid)
      .collection("transactions")
      .add({
        item: localStorage.getItem("item"),
        category: localStorage.getItem("category"),
        cost: localStorage.getItem("cost"),
        date: localStorage.getItem("date"),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        //alert("added");
        console.log("added new transaction!");
        window.location.href = "thanks.html"; //new line added
      })
  })
}