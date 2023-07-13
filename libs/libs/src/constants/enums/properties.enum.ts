import { registerEnumType } from "@nestjs/graphql";

export enum ProperTypeEnum {
    House = 'House',
    Apartment = 'Apartment'
}


export enum PropertyAgeEnum {
    None = 'None',
    "0-1" = 1,
    "1-2" = 2,
    "2-3" = 3
}

export enum BuildingTypeEnum {
    None = 'None'
}


export enum FurnishingTypeEnum {
    None = 'None'

}

export enum TenantsTypeEnum {
    Any = 'Any',
    Bachelors = 'Bachelors',
    Family = 'Family'
}

export enum PowerBackUpEnum {
    None = 'None',
    Generator = 'Generator',
    Ups = 'Ups'
}

export enum ParkableVehiclesEnum {
    None = 'None',
    TwoWheeler = 'TwoWheeler',
    ThreeWheeler = 'ThreeWheeler',
    FourWheeler = 'FourWheeler'
}

export enum WashRoomTypeEnum {
    Western = 'Western'
}


export enum WaterStorageTypeEnum {
    Tank = 'Tank'
}







registerEnumType(ProperTypeEnum, { name: 'ProperTypeEnum' })
registerEnumType(PropertyAgeEnum, { name: 'PropertyAgeEnum' })
registerEnumType(BuildingTypeEnum, { name: 'BuildingTypeEnum' })
registerEnumType(FurnishingTypeEnum, { name: 'FurnishingTypeEnum' })
registerEnumType(TenantsTypeEnum, { name: 'TenantsTypeEnum' })
registerEnumType(PowerBackUpEnum, { name: 'PowerBackUpEnum' })
registerEnumType(ParkableVehiclesEnum, { name: 'ParkableVehiclesEnum' })
registerEnumType(WashRoomTypeEnum, { name: 'WashRoomTypeEnum' })
registerEnumType(WaterStorageTypeEnum, { name: 'WaterStorageTypeEnum' })








