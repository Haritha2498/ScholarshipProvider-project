/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const FundContract =require('./FundContract');




class ScholarshipContract extends Contract {

    // constructor() {
    //     super('ScholarshipContract');
    // }

    async setstudent(ctx) {
        console.log('ScholarshipContract has been instantiated');

        // Initialize three students
        const students = [
            { studentId: '001', course: 'Computer Science', gpa: 7.8 },
            { studentId: '002', course: 'Electrical Engineering', gpa: 8.5 },
            { studentId: '003', course: 'Mechanical Engineering', gpa: 7.7 }
        ];

        for (const student of students) {
            const exists = await this.studentExists(ctx, student.studentId);
            if (!exists) {
                const studentRecord = {
                    studentId: student.studentId,
                    course: student.course,
                    gpa: student.gpa,
                    assetType: 'student'
                };
                const buffer = Buffer.from(JSON.stringify(studentRecord));
                await ctx.stub.putState(student.studentId, buffer);
            }
        }
    }


   

    async studentExists(ctx, studentId) {
        const buffer = await ctx.stub.getState(studentId);
        return (!!buffer && buffer.length > 0);
    }

    async applicationExists(ctx, applicationId) {
        const buffer = await ctx.stub.getState(applicationId);
        return (!!buffer && buffer.length > 0);
    }
     async studentapplicationExists(ctx, studentId) {
        const buffer = await ctx.stub.getState(studentId);
        return (!!buffer && buffer.length > 0);
    }

    async scholarshipExists(ctx,  scholarshipId) {
        const buffer = await ctx.stub.getState( scholarshipId);
        return (!!buffer && buffer.length > 0);
    }


    async createStudentApplication(ctx, studentId,name,scholarshipId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'userMSP') {

            const exists = await this.studentExists(ctx,studentId);
            if (exists) {
                const studentBuffer = await ctx.stub.getState(studentId);
            if (!studentBuffer || studentBuffer.length === 0) {
                throw new Error(`The student ${studentId} does not exist`);
            }

            const studentdetails = JSON.parse(studentBuffer.toString());
        
            const application = {
                studentId,
                name,
                gpa: studentdetails.gpa,
                course:studentdetails.course,
                scholarshipId,
                status: 'Pending',
                assetType: 'application'
            };

            const buffer = Buffer.from(JSON.stringify(application));
            await ctx.stub.putState(studentId, buffer);
        }
        else{
                throw new Error(`The student ${studentId} doesn't exists`);
        }
        } else {
            return `User under the following MSP: ${mspID} cannot perform this action`;
        }
    }

    async readStudentApplication(ctx, studentId) {
        const exists = await this.studentapplicationExists(ctx, studentId);
        if (!exists) {
            throw new Error(`The student application ${studentId} does not exist`);
        }
        const buffer = await ctx.stub.getState(studentId);
        const application = JSON.parse(buffer.toString());
        return application;
    }

    async createUniversityApplication(ctx, applicationId, studentId, universityId,scholarshipId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'universityMSP') {
            const exists = await this.applicationExists(ctx, applicationId);
            if (exists) {
                throw new Error(`The application ${applicationId} already exists`);
            }

            const studentBuffer = await ctx.stub.getState(studentId);
            if (!studentBuffer || studentBuffer.length === 0) {
                throw new Error(`The student ${studentId} does not exist`);
            }

            const studentdetails = JSON.parse(studentBuffer.toString());

            const application = {
                applicationId,
                studentId,
                universityId,
                scholarshipId,
                gpa: studentdetails.gpa,
                course:studentdetails.course,
                status: 'approved&submitted to Scholarship Provider',
                assetType: 'application'
            };

            const buffer = Buffer.from(JSON.stringify(application));
            await ctx.stub.putState(applicationId, buffer);
        } else {
            return `User under the following MSP: ${mspID} cannot perform this action`;
        }
    }

    
    async readApplication(ctx, applicationId) {
        const exists = await this.applicationExists(ctx, applicationId);
        if (!exists) {
            throw new Error(`The application ${applicationId} does not exist`);
        }
        const buffer = await ctx.stub.getState(applicationId);
        const application = JSON.parse(buffer.toString());
        return application;
    }

    async deleteUniversityApplication(ctx, applicationId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'universityMSP') {
            const exists = await this.applicationExists(ctx, applicationId);
            if (!exists) {
                throw new Error(`The application ${applicationId} does not exist`);
            }
            await ctx.stub.deleteState(applicationId);
        } else {
            return `User under the following MSP: ${mspID} cannot perform this action`;
        }
    }


    async deleteStudentApplication(ctx, studentId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'userMSP') {
            const exists = await this.studentapplicationExists(ctx, studentId);
            if (!exists) {
                throw new Error(`The application ${studentId} does not exist`);
            }

            const studentBuffer = await ctx.stub.getState(studentId);
            if (!studentBuffer || studentBuffer.length === 0) {
                throw new Error(`The student ${studentId} does not exist`);
            }

            const studentdetails = JSON.parse(studentBuffer.toString());


             const studentdetail = {
                studentId,
                course:studentdetails.course,
                gpa:studentdetails.gpa
                
            };

            const buffer = Buffer.from(JSON.stringify(studentdetail));
            await ctx.stub.putState(studentId, buffer);
            
        } else {
            return `User under the following MSP: ${mspID} cannot perform this action`;
        }
    }


