import { FindOptions } from "sequelize";

interface PaginationResult {
  findOptions: FindOptions;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

function createPagination(
  count: number,
  pageNum: number | undefined,
  itemsPerPageNum: number | undefined
): PaginationResult["pagination"] {
  if (itemsPerPageNum) {
    const totalPages = Math.ceil(count / itemsPerPageNum);
    return {
      currentPage: pageNum || 1,
      totalPages,
      totalItems: count,
      itemsPerPage: itemsPerPageNum,
    };
  }
  return undefined;
}

export default createPagination;
