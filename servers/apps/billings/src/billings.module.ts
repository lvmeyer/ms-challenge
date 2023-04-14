import { Module } from '@nestjs/common';
import { BillingsController } from './billings.controller';
import { BillingsService } from './billings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './billing.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'user',
      password: 'user',
      database: 'app',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Billing]),
  ],
  controllers: [BillingsController],
  providers: [BillingsService],
})
export class BillingsModule {}
