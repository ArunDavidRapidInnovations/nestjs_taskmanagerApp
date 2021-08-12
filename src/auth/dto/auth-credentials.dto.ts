import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MaxLength(32)
  username: string;
  @MinLength(4)
  @MaxLength(32)
  @IsString()
  password: string;
}
