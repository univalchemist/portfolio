import { ObjectType } from '@nestjs/graphql'

import { Client } from '@modules/client/client.dto'
import { DatumResponse, DataResponse } from '.'

@ObjectType()
export class ClientResponse extends DatumResponse(Client) {}

@ObjectType()
export class ClientsResponse extends DataResponse(Client) {}
