import { ObjectType } from '@nestjs/graphql'

import { Contact } from '@modules/contact/contact.dto'
import { DatumResponse, DataResponse } from '.'

@ObjectType()
export class ContactResponse extends DatumResponse(Contact) {}

@ObjectType()
export class ContactsResponse extends DataResponse(Contact) {}
