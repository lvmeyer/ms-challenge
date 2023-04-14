import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { BillingsService } from './billings.service';
import { CreateBillingDto } from './dto/create-billing-dto';
import { UpdateBillingDto } from './dto/update-billing-dto';
import { Billing } from './billing.entity';

interface BasicResponse {
  success: boolean;
  message: string;
}

@Controller('billings')
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBillings(): Promise<Billing[]> {
    return this.billingsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBilling(@Param('id', ParseUUIDPipe) id: string): Promise<Billing> {
    return this.billingsService.find(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBilling(
    @Body(ValidationPipe) createBillingDto: CreateBillingDto,
  ): Promise<BasicResponse> {
    await this.billingsService.create(createBillingDto);

    return {
      success: true,
      message: 'Billing created',
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateBilling(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBillingDto: UpdateBillingDto,
  ): Promise<BasicResponse> {
    await this.billingsService.update(id, updateBillingDto);

    return {
      success: true,
      message: 'Billing updated',
    };
  }

  @Delete(':id')
  async deleteBilling(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BasicResponse> {
    await this.billingsService.delete(id);

    return {
      success: true,
      message: 'Billing deleted',
    };
  }
}
