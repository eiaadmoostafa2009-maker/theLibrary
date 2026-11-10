import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export default function Register(){
    const { register, handleSubmit , formState: {errors} } = useForm();
    
    const onSubmit = (data) => {
        alert("submited")
    }

    return(
        <div className="auth-page">
            <div className="page-title">
                <h2>Register</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div className="form-input">
                    <label name="user-name">User Name:-</label>
                    <input 
                       type="text" 
                       placeholder="Ahmed_Mohamed"
                       {...register("user-name", {
                           required: "user name is required",
                           minLength: {
                              value: 8,
                              message: "it must be atleast 8"
                           }
                       })} 
                    />
                </div>

                <div className="form-input">
                    <label name="email">Email:-</label>
                    <input 
                       type="email" 
                       placeholder="ahmed@yahoo.com"
                       {...register("email", {
                           required: "email is required",
                           pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Invalid email format"
                           }
                       })} 
                    />
                    {errors.email && <p className="error">{ errors.email.message}</p>}
                </div>

                <div className="form-input">
                    <label name="password">Password:-</label>
                    <input 
                       type="password" 
                       placeholder="********"
                       {...register("password", {
                           required: "password is required",
                           minLength: {
                              value: 8,
                              message: "it must be atleast 8"
                           }
                       })} 
                    />
                    {errors.password && <p className="error">{ errors.password.message}</p>}
                </div>

                <div className="btn">
                    <button type="submit">Submit</button>
                </div>
            </form>
             <Link to="/login" className="auth-link">already have account</Link>
        </div>
    )
}