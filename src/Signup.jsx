
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
     
       toast.success("SIGNUP SUCCESSFULLY!  ✅ ")
          // reset()
          // useNavigate()
          navigate('/login')
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
      background: #ede6e6ff; 
      font-family: Arial, sans-serif;
    }

    .form {
      width: 350px;
      background: white;
      padding: 2rem;
      margin: 3rem auto;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      animation: fadeIn 0.4s ease;
    }

    label {
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 4px;
      display: block;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      outline: none;
      transition: 0.2s ease;
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

    button {
      padding: 12px;
      background: #0a0d13ff;
      color: white;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.2s ease;
    }

    button:hover {
      background: #b73737ff;
    }

    span {
      font-size: 0.8rem;
      color: #0d6efd;
      cursor: pointer;
      margin-top: 5px;
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

        <div>
          <label htmlFor="password">PASSWORD</label>
          <input 
            type={showpassword ? "text" : "password"} 
            id='password' 
            {...register("password")}  
          />
          <span onClick={() => setshowpassword(p => !p)}>
          {errors.password && <p className='error-message'>{errors.password.message}</p>}
            {showpassword ? "Hide" : "Show"}
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

