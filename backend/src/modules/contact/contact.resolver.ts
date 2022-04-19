import { Resolver, Mutation, Query, Subscription, Args } from '@nestjs/graphql'
import { InternalServerErrorException, UseGuards, Inject } from '@nestjs/common'
import { PubSubEngine } from 'graphql-subscriptions'

import { ContactsResponse, ContactResponse } from '@modules/shared/response'
import { GqlAuth } from '@modules/auth/decorators/gql-auth.decorator'
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard'
import { GqlCurrentAdminUser } from '@modules/auth/decorators/gql-current-admin-user.decorator'
import { Admin } from '@modules/admin/admin.dto'
import { AdminType } from '@modules/admin/admin.enum'

import { ContactInput } from './contact.input'
import { ContactService } from './contact.service'
import { Contact } from './contact.dto'

const subscriptionEvent = 'contactAdded'

@Resolver()
export class ContactResolver {
  constructor(
    private readonly service: ContactService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Mutation(() => ContactResponse)
  async createContact(@Args('input', { nullable: false }) input: ContactInput) {
    const res = await this.service.create(input)

    this.pubSub.publish(subscriptionEvent, { [subscriptionEvent]: res })

    return {
      status: true,
      message: 'Thank you for being with me. I will reach out you in no time.',
      data: res,
    }
  }

  @Mutation(() => ContactResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async updateContact(
    @Args('id', { nullable: false }) id: string,
    @Args('input', { nullable: false }) input: ContactInput,
  ) {
    const res = await this.service.update(id, input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => ContactResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async deleteContact(@Args('id', { nullable: false }) id: string) {
    const res = await this.service.delete(id)

    return {
      status: res.deletedCount > 0,
      message: res.deletedCount > 0 ? 'success' : 'failure',
      data: null,
    }
  }

  @Query(() => ContactsResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async contacts(
    @GqlCurrentAdminUser() admin: Admin,
    @Args('onlyNew', { type: () => Boolean, nullable: true })
    onlyNew?: boolean,
  ) {
    const data: Contact[] = await this.service.all(admin, onlyNew)

    return { status: true, message: 'success', data }
  }

  @Mutation(() => ContactResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async makeContactSeen(@Args('id', { nullable: false }) id: string) {
    const data: Contact = await this.service.makeSeen(id)

    return { status: true, message: 'success', data }
  }

  @Subscription(() => Contact, {
    name: subscriptionEvent,
    defaultValue: null,
    nullable: true,
    resolve: data => {
      return data.contactAdded
    },
  })
  contactAdded() {
    return this.pubSub.asyncIterator(subscriptionEvent)
  }
}
