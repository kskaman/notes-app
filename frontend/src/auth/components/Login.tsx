import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextInput from "../../ui/TextInput";
import Button from "../../ui/Button";
import Divider from "../../ui/Divider";

interface LoginFormValues {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: yup.string().required("Password is required"),
  })
  .required();

export default function Login() {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login", data);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Heading */}
      <h1 className="text-preset-1 text-[var(--heading-text)]">
        Welcome to Note
      </h1>

      {/* Subheading */}
      <p className="text-preset-5 text-[var(--subheading-text-1)]">
        Please log in to continue
      </p>

      {/* Form */}
      <form className="w-full flex flex-col">
        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              label="Email Address"
              placeholder="Enter your email"
              error={
                fieldState.error
                  ? { message: fieldState.error.message }
                  : undefined
              }
            />
          )}
        />

        {/* Password with “Forgot?” link */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              label="Password"
              placeholder="Enter your password"
              error={
                fieldState.error
                  ? { message: fieldState.error.message }
                  : undefined
              }
              subLabel={
                <Link
                  to="/auth/reset-password"
                  className="underline cursor-pointer text-preset-7 text-[var(--subheading-option-one-text)]"
                >
                  Forgot
                </Link>
              }
            />
          )}
        />

        {/* Login button */}
        <Button variant="primary" width="100%" onClick={handleSubmit(onSubmit)}>
          Login
        </Button>
      </form>

      {/* Divider */}
      <Divider />

      {/* Social login */}
      <p className="text-preset-5 text-[var(--subheading-text-1)] text-center">
        Or log in with
      </p>
      <Button
        variant="outlined"
        width="100%"
        onClick={() => console.log("Google")}
      >
        Google
      </Button>

      {/* Divider */}
      <Divider />

      {/* Sign up link */}
      <p className="text-preset-5 text-[var(--subheading-text-1)] text-center">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="
              cursor-pointer 
              text-preset-5 
              text-[var(--subheading-option-one-text)]
            "
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
