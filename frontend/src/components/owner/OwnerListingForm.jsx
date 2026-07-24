import { useEffect, useState } from "react";
import FormField from "../auth/FormField";
import "./OwnerListingForm.css";

const initialValues = {
  name: "",
  city: "",
  area: "",
  address: "",
  hostelType: "boys",
  description: "",
  startingPrice: "",
  contactPhone: "",
};

function OwnerListingForm({
  editingListing,
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingListing) {
      setValues({
        name: editingListing.name || "",
        city: editingListing.city || "",
        area: editingListing.area || "",
        address: editingListing.address || "",
        hostelType: editingListing.hostelType || "boys",
        description: editingListing.description || "",
        startingPrice:
          editingListing.startingPrice?.toString() || "",
        contactPhone: editingListing.contactPhone || "",
      });
    } else {
      setValues(initialValues);
    }

    setErrors({});
  }, [editingListing]);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  }

  function validateForm() {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Hostel name is required.";
    }

    if (!values.city.trim()) {
      nextErrors.city = "City is required.";
    }

    if (!values.area.trim()) {
      nextErrors.area = "Area is required.";
    }

    if (!values.address.trim()) {
      nextErrors.address = "Address is required.";
    }

    if (!values.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    if (
      !values.startingPrice ||
      Number(values.startingPrice) <= 0
    ) {
      nextErrors.startingPrice =
        "Enter a valid starting monthly price.";
    }

    if (!values.contactPhone.trim()) {
      nextErrors.contactPhone =
        "Contact phone number is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      ...values,
      name: values.name.trim(),
      city: values.city.trim(),
      area: values.area.trim(),
      address: values.address.trim(),
      description: values.description.trim(),
      contactPhone: values.contactPhone.trim(),
      startingPrice: Number(values.startingPrice),
    });

    if (!editingListing) {
      setValues(initialValues);
    }
  }

  return (
    <form
      className="owner-listing-form card"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="owner-form-heading">
        <span className="section-eyebrow">
          {editingListing
            ? "Edit listing"
            : "New listing"}
        </span>

        <h2>
          {editingListing
            ? "Update hostel information"
            : "Create a hostel listing"}
        </h2>

        <p>
          Add clear and accurate information for hostel seekers.
        </p>
      </div>

      <div className="auth-form-row">
        <FormField
          id="ownerHostelName"
          label="Hostel name"
          name="name"
          value={values.name}
          placeholder="Capital Student Hostel"
          error={errors.name}
          required
          onChange={handleChange}
        />

        <div className="auth-form-group">
          <label htmlFor="ownerHostelType">
            Hostel type
          </label>

          <select
            id="ownerHostelType"
            name="hostelType"
            value={values.hostelType}
            onChange={handleChange}
          >
            <option value="boys">Boys hostel</option>
            <option value="girls">Girls hostel</option>
            <option value="co-living">
              Co-living hostel
            </option>
            <option value="working-professionals">
              Working professionals
            </option>
          </select>
        </div>
      </div>

      <div className="auth-form-row">
        <FormField
          id="ownerCity"
          label="City"
          name="city"
          value={values.city}
          placeholder="Islamabad"
          error={errors.city}
          required
          onChange={handleChange}
        />

        <FormField
          id="ownerArea"
          label="Area"
          name="area"
          value={values.area}
          placeholder="H-13"
          error={errors.area}
          required
          onChange={handleChange}
        />
      </div>

      <FormField
        id="ownerAddress"
        label="Complete address"
        name="address"
        value={values.address}
        placeholder="Street 12, H-13, Islamabad"
        error={errors.address}
        required
        onChange={handleChange}
      />

      <div
        className={`auth-form-group ${
          errors.description
            ? "auth-form-group-error"
            : ""
        }`}
      >
        <label htmlFor="ownerDescription">
          Hostel description
        </label>

        <textarea
          id="ownerDescription"
          name="description"
          rows="5"
          maxLength="600"
          value={values.description}
          placeholder="Describe the hostel, location and services."
          onChange={handleChange}
        />

        <div className="owner-description-footer">
          <span className="auth-field-error">
            {errors.description || ""}
          </span>

          <span>
            {values.description.length}/600
          </span>
        </div>
      </div>

      <div className="auth-form-row">
        <FormField
          id="ownerStartingPrice"
          label="Starting monthly price"
          name="startingPrice"
          type="number"
          value={values.startingPrice}
          placeholder="18000"
          error={errors.startingPrice}
          required
          onChange={handleChange}
        />

        <FormField
          id="ownerContactPhone"
          label="Contact phone"
          name="contactPhone"
          type="tel"
          value={values.contactPhone}
          placeholder="03001234567"
          error={errors.contactPhone}
          required
          onChange={handleChange}
        />
      </div>

      <div className="owner-form-actions">
        <button
          className="btn btn-primary"
          type="submit"
        >
          {editingListing
            ? "Save Changes"
            : "Create Listing"}
        </button>

        {editingListing && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onCancel}
          >
            Cancel Editing
          </button>
        )}
      </div>
    </form>
  );
}

export default OwnerListingForm;