//functions in fund contract


async setScholarship(ctx) {
    console.log('FundContract: Setting up scholarships');

    const mspid = ctx.clientIdentity.getMSPID();

    if (mspid === 'scholarshipProviderMSP') {
        const scholarships = [
            { scholarshipId: 'scholarship1', amount: '10000', students: [] },
            { scholarshipId: 'scholarship2', amount: '15000', students: [] },
            { scholarshipId: 'scholarship3', amount: '20000', students: [] },
        ];

        for (const scholarship of scholarships) {
            const exists = await this.scholarshipExists(ctx, scholarship.scholarshipId);
            if (!exists) {
                const scholarshipRecord = {
                    scholarshipId: scholarship.scholarshipId,
                    amount: scholarship.amount,
                    students: scholarship.students,
                    assetType: 'scholarship'
                };
                const buffer = Buffer.from(JSON.stringify(scholarshipRecord));
                await ctx.stub.putState(scholarship.scholarshipId, buffer);
            }
        }
    } else {
        return `Access Denied: Organization with mspid ${mspid} cannot perform this action.`;
    }
}

async scholarshipExists(ctx, scholarshipId) {
    const data = await ctx.stub.getState(scholarshipId);
    return data && data.length > 0;
}







async isApplicationAssigned(ctx, scholarshipId) {
    const mspID = ctx.clientIdentity.getMSPID();

    if (mspID !== 'scholarshipProviderMSP') {
        return `Access Denied: Organization with MSP ID ${mspID} cannot perform this action.`;
    }

    const queryString = {
        selector: {
            assetType: 'application',
            scholarshipId: scholarshipId
        }
    };

    console.log(`Query String: ${JSON.stringify(queryString)}`);

    const resultsIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    let matchCount = 0;  // Counter for matches

    while (true) {
        const res = await resultsIterator.next();

        if (res.value && res.value.value.toString()) {
            matchCount += 1;

            // Check if this is the second matching application
            if (matchCount === 2) {
                const applicationKey = res.value.key;
                await resultsIterator.close();
                return applicationKey;
            }
        }

        if (res.done) {
            await resultsIterator.close();
            break;
        }
    }

    // If less than two applications were found, return a message
    return `No applications found for scholarship ID: ${scholarshipId}`;
}





///function to check the status of the application 

async isApplicationApproved(ctx, applicationId) {
    const applicationBuffer = await ctx.stub.getState(applicationId); // Fetch the application from the public ledger

    if (!applicationBuffer || applicationBuffer.length === 0) {
        throw new Error(`Application ${applicationId} does not exist`);
    }

    const application = JSON.parse(applicationBuffer.toString());

    if (application.status === 'approved&submitted to Scholarship Provider') {
        return  ` University already approved the application ${applicationId}`; 
    } else {
        return `University not approved the application ${applicationId}`; // Return message if not approved
    }
}

// //function to check whether a student has already  assigned to the scholership,by checking the student array in scholership

async isStudentApprovedForScholarship(ctx, scholarshipId, applicationId) {
    const scholarshipBuffer = await ctx.stub.getState(scholarshipId);

    if (!scholarshipBuffer || scholarshipBuffer.length === 0) {
        throw new Error(`Scholarship ${scholarshipId} does not exist`);
    }

    const scholarship = JSON.parse(scholarshipBuffer.toString());

    const applicationBuffer = await ctx.stub.getState(applicationId);
    if (!applicationBuffer || applicationBuffer.length === 0) {
        throw new Error(`Application ${applicationId} does not exist`);
    }

    const application = JSON.parse(applicationBuffer.toString());

    const isApproved = scholarship.students.includes(application.studentId);
    // if (isApproved == 'true') {
    //     // return  `Scholarship is already assigned to application ${applicationId}`; 
    // } else {
    //     // return `Scholarship is not assigned to application ${applicationId}`; 
    // } 
    return isApproved;
}


