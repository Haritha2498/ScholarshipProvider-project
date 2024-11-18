const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "scholarshipProvider",
    "mychannel",
    "scholarship",
    "ScholarshipContract",
    "queryTxn",
    "",
    "isApplicationApproved",
    "1234",
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            // const jsonObject = JSON.parse(decodedString);
            
            console.log("isApplicationApproved: ")
            console.log(decodedString)
            // Log the JSON object
            // console.log(jsonObject);
});