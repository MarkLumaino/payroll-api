import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Name or email' })
  name: string;

  @ApiProperty({ description: 'Password' })
  password: string;
}
