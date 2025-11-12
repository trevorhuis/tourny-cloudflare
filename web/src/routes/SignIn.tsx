import { createSignal } from "solid-js";
import { authClient } from "../lib/auth-client";

export default function SignIn() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await authClient.signIn.email({
      email: email(),
      password: password(),
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message || "Sign in failed");
    } else {
      // Redirect to home or dashboard after successful sign in
      window.location.href = "/";
    }
  };

  return (
    <div style={{ "max-width": "400px", margin: "auto", padding: "20px" }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
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
            "background-color": "#007bff",
            color: "white",
            border: "none",
            "border-radius": "4px",
            cursor: loading() ? "not-allowed" : "pointer"
          }}
        >
          {loading() ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <div style={{ "text-align": "center", "margin-top": "20px" }}>
        <a href="/signup" style={{ color: "#28a745", "text-decoration": "none" }}>
          Don't have an account? Sign up
        </a>
      </div>
    </div>
  );
}