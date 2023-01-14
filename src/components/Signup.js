import React, { useState } from "react";
import { Nav } from "./Nav";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { signupValidation } from "../util";
import axios from "axios";
import { toast } from "react-toast";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const navigate = useNavigate();
  const signupHandler = async (e) => {
    e.preventDefault();
    if (signupValidation(userInput, setError)) {
      try {
        const {
          data: { success },
        } = await axios.post(`https://api-swiftflix.vercel.app/auth/signup`, {
          firstName: userInput?.firstName,
          lastName: userInput?.lastName,
          email: userInput?.email,
          password: userInput?.password,
        });
        if (success) {
          navigate("/login");
          toast.success("signed up successfully");
        }
      } catch (error) {
        console.log("Didn't Signed Up Please try again!!", error);
        toast.error("Didn't Signed Up Please try again!!");
      }
    }
  };
  return (
    <>
      <Nav />
      <h1>signup</h1>
      <form onSubmit={signupHandler} className="login">
        <TextField
          required
          id="outlined-required"
          label="enter FirstName"
          value={userInput.firstName}
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
        <small>{error.firstNameError}</small>
        <TextField
          required
          id="outlined-required"
          label="enter LastName"
          value={userInput.lastName}
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
        <small>{error.lastNameError}</small>
        <TextField
          required
          id="outlined-required"
          label="enter E-mail"
          value={userInput.email}
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <small>{error.emailError}</small>
        <div className="text-password">
          <TextField
            required
            id="outlined-required"
            type={showPassword ? "text" : "password"}
            label="enter Password"
            value={userInput.password}
            onChange={(e) =>
              setUserInput((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <span onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </span>
        </div>
        <small>{error.passwordError}</small>
        <div className="text-password">
          <TextField
            required
            id="outlined-required"
            type={showConfirmPassword ? "text" : "password"}
            label=" Re-enter Password"
            value={userInput.confirmPassword}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
          <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
          </span>
        </div>
        <small>{error.confirmPasswordError}</small>
        <Button
          type="submit"
          variant="contained"
          style={{ margin: "2rem" }}
          color="secondary"
        >
          Sign up
        </Button>
        <small>Already have an Account?</small>
        <Link to="/login">
          <Button
            variant="contained"
            className="submit-button"
            color="secondary"
          >
            login
          </Button>{" "}
        </Link>
      </form>
    </>
  );
};
