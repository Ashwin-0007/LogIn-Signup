import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate each field
    let formErrors = {};
    formErrors.fullName = validateField("fullName", fullName);
    formErrors.username = validateField("username", username);
    formErrors.email = validateField("email", email);
    formErrors.password = validateField("password", password);
    formErrors.contactNumber = validateField("contactNumber", contactNumber);

    // Update errors state
    setErrors(formErrors);

  
    if (Object.values(formErrors).some((error) => error)) {
      // If there are errors, don't submit the form
      return;
    }

    // If no errors, submit the form
    const data = {
      fullName,
      username,
      email,
      password,
      contactNumber,
    };
    try {
      const res = await axios.post("http://localhost:8000/user/signup", data);
      console.log("Result", res);
      // Redirect to login after successful registration
      navigate("/login");
    } catch (err) {
      console.log("Error", err);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value) {
          return "Name Should not be empty.";
        } else if (/[!@#$%^&*()_+{}\]:;<>,.?~\\/-]$/.test(value)) {
          return "Full name should not contain special character.";
        } else if (/^\s|\s$/.test(value)) {
          return "Full name should not start or end with space.";
        }
        break;

      case "username":
        if (!value) {
          return "Username should not be empty.";
        } else if (!/^[a-zA-Z0-9_]{3,16}$/.test(value)) {
          return "Username should not contain special character.";
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          return "Email should not be empty.";
        } else if (!emailRegex.test(value)) {
          return "Please enter a valid email address.";
        }
        break;

      case "password":
        if (!value) {
          return "Password should not be empty.";
        } else if (!/[A-Z]/.test(value)) {
          return "Add at least one uppercase letter.";
        } else if (!/[a-z]/.test(value)) {
          return "Add at least one lowercase letter.";
        } else if (!/[0-9]/.test(value)) {
          return "Add at least one digit.";
        } else if (!/[!@#$%^&*()_+{}\]:;<>,.?~\\/-]/.test(value)) {
          return "Add at least one special character.";
        }
        break;

      case "contactNumber":
        const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number format
        if (!value) {
          return "Contact number should not be empty.";
        } else if (!phoneRegex.test(value)) {
          return "Please enter a valid contact number.";
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="main-container mt-30 w-[480px] h-fit bg-purple-100 p-8 rounded-xl shadow-lg">
        <h1 className="flex justify-center font-bold mb-2 font-sans">
          Register
        </h1>
        <form className="flex flex-col " onSubmit={handleSubmit}>
          <label className="ml-10 font-serif">Full name</label>
          <input
            type="text"
            placeholder="Full name"
            name="fullName"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setErrors(prevErrors => ({ ...prevErrors, fullName: "" }));
            }}
            className="border-2 mt-2 w-[80%] ml-9 rounded leading-5 p-2"
          />
          {errors.fullName && (
            <p className="ml-9 text-red-500">{errors.fullName}</p>
          )}
          <label className="ml-10 mt-2 font-serif"> Username </label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors(prevErrors => ({ ...prevErrors, username: "" }));
            }}
            className="border-2 mt-2 w-[80%] ml-9 rounded leading-5 p-2"
          />
          {errors.username && (
            <p className="ml-9 text-red-500">{errors.username}</p>
          )}
          <label className="ml-10 mt-2 font-serif">Email</label>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prevErrors => ({ ...prevErrors, email: "" }));
            }}
            className="border-2 mt-2 w-[80%] ml-9 rounded leading-5 p-2"
          />
          {errors.email && <p className="ml-9 text-red-500">{errors.email}</p>}
          <label className="ml-10 mt-2 font-serif">Password</label>
          <div className="relative border-2 mt-2 w-[80%] ml-9 rounded">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
              }}
              className=" leading-5 p-2"
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {errors.password && (
            <p className="ml-9 text-red-500">{errors.password}</p>
          )}

          <label className="ml-10 mt-2 font-serif">Contact Number</label>
          <input
            type="text"
            placeholder="Contact number"
            name="contactNumber"
            value={contactNumber}
            onChange={(e) => {
              setContactNumber(e.target.value);
              setErrors(prevErrors => ({ ...prevErrors, contactNumber: "" }));
            }}
            className="border-2 mt-2 w-[80%] ml-9 rounded leading-5 p-2"
          />
          {errors.contactNumber && (
            <p className="ml-9 text-red-500">{errors.contactNumber}</p>
          )}
          <div className="flex justify-center items-center mt-6">
            <button className="bg-blue-500 text-white p-1.5 w-[80%] rounded-md font-serif">
              SIGN UP
            </button>
          </div>
        </form>
        <div className="btns mt-6 ml-9">
                    Already having an account?
                    <Link to="/login" className="btn1 text-blue-700"> LogIn</Link>
                </div>
      </div>
    </div>
  );
};

export default Register;
