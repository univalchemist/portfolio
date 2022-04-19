import { ObjectType } from '@nestjs/graphql'

import { Feature } from '@modules/feature/feature.dto'
import { DatumResponse, DataResponse } from '.'

@ObjectType()
export class FeatureResponse extends DatumResponse(Feature) {}

@ObjectType()
export class FeaturesResponse extends DataResponse(Feature) {}
