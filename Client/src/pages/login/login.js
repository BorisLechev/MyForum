import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";
import UserContext from "../../utils/context";
import PageLayout from "../layout/layout";
import AuthForm from "../../components/forms/auth/auth";
import Input from "../../components/input/input";
import Button from "../../components/button/button";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const body = {
            email: email,
            password: password,
        };

        await authService.login(
            body,
            (response) => {
                context.user = {
                    userId: response.userId,
                    username: response.userName,
                };

                document.cookie = `Bearer=${response.token}`;

                navigate("/");
            },
            () => console.log("failure"),
        );
    };

    return (
        <PageLayout>
            <AuthForm title="Login" onSubmit={onSubmitHandler}>
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
                <Button text="Login" />
            </AuthForm>
        </PageLayout>
    );
};

export default LoginPage;