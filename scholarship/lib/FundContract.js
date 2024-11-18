/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

async function getCollectionName(ctx) {
    const collectionName = 'FundCollection';
    return collectionName;
}


class FundContract extends Contract {

//     async setScholarship(ctx) {
//         const mspid = ctx.clientIdentity.getMSPID();
//         console.log("asdfghjkl;");
//         if (mspid === 'scholarshipProviderMSP') {
//     const scholarships = [
//         { scholarshipId: 'scholarship1', amount: '10000', students: [] },
//         { scholarshipId: 'scholarship2', amount: '15000', students: [] },
//         { scholarshipId: 'scholarship3', amount: '20000', students: [] },
//     ];

//     const collectionName = await getCollectionName(ctx); // Get the collection name
//     console.log("asdfghjkl;");
//     for (const scholarship of scholarships) {
//         // Convert scholarship to a Buffer and store in the private data collection
//         const buffer = Buffer.from(JSON.stringify(scholarship));
//         await ctx.stub.putPrivateData(collectionName, scholarship.scholarshipId, buffer);
//     }
// }
//  else {
//             return (`Organisation with mspid ${mspid} cannot perform this action.`)
//         }
//     }


    // Chaincode function to create and store scholarship details in the private data collection
async createScholarship(ctx,scholarshipId) {
    const mspid = ctx.clientIdentity.getMSPID();
    if (mspid === 'scholarshipProviderMSP') {
        
        // Check if the scholarship already exists
        const exists = await this.scholarshipExists(ctx, scholarshipId);
        if (exists) {
            throw new Error(`The scholarship ${scholarshipId} already exists`);
        }

        const ScholarshipAsset = {};

        const transientData = ctx.stub.getTransient();

        // Validate transient data
        if (transientData.size === 0 || !transientData.has('amount')) {
            throw new Error('The expected key "amount" was not specified in transient data. Please try again.');
        }

        // Populate the scholarship asset details
        ScholarshipAsset.scholarshipId = scholarshipId;
        ScholarshipAsset.amount = transientData.get('amount').toString();
        ScholarshipAsset.students = []; // Initialize the students array

        // Get the private data collection name
        const collectionName = await getCollectionName(ctx);
        
        // Store the scholarship details in the private data collection
        await ctx.stub.putPrivateData(collectionName, scholarshipId, Buffer.from(JSON.stringify(ScholarshipAsset)));
        
    } else {
        throw new Error(`Organisation with mspid ${mspid} cannot perform this action.`);
    }
}

// Example helper function to check if a scholarship exists (to be implemented)
async scholarshipExists(ctx, scholarshipId) {
    const collectionName = await getCollectionName(ctx);
    const scholarshipData = await ctx.stub.getPrivateData(collectionName, scholarshipId);
    return scholarshipData && scholarshipData.length > 0; // Check if data exists
}







    // Check if an application exists (in public ledger or another collection)
    async applicationExists(ctx, applicationId) {
        const buffer = await ctx.stub.getState(applicationId); // Assuming applications are stored publicly
        return (!!buffer && buffer.length > 0);
    }

//function to check,whether any application is assigned for a scholarship

    async isApplicationAssigned(ctx, fund) {
        const applicationId=fund.applicationId;
        const scholarshipId=fund.scholarshipId;
    const queryString = {
        selector: {
            scholarshipId: scholarshipId // Filter applications by scholarshipId
        }
    };

    const resultsIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    const applicationIds = []; // Array to store application IDs

    while (true) {
        const res = await resultsIterator.next();
        if (res.value && res.value.value.toString()) {
            const application = JSON.parse(res.value.value.toString('utf8'));
            applicationIds.push(application.applicationId); // Assuming the application has an applicationId field
        }
        if (res.done) {
            await resultsIterator.close();
            break;
        }
    }

    return applicationIds; // Return an array of application IDs
}

//function to check the status of the application 

async isApplicationApproved(ctx, applicationId) {
    const applicationBuffer = await ctx.stub.getState(applicationId); // Fetch the application from the public ledger

    if (!applicationBuffer || applicationBuffer.length === 0) {
        throw new Error(`Application ${applicationId} does not exist`);
    }

    const application = JSON.parse(applicationBuffer.toString());

    // Check if the application status is approved
    if (application.status === 'approved') {
        return  `Scholarship is already assigned to application ${applicationId}`; 
    } else {
        return `Scholarship is not assigned to application ${applicationId}`; // Return message if not approved
    }
}

//function to check whether a student has already  assigned to the scholership,by checking the student array in scholership

async isStudentApprovedForScholarship(ctx, scholarshipId, applicationId) {
    const collectionName = await getCollectionName(ctx);
    const scholarshipBuffer = await ctx.stub.getPrivateData(collectionName, scholarshipId);

    if (!scholarshipBuffer || scholarshipBuffer.length === 0) {
        throw new Error(`Scholarship ${scholarshipId} does not exist`);
    }

    const scholarship = JSON.parse(scholarshipBuffer.toString());


    const buffer = await ctx.stub.getState(applicationId);
        const application = JSON.parse(buffer.toString());



    // Check if the studentId is in the students array
    const isApproved = scholarship.students.includes(application.studentId);
    return isApproved; // Returns true if approved, otherwise false
}





    // Allocate funds for an application and store it in the private collection
    async allocateFunds(ctx, fundId, applicationId, amount) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'scholarshipProviderMSP') {
            const exists = await this.applicationExists(ctx, applicationId);
            if (!exists) {
                throw new Error(`The application ${applicationId} does not exist`);
            }

            const fund = {
                applicationId,
                amount: parseFloat(amount),
                disbursed: false,
                assetType: 'fund'
            };

            const buffer = Buffer.from(JSON.stringify(fund));
            await ctx.stub.putPrivateData('fundcollection', fundId, buffer);
        } else {
            return `User under the following MSP: ${mspID} cannot perform this action`;
        }
    }

    // Disburse funds and update the record in the private collection
    async disburseFunds(ctx, fundId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'govAgencyMSP') {
            const fundBuffer = await ctx.stub.getPrivateData('fundcollection', fundId);
            if (!fundBuffer || fundBuffer.length === 0) {
                throw new Error(`The fund ${fundId} does not exist`);
            }

            const fund = JSON.parse(fundBuffer.toString());

            if (fund.disbursed) {
                throw new Error(`The fund ${fundId} has already been disbursed`);
            }

            fund.disbursed = true;
            const newFundBuffer = Buffer.from(JSON.stringify(fund));
            await ctx.stub.putPrivateData('fundcollection', fundId, newFundBuffer);

            return `Funds for ${fundId} have been disbursed.`;
        } else {
            return `User under the following MSP: ${mspID} cannot perform this action`;
        }
    }
}

module.exports = FundContract;
