import { InputType, Field } from '@nestjs/graphql'

import { ExternalLink } from '@modules/shared/types'

@InputType()
export class SettingLinkInput {
  @Field(() => ExternalLink, { nullable: false })
  key: ExternalLink

  @Field(() => Number, { nullable: false })
  value: number
}

@InputType()
export class OtherInput {
  @Field(() => String, { nullable: false })
  key: string

  @Field(() => Number, { nullable: false })
  value: number
}

@InputType()
export class ConfigInput {
  @Field(() => String, { nullable: false })
  dropBoxToken: string

  @Field(() => String, { nullable: true })
  telegramToken: string
}

@InputType()
export class SettingInput {
  @Field({ nullable: true })
  id?: string

  @Field(() => [SettingLinkInput], { nullable: true })
  links?: SettingLinkInput[]

  @Field(() => [OtherInput], { nullable: true })
  other?: OtherInput[]

  @Field(() => ConfigInput, { nullable: true })
  config?: ConfigInput
}
