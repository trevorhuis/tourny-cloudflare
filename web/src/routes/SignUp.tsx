import { createSignal } from "solid-js";
import { authClient } from "../lib/auth-client";

export default function SignUp() {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signUpError } = await authClient.signUp.email({
      name: name(),
      email: email(),
      password: password(),
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message || "Sign up failed");
    } else {
      // Redirect to sign in page after successful sign up
      window.location.href = "/signin";
    }
  };

  return (
    <div style={{ "max-width": "400px", margin: "auto", padding: "20px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ "margin-bottom": "10px" }}>
          <label for="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name()}
            onInput={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", "margin-top": "5px" }}
          />
        </div>
        <div style={{ "margin-bottom": "10px" }}>
          <label for="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", "margin-top": "5px" }}
          />
        </div>
        <div style={{ "margin-bottom": "10px" }}>
          <label for="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", "margin-top": "5px" }}
          />
        </div>
        {error() && (
          <div style={{ color: "red", "margin-bottom": "10px" }}>
            {error()}
          </div>
        )}
        <button
          type="submit"
          disabled={loading()}
          style={{
            width: "100%",
            padding: "10px",
            "background-color": "#28a745",
            color: "white",
            border: "none",
            "border-radius": "4px",
            cursor: loading() ? "not-allowed" : "pointer"
          }}
        >
          {loading() ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div style={{ "text-align": "center", "margin-top": "20px" }}>
        <a href="/signin" style={{ color: "#007bff", "text-decoration": "none" }}>
          Already have an account? Sign in
        </a>
      </div>
    </div>
  );
}