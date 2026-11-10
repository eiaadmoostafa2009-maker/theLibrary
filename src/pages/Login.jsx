import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";

export default function Login(){
    const { register, handleSubmit , formState: {errors} } = useForm();
    
    const onSubmit = (data) => {
        alert("submited")
    }

    return(
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <Link to="/">The Library</Link>
                </div>
                <h2 className="auth-heading">Welcome back</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="login-email">Email</label>
                        <input 
                           id="login-email"
                           type="email" 
                           placeholder="you@example.com"
                           {...register("email", {
                               required: "Email is required",
                               pattern: {
                                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: "Invalid email format"
                               }
                           })} 
                        />
                        {errors.email && <p className="field-error">{ errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input 
                           id="login-password"
                           type="password" 
                           placeholder="••••••••"
                           {...register("password", {
                               required: "Password is required",
                               minLength: {
                                  value: 8,
                                  message: "Must be at least 8 characters"
                               }
                           })} 
                        />
                        {errors.password && <p className="field-error">{ errors.password.message}</p>}
                    </div>

                    <button type="submit" className="auth-submit">Sign In</button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    )
}
