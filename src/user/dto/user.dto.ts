import {
  MinLength,
  IsNotEmpty,
  IsString,
  Matches,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly fullname: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly username: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password too weak',
  })
  readonly password: string;
  @IsNotEmpty()
  @IsNumber()
  readonly age: number;
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  readonly userType: UserRole;
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;
}
