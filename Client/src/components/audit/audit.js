import React, { useState } from "react";
import { FontAwesomeIcon as FontAwesome } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import DeleteModal from "../modal/modal";

const Audit = ({ index, articleId, title, handler }) => {
    const editLink = `/articles/edit/${articleId}`;

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);

    const location = useLocation();

    const cancelHandler = () => {
        toggleModal();
    };

    return (
        <React.Fragment>
            <span>
                <FontAwesome icon={faEdit} />
                <Link to={editLink}>Edit</Link>
            </span>
            <span>
                <FontAwesome icon={faTrash} />
                <Link 
                    to={`${location.pathname}${location.search}`}
                    onClick={() => toggleModal()}
                >
                    Delete
                </Link>
                <DeleteModal
                    show={isOpen}
                    title="WARNING"
                    text={`Are you sure you want to delete ${title}?`}
                    actionButtonText="Delete"
                    actionHandler={() => handler(articleId, toggleModal, index)}
                    cancelHandler={cancelHandler}
                />
            </span>
        </React.Fragment>
    );
};

export default Audit;