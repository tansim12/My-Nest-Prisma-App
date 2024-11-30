import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProfileModule } from 'src/user-profile/user-profile.module';

@Module({
  imports: [UserProfileModule],
  controllers: [UserController],
  providers: [{ provide: 'UserService', useClass: UserService }],
  exports: [UserProfileModule],
})
export class UserModule {}
