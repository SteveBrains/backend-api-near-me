import { InjectModel } from "@nestjs/mongoose";
import { BaseRepo } from "../database";
import { Property, TProperty } from "../database/mongoose/assets/property.schema";
import { Model } from "mongoose";
import { appVariables } from "config";
const { ASSETS_DB_CONNECTION } = appVariables

export class PropertyRepo extends BaseRepo<TProperty> {
    constructor(@InjectModel(Property.name, ASSETS_DB_CONNECTION) model: Model<TProperty>) {
        super(model);
    }
}