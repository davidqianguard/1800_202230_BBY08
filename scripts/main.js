async function viewAllTransactions() {
  var currentUser = db.collection("users").doc(user.uid)
  var userID = user.uid;
  const sfRef = db.collection("users").doc(user.uid).collection("transactions");
  const collections = await sfRef.listCollections();
  collections.forEach(collection => {
    console.log('Found subcollection with id:', collection.id);
  }); index.js
}