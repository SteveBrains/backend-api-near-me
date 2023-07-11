import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Property } from "../schema/property/property.schema";
import { CreatePropertyInputDto } from "../dto/property-dto/create-property.input.dto";
import { PropertyRepo } from "../repo/property.repo";
import { PropertyDto } from "../dto/property-dto/property.dto";
import { QueryPropertyDto } from "../dto/property-dto/query.property.dto";
import { UpdatePropertyDto } from "../dto/property-dto/update-property.dto";
import { ObjectId } from 'mongodb'

@Resolver()
export class PropertyResolver {
    constructor(private readonly propertyRepo: PropertyRepo) { }

    // Mutations 

    @Mutation(() => Property)
    async createProperty(@Args('input', { type: () => CreatePropertyInputDto }) input: CreatePropertyInputDto) {
        const _id = await this.propertyRepo.create(input)
        return {
            _id,
            ...input
        }
    }

    @Mutation(() => Property)
    async updateProperty(@Args('_id', { type: () => String }) _id: string, @Args('input', { type: () => UpdatePropertyDto }) input: UpdatePropertyDto) {
        await this.propertyRepo.updateOne({ _id: new ObjectId(_id) }, input)
        return {
            _id, ...input
        }
    }


    @Mutation(() => Boolean)
    async deleteProperty(@Args('_id', { type: () => String }) _id: string) {
        await this.propertyRepo.deleteOne(_id)
        return true
    }


    // Queries

    @Query(() => Property)
    async findOneProperty(@Args('input', { type: () => PropertyDto }) input: PropertyDto) {
        return await this.propertyRepo.findOne(input)
    }

    @Query(() => QueryPropertyDto)
    async findManyProperties(@Args('input', { type: () => PropertyDto }) input: PropertyDto) {
        const properties = await this.propertyRepo.find(input)
        return {
            count: properties?.count,
            items: properties?.docs
        }
    }
}