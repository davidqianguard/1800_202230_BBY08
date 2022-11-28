function setTransactionData() {
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
      localStorage.setItem('item', Item);
      localStorage.setItem('category', Category);
      localStorage.setItem('cost', Cost);
      localStorage.setItem('date', Date);
      console.log("confirm transaction");
      window.location.href = "confirm.html";
    } else {
      alert("Please fill out form!");
      // console.log("no one logged in");
      // No user is signed in.
    }
  });
}