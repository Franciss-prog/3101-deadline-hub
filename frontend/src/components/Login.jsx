import { Link, Router } from "react-router-dom";

import { useState, useRef, Fragment } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { srCodeFormat } from "../utils/auth";
import axios from "axios";

const Login = () => {
  // states
  const [srCodeDigits, setSrCodeDigits] = useState(Array(7).fill(""));
  const email = "@g.batstate-u.edu.ph";
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const srCodeRefs = useRef([]);

  // build sr-code string "XX-XXXXX" from digits
  const srCode = srCodeDigits.join("");
  const formattedSrCode = srCode.slice(0, 2) + "-" + srCode.slice(2);

  const handleSrCodeChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...srCodeDigits];
    next[index] = digit;
    setSrCodeDigits(next);
    if (digit && index < srCodeDigits.length - 1) {
      srCodeRefs.current[index + 1].focus();
    }
  };

  const handleSrCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !srCodeDigits[index] && index > 0) {
      const next = [...srCodeDigits];
      next[index - 1] = "";
      setSrCodeDigits(next);
      srCodeRefs.current[index - 1].focus();
    }
  };

  const handleSrCodePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 7);
    const next = Array(7).fill("");
    digits.split("").forEach((d, i) => (next[i] = d));
    setSrCodeDigits(next);
    if (digits.length > 0) {
      srCodeRefs.current[Math.min(digits.length - 1, 6)].focus();
    }
  };

  // function to handle login
  const onLogin = async (e) => {
    e.preventDefault();

    // form validataion
    if (!srCode || !password || !email) {
      toast.error("Please fill in all fields.", { duration: 1200 });
      return;
    }

    // validate if the srcode format is
    if (!srCodeFormat(formattedSrCode)) {
      toast.error("Invalid sr-code format.", { duration: 1200 });
      setSrCodeDigits(Array(7).fill(""));
      return;
    }

    try {
      setLoading(true);
      // if valid, we can post the data in the server
      const response = await axios.post("http://localhost:3000/login", {
        srCode: formattedSrCode,
        email: formattedSrCode + email,
        password,
      });

      // validate the response
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response.data.message, { duration: 1200 });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1201);
      }
    } catch (error) {
      // validate the error response
      if (error && axios.isAxiosError(error)) {
        toast.info(error?.response.data?.message);
      }

      // catch error occurs happens here
      toast.error("Login failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="loginPage">
      <form className="loginBox" onSubmit={onLogin}>
        <h3>Login</h3>
        <p className="registerSubtitle">Welcome back to Deadline Hub</p>

        <div className="RegisterInput">
          <label>Sr-code:</label>
          <div className="srCodeBoxes">
            {srCodeDigits.map((digit, index) => (
              <Fragment key={index}>
                {index === 2 && <span className="srCodeDash">-</span>}
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  pattern="[0-9]*"
                  className="srCodeInput"
                  value={digit}
                  ref={(el) => (srCodeRefs.current[index] = el)}
                  onChange={(e) => handleSrCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleSrCodeKeyDown(index, e)}
                  onPaste={handleSrCodePaste}
                />
              </Fragment>
            ))}
          </div>
        </div>

        <div className="RegisterInput">
          <label>Email:</label>
          <div className="emailDisplay">{formattedSrCode + email}</div>
        </div>

        <div className="RegisterInput">
          <label>Password:</label>
          <div className="PasswordField">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="PasswordToggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={17} strokeWidth={1.7} />
              ) : (
                <Eye size={17} strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>

        <button
          className="RegisterButton"
          type="submit"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="registerSubtitle">
          Don't have sr-code?
          <Link to="/register" className="registerLink">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
