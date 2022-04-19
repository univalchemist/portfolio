import { registerEnumType } from '@nestjs/graphql'

export enum SkillCategory {
  Frontend = 'Frontend',
  Backend = 'Backend',
  Mobile = 'Mobile',
  Other = 'Other',
}

registerEnumType(SkillCategory, {
  name: 'SkillCategory',
})
