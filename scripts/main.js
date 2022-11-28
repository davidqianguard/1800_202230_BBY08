firebase.auth().onAuthStateChanged(user => {
  if (user) {
    chart(user);
    recentTransactions(user);
  } else {
    console.log("No user is signed in");
  }
});

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
      var yValues = [food.toFixed(2), clothing.toFixed(2), transportation.toFixed(2), rent.toFixed(2), utilities.toFixed(2), health.toFixed(2), auto.toFixed(2), education.toFixed(2), entertainment.toFixed(2), personal.toFixed(2)];
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
        "#5e4fa2",
        "#66ff33"
      ];

      new Chart("recentChart", {
        type: "pie",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          responsive: true,
          aspectRatio: .9,
          legend: {
            display: true,
            position: 'bottom',
            labels: { boxWidth: 10, },
            align: 'start',
            fontSize: 12
          },
          title: {
            display: true,
            text: "Current",
            fontSize: 20
          }
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