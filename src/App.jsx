import { useState } from "react";
import "./App.css";
import CustomInput from "./CustomInput";

function App() {
  const [formInputsVals, setFormInputsVals] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });
  const [showErrors, setShowErrors] = useState({
    firstName: false,
    lastName: false,
    emailAddress: false,
    password: false,
  });
  const formInputsArr = [
    {
      id: 0,
      name: "firstName",
      place: "First Name",
      errorMsg: "First Name cannot be empty",
    },
    {
      id: 1,
      name: "lastName",
      place: "Last Name",
      errorMsg: "Last Name cannot be empty",
    },
    {
      id: 2,
      name: "emailAddress",
      place: "Email Address",
      errorMsg: "Look like this is not an email",
    },
    {
      id: 3,
      name: "password",
      place: "Password",
      errorMsg: "Password cannot be empty",
    },
  ];

  const handleInputChange = (e, name) => {
    setFormInputsVals((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (!formInputsVals.firstName.trim()) {
      setShowErrors((prev) => ({ ...prev, firstName: true }));
    } else {
      setShowErrors((prev) => ({ ...prev, firstName: false }));
    }
    if (!formInputsVals.lastName.trim()) {
      setShowErrors((prev) => ({ ...prev, lastName: true }));
    } else {
      setShowErrors((prev) => ({ ...prev, lastName: false }));
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(formInputsVals.emailAddress)) {
      setShowErrors((prev) => ({ ...prev, emailAddress: true }));
    } else {
      setShowErrors((prev) => ({ ...prev, emailAddress: false }));
    }

    if (!formInputsVals.password.trim()) {
      setShowErrors((prev) => ({ ...prev, password: true }));
    } else {
      setShowErrors((prev) => ({ ...prev, password: false }));
    }
  };
  return (
    <>
      <main className="container">
        <section className="intro-side">
          <h1 className="intro-title">Learn to code by watching others</h1>
          <p className="intro-text">
            See how experienced developers solve problems in real-time. Watching
            scripted tutorials is great, but understanding how developers think
            is invaluable.
          </p>
        </section>
        <section className="form-side">
          <div className="price-box">
            <span className="price-offer">Try it free 7 days</span> then $20/mo.
            thereafter
          </div>
          <form className="form-box">
            {formInputsArr.map((input) => (
              <CustomInput
                key={input.id}
                info={input}
                error={showErrors[input.name]}
                value={formInputsVals[input.name]}
                handleChange={handleInputChange}
              />
            ))}
            <button
              type="submit"
              className="form-submit"
              onClick={handleSumbit}
            >
              Claim your free trial
            </button>
            <p className="terms-text">
              By clicking the button, you are agreeing to our{" "}
              <a href="#" className="terms-link">
                Terms and Services
              </a>
            </p>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
