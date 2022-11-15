// // Example starter JavaScript for disabling form submissions if there are invalid fields
// function inputValidation() {
//   'use strict'

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   var forms = document.querySelectorAll('.needs-validation')

//   // Loop over them and prevent submission
//   Array.prototype.slice.call(forms)
//     .forEach(function (form) {
//       form.addEventListener('submit', function (event) {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }

//         form.classList.add('was-validated')
//       }, false)
//     })
// }
// inputValidation();

function addTransaction() {
  console.log("in")
  let Item = document.getElementById("item").value;
  let Category = document.getElementById("category").value;
  let Cost = document.getElementById("cost").value;
  let Date = document.getElementById("date").value;
  console.log(Item, Category, "$" + Cost, Date);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid)
      var userID = user.uid;
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          // var userEmail = userD  oc.data().email;
          db.collection("users").doc(user.uid).collection("transactions").add({
            item: Item,
            category: Category,
            cost: Cost,
            date: Date
          }).then(() => {
            //window.location.href = "thanks.html"; //new line added
          })
        })

    } else {
      // No user is signed in.
    }
  });
}