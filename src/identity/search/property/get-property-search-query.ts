export const getPropertySearchQuery = (filterInput) => {

    const stringMapper = {
        country: "locationDetails.country",
        city: "locationDetails.city",
    }

    const arrayOfStringsMapper = {
        ownerId: "ownerId",
        propertyType: "propertyDetails.propertyType",
        buildingType: "propertyDetails.buildingType",
        furnishingType: "propertyDetails.furnishingType",
        furnishedThings: "propertyDetails.furnishedThings",
        preferredTenants: "propertyDetails.preferredTenants",
        street: "locationDetails.street",
        powerBackup: "propertyResources.powerBackup",
        parkableVehicles: "propertyResources.parkableVehicles",
        washroomType: "propertyResources.washroomType",
        waterStorageType: "propertyResources.waterStorageType",
    }

    const BooleanMapper = {
        isRentNegotiable: "rentalDetails.isRentNegotiable",
        liftAvailable: "propertyResources.liftAvailable",
        hasSecurity: "propertyResources.hasSecurity",
        hasWifi: "propertyResources.hasWifi",
        shouldPaintWhenVacating: "propertyAdditionalInfo.shouldPaintWhenVacating",
        shouldCleanWhenVacating: "propertyAdditionalInfo.shouldCleanWhenVacating"
    }

    const dateMapper = {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }

    const numberMapper = {
        propertyAge: "propertyDetails.propertyAge", // change this if needed
        floor: "propertyDetails.floor",
        totalFloors: "propertyDetails.totalFloors",
        rentalAmount: "rentalDetails.rentalAmount",
        maintainanceAmount: "rentalDetails.maintainanceAmount",
        depositAmount: "rentalDetails.depositAmount",
        leaseDuration: "rentalDetails.leaseDuration",
    }

    const filterQuery = {}

    for (const input in filterInput) {
        if (arrayOfStringsMapper?.[input]) {
            const key = arrayOfStringsMapper?.[input]
            filterQuery[key] = { $in: filterInput?.[input] }
        }
        if (stringMapper?.[input]) {
            const key = stringMapper?.[input]
            filterQuery[key] = filterInput?.[input]
        }

        if (BooleanMapper?.[input]) {
            const key = BooleanMapper?.[input]
            filterQuery[key] = filterInput?.[input]
        }

        if (dateMapper?.[input]) {
            const key = dateMapper?.[input]
            if (filterInput?.[input]?.fromDate && filterInput?.[input]?.toDate) {
                filterQuery[key] = {
                    $gte: filterInput?.[input]?.fromDate?.toISOString(), $lte: filterInput?.[input]?.toDate?.toISOString()
                }

            }
            if (filterInput?.[input]?.fromDate) {
                filterQuery[key] = {
                    $gte: filterInput?.[input]?.fromDate?.toISOString()
                }
            }
            if (filterInput?.[input]?.toDate) {
                filterQuery[key] = {
                    $lte: filterInput?.[input]?.toDate?.toISOString()
                }
            }

        }

        if (numberMapper?.[input]) {
            const key = numberMapper?.[input]
            if (filterInput?.[input]?.gte && filterInput?.[input]?.lte) {
                filterQuery[key] = {
                    $gte: filterInput?.[input]?.gte, $lte: filterInput?.[input]?.lte
                }

            }
            if (filterInput?.[input]?.gte) {
                filterQuery[key] = {
                    $gte: filterInput?.[input]?.gte
                }
            }
            if (filterInput?.[input]?.lte) {
                filterQuery[key] = {
                    $lte: filterInput?.[input]?.lte
                }
            }

        }
    }

    return filterQuery
}