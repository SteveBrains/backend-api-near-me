import { InjectModel } from "@nestjs/mongoose";
import { BaseRepo } from "../../../libs/libs/src/database";
import { Owner, TOwner } from "../schema/owners.shema";
import { Model } from "mongoose";
import { appVariables } from "config";
const { PEOPLE_DB_CONNECTION } = appVariables

export class OwnerRepo extends BaseRepo<TOwner> {
  constructor(@InjectModel(Owner.name, PEOPLE_DB_CONNECTION) model: Model<TOwner>) {
    super(model);
  }
}
