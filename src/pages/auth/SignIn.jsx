import { Controller, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const SignIn = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const currentUserStorage = useLocalStorage("currentUser");
  const userStorage = useLocalStorage("users");

  useEffect(() => {
    const currentUser = currentUserStorage.get();
    const justSignedUp = localStorage.getItem("justSignedUp");

    if (currentUser && !justSignedUp) {
      navigate("/");
    }

    if (justSignedUp) {
      localStorage.removeItem("justSignedUp");
    }
  }, [navigate, currentUserStorage]);

  const submit = (data) => {
    const users = userStorage.get() || [];

    const user = users.find((user) => user.email === data.email);

    if (!user) {
      setErrorMessage("Email not found.");
      return;
    }

    if (user.password !== data.password) {
      setErrorMessage("Incorrect password.");
      return;
    }

    currentUserStorage.set(user);
    localStorage.setItem("justSignedUp", "true");

    if (data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center p-3">
      <h2 className="font-bold text-2xl lg:text-4xl mb-3 text-center">Welcome Back to Orderly.</h2>
      <p className="text-lg lg:text-2xl">Sign in to your account</p>

      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-4 mt-6 lg:w-2/3 border-2 shadow-xl p-5 rounded-lg border-gray-500 w-full"
      >
        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2 border p-2 shadow-lg rounded-lg">
            {errorMessage}
          </p>
        )}

        {/* Email */}
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="flex flex-col">
              <Input {...field} placeholder="Email" type="email" />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </div>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Password is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="flex flex-col">
              <Input {...field} placeholder="Password" type="password" />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </div>
          )}
        />

        <button
          type="submit"
          className="bg-slate-700 text-white py-2 px-4 rounded-lg"
        >
          Sign In
        </button>
        <p className="mx-auto text-lg">
          Don't have an account ?
          <Link className="ms-1 underline font-bold" to={"/signUp"}>
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignIn;
