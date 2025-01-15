import "./App.css";
import { useState } from "react";
import { z } from "zod";
import { create } from "zustand";

// Define the Zustand store
interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressStore {
  addresses: Address[];
  addAddress: (address: Address) => void;
  deleteAddress: (index: number) => void;
}

const useAddressStore = create<AddressStore>((set) => ({
  addresses: [],
  addAddress: (address) =>
    set((state) => ({ addresses: [...state.addresses, address] })),
  deleteAddress: (index) =>
    set((state) => ({
      addresses: state.addresses.filter((_, i) => i !== index),
    })),
}));

const App = () => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const schema = z.object({
    street: z.string().nonempty("Street is required"),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    zip: z.string().regex(/^\d{5}$/, "Zip Code must be 5 digits"),
  });

  const validate = () => {
    try {
      schema.parse(formData);
      setErrors({ street: "", city: "", state: "", zip: "" });
      return true;
    } catch (e) {
      const newErrors = (e as z.ZodError).errors
        .map((error) => {
          if (typeof error.path[0] === "string") {
            return { [error.path[0]]: error.message };
          }
          return {};
        })
        .reduce((acc, error) => ({ ...acc, ...error }), {});
      setErrors(newErrors);
      return false;
    }
  };

  const addAddress = useAddressStore((state) => state.addAddress);
  const deleteAddress = useAddressStore((state) => state.deleteAddress);
  const addresses = useAddressStore((state) => state.addresses);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      addAddress(formData);
      setFormData({ street: "", city: "", state: "", zip: "" });
    }
  };

  return (
    <div className="content">
      <h1>Rsbuild with React a</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="street">
            Street:
          </label>
          <input
            className="form-input"
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
          {errors.street && <span className="error">{errors.street}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="city">
            City:
          </label>
          <input
            className="form-input"
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="state">
            State:
          </label>
          <input
            className="form-input"
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="zip">
            Zip Code:
          </label>
          <input
            className="form-input"
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
          {errors.zip && <span className="error">{errors.zip}</span>}
        </div>
        <button className="form-button" type="submit">
          Submit
        </button>
      </form>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address, index) => (
              <tr key={index}>
                <td>{address.street}</td>
                <td>{address.city}</td>
                <td>{address.state}</td>
                <td>{address.zip}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteAddress(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
