import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate()

  const onLoginSubmit: SubmitHandler<LoginFormValues> = (data) => {
    try{
      login(data)
      navigate("/planner")
    }catch(error){
      console.error(error)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md glass-card rounded-3xl p-8 md:p-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-2">Welcome Back</h1>
          <p className="text-gray-400">Enter your credentials to continue your journey</p>
        </div>

        <form
          onSubmit={handleSubmit(onLoginSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 ml-1" htmlFor="email">Email</label>
            <input
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim,
                  message: "Invalid email format",
                },
              })}
              type="email"
              id="email"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-xs text-red-400 ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 ml-1" htmlFor="password">Password</label>
            <input
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type="password"
              id="password"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs text-red-400 ml-1">{errors.password.message}</p>}
          </div>

          <button
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] mt-2 cursor-pointer"
            type="submit"
          >
            Sign In
          </button>
          
          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link className="text-blue-400 font-semibold hover:underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
