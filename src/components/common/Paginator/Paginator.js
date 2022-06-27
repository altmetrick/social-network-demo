import s from './Paginator.module.css';

const Paginator = (props) => {
  const { totalUsersCount, pageSize, currentPage, onPageChanged } = props;

  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let pagesEls = pages.map((page) => (
    <span
      key={page}
      className={page === currentPage ? s.selected : ' '}
      onClick={() => {
        onPageChanged(page);
      }}
    >
      {page}
    </span>
  ));

  return <>{pagesEls}</>;
};

export default Paginator;
