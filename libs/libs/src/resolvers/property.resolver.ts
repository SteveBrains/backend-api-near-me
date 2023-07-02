import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Property } from "../database/mongoose/people/property.schema";
import { CreatePropertyInputDto } from "../dto/property-dto/create-property.input.dto";
import { PropertyRepo } from "../repo/property.repo";

@Resolver()
export class PropertyResolver {
    constructor(private readonly propertyRepo: PropertyRepo) { }

    @Mutation(() => Property)
    async createProperty(@Args('input', { type: () => CreatePropertyInputDto }) input: CreatePropertyInputDto) {
        const _id = await this.propertyRepo.create(input)
        return {
            _id,
            ...input
        }
    }

}