async approveFund(ctx, scholarshipId, applicationId) {
    const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'scholarshipProviderMSP') {

    const scholarshipBuffer = await ctx.stub.getState(scholarshipId);
    if (!scholarshipBuffer || scholarshipBuffer.length === 0) {
        throw new Error(`Scholarship ${scholarshipId} does not exist`);
    }
    const scholarship = JSON.parse(scholarshipBuffer.toString());

    const applicationBuffer = await ctx.stub.getState(applicationId);
    if (!applicationBuffer || applicationBuffer.length === 0) {
        throw new Error(`Application ${applicationId} does not exist`);
    }
    const application = JSON.parse(applicationBuffer.toString());

    const upapplication={
        applicationId:application.applicationId,
        assetType:application.assetType,
        course:application.course,
        gpa:application.gpa,
        scholarshipId:application.scholarshipId,
        status:" approved for scholarship",
        studentId:application.studentId,
        universityId:application.universityId
    }
    // application.SPstatus =" approved for scholership";

   
    const updatedApplicationBuffer = Buffer.from(JSON.stringify(upapplication));
    await ctx.stub.putState(applicationId, updatedApplicationBuffer);
    
    // return `Fund has been allocated. Student ${application.studentId} added to scholarship ${scholarshipId} and application status updated to "amount granted".`;
const confirmBuffer = await ctx.stub.getState(applicationId);
    if (confirmBuffer && confirmBuffer.length > 0) {
        const confirmedApplication = JSON.parse(confirmBuffer.toString());
        console.log("Confirmed Application Status:", confirmedApplication.status);
        return confirmedApplication;
    } else {
        console.error("Failed to retrieve the updated application after putState.");
        throw new Error("Update failed to persist.");
    }



}
else{
        return `Access Denied: Organization with mspid ${mspID} cannot perform this action.`;

}
}


async allocateFund(ctx, scholarshipId, applicationId) {
    const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'govAgencyMSP') {
    const scholarshipBuffer = await ctx.stub.getState(scholarshipId);
    if (!scholarshipBuffer || scholarshipBuffer.length === 0) {
        throw new Error(`Scholarship ${scholarshipId} does not exist`);
    }
    const scholarship = JSON.parse(scholarshipBuffer.toString());

    const applicationBuffer = await ctx.stub.getState(applicationId);
    if (!applicationBuffer || applicationBuffer.length === 0) {
        throw new Error(`Application ${applicationId} does not exist`);
    }
    const application = JSON.parse(applicationBuffer.toString());

    if (!scholarship.students.includes(application.studentId)) {
        scholarship.students.push(application.studentId);
    }
    const amt=scholarship.amount;
const upapplication={
        applicationId:application.applicationId,
        assetType:application.assetType,
        course:application.course,
        gpa:application.gpa,
        scholarshipId:application.scholarshipId,
        status:` amount ${amt} granded`,
        studentId:application.studentId,
        universityId:application.universityId
    }

    const updatedScholarshipBuffer = Buffer.from(JSON.stringify(scholarship));
    await ctx.stub.putState(scholarshipId, updatedScholarshipBuffer);

    const updatedApplicationBuffer = Buffer.from(JSON.stringify(upapplication));
    await ctx.stub.putState(applicationId, updatedApplicationBuffer);

    // return `Fund has been allocated. Student ${application.studentId} added to scholarship ${scholarshipId} and application status updated to amount ${amt} granted.`;

        const confirmBuffer = await ctx.stub.getState(applicationId);
    if (confirmBuffer && confirmBuffer.length > 0) {
        const confirmedApplication = JSON.parse(confirmBuffer.toString());
        console.log("Confirmed Application Status:", confirmedApplication.status);
        return confirmedApplication;
    } else {
        console.error("Failed to retrieve the updated application after putState.");
        throw new Error("Update failed to persist.");
    }


}
else{
        return `Access Denied: Organization with mspid ${mspID} cannot perform this action.`;

}
}



