import { BaseRepo } from '@libs/libs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { __name__(pascalCase), T__name__(pascalCase) } from '../schema';
import { Model } from 'mongoose';

@Injectable()
export class __name__(pascalCase)Repo extends BaseRepo<T__name__(pascalCase)> {
  constructor(@InjectModel(__name__(pascalCase).name) model: Model<T__name__(pascalCase)>) {
    super(model);
  }
}
