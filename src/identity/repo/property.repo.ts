import { InjectModel } from "@nestjs/mongoose";
import { BaseRepo } from "../../../libs/libs/src/database";
import { Property, TProperty } from "../schema/property/property.schema";
import { Model } from "mongoose";
import { appVariables } from "config";
const { ASSETS_DB_CONNECTION } = appVariables

export class PropertyRepo extends BaseRepo<TProperty> {
    constructor(@InjectModel(Property.name, ASSETS_DB_CONNECTION) model: Model<TProperty>) {
        super(model);
    }
}