async updateStudentApplicationStatus(ctx,  studentId,applicationId,) {

     const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'universityMSP') {
    const applicationBuffer = await ctx.stub.getState(applicationId);
    if (!applicationBuffer || applicationBuffer.length === 0) {
        throw new Error(`Application ${applicationId} does not exist`);
    }
    const application = JSON.parse(applicationBuffer.toString());

    if (application.status === "submitted to scholarship provider") {
        return `The application ${applicationId} is still under review and cannot update the student's application status.`;
    }

        const currentstatus=application.status;
    // await ctx.stub.putState(applicationId, Buffer.from(JSON.stringify(application)));

    const studentApplicationBuffer = await ctx.stub.getState(studentId);
    if (!studentApplicationBuffer || studentApplicationBuffer.length === 0) {
        throw new Error(`Student application with ID ${studentId} does not exist`);
    }
    const studentApplication = JSON.parse(studentApplicationBuffer.toString());
    
    const upapplication={
        studentId:studentApplication.studentId,
        name:studentApplication.name,
        assetType:"fund",
        course:studentApplication.course,
        gpa:studentApplication.gpa,
        scholarshipId:studentApplication.scholarshipId,
        status:currentstatus
    }

    // studentApplication.status = application.status;

    // const updatedStudentApplicationBuffer = Buffer.from(JSON.stringify(upapplication));
    // await ctx.stub.putState(studentId, updatedStudentApplicationBuffer);

    await ctx.stub.putState(studentId, Buffer.from(JSON.stringify(upapplication)));



    // return `The student's application status has been updated to: ${application.status}`;
 const confirmBuffer = await ctx.stub.getState(studentId);
    if (confirmBuffer && confirmBuffer.length > 0) {
        const confirmedApplication = JSON.parse(confirmBuffer.toString());
        console.log("Confirmed Application Status:", confirmedApplication.status);
        const d=[confirmedApplication,currentstatus]
        return d;
    } else {
        console.error("Failed to retrieve the updated application after putState.");
        throw new Error("Update failed to persist.");
    }

}
else{
        return `Access Denied: Organization with mspid ${mspID} cannot perform this action.`;

}
}






 async queryAllUNIApplications(ctx) {
        const queryString = {
            selector: {
                assetType: 'application',
                universityId: { "$exists": true }
            }
        };

        const resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const results = await this._getAllResults(resultIterator);
        return JSON.stringify(results);
    }


 async queryAllSPApplications(ctx) {
        const queryString = {
            selector: {
                assetType: 'application',
                status:" approved for scholarship"
            }
        };

        const resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const results = await this._getAllResults(resultIterator);
        return JSON.stringify(results);
    }







    async queryAllApplications(ctx) {
        const queryString = {
            selector: {
                assetType: 'application',
                universityId: { "$exists":false }
            }
        };

        const resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const results = await this._getAllResults(resultIterator);
        return JSON.stringify(results);
    }

async getAllScholarships(ctx) {
    console.log('FundContract: Retrieving all scholarships');

    const mspid = ctx.clientIdentity.getMSPID();
    if (mspid !== 'scholarshipProviderMSP') {
        return `Access Denied: Organization with mspid ${mspid} cannot perform this action.`;
    }

    const queryString = {
        selector: {
            assetType: 'scholarship'
        }
    };

    const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    const scholarships = [];

    while (true) {
        const result = await iterator.next();
        if (result.value && result.value.value.toString()) {
            const scholarship = JSON.parse(result.value.value.toString());
            scholarships.push(scholarship);
        }
        if (result.done) {
            await iterator.close();
            break;
        }
    }

    return scholarships;
}


    async getApplicationHistory(ctx, applicationId) {
        const resultIterator = await ctx.stub.getHistoryForKey(applicationId);
        const results = await this._getAllResults(resultIterator, true);
        return JSON.stringify(results);
    }

    async _getAllResults(iterator, isHistory) {
        let allResults = [];
        let res = await iterator.next();

        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                if (isHistory === true) {
                    jsonRes.TxId = res.value.txId;
                    jsonRes.Timestamp = res.value.timestamp;
                    jsonRes.Record = JSON.parse(res.value.value.toString());
                } else {
                    jsonRes.Key = res.value.key;
                    jsonRes.Record = JSON.parse(res.value.value.toString());
                }
                allResults.push(jsonRes);
            }
            res = await iterator.next();
        }

        await iterator.close();
        return allResults;
    }
}

module.exports = ScholarshipContract;
