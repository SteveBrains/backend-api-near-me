import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { OwnerRepo } from "../repo/owner.repo";
import { CreateOwnerInputDto } from "../dto/owner-dto/create.owner.input.dto";
import { Owner } from "../database/mongoose/people/owners.shema";
import { BadRequestException } from "@nestjs/common";
import { UpdateOwnerInputDto } from "../dto/owner-dto/update-owner.input.dto";
import { ObjectId } from 'mongodb'
import { OwnerDto } from "../dto/owner-dto/owner.dto";
import { QueryOwnerDto } from "../dto/owner-dto/query-owner.dto";

@Resolver()
export class OwnerResolver {
    constructor(private readonly ownerRepo: OwnerRepo) { }

    // Mutations

    @Mutation(() => Owner)
    async createOwner(
        @Args('input', { type: () => CreateOwnerInputDto })
        input: CreateOwnerInputDto,
    ) {
        const emailExists = await this.ownerRepo.findOne({ email: input?.email })
        if (emailExists) {
            throw new BadRequestException("email already in use, please try creating using another email")
        }
        const _id = await this.ownerRepo.create(input)
        return { _id, ...input }
    }


    @Mutation(() => Owner)
    async updateOwner(@Args('_id', { type: () => String }) _id: string, @Args('input', { type: () => UpdateOwnerInputDto }) input: UpdateOwnerInputDto) {
        await this.ownerRepo.updateOne({ _id: new ObjectId(_id) }, input) // if input contains nested object, send the whole nested object, otherwise it'll replace the whole object
        return { _id, ...input }
    }

    @Mutation(() => Boolean)
    async deleteOwner(@Args('_id', { type: () => String }) _id: string) {
        await this.ownerRepo.deleteOne(_id)
        return true
    }

    // Queries

    @Query(() => Owner)
    async findOneOwner(@Args('input', { nullable: true, type: () => OwnerDto }) input: OwnerDto) {
        return this.ownerRepo.findOne(input)
    }


    @Query(() => QueryOwnerDto)
    async findManyOwners(@Args('input', { nullable: true, type: () => OwnerDto }) input: OwnerDto) {
        const owners: any = await this.ownerRepo.find(input)
        return {
            count: owners?.count,
            items: owners?.docs
        }
    }

}

