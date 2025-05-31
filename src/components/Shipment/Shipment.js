import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { UserContext } from "../../App";

const Shipment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loggedInUser, setloggedInUser] = useContext(UserContext);

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
  };

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", { required: true })}
        defaultValue={loggedInUser.name}
        placeholder="Name"
      />
      {errors.name && (
        <span className="error">Name is required</span>
      )}

      <input
        {...register("email", { required: true })}
        defaultValue={loggedInUser.email}
        placeholder="Email"
      />
      {errors.email && (
        <span className="error">Email is required</span>
      )}

      <input
        {...register("address", { required: true })}
        placeholder="Address"
      />
      {errors.address && (
        <span className="error">Address is required</span>
      )}

      <input
        {...register("phone", { required: true })}
        placeholder="Phone Number"
      />
      {errors.phone && (
        <span className="error">Phone is required</span>
      )}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
