import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { SigninResponse } from './interfaces/signin-response.interface';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<SigninResponse> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Delete('/user')
  @UseGuards(AuthGuard())
  deleteUser(@GetUser() user: User): Promise<void> {
    return this.authService.deleteUser(user);
  }
}
