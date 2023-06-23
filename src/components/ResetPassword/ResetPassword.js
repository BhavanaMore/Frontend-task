import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../../firebase";

import InputControl from "../InputControl/InputControl";

import styles from "./ResetPassword.module.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetButtonDisabled, setResetButtonDisabled] = useState(false);
  const handleResetPassword = () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setResetButtonDisabled(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetButtonDisabled(false);
        setSuccessMessage(
          "Password reset email sent. Please check your email."
        );
      })
      .catch((error) => {
        setResetButtonDisabled(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Reset Password</h1>

        <InputControl
          label="Email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <div className={styles.footer}>
          {errorMessage && <b className={styles.error}>{errorMessage}</b>}
          {successMessage && <b className={styles.success}>{successMessage}</b>}

          <button
            className={styles.resetButton}
            disabled={resetButtonDisabled}
            onClick={handleResetPassword}
          >
            Reset Password
          </button>

          <p>
            Remember your password?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
