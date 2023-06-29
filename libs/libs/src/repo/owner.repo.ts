import { InjectModel } from "@nestjs/mongoose";
import { BaseRepo } from "../database";
import { Owner, TOwner } from "../database/mongoose/people/owners.shema";
import { Model } from "mongoose";

export class OwnerRepo extends BaseRepo<TOwner> {
    constructor(@InjectModel(Owner.name) model: Model<TOwner>) {
        super(model);
    }
}