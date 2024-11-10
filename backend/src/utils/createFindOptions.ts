import { FindOptions, Op } from "sequelize";

function createFindOptions(
  query: string | undefined,
  page: string | undefined,
  itemsPerPage: string | undefined,
  additionalWhereClause: object = {}
): { findOptions: FindOptions; pageNum?: number; itemsPerPageNum?: number } {
  const pageNum = page ? parseInt(page, 10) : undefined;
  const itemsPerPageNum = itemsPerPage ? parseInt(itemsPerPage, 10) : undefined;

  const whereClause = {
    ...(query && { name: { [Op.like]: `%${query}%` } }),
    ...additionalWhereClause,
  };

  const findOptions: FindOptions = {
    where: whereClause,
  };

  if (pageNum && itemsPerPageNum) {
    findOptions.offset = (pageNum - 1) * itemsPerPageNum;
    findOptions.limit = itemsPerPageNum;
  }

  return { findOptions, pageNum, itemsPerPageNum };
}

export default createFindOptions;
