import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../../services/auth";
import UserContext from "../../../../utils/context";
import Button from "../../../button/button";
import Input from "../../../input/input";
import styles from "../auth.module.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const context = useContext(UserContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const body = {
            username: username,
            password: password,
        };

        await authService.login(
            body,
            (response) => {
                context.user = {
                    userId: response.userId,
                    username: response.username,
                };

                document.cookie = `Bearer=${response.token}`;

                navigate("/");
            },
            () => setError("Incorrect username or password."),
        );
    };

    return (
        <div>
			<h2 className={styles.title}>Login</h2>
			<form onSubmit={onSubmitHandler}>
				<Input
					id="username"
					label="Username"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
				<Input
					id="password"
					label="Passowrd"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					inputType="password"
				/>
				<div className={styles.error}>{error}</div>
				<Button text="Login" />
			</form>
		</div>
    );
};

export default Login;