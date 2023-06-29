import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { OwnerRepo } from "../repo/owner.repo";
import { CreateOwnerInputDto } from "../dto/create.owner.input.dto";
import { Owner, TOwner } from "../database/mongoose/people/owners.shema";

@Resolver()
export class OwnerResolver {
    constructor(private readonly ownerRepo: OwnerRepo) { }

    @Mutation(() => Owner)
    async createOwner(
        @Args('input', { type: () => CreateOwnerInputDto })
        input: CreateOwnerInputDto,
    ) {
        const _id = await this.ownerRepo.create(input)
        return { _id, ...input }
    }
}

