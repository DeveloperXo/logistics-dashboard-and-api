const EnumRoleOfUser = {
    CUSTOMER: 'customer',
    USER_ACCOUNT: 'user_account',
    ADMIN: 'admin'
}

const EnumStatusOfUser = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended'
}

const EnumLoadTypeOfCustomer = {
    PTL: 'ptl',
    FTL: 'ftl'
}

const EnumTypeOfCustomer = {
    CUSTOMER: 'customer',
    BUSINESS_ASSOCIATE: 'businessAssociate'
}

const EnumPickupRequestOnLTLPanel = {
    LTL_PANEL: 'ltlPanel',
    MANAGE_ECOM_KYC: 'manageEcomKyc'
}

const EnumModesOfTransport = {
    SURFACE: 'surface',
    TRAIN: 'train',
    AIR: 'air',
    SEA: 'sea'
}

const EnumTypeOfToken = {
    RESET_PASSWORD: 'resetPassword',
    REFRESH: 'refresh',
};

const EnumUserAccountFunctionAdditional = {
    DRIVER_MANAGER: 'driverManager',
    SHOTER: 'shoter',
    CS: 'cs',
    PICKUP_BOY: 'pickupBoy',
    ADMIN_DATA_ENTRY: 'adminDataEntry',
    DATA_ENTRY: 'dataEntry',
    WAREHOUSE: 'warehouse',
    ACCOUNT: 'account',
    SALES_MANAGER: 'salesManager',
    SALES: 'sales',
    VENDOR: 'vendor'
}

const EnumPricePrefixes = {
    N1: '[n1]', N2: '[n2]', N3: '[n3]', N4: '[n4]', N5: '[n5]', N6: '[n6]', N7: '[n7]', N8: '[n8]',
    W1: '[w1]', w2: '[w2]', w3: '[w3]', W4: '[w4]',
    S1: '[s1]', S2: '[s2]', S3: '[s3]', S4: '[s4]', S5: '[s5]', S6: '[s6]',
    E1: '[e1]', E2: '[e2]', E3: '[e3]', E4: '[e4]'
}

const EnumTypeOfPrice = {
    PTL: 'ptl',
    FTL: 'ftl',
}

const EnumStatusOfPrice = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended'
}

const EnumCftType = {
    CFT_AIR: 'cftAir',
    CFT_SURFACE: 'cftSurface'
}

const EnumDeliveryLocationType = {
    NATIONAL: 'national',
    INTERNATIONAL: 'international'
}

const EnumDimensionUnits = {
    CENTIMETER: 'centimeter',
    INCH: 'inch'
}

const EnumFerightModes = {
    TO_PAY: 'toPay',
    TBB: 'tbb',
    FOC: 'foc',
    COD: 'cod'
}

const EnumStatusOfPtlBooking = {
    CREATE_BOOKING: 'createBooking',
    DRIVER_ASSIGN: 'driverAssign',
    AT_WAREHOUSE: 'atWarehouse',
    PICKED_UP: 'pickedUp',
    IN_TRANSIT: 'inTransit',
    REACHED_AT_DESTINATION_HUB: 'reachedAtDestinationHub',
    OUT_FOR_DELIVERY: 'outForDelivery',
    RETURN_TO_ORIGIN: 'returnToOrigin',
    HOLD: 'hold',
    PARTIAL_DELIVERED: 'partialDelivered',
    DISPATCHED: 'dispatched',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    RE_ATTEMPT: 'reAttempt'
}

const EnumTypeOfTransaction = {
    CREDIT: 'credit',
    DEBIT: 'debit'
}

module.exports = {
    EnumRoleOfUser,
    EnumStatusOfUser,
    EnumLoadTypeOfCustomer,
    EnumPickupRequestOnLTLPanel,
    EnumTypeOfCustomer,
    EnumModesOfTransport,
    EnumTypeOfToken,
    EnumUserAccountFunctionAdditional,
    EnumPricePrefixes,
    EnumTypeOfPrice,
    EnumStatusOfPrice,
    EnumCftType,
    EnumDeliveryLocationType,
    EnumDimensionUnits,
    EnumStatusOfPtlBooking,
    EnumFerightModes,
    EnumTypeOfTransaction
}