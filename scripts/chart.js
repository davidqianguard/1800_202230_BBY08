firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user.uid + " is signed in");
      getChartData(user)
  } else {
      console.log("No user is signed in");
  }
});

function chart() {
    var xValues = ["Food", "Transportation", "Rent", "Auto", "Personal"];
    var yValues = [55, 49, 44, 24, 15];
    var barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145"
    ];
    
    new Chart("myChart", {
      type: "pie",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        title: {
          display: true,
          text: "Pie Chart"
        }
      }
    });
}
chart()

// function chartData() {
//     // to check if the user is logged in:
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             console.log(user.uid); // let me to know who is the user that logged in to get the UID

//             // modify to get data from transactions
//             currentUser = db.collection("users").doc(user.uid).collection("transactions");
//             currentUser.get().then(userDoc => {
//                 //get the user name
//                 var user_Name = userDoc.data().name;
//                 console.log(user_Name);
//                 $("#name-goes-here").text(user_Name); //jquery
//                 // document.getElementByID("name-goes-here").innetText=user_Name;
//             })
//         }

//     })
// }

// function getChartData(user) {
//   db.collection("users").doc(user.uid).collection("transactions")
//     .orderBy("date")
//     .get()

//     .then(allTransactions => {
//       allTransactions.forEach(doc => {
//         var transCategory = doc.data().category;
//         var transCost = doc.data().cost;
//         var transDate = doc.data().date;
//         var transItem = doc.data().item;
//         let tableData = TransactionTableTemplate.content.cloneNode(true);
//         tableData.querySelector('transactionCategory').innerHTML = transCategory;
//         tableData.querySelector('transactionCost').innerHTML = transCost;
//         tableData.querySelector('transactionDate').innerHTML = transDate;
//         tableData.querySelector('transactionName').innerHTML = transItem;

//         TransactionGroup.appendChild(tableData);
//       });
//     })
// }

function getChartData(user) {
  db.collection("users").doc(user.uid).collection("transactions")
    .orderBy("date")
    .get()

    .then(allTransactions => {
      allTransactions.forEach(doc => {
        var transCategory = doc.data().category;
        var transCost = doc.data().cost;
        var transDate = doc.data().date;
        var transItem = doc.data().item;
        let tableData = TransactionTableTemplate.content.cloneNode(true);
        tableData.querySelector('transactionCategory').innerHTML = transCategory;
        tableData.querySelector('transactionCost').innerHTML = transCost;
        tableData.querySelector('transactionDate').innerHTML = transDate;
        tableData.querySelector('transactionName').innerHTML = transItem;

        TransactionGroup.appendChild(tableData);
      });
    })
}
