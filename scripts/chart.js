firebase.auth().onAuthStateChanged(user => {
  if (user) {
    //console.log(user.uid + " is signed in");
    getChartData(user)
    projectionChart(user)
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

function getChartData(user) {
  let TransactionTableTemplate = document.getElementById("TransactionTableTemplate");
  let TransactionGroup = document.getElementById("TransactionGroup");

  db.collection("users").doc(user.uid).collection("transactions")
    .orderBy("date", "desc")
    .get()

    .then(allTransactions => {

      //console.log(allTransactions)

      allTransactions.forEach(doc => {
        var transCategory = doc.data().category;
        var transCost = doc.data().cost;
        var transDate = doc.data().date;
        var transItem = doc.data().item;
        let tableData = TransactionTableTemplate.content.cloneNode(true);
        tableData.querySelector('.transactionCategory').innerHTML = transCategory;
        tableData.querySelector('.transactionCost').innerHTML = transCost;
        tableData.querySelector('.transactionDate').innerHTML = transDate;
        tableData.querySelector('.transactionName').innerHTML = transItem;

        TransactionGroup.appendChild(tableData);
      })
    })
}

function projectionChart(user) {

  var today = new Date();
  var currentDay = today.getDate();
  var currentMonth = today.getMonth() + 1;
  var currentYear = today.getFullYear();

  var food = 0;
  var clothing = 0;
  var transportation = 0;
  var rent = 0;
  var utilities;
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
    })
}