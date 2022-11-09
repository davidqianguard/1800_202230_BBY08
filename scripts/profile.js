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

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
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

    currentUser.update({
            name: userName,
            email: userEmail
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        document.getElementById('personalInfoFields').disabled = true;        
}