import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { CrmQuery } from 'models';

export async function getCrmQueryById(id, options = {}) {
    const crmQuery = await CrmQuery.findById(id, options.projection, options);
    return crmQuery;
}

export async function getOne(query, options = {}) {
    const crmQuery = await CrmQuery.findOne(query, options.projection, options);
    return crmQuery;
}

export async function getCrmQueryList(filter, options = {}) {
    const crmQuery = await CrmQuery.find(filter, options.projection, options);
    return crmQuery;
}

export async function getCrmQueryListWithPagination(filter, options = {}) {
    const crmQuery = await CrmQuery.paginate(filter, options);
    return crmQuery;
}

export async function createCrmQuery(body) {
    try {
        const crmQuery = CrmQuery.create(body);
        return crmQuery;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function updateCrmQuery(filter, body, options = {}) {
    const crmQueryData = await getOne(filter, {});
    if (!crmQueryData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'CrmQuery not found');
    }
    try {
        const crmQuery = await CrmQuery.findOneAndUpdate(filter, body, options);
        return crmQuery;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function removeCrmQuery(filter) {
    const crmQuery = CrmQuery.findOneAndDelete(filter);
    return crmQuery;
}