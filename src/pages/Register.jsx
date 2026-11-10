import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export default function Register(){
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
                <h2 className="auth-heading">Create your account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="reg-username">Username</label>
                        <input 
                           id="reg-username"
                           type="text" 
                           placeholder="Your name"
                           {...register("user-name", {
                               required: "Username is required",
                               minLength: {
                                  value: 3,
                                  message: "Must be at least 3 characters"
                               }
                           })} 
                        />
                        {errors["user-name"] && <p className="field-error">{ errors["user-name"].message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="reg-email">Email</label>
                        <input 
                           id="reg-email"
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
                        <label htmlFor="reg-password">Password</label>
                        <input 
                           id="reg-password"
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

                    <button type="submit" className="auth-submit">Create Account</button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    )
}
