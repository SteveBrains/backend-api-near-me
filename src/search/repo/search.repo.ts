import { BaseRepo } from '@libs/libs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location, Search, TLocation, TSearch } from '../schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class SearchRepo extends BaseRepo<TLocation> {
  constructor(@InjectModel(Location.name) model: Model<TLocation>) {
    super(model);
  }
  async getSearch(): Promise<Location> {
    const locData = await this.findOne({
      city: 'Middletown',
    });
    console.log('[locData]', locData);

    return locData as unknown as Location;
  }

  async locationSearchByWord(name: string): Promise<Location[]> {
    const tempData = await this.model
      .find({ $text: { $search: name } }, { score: { $meta: 'textScore' } })

      .limit(20)
      .sort({ score: { $meta: 'textScore' } });

    return [...tempData] ?? [];
  }

  async locationSearchByLetter(letter: string): Promise<Location[]> {
    const regex = new RegExp(`^${letter}`, 'i');

    const tempData = await this.model
      .find({ street: { $regex: regex } })
      .limit(20)
      .exec();
    return [...tempData] ?? [];
  }
  async getNearProperties(
    lattitude: string,
    longitude: string,
  ): Promise<Location[]> {
    const data = await this.model
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseInt(longitude), parseInt(lattitude)],
            },
            $minDistance: 0,
          },
        },
      })
      .limit(20);
    return [...data] ?? [];
  }
}
