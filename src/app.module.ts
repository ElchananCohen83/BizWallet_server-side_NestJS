import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessesController } from './controllers/businesses.controller';
import { TransactionController } from './controllers/transaction.controlle';

@Module({
  imports: [],
  controllers: [AppController, BusinessesController, TransactionController],
  providers: [AppService],
})
export class AppModule {}
