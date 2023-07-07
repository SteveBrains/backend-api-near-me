import { BaseRepo } from '@libs/libs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Identity, TIdentity } from '../schema/identity.schema';

@Injectable()
export class IdentityRepo extends BaseRepo<TIdentity> {
  constructor(@InjectModel(Identity.name) model: Model<TIdentity>) {
    super(model);
  }
}
