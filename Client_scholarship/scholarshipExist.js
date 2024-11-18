const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "scholarshipProvider",
    "mychannel",
    "scholarship",
    "ScholarshipContract",
    "queryTxn",
    "",
    "scholarshipExists",
    "scholarship1",
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log("Scholarship Exist: ")
            // Log the JSON object
            console.log(jsonObject);
});