import { Injectable } from '@nestjs/common';
import { SearchRepo } from '../repo';

@Injectable()
export class SearchService {
  constructor(private readonly searchRepo: SearchRepo) {}
  async getSearchResoults() {
    return this.searchRepo.getSearch();
  }
  async locationSearchByWord(streetName: string) {
    return this.searchRepo.locationSearchByWord(streetName);
  }
  async locationSearchByLetter(streetName: string) {
    return this.searchRepo.locationSearchByLetter(streetName);
  }
  async getNearProperties(lattitude: string, longitude: string) {
    return this.searchRepo.getNearProperties(lattitude, longitude);
  }
}
