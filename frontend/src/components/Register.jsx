import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Check } from "lucide-react";
import { decodeStudentQr } from "../utils/qrAuth";
import QrScanner from "./QrScanner";
import axios from "axios";

const Register = () => {
  const [srCode, setSrCode] = useState("");
  const [role, setRole] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("@g.batstate-u.edu.ph");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle a raw decoded QR string from either the camera or file upload path
  const handleQrScan = useCallback((rawText) => {
    const payload = decodeStudentQr(rawText);
    if (!payload) {
      toast.error("Invalid student sr-code QR.", { duration: 1200 });
      return;
    }

    // deconstruct the payload
    const { srcode, fullname, type } = payload;
    setSrCode(srcode);
    setRole(type.toLowerCase());
    setFullname(fullname);

    toast.success("Sr-code confirmed from QR.", { duration: 1200 });
  }, []);

  // handle mechanical scan failures (camera/permission issues, unreadable file)
  const handleQrError = useCallback((message) => {
    toast.error(
      typeof message === "string"
        ? message
        : "Could not read the QR code. Try again.",
      { duration: 1200 },
    );
  }, []);

  const handleRescan = () => {
    setSrCode("");
    setFullname("");
  };

  const onRegister = async (e) => {
    e.preventDefault();

    if (!srCode) {
      toast.error("Scan your student QR code first.", { duration: 1200 });
      return;
    }
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.", { duration: 1200 });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", { duration: 1200 });
      setPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/register", {
        srCode,
        email: srCode + email,
        name: fullname,
        role,
        password,
      });

      if (response.status === 200) {
        toast.success(response.data.message, { duration: 1200 });
        setTimeout(() => (window.location.href = "/dashboard"), 1201);
        setSrCode("");
        setFullname("");
        setEmail("@g.batstate-u.edu.ph");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        toast.error(
          error?.response?.data?.message ??
            "Register failed. Please try again.",
          { duration: 1200 },
        );
      } else {
        toast.error("Register failed. Please try again.", { duration: 1200 });
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="RegisterPage">
      <form className="RegisterBox" onSubmit={onRegister}>
        <h3>Register</h3>
        <p className="registerSubtitle">Create your Deadline Hub account</p>

        <div className="StepIndicator">
          <div className="StepIndicatorBar">
            <div
              className="StepIndicatorFill"
              style={{ width: srCode ? "100%" : "50%" }}
            />
          </div>
          <span className="StepIndicatorLabel">
            {srCode
              ? "Step 2 of 2 — Set your password"
              : "Step 1 of 2 — Scan your student QR"}
          </span>
        </div>

        {!srCode ? (
          <QrScanner onScan={handleQrScan} onError={handleQrError} />
        ) : (
          <>
            <div className="ScannedIdentity">
              <div className="ScannedIdentityCheck">
                <Check size={18} strokeWidth={2.4} />
              </div>
              <div className="ScannedIdentityText">
                <span className="ScannedFullname">{fullname}</span>
                <span className="ScannedSrCode">{srCode}</span>
              </div>
              <button
                type="button"
                className="RescanLink"
                onClick={handleRescan}
              >
                Scan a different code
              </button>
            </div>

            <div className="RegisterInput">
              <label>Email</label>
              <div className="emailDisplay">{srCode + email}</div>
            </div>

            <div className="RegisterInput">
              <label>Password</label>
              <div className="PasswordField">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
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

            <div className="RegisterInput">
              <label>Confirm</label>
              <div className="PasswordField">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="PasswordToggle"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
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
              {loading ? "Registering..." : "Register"}
            </button>
          </>
        )}

        <p className="registerSubtitle">
          Already have an account?{" "}
          <a href="/" className="registerLink">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
