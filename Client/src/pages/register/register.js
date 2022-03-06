import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../../components/button/button";
import AuthForm from "../../components/forms/auth/auth";
import Input from "../../components/input/input";
import authService from "../../services/auth";
import UserContext from "../../utils/context";
import PageLayout from "../layout/layout";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

    const context = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        const body = {
            userName: username,
            email: email,
            password: password,
        };

        await authService.register(
            body,
            (obj) => {
                context.user = {
                    userId: obj.userId,
                    username: obj.username,
                };

                navigate("/");
            },
            () => console.log("failure"),
        );
    };

    return (
        <PageLayout>
            <AuthForm title="Register" onSubmit={onSubmitHandler}>
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
                <Button text="Register" />
            </AuthForm>
        </PageLayout>
    );
};

export default RegisterPage;