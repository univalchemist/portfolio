import { Field, ObjectType } from '@nestjs/graphql'
import { Type } from '@nestjs/common'

/**
 * Based on https://docs.nestjs.com/graphql/resolvers#generics
 *
 * @param classRef
 */
export function DatumResponse<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class DatumResponseClass {
    @Field(() => classRef, { nullable: true })
    data: T

    @Field()
    message: string

    @Field()
    status: boolean
  }
  return DatumResponseClass
}

/**
 * Based on https://docs.nestjs.com/graphql/resolvers#generics
 *
 * @param classRef
 */
export function DataResponse<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class DataResponseClass {
    @Field(() => [classRef])
    data: T[]

    @Field()
    message: string

    @Field()
    status: boolean
  }
  return DataResponseClass
}

export * from './auth.response'
export * from './admin.response'
export * from './user.response'
export * from './feature.response'
export * from './portfolio.response'
export * from './resume.response'
export * from './client.response'
export * from './setting.response'
export * from './contact.response'
export * from './visit.response'
