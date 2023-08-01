import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManager";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

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
    <Form>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="userName">User Name</Label>
          <Input id="userName" type="text" onChange={e => setUserName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button onClick={registerClick}>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
