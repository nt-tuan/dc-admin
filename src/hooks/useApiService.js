import debounce from "lodash/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

export const usePaginatedApiService = (
  serviceFn,
  defaultOptions = {
    guardFn: undefined,
    onAfterFetch: undefined,
    itemPerPage: 8,
    outerParams: null,
    defaultSortTerm: null,
    defaultSortOrder: null
  }
) => {
  const [options, setOptions] = useState(defaultOptions);
  const {
    onAfterFetch,
    itemPerPage,
    outerParams,
    defaultSortTerm,
    defaultSortOrder,
    guardFn
  } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [sortTerm, setSortTerm] = useState(defaultSortTerm);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const page = useRef(0);
  const data = useRef([]);
  const searchStr = useRef("");
  const totalPages = useRef(0);

  useEffect(
    () => {
      page.current = 0;
      totalPages.current = 0;
      setOptions(defaultOptions);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(defaultOptions)]
  );

  const fetchData = useCallback(
    debounce((params, setLoadingState) => {
      if (guardFn && guardFn() === false) {
        return;
      }
      setLoadingState(true);
      asyncErrorHandlerWrapper(async () => {
        const req = await serviceFn({ params, ...outerParams });
        data.current =
          setLoadingState === setIsLoading
            ? req.content
            : [...data.current, ...req.content].filter(
                (obj, index, self) => index === self.findIndex((val) => val.id === obj.id)
              );
        totalPages.current = req.totalPages;
        onAfterFetch && onAfterFetch(data.current);
        setLoadingState(false);
      });
    }, 500),
    [onAfterFetch, serviceFn, outerParams]
  );

  useEffect(() => {
    const params = { page: 0, size: itemPerPage };
    if (sortTerm && sortOrder) {
      params.sort = `${sortTerm},${sortOrder}`;
    }
    if (searchStr.current) {
      params.searchText = searchStr.current;
    }
    fetchData(params, setIsLoading);
  }, [fetchData, itemPerPage, sortOrder, sortTerm, options]);

  const reFetch = useCallback(() => {
    const params = { page: page.current, size: itemPerPage };
    if (sortTerm && sortOrder) {
      params.sort = `${sortTerm},${sortOrder}`;
    }
    fetchData(params, setIsLoading);
    setSortTerm(defaultSortTerm);
    setSortOrder(defaultSortOrder);
    searchStr.current = "";
  }, [fetchData, itemPerPage, sortOrder, sortTerm, defaultSortOrder, defaultSortTerm]);

  const handleLoadMore = () => {
    page.current = page.current + 1;
    const params = {
      page: page.current,
      size: itemPerPage
    };
    if (searchStr.current) {
      params.searchText = searchStr.current;
    }
    if (sortTerm && sortOrder) {
      params.sort = `${sortTerm},${sortOrder}`;
    }
    fetchData(params, setIsLoadMore);
  };

  const handleSearch = (str) => {
    searchStr.current = str.trim();
    const params = {
      page: 0,
      size: itemPerPage,
      searchText: searchStr.current
    };
    page.current = 0;
    fetchData(params, setIsLoading);
  };

  return [
    {
      data: data.current,
      isLoading,
      isLoadMore,
      page: page.current,
      totalPages: totalPages.current
    },
    {
      setIsLoadMore,
      setIsLoading,
      setSortTerm,
      setSortOrder,
      onReFetch: reFetch,
      onSearch: handleSearch,
      onLoadMore: handleLoadMore
    }
  ];
};

export const useApiService = (params, serviceFn, onAfterFetch) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [innerParams] = useState(params);

  useEffect(() => {
    setIsLoading(true);
    asyncErrorHandlerWrapper(async () => {
      const response = await serviceFn(innerParams);
      if (response) {
        setData(response);
        onAfterFetch && onAfterFetch(response);
        setIsLoading(false);
      }
    });
  }, [innerParams, serviceFn, onAfterFetch]);

  return [data, isLoading, setIsLoading];
};

export const useSubmitApiService = (serviceFn, onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [innerParams, setInnerParams] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isLoading) {
      try {
        asyncErrorHandlerWrapper(async () => {
          await serviceFn(...innerParams);
          onSuccess && onSuccess();
          setIsLoading(false);
          setSuccess(true);
        });
      } catch (error) {
        setIsLoading(false);
        setSuccess(false);
        throw error;
      }
    }
  }, [innerParams, isLoading, onSuccess, serviceFn]);

  const submit = useCallback((...params) => {
    setIsLoading(true);
    setInnerParams(params);
  }, []);

  return [{ isLoading, success }, { submit }];
};
