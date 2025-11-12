import { Show } from "solid-js";
import { authClient } from "../lib/auth-client";

export default function Home() {
  const session = authClient.useSession();

  console.log(session());

  return (
    <div style={{ padding: "20px" }}>
      <Show
        when={session().data}
        fallback={
          <div>
            <h1>Welcome to the App</h1>
            <p>Please sign in or create an account to continue.</p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                "justify-content": "center",
              }}
            >
              <a
                href="/signin"
                style={{
                  padding: "10px 20px",
                  "background-color": "#007bff",
                  color: "white",
                  "text-decoration": "none",
                  "border-radius": "4px",
                }}
              >
                Sign In
              </a>
              <a
                href="/signup"
                style={{
                  padding: "10px 20px",
                  "background-color": "#28a745",
                  color: "white",
                  "text-decoration": "none",
                  "border-radius": "4px",
                }}
              >
                Sign Up
              </a>
            </div>
          </div>
        }
      >
        <div>
          <h1>
            Hello, {session().data?.user?.name || session().data?.user?.email}!
          </h1>
          <p>You are successfully signed in.</p>
          <button
            onClick={() => authClient.signOut()}
            style={{
              padding: "10px 20px",
              "background-color": "#dc3545",
              color: "white",
              border: "none",
              "border-radius": "4px",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </Show>
    </div>
  );
}
