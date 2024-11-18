const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "university",
    "mychannel",
    "scholarship",
    "ScholarshipContract",
    "queryTxn",
    "",
    "queryAllUNIApplications",
    
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log("student Applications: ")
            // Log the JSON object
            console.log(jsonObject);
});