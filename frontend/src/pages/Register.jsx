import { useEffect, useRef, useState } from "react";

export default function Register({ onClose, onOpenLogin }) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  }

  function validate() {
    const { name, email, password, confirm } = values;
    if (!name || !email || !password || !confirm) return "All fields are required!";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setSuccess("✅ Account created successfully!");
      setValues({ name: "", email: "", password: "", confirm: "" });
      setTimeout(() => {
        onClose();
        if (onOpenLogin) onOpenLogin();
      }, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h2>
        <p className="text-sm text-slate-500 mb-4">Sign up to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 bg-red-50 p-2 rounded">{error}</div>}
          {success && <div className="text-green-600 bg-green-50 p-2 rounded">{success}</div>}

          <input
            ref={firstInputRef}
            type="text"
            name="name"
            placeholder="Full Name"
            value={values.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-sky-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-sky-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-sky-500"
          />

          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={values.confirm}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-sky-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-3 text-sm text-center text-slate-600">
          Already have an account?{" "}
          <button onClick={onOpenLogin} className="text-sky-600 hover:underline font-medium">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
