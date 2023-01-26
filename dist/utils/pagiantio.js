"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationData = exports.getPagination = void 0;
const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const skip = page * size - size;
    return { limit, skip };
};
exports.getPagination = getPagination;
const getPaginationData = (totalCount, page, limit, records) => {
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalCount / limit);
    return { totalCount, records, totalPages, currentPage };
};
exports.getPaginationData = getPaginationData;
