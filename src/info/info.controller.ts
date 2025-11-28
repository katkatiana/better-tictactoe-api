import { Controller, Post, Body } from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoRequest, UserInfoRequest } from './interfaces';
import { BaseResponse } from '../interfaces';
import { UpdateUserInfoRequest } from './models/checkUser';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) { }

  @Post('/validate')
  getConfig(@Body() bodyRequest: UpdateInfoRequest): Promise<BaseResponse> {
    return this.infoService.validateInfo(bodyRequest);
  }

  @Post('/validate-form')
  getFormConfig(@Body() bodyRequest: UpdateUserInfoRequest): Promise<BaseResponse> {
    console.log("bodyRequest", bodyRequest)
    return this.infoService.validateFormInfo(bodyRequest);
  }
}
