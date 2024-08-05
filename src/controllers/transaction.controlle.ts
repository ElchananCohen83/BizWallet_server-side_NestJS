import { Controller, Get } from '@nestjs/common';
import loginToSalesforce from '../jsforceConnect';

@Controller('transaction')
export class TransactionController {
  private conn: any;

  constructor() {
    this.initializeSalesforceConnection();
  }

  async initializeSalesforceConnection() {
    try {
      this.conn = await loginToSalesforce();
    } catch (error) {
      console.error('Error connecting to Salesforce:', error);
    }
  }

  @Get()
  async getTransaction(): Promise<any> {
    if (!this.conn) {
      throw new Error('Salesforce connection is not initialized');
    }
    try {
      const res = await this.conn.query('SELECT Id, Name FROM Transaction__c');
      return res.records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
