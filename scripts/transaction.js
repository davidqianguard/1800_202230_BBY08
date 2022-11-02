function addTransaction() {
  //define a variable for the collection you want to create in Firestore to populate data
  var hikesRef = db.collection("hikes");

  hikesRef.add({
      code:"BBY01",
      name: "Burnaby Lake Park Trail",    //replace with your own city?
      city: "Burnaby",
      province: "BC",
      level: "easy",
      length: "10",
      details: "Brian goes here regularly",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()  
  });
  hikesRef.add({
      code:"AM01",
      name: "Buntzen Lake Trail Trail",    //replace with your own city?
      city: "Anmore",
      province: "BC",
      level: "moderate",
      length: "10.5",
      details: "Brian goes here regularly",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
 });
 hikesRef.add({
      code:"NV01",
      name: "Mount Seymoure Trail",    //replace with your own city?
      city: "North Vancouver",
      province: "BC",
      level: "hard",
      length: "8.2",
      details: "Brian goes here regularly",
      last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
 });
}
addTransaction();