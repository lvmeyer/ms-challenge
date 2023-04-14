import { IsNumber, IsString } from 'class-validator';

export class CreateBillingDto {
  @IsNumber()
  amount: number;

  @IsString()
  user: string;
}
