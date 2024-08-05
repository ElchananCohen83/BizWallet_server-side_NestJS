import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import loginToSalesforce from '../jsforceConnect';
import { CreateBusinessDto } from 'src/dtos/create-business.dto';

@Controller('businesses')
export class BusinessesController {
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
  async getBusinesses(): Promise<any> {
    if (!this.conn) {
      throw new Error('Salesforce connection is not initialized');
    }
    try {
      const res = await this.conn.query('SELECT Id, Name FROM businesses__c');
      return res.records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async getBusinessById(@Param('id') id: string): Promise<any> {
    if (!this.conn) {
      throw new Error('Salesforce connection is not initialized');
    }
    try {
      const query = `SELECT Id, Name FROM businesses__c WHERE Id = '${id}'`;
      const res = await this.conn.query(query);
      return res.records[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async createBusiness(@Body() createBusinessDto: CreateBusinessDto): Promise<any> {
    if (!this.conn) {
      throw new Error('Salesforce connection is not initialized');
    }
    try {
      const newBusiness = {
        Name: createBusinessDto.name,
        email__c: createBusinessDto.email,
      };

      const res = await this.conn.sobject('businesses__c').create(newBusiness);
      return res;
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        message: error.message,
      };
    }
  }
}
