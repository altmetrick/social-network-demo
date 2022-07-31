import s from './Paginator.module.css';
import { useState } from 'react';
import React, { FunctionComponent } from 'react';

type PropsT = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  portionSize?: number;
};

const Paginator: FunctionComponent<PropsT> = (props) => {
  const {
    totalItemsCount,
    pageSize,
    currentPage,
    onPageChanged,
    portionSize = 10,
  } = props;

  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  const [currentPortion, setCurrentPortion] = useState(1);
  let leftPortionMargin = (currentPortion - 1) * portionSize + 1;
  let rightPortionMargin = currentPortion * portionSize;

  let pagesEls: Array<any> = pages
    .filter((p) => p >= leftPortionMargin && p <= rightPortionMargin)
    .map((page) => (
      <span
        key={page}
        className={`${page === currentPage ? s.selected : ' '} ${s.page}`}
        onClick={() => {
          onPageChanged(page);
        }}
      >
        {page}
      </span>
    ));

  return (
    <div className={s.paginatorWrapper}>
      {currentPortion > 1 && (
        <button
          className={s.btn}
          onClick={() => {
            setCurrentPortion((p) => p - 1);
          }}
        >
          {'<<'}
        </button>
      )}
      {pagesEls}
      {currentPortion + 1 <= portionCount && (
        <button
          className={s.btn}
          onClick={() => {
            setCurrentPortion((p) => p + 1);
          }}
        >
          {'>>'}
        </button>
      )}
    </div>
  );
};

export default Paginator;
