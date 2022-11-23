var currentUser         //global variable

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userIncome = userDoc.data().income;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userName != null) {
                        document.getElementById("incomeInput").value = userIncome;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    //Enable the form fields
    console.log("edit button handler");
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    console.log("inside save user info");

    userName = document.getElementById('nameInput').value; //get the value of the field with id="nameInput"
    userEmail = document.getElementById('emailInput').value; //get the value of the field with id="schoolInput"
    userIncome = document.getElementById("incomeInput").value;

    currentUser.update({
            name: userName,
            email: userEmail,
            income: userIncome,
            spend: userSpend
        })
        .then(() => {
            console.log("Document successfully updated!");
            location.reload();
        })
        document.getElementById('personalInfoFields').disabled = true;        
}

function insertName() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name); //jquery
                // document.getElementByID("name-goes-here").innetText=user_Name;
            })
        }
  
    })
  }
  insertName();