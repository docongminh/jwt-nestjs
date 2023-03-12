import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @ApiPropertyOptional({
    nullable: false,
  })
  @IsString()
  username: string;

  @ApiPropertyOptional({
    nullable: false,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
