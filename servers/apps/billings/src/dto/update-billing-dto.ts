import { IsNumber, IsString } from 'class-validator';

export class UpdateBillingDto {
  @IsNumber()
  amount: number;

  @IsString()
  user: string;
}
