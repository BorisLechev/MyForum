import React from "react";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import styles from "./comment.module.css";

const Comment = ({ content, author, createdOn }) => (
    <div className={styles.comment}>
        <div className={styles.content}>
            {ReactHtmlParser(content)}
        </div>
        <span>
            <small> Author: </small>
            {author}
        </span>
        <span>
            <small>{moment(createdOn).format("LLL")}</small>
        </span>
    </div>
);

export default Comment;