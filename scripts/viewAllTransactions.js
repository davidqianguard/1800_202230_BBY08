firebase.auth().onAuthStateChanged(user => {
  if (user) {
    getTransactions(user);
  } else {
    console.log("No user is signed in");
  }
});

function getTransactions(user) {
  db.collection("users").doc(user.uid).collection("transactions").get()
    .then(transactions => {
      console.log(transactions);

      let CardTemplate = document.getElementById("CardTemplate");
      transactions.forEach(doc => {
        // console.log(thisTransactionID);
        // db.collection("transactions").where("item", "==", "snack").get().then(snap => {
        //   size = snap.size;
        //   queryData = snap.docs;

          // if (size == 1) {
            // var doc = queryData.data();
            var item = doc.data().item; //gets the name field
            var category = doc.data().category; //gets the unique ID field
            var cost = doc.data().cost; //gets the length field
            var date = doc.data().date;
            let newCard = CardTemplate.content.cloneNode(true);
            newCard.querySelector('.item').innerHTML = item;
            newCard.querySelector('.category').innerHTML = category;
            newCard.querySelector('.cost').innerHTML = cost;
            newCard.querySelector('.date').innerHTML = date;
            transactionGroup.appendChild(newCard);
          // } else {
          //   console.log("Query has more than one data")
          // }

        })

      });
    // })
}