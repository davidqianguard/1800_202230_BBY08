firebase.auth().onAuthStateChanged(user => {
  if (user) {
    chart();
    recentTransactions(user);
  } else {
    console.log("No user is signed in");
  }
});

// function recentTransactions(user) {
//   db.collection("users").doc(user.uid).collection("transactions")
//     .orderBy("date")
//     .limit(3)
//     .get()
//     .then(transactions => {
//       // console.log(transactions);

//       let CardTemplate = document.getElementById("CardTemplate");
//       transactions.forEach(doc => {
//         // console.log(thisTransactionID);
//         // db.collection("transactions").where("item", "==", "snack").get().then(snap => {
//         //   size = snap.size;
//         //   queryData = snap.docs;

//         // if (size == 1) {
//         // var doc = queryData.data();
//         var item = doc.data().item; //gets the name field
//         var cost = doc.data().cost; //gets the length field
//         let newCard = CardTemplate.content.cloneNode(true);
//         newCard.querySelector('.recentItem').innerHTML = item;
//         newCard.querySelector('.recentCost').innerHTML = "$" + cost;
//         recentTransactionGroup.appendChild(newCard);
//         // } else {
//         //   console.log("Query has more than one data")
//         // }
//       })

//     });
//   // })
// }

function chart() {
  var xValues = ["Food", "Transportation", "Rent", "Auto", "Personal"];
  var yValues = [55.99, 49.50, 44.40, 24.25, 15.15];
  var barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145"
  ];

  new Chart("recentChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    }
  });
}

function recentTransactions(user) {
  let RecentTransactionTemplate = document.getElementById("RecentTransactionTemplate");
  let TransactionGroup = document.getElementById("TransactionGroup");

  db.collection("users").doc(user.uid).collection("transactions")
  .orderBy("date", "desc")  
  .limit(3)
    .get()

    .then(allTransactions => {

      allTransactions.forEach(doc => {
        var transCategory = doc.data().category;
        var transCost = doc.data().cost;
        var transDate = doc.data().date;
        var transItem = doc.data().item;
        let tableData = RecentTransactionTemplate.content.cloneNode(true);
        tableData.querySelector('.transactionCategory').innerHTML = transCategory;
        tableData.querySelector('.transactionCost').innerHTML = transCost;
        tableData.querySelector('.transactionDate').innerHTML = transDate;
        tableData.querySelector('.transactionName').innerHTML = transItem;

        TransactionGroup.appendChild(tableData);
      })
    })
}