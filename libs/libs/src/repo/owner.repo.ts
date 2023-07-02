import { InjectModel } from "@nestjs/mongoose";
import { BaseRepo } from "../database";
import { Owner, TOwner } from "../database/mongoose/people/owners.shema";
import { Model } from "mongoose";
import { appVariables } from "config";
const { PEOPLE_DB_CONNECTION } = appVariables

export class OwnerRepo extends BaseRepo<TOwner> {
    constructor(@InjectModel(Owner.name, PEOPLE_DB_CONNECTION) model: Model<TOwner>) {
        super(model);
    }
}