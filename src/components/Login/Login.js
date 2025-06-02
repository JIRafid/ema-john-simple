import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const [loggedInUser, setloggedInUser] = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
        };
        setUser(signedOutUser);
      })
      .catch((error) => {
        console.error("Sign-out error:", error.message);
      });
  };

  const handleChange = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          verifyEmail();
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.sucess = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setloggedInUser(newUserInfo);
          navigate(from.pathname, { replace: true });
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.sucess = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((error) => {});
  };

  const verifyEmail = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };
  const resetPassword = (email) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onBlur={handleSignOut}>Sign Out</button>
      ) : (
        <button onBlur={handleSignIn}>Sign In Using Google</button>
      )}
      <br />
      <button>Sign In Using Facebool</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Our Own Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onBlur={handleChange}
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleChange}
          placeholder="Your Email Address"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleChange}
          placeholder="Your Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <button onClick={() => resetPassword(user.email)}>Forget Password</button>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} Successfully
        </p>
      )}
    </div>
  );
}

export default Login;
