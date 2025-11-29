import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateInfoRequest as UpdateInfoRequestInterface, UserInfoRequest } from './interfaces';
import { BaseResponse } from '../interfaces';
import { UpdateInfoRequest } from './models';
import { UpdateUserInfoRequest } from './models/checkUser';

@Injectable()
export class InfoService {
  async validateInfo(
    rawData: UpdateInfoRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(UpdateInfoRequest, rawData);
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }
    return {
      success: true,
      data,
    };
  }

  async validateFormInfo(
    rawData: UserInfoRequest,
  ): Promise<BaseResponse> {
    const data = plainToClass(UpdateUserInfoRequest, rawData);
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      throw new BadRequestException({
        success: false,
        errors: validationErrors,
      });
    }
    return {
      success: true,
      data,
    };
  }
}
