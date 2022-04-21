const defaultOptions = { size: 100, maxPage: 100 };
export const getAllFromAPI = async <T>(
  request: (params: { page: number; size: number }) => Promise<T[]>,
  options: { size: number; maxPage: number } = defaultOptions
) => {
  let page = 0;
  const result: T[] = [];
  do {
    const response = await request({ page, size: options.size });
    result.push(...response);
    if (response.length < options.size) return result;
    page++;
  } while (page < options.maxPage);
};
