firebase.auth().onAuthStateChanged(user => {
  if (user) {
    chart(user);
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

function chart(user) {
  var today = new Date();
  var currentDay = today.getDate();
  var currentMonth = today.getMonth() + 1;
  var currentYear = today.getFullYear();

  var food = 0;
  var clothing = 0;
  var transportation = 0;
  var rent = 0;
  var utilities = 0;
  var health = 0;
  var auto = 0;
  var education = 0;
  var entertainment = 0;
  var personal = 0;

  db.collection("users").doc(user.uid).collection("transactions")
    .orderBy("date", "desc")
    .get()

    .then(allTransactions => {

      allTransactions.forEach(doc => {
        var transCategory = doc.data().category;
        var transCost = parseFloat(doc.data().cost);
        var transDate = doc.data().date.split("-");
        var transItem = doc.data().item;

        if (parseInt(transDate[0]) == currentYear && parseInt(transDate[1]) == currentMonth) {
          if (transCategory === "Food") {
            food += transCost;
          } else if (transCategory === "Clothing") {
            clothing += transCost;
          } else if (transCategory === "Transportation") {
            transportation += transCost;
          } else if (transCategory === "Rent") {
            rent += transCost;
          } else if (transCategory === "Utilities") {
            utilities += transCost;
          } else if (transCategory === "Medical/Healthcare") {
            health += transCost;
          } else if (transCategory === "Auto") {
            auto += transCost;
          } else if (transCategory === "Education") {
            education += transCost;
          } else if (transCategory === "Entertainment") {
            entertainment += transCost;
          } else if (transCategory === "Personal") {
            personal += transCost;
          } else {
            console.log("Unknown Category")
          }
        }
      })

      var xValues = ["Food", "Clothing", "Transportation", "Rent", "Utilities", "Health", "Auto", "Education", "Entertainment", "Personal"];
      var yValues = [food, clothing, transportation, rent, utilities, health, auto, education, entertainment, personal];
      var barColors = [
        "#9e0142",
        "#d53e4f",
        "#f46d43",
        "#fdae61",
        "#fee08b",
        "#e6f598",
        "#abdda4",
        "#66c2a5",
        "#3288bd",
        "#5e4fa2"
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

    })
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

function signOut() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}