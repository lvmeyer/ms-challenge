import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Billing } from './billing.entity';
import { Repository } from 'typeorm';
import { CreateBillingDto } from './dto/create-billing-dto';
import { UpdateBillingDto } from './dto/update-billing-dto';

@Injectable()
export class BillingsService {
  constructor(
    @InjectRepository(Billing)
    private readonly billingRepository: Repository<Billing>,
  ) {}

  async findAll(): Promise<Billing[]> {
    return this.billingRepository.find();
  }

  async find(id: string): Promise<Billing> {
    const billing = await this.billingRepository.findOneBy({ id });
    if (!billing) {
      throw new NotFoundException('Billing not found');
    }

    return billing;
  }

  async create(createBillingDto: CreateBillingDto) {
    await this.billingRepository.insert(createBillingDto);
  }

  async update(id: string, updateBillingDto: UpdateBillingDto) {
    const billing = await this.billingRepository.findOneBy({ id });
    if (!billing) {
      throw new NotFoundException('Billing not found');
    }

    await this.billingRepository.update(id, updateBillingDto);
  }

  async delete(id: string) {
    const billing = await this.billingRepository.findOneBy({ id });
    if (!billing) {
      throw new NotFoundException('Billing not found');
    }

    await this.billingRepository.delete(id);
  }
}
