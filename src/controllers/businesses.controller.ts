import { Body, Controller, Get, Post, Patch, Param  } from '@nestjs/common';
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

  @Post(':creat')
  async createBusiness(@Body() createBusinessDto: CreateBusinessDto): Promise<any> {
    if (!this.conn) {
      throw new Error('Salesforce connection is not initialized');
    }
    try {
      const newBusiness = {
        Name: createBusinessDto.name,
        email__c: createBusinessDto.email,
        password_hash__c: createBusinessDto.password_hash,
        address__c: createBusinessDto.address,
        country__c: createBusinessDto.country,
        latitude__c: createBusinessDto.latitude,
        longitude__c: createBusinessDto.longitude,
        phone_number__c: createBusinessDto.phone_number,
        additional_phone__c: createBusinessDto.additional_phone,
        created_at__c: createBusinessDto.created_at,
        updated_at__c: createBusinessDto.updated_at,
        comments__c: createBusinessDto.comments,
        is_active__c: createBusinessDto.is_active,
        total_passes__c: createBusinessDto.total_passes,
        total_active_cards__c: createBusinessDto.total_active_cards,
        subscription_tier__c: createBusinessDto.subscription_tier,
        contact_person_first_name__c: createBusinessDto.contact_person_first_name,
        contact_person_last_name__c: createBusinessDto.contact_person_last_name,
        contact_person_phone_number__c: createBusinessDto.contact_person_phone_number,
        logo__c: createBusinessDto.logo,
        website__c: createBusinessDto.website,
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

  @Patch(':id')
  async updateBusiness(
    @Param('id') id: string,
    @Body() createBusinessDto: CreateBusinessDto
  ): Promise<any> {
    if (!this.conn) {
      throw new Error('Salesforce connection is not initialized');
    }
    try {
      const updatedBusiness = {
        Id: id,
        Name: createBusinessDto.name,
        email__c: createBusinessDto.email,
      };
  
      const res = await this.conn.sobject('businesses__c').update(updatedBusiness);
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
