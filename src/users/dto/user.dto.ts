import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false, nullable: true })
  name?: string | null; // ✅ allow null

  @ApiProperty()
  createdAt: Date;
}
