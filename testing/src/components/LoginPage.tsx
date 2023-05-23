import { useState, FormEvent } from "react";
import { loginRequest } from "../api/auth";
import { useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response  = await loginRequest(email, password);
    setToken(response.data.access, response.data.refresh);
    console.log(response.data.access, response.data.refresh);
    navigate("/foo");
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className=""
      >
        <h1 className="">Login</h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="user@mail.com"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
        />
        <button className="">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
