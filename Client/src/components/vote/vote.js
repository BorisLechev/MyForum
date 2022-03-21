import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import votesService from "../../services/votes";
import styles from "./vote.module.css";

const Vote = ({initialVotes, articleId}) => {
    const [votes, setVotes] = useState(0);
    const [userVote, setUserVote] = useState(0);

    const location = useLocation();

    useEffect(() => {
      const loadInitialData = async () => {
            await votesService.getUserVoteType(
                articleId,
                (response) => setUserVote(response.voteType),
                () => console.log("load user vote is failing"),
            );

            setVotes(initialVotes);
      };

      loadInitialData();
    }, [initialVotes, articleId]);
    
    const like = async () => {
        const body = {
            articleId: articleId,
            isLikeVote: true,
        };

        await votesService.postVote(
            body,
            (response) => {
                setVotes(response.votesCount);
                setUserVote(1);
            },
            () => console.log("failure"), 
        );
    };

    const dislike = async () => {
        const body = {
            articleId: articleId,
            isLikeVote: false,
        };

        await votesService.postVote(
            body,
            (response) => {
                setVotes(response.votesCount);
                setUserVote(-1);
            },
            () => console.log("failure"),
        );
    };

    return (
        <React.Fragment>
            <span>
                <Link
                    to={`${location.pathname}${location.search}`}
                    onClick={like}
                    className={userVote === 1 ? styles.voted : ""}
                >
                    <FontAwesomeIcon icon={faThumbsUp} />
                </Link>
            </span>
            <span>{votes}</span>
            <span>
                <Link
                    to={`${location.pathname}${location.search}`}
                    onClick={dislike}
                    className={userVote === -1 ? styles.voted : ""}
                >
                    <FontAwesomeIcon icon={faThumbsDown} />
                </Link>
            </span>
        </React.Fragment>
    );
};

export default Vote;