import { Button } from "@material-ui/core";
import { auth, provider } from "../../utils/firebase";
import "./Login.css";

const Login = () => {
  const handleSignIn = () => {
    auth.signInWithPopup(provider).catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <img src="/images/discord.png" alt="discord" className="login__logo" />

      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
};

export default Login;
