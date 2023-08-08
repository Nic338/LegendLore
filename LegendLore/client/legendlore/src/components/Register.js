import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManager";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './Auth.css'

export const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    const userProfile = { firstName, lastName, userName, email };
    register(userProfile)
      .then(() => {
        setIsLoggedIn(true)
        navigate('/')
      });
  }


  return (
    <div className="auth-container">
      <h1 className="auth-header">Register</h1>
    <Form>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName" className="auth-label">First Name</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} className="auth-input" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName" className="auth-label">Last Name</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} className="auth-input"/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="userName" className="auth-label">User Name</Label>
          <Input id="userName" type="text" onChange={e => setUserName(e.target.value)} className="auth-input"/>
        </FormGroup>
        <FormGroup>
          <Label for="email" className="auth-label">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} className="auth-input"/>
        </FormGroup>
        <FormGroup>
          <Button onClick={registerClick} className="auth-button">Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
    </div>
  );
}
