

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignupSchema = yup.object({
  email: yup.string().required("Email is required").email("Please enter a valid email"),
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setloading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: [],
    }
  });

  const onSubmit = async (data) => {
    setloading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/auth/signup`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const result = await res.json()

      if(!result.success){
        throw new Error(result.message || "failed to sign up")
      }

      if(res.status === 201){
        toast.success("SIGNUP SUCCESSFULLY!  ✅ ");
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
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
          margin: 3.5rem auto;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        label {
          font-size: 0.88rem;
          font-weight: 600;
          display: block;
          margin-bottom: 5px;
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

        .error-message {
          color: red;
          font-size: 0.8rem;
          margin-top: 4px;
        }

        .password-container {
          position: relative;
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
      `}</style>

      <form className='form' onSubmit={handleSubmit(onSubmit)}>

    
        <div>
          <label htmlFor="name">FULL NAME</label>
          <input type="text" id='name' {...register("name")} />
          {errors.name && <p className='error-message'>{errors.name.message}</p>}
        </div>

     
        <div>
          <label htmlFor="email">EMAIL</label>
          <input type="text" id='email' {...register("email")} />
          {errors.email && <p className='error-message'>{errors.email.message}</p>}
        </div>

      
        <div className="password-container">
          <label htmlFor="password">PASSWORD</label>
          <input 
            type={showpassword ? "text" : "password"} 
            id='password' 
            {...register("password")}  
          />

          {errors.password && <p className='error-message'>{errors.password.message}</p>}

          <span className="toggle-btn" onClick={() => setshowpassword(prev => !prev)}>
            {showpassword ? "Hide Password" : "Show Password"}
          </span>
        </div>

        <button type='submit'>
          {loading ? "Creating..." : "CREATE ACCOUNT"}
        </button>

      </form>
    </>
  );
};

export default Signup;
