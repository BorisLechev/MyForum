import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./pagination.module.css";

const Pagination = ({ articlesPerPage, totalArticles, baseUrl, onClickHandler }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const numberOfPages =  totalArticles <= articlesPerPage
                            ? 1 
                            : Math.ceil(totalArticles / articlesPerPage);
    const pages = Array.from(Array(numberOfPages).keys());
    const nextPage = currentPage === 1 ? 1 : currentPage - 1;
    const linkToPage = (page) => {
        return `/${baseUrl ? baseUrl : ""}?page=${page}`;
    };

    return (
        <div className={styles.pagination}>
            <Link
                to={linkToPage(nextPage)}
                onClick={() => {
                    onClickHandler(nextPage)
                    setCurrentPage(nextPage)
                }}
                className={currentPage === 1 ? styles.disabled : ""}
            >
                &laquo;
            </Link>
            {pages.map((page) => (
                <Link
                    key={page}
                    to={linkToPage(page + 1)}
                    onClick={() => {
                        onClickHandler(page + 1)
                        setCurrentPage(page + 1)
                    }}
                    className={page + 1 === currentPage ? styles.active : ""}
                >
                    {page + 1}
                </Link>
            ))}
            <Link
				to={linkToPage(
					currentPage + 1 > numberOfPages
						? numberOfPages
						: currentPage + 1
				)}
				onClick={() => {
					const nextPage =
						currentPage + 1 > numberOfPages
							? numberOfPages
							: currentPage + 1;

					onClickHandler(nextPage);
					setCurrentPage(nextPage);
				}}
				className={currentPage === numberOfPages ? styles.disabled : ""}
			>
				&raquo;
			</Link>
        </div>
    );
};

export default Pagination;