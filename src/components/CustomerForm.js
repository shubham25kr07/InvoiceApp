import { useState } from "react";
import FormInput from "../Utils/FormInput";
import { useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({
    Name: "",
    Phone: "",
    Email: "",
  });
  const navigate = useNavigate();
  const { name, email, phone_number } = inputValue;
  const url = "http://localhost:8080/v1/customer/add";

  const handleChange = (type, e) => {
    const { value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleBlur = (type, e) => {
    const { value } = e.target;
    if (value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [type]: ` *${type} is a Required`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [type]: "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValue),
    })
      .then(async (response) => {
        const x = await response.json();

        // return x;
        if (response.status !== 200) {
          throw new Error(x.message);
        } else {
          return x;
        }
      })
      .then((json) => {
        alert("Customer Added Successfully");
        navigate("/customer");
      })
      .catch((error) => {
        console.table(error);
      });
  };

  return (
    <div className="form-container">
      <div className="title">New Customer</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container customer-input-container">
          <div className="lable-input">
            <FormInput
              testId={"name"}
              type="text"
              value={name}
              placeholder="Customer Name"
              label="Name"
              name="name"
              onChange={handleChange.bind(null, "name")}
              onBlur={handleBlur.bind(null, "Name")} //change the name of handleBlur
            />
            <div>
              {errors.Name && (
                <div className="customer-error">{errors.Name}</div>
              )}
            </div>
          </div>
          <div className="lable-input  ic1">
            <FormInput
              type="text"
              testId={"phone"}
              value={phone_number}
              placeholder="Phone Number"
              label="Phone"
              name="phoneNumber"
              onChange={handleChange.bind(null, "phone_number")}
              onBlur={handleBlur.bind(null, "Phone")} //change the name of handleBlur
            />
            <div>
              {errors.Phone && (
                <div className="customer-error">{errors.Phone}</div>
              )}
            </div>
          </div>
        </div>
        <div className="input-container customer-input-container">
          <div className="lable-input">
            <FormInput
              testId={"email"}
              type="text"
              value={email}
              placeholder="Email"
              label="Email"
              name="email"
              onChange={handleChange.bind(null, "email")}
              onBlur={handleBlur.bind(null, "Email")} //change the name of handleBlur
            />
            <div>
              {errors.Email && (
                <div className="customer-error">{errors.Email}</div>
              )}
            </div>
          </div>
          <div className="lable-input  ic1">
            <button className="submit">
              <i className="fa fa-file"></i>Save Customer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CustomerForm;
