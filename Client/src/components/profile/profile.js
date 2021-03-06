import React from 'react';
import styles from './profile.module.css';

const Profile = ({ username, articlesCount }) => {
  return (
    <div>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png"
				alt="profile-icon"
				className={styles["profile-img"]}
			/>
			<div className={styles["personal-info"]}>
				<p>
					<span>Username: </span>
					{username}
				</p>
				<p>
					<span>Articles: </span>
					{articlesCount}
				</p>
			</div>
		</div>
  );
};

export default Profile;
