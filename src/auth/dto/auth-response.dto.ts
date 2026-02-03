import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  accessToken: string;

  @ApiProperty({
    example: {
      id: 'uuid-string',
      email: 'john.doe@example.com',
      name: 'John Doe',
    },
    description: 'User information',
  })
  user: {
    id: string;
    email: string;
    name: string;
  };
}
