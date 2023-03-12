import { ApiPropertyOptional } from '@nestjs/swagger';
import {IsString, Matches, MaxLength, MinLength} from 'class-validator'

export class RegisterUserDto {
    @ApiPropertyOptional({
        nullable: false
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;

    @ApiPropertyOptional({
        nullable: false
    })
    @IsString()
    username: string;

    @ApiPropertyOptional({
        nullable: false
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @ApiPropertyOptional({
        nullable: false
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches('password')
    passwordConfirm: string;

}