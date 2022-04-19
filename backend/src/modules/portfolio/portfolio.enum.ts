import { registerEnumType } from '@nestjs/graphql'

export enum PortfolioCategory {
  Web = 'Web',
  Mobile = 'Mobile',
}

registerEnumType(PortfolioCategory, {
  name: 'PortfolioCategory',
})
