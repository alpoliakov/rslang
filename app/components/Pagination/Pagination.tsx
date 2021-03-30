import * as React from 'react';
import Paginate, { ReactPaginateProps } from 'react-paginate';

export type OnPageChangeCallback = ReactPaginateProps['onPageChange'];

interface Props {
  currentPage: number;
  pageCount: number;
  onPageChange?: OnPageChangeCallback;
}

export default function Pagination({ currentPage, pageCount, onPageChange }: Props) {
  return (
    <div className="pagination issuesPagination">
      <Paginate
        forcePage={currentPage}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        nextLabel="&rarr;"
        previousLabel="&larr;"
      />
    </div>
  );
}
