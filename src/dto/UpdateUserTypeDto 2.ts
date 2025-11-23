import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserType } from '../enum';

class UpdateUserTypeDto {
  @IsNotEmpty({ message: 'User Id is required' })
  userId!: string;

  @IsNotEmpty({ message: 'UserType is required' })
  @IsEnum(UserType, { message: 'Invalid UserType' })
  UserType!: UserType;
}

export default UpdateUserTypeDto;
