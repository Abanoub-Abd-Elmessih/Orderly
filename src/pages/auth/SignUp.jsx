import { Controller, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";

const SignUp = () => {
  const { control, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const currentUserStorage = useLocalStorage("currentUser");
  const usersStorage = useLocalStorage("users");

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
    const users = usersStorage.get() || [];
    const isEmailExist = users.some((user) => user.email === data.email);

    if (isEmailExist) {
      setErrorMessage("This email is already registered.");
      return;
    }

    users.push(data);
    usersStorage.set(users);
    currentUserStorage.set(data);
    localStorage.setItem("justSignedUp", "true");

    toast.success("Register Successfully");
    reset();
    setErrorMessage("");

    if (data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center p-3">
      <h2 className="font-bold text-4xl mb-3">Welcome to Orderly.</h2>
      <p className="text-2xl">Create a new account</p>

      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-4 mt-6 lg:w-2/3 w-full border-2 shadow-xl p-5 rounded-lg border-gray-500"
      >
        {/* Username */}
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Username is required" }}
          render={({ field, fieldState: { error } }) => (
            <div className="flex flex-col">
              <Input {...field} placeholder="Username" />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </div>
          )}
        />

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
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
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
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
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

        {/* Role Select */}
        <Controller
          name="role"
          control={control}
          defaultValue=""
          rules={{ required: "Role is required" }}
          render={({ field, fieldState: { error } }) => (
            <fieldset className="fieldset">
              <select
                defaultValue="Pick a browser"
                className="select w-full"
                {...field}
              >
                <option disabled={true}>Select Role</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </fieldset>
          )}
        />

        <button
          type="submit"
          className="bg-slate-700 text-white py-2 px-4 rounded-lg "
        >
          Submit
        </button>
        <p className="mx-auto text-lg">
          Already have an account ?
          <Link className="ms-1 underline font-bold" to={"/signIn"}>
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
