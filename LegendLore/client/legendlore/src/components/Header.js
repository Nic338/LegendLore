import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../Managers/UserProfileManager";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar style={{ backgroundColor: '#004e63' }} light expand="md">
        <NavbarBrand tag={RRNavLink} to="/" style={{ color: "white", textShadow: "2px 2px 4px #000",fontFamily: "Fauna One, san serif" }}>
          Legend Lore
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn && (
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  to="/my-campaigns"
                  style={{ color: "white", textShadow: "2px 2px 4px #000", fontFamily: "Fauna One, san serif" }}
                >
                  My Campaigns
                </NavLink>
              </NavItem>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login" style={{ color: "white", textShadow: "2px 2px 4px #000", fontFamily: "Fauna One, san serif" }}>
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    to="/register"
                    style={{ color: "white", fontFamily: "Fauna One, san serif", textShadow: "2px 2px 4px #000" }}
                  >
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav className="ms-auto" navbar>
            {isLoggedIn && (
              <NavItem>
                <a
                  aria-current="page"
                  className="nav-link"
                  style={{ cursor: "pointer", color: "white", textShadow: "2px 2px 4px #000", fontFamily: "Fauna One, san serif" }}
                  onClick={() => {
                    logout();
                    setIsLoggedIn(false);
                  }}
                >
                  Logout
                </a>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};