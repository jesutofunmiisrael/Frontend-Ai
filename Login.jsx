

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginSchema = yup.object({
  email: yup.string().required("Email is required").email("Please enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [Creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setCreating(true);
    try {
      const response = await fetch(`http://localhost:4000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", result.token);
        toast.success(result.message || "Welcome!");
        navigate("/dashboard");
      } else if (response.status === 403) {
        toast.error(result.message || "Email or password incorrect");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(145deg, #040404, #0E4D92);
          font-family: Arial, sans-serif;
        }

        .form {
          width: 360px;
          background: #ffffff;
          padding: 2rem;
          margin: 4rem auto;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        label {
          font-size: 0.88rem;
          font-weight: 600;
          margin-bottom: 5px;
          display: block;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
          transition: 0.2s ease-in-out;
        }

        input:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.2);
        }

        .password-container {
          display: flex;
          flex-direction: column;
        }

        .toggle-btn {
          font-size: 0.8rem;
          color: #0d6efd;
          cursor: pointer;
          margin-top: 6px;
          align-self: flex-end;
        }

        .toggle-btn:hover {
          text-decoration: underline;
        }

        .error-message {
          color: red;
          font-size: 0.8rem;
          margin-top: 4px;
        }

        button {
          padding: 12px;
          background: #0E4D92;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.2s ease;
          font-size: 1rem;
        }

        button:hover {
          background: #0a3570;
        }

        .forgot {
          text-align: right;
        }

        .forgot span {
          font-size: 0.85rem;
          color: #0d6efd;
          cursor: pointer;
        }

        .forgot span:hover {
          text-decoration: underline;
        }
      `}</style>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>

     
        <div>
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

      
        <div className="password-container">
          <label htmlFor="password">PASSWORD</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}

          <span className="toggle-btn" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? "Hide Password" : "Show Password"}
          </span>
        </div>

       
        <div className="forgot">
          <span>Forgot password?</span>
        </div>

        <button type="submit">
          {Creating ? "Logging in..." : "LOGIN"}
        </button>

      </form>
    </>
  );
};

export default Login;
