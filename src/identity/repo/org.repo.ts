import { BaseRepo } from '@libs/libs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TOrg, Org } from '../schema/org.schema';

@Injectable()
export class OrgRepo extends BaseRepo<TOrg> {
  constructor(@InjectModel(Org.name) model: Model<TOrg>) {
    super(model);
  }
}
