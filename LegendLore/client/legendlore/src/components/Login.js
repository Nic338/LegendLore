import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { login } from "../Managers/UserProfileManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

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
        <Form onSubmit={loginSubmit}>
            <fieldset>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button>Login</Button>
                </FormGroup>
                <em>
                    Not registered? <Link to="/register">Register</Link>
                </em>
            </fieldset>
        </Form>
    );
}