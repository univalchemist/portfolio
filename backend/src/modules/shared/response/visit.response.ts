import { ObjectType } from '@nestjs/graphql'

import { Visit } from '@modules/visit/visit.dto'
import { DatumResponse, DataResponse } from '.'

@ObjectType()
export class VisitResponse extends DatumResponse(Visit) {}

@ObjectType()
export class VisitsResponse extends DataResponse(Visit) {}
