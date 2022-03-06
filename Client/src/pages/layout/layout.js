import React from "react";
import Navbar from '../../components/navbar/navbar';
import Footer from "../../components/footer/footer";
import styles from "./layout.module.css";

const PageLayout = (props) => (
    <div className={styles.app}>
        <Navbar />
        <div className={styles.container}>{props.children}</div>
        <Footer />
    </div>
);

export default PageLayout;