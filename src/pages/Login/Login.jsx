function Login() {
    function handleLogin() {
        localStorage.setItem("user", "true");
        window.location.href = "/dashboard";
    }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
