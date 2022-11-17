function addTransaction() {
  console.log("in");
  var Item = document.getElementById("item").value;
  var Category = document.getElementById("category").value;
  var Cost = document.getElementById("cost").value;
  var Date = document.getElementById("date").value;
  console.log(Item, Category, "$" + Cost, Date);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      //alert("going to add soon");
      //alert(user.uid);
      db.collection("users").doc(user.uid)
        .collection("transactions")
        .add({
          item: Item,
          category: Category,
          cost: Cost,
          date: Date
        }).then(() => {
          //alert("added");
          console.log("added new transaction!");
          window.location.href = "thanks.html"; //new line added
        })
    } else {
      console.log("no one logged in");
      // No user is signed in.
    }
  });
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()