import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../../services/auth";
import UserContext from "../../../../utils/context";
import Button from "../../../button/button";
import Input from "../../../input/input";
import styles from "../auth.module.css";

const Register = () => {
    const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const context = useContext(UserContext);

    const validate = (email, password, confirmPassword) => {
        const validationErrors = [];

        if (RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email) === false) {
            validationErrors.push("Invalid email.");
        }

        if (password !== confirmPassword) {
            validationErrors.push("Password and Confirm password don't match.");
        }

        return validationErrors;
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const validationErrors = validate(email, password, confirmPassword);

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const body = {
            userName: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        };

        await authService.register(
            body,
            (response) => {
                context.user = {
                    userId: response.userId,
                    username: response.username,
                };

                document.cookie = `Bearer=${response.token}`;

                navigate("/");
            },
            (error) => {
                setErrors(error.map((e) => e.description));
            },
        );
    };

    return (
        <div>
            <h2 className={styles.title}>Register</h2>
            <form onSubmit={onSubmitHandler}>
                <Input
                    id="username"
                    label="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <Input
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    inputType="email"
                />
                <Input
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    inputType="password"
                />
                <Input
                    id="confirm-password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    inputType="password"
                />
                {errors ? (
                    <div className={styles.error}>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
                <Button text="Register" />
            </form>
        </div>
    );
};

export default Register;