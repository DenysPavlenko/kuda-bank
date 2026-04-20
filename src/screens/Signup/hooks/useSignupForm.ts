import { useAppContext } from "@/src/context/AppContext";
import { isAxiosError } from "axios";
import { useCallback, useState } from "react";

type FormErrors = Partial<
  Record<"name" | "email" | "password" | "tos", string>
>;

function validate(
  name: string,
  email: string,
  password: string,
  agreedToTos: boolean,
): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = "Name is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email";
  if (password.length < 8)
    errors.password = "Password must be at least 8 characters";
  if (!agreedToTos) errors.tos = "You must agree to the terms";
  return errors;
}

export function useSignupForm() {
  const { signUp } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTos, setAgreedToTos] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    const formErrors = validate(name, email, password, agreedToTos);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setApiError(null);
    setLoading(true);

    try {
      await signUp({ name, email, password });
    } catch (e) {
      setApiError(
        isAxiosError(e) ? e.message : "Network error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [name, email, password, agreedToTos, signUp]);

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    agreedToTos,
    setAgreedToTos,
    errors,
    apiError,
    loading,
    handleSubmit,
  };
}
