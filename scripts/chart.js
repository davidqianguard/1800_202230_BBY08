firebase.auth().onAuthStateChanged(user => {
  if (user) {
    //console.log(user.uid + " is signed in");
    getChartData(user)

    db.collection("users").doc(user.uid).get()
      .then(userDoc => {
        var income = parseFloat(userDoc.data().income);
        projectionChart(user, income)
      })

  } else {
    console.log("No user is signed in");
  }
});

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

function projectionChart(user, income) {
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
  var previousMonth = 0;

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

        if (parseInt(transDate[1]) > 1 && parseInt(transDate[0]) == currentYear && parseInt(transDate[1]) == (currentMonth - 1)
          || parseInt(transDate[1]) == 1 && parseInt(transDate[0]) == currentYear - 1 && parseInt(transDate[1]) == 12) {
          previousMonth += transCost;
        }

      })

      var foodForcast = food / currentDay * 30;
      var clothingForcast = clothing / currentDay * 30;
      var transportationForcast = transportation / currentDay * 30;
      var rentForcast = rent / currentDay * 30;
      var utilitiesForcast = utilities / currentDay * 30;
      var healthForcast = health / currentDay * 30;
      var autoForcast = auto / currentDay * 30;
      var educationForcast = education / currentDay * 30;
      var entertainmentForcast = entertainment / currentDay * 30;
      var personalForcast = personal / currentDay * 30;
      var total = foodForcast + clothingForcast + transportationForcast + rentForcast + utilitiesForcast + healthForcast + autoForcast + educationForcast + entertainmentForcast + personalForcast;
      var remaing = income - total;

      if (remaing < 0) {
        remaing = 0;
      }

      var xValues = ["Food", "Clothing", "Transportation", "Rent", "Utilities", "Health", "Auto", "Education", "Entertainment", "Personal", "Expected Savings"];
      var yValues = [foodForcast.toFixed(2), clothingForcast.toFixed(2), transportationForcast.toFixed(2), rentForcast.toFixed(2), utilitiesForcast.toFixed(2), healthForcast.toFixed(2), autoForcast.toFixed(2), educationForcast.toFixed(2), entertainmentForcast.toFixed(2), personalForcast.toFixed(2), remaing.toFixed(2)];
      var barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000"
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
            text: "Forcasted Monthly Total",
            fontSize: 20
          }
        }
      });

      // console.log(total);
      // console.log(previousMonth);
      var percent = (total / previousMonth * 100) - 100;
      // console.log(percent);

      if (percent <= 0) {
        percent = Math.abs(percent);
        document.getElementById("spending-feedback").innerHTML = percent.toFixed(0) + " lower";
      } else {
        document.getElementById("spending-feedback").innerHTML = percent.toFixed(0) + " higher";
      }
    })
}