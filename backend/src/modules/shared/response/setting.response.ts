import { ObjectType } from '@nestjs/graphql'

import { SettingConfig } from '@modules/setting/setting.dto'
import { DatumResponse } from '.'

@ObjectType()
export class SettingResponse extends DatumResponse(SettingConfig) {}
