import { ObjectType } from '@nestjs/graphql'

import { Portfolio } from '@modules/portfolio/portfolio.dto'
import { DatumResponse, DataResponse } from '.'

@ObjectType()
export class PortfolioResponse extends DatumResponse(Portfolio) {}

@ObjectType()
export class PortfoliosResponse extends DataResponse(Portfolio) {}
