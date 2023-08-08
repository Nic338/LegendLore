import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { login } from "../Managers/UserProfileManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './Login.css'

export const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login({ email })
            .then((user) => {
                if (user) {
                    setIsLoggedIn(true);
                    navigate("/");
                }
                else {
                    alert("Invalid email or password")
                }
            })
    }

    return (
        <div className="login-container">
            <h1 className="legend-header">Legend</h1>
            <h1 className="lore-header">Lore</h1>
            <Form onSubmit={loginSubmit} className="login-form">
                <FormGroup>
                    <Label for="email" className="email-label">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        className="email-input"
                    />
                </FormGroup>
                <FormGroup className="login-button-container">
                    <Button className="login-button">Login</Button>
                </FormGroup>
                <em className="register-link">
                    Not registered? <Link to="/register">Register</Link>
                </em>
            </Form>
        </div>
    );
};