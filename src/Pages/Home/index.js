import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chat, Sidebar } from "../../Components";
import { login, logout, selectUser } from "../../features/userSlice";
import { auth } from "../../utils/firebase";
import Login from "../Login";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="home">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
