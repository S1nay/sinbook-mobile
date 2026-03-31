import { useEffect, useState } from 'react';

import { IMeta } from '@domain/models';

export interface IPaginationState {
  totalItems: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export interface IUsePaginationResult {
  isLoadMore: boolean;
  onLoadMore: () => void;
}

interface UsePaginationOptions {
  pagination: IMeta | null;
  onPaginate: (page: number) => Promise<void>;
}

/**
 * Кастомный хук для управления пагинацией
 * @param params - опции пагинации с сервера и callback
 * @returns Метод для загрузки новых данных и флаг для определения новой загрузки
 */
export function usePagination(params: UsePaginationOptions): IUsePaginationResult {
  const { pagination, onPaginate } = params;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);

  useEffect(() => {
    if (pagination) {
      setCurrentPage(pagination.page);
      setTotalPages(pagination.totalPages);
    }
  }, [pagination?.page, pagination?.totalPages]);

  const onLoadMore = async () => {
    if (isLoadMore || currentPage >= totalPages) {
      return;
    }

    setIsLoadMore(true);

    try {
      await onPaginate(currentPage + 1);
    } finally {
      setIsLoadMore(false);
    }
  };

  return {
    isLoadMore,
    onLoadMore,
  };
}

export default usePagination;
