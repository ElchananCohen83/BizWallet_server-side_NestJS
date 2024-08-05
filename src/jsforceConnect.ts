import * as jsforce from "jsforce";
import * as dotenv from 'dotenv';

dotenv.config();

const USERNAME: string | undefined = process.env.SF_USERNAME;
const PASSWORD: string | undefined = process.env.SF_PASSWORD + process.env.SF_TOKEN;

if (!USERNAME || !PASSWORD) {
    throw new Error("Salesforce credentials are not set in environment variables.");
}

// Provide an empty options object to the Connection constructor
const conn = new jsforce.Connection({});

async function loginToSalesforce(): Promise<typeof conn> {
    try {
        
        await conn.login(USERNAME, PASSWORD);
        return conn;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error if you want to handle it elsewhere
    }
}

export default loginToSalesforce;
