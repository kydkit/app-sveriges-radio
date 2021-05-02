import styles from "../css/Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.numbers}>
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <a
            onClick={() => paginate(number)}
            href="#!"
            className={styles.pagelink}
            style={{ color: "white" }}
          >
            {number}
          </a>
        </li>
      ))}
    </div>
  );
};

export default Pagination;
