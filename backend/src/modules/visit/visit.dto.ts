import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { ExternalLink } from '@modules/shared/types'

@Schema({ timestamps: true })
@ObjectType()
export class Visit {
  @Field(() => ID)
  id: string

  @Prop({ required: true })
  @Field(() => ExternalLink, { nullable: false })
  from: ExternalLink // from which platform the visitor visited

  @Prop({ required: true })
  @Field({ nullable: false })
  userId: string // the user who visitor visited

  @Prop({ required: true })
  @Field({ nullable: false })
  userSeen: string // the user who visitor visited

  @Prop({ required: true })
  @Field(() => String)
  userAgent: string // which browser the visitor visited from

  @Prop({ required: true })
  adminCreatedId: string // admin who created the user

  @Prop({ required: true })
  @Field({ nullable: false })
  adminCreatedEmail: string // admin who created the user

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export const VisitSchema = SchemaFactory.createForClass(Visit)
export type VisitDocument = Visit & Document
