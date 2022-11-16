firebase.auth().onAuthStateChanged(user => {
  if (user) {
    recentTransactions(user);
  } else {
    console.log("No user is signed in");
  }
});

function recentTransactions(user) {
  db.collection("users").doc(user.uid).collection("transactions")
    .orderBy("date")
    .limit(3)
    .get()
    .then(transactions => {
      // console.log(transactions);

      let CardTemplate = document.getElementById("CardTemplate");
      transactions.forEach(doc => {
        // console.log(thisTransactionID);
        // db.collection("transactions").where("item", "==", "snack").get().then(snap => {
        //   size = snap.size;
        //   queryData = snap.docs;

        // if (size == 1) {
        // var doc = queryData.data();
        var item = doc.data().item; //gets the name field
        var cost = doc.data().cost; //gets the length field
        let newCard = CardTemplate.content.cloneNode(true);
        newCard.querySelector('.recentItem').innerHTML = item;
        newCard.querySelector('.recentCost').innerHTML = "$" + cost;
        recentTransactionGroup.appendChild(newCard);
        // } else {
        //   console.log("Query has more than one data")
        // }
      })

    });
  // })
}