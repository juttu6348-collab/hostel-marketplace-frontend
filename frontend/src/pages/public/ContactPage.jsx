import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import "./ContactPage.css";

const initialFormValues = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

function ContactPage() {
  const { showToast } = useToast();

  const [formValues, setFormValues] =
    useState(initialFormValues);

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!formValues.fullName.trim()) {
      nextErrors.fullName =
        "Please enter your full name.";
    }

    if (!formValues.email.trim()) {
      nextErrors.email =
        "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formValues.email,
      )
    ) {
      nextErrors.email =
        "Please enter a valid email address.";
    }

    if (!formValues.subject.trim()) {
      nextErrors.subject =
        "Please enter a subject.";
    }

    if (formValues.message.trim().length < 10) {
      nextErrors.message =
        "Your message must contain at least 10 characters.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      showToast({
        type: "error",
        title: "Please review the form",
        message:
          "Some required information is missing or invalid.",
      });

      return;
    }

    showToast({
      type: "success",
      title: "Message received",
      message:
        "Your demonstration contact request was submitted successfully.",
    });

    setFormValues(initialFormValues);
    setErrors({});
  }

  return (
    <main className="contact-page">
      <section className="contact-page-header">
        <div className="container">
          <span className="section-eyebrow">
            Contact HostelHub
          </span>

          <h1>How can we help?</h1>

          <p>
            Send us a question about hostel listings,
            bookings, owner accounts, or platform support.
          </p>
        </div>
      </section>

      <section className="container contact-page-content">
        <aside className="contact-information card">
          <h2>Contact information</h2>

          <div>
            <span>Email</span>
            <a href="mailto:support@hostelhub.demo">
              support@hostelhub.demo
            </a>
          </div>

          <div>
            <span>Telephone</span>
            <a href="tel:+923001234567">
              +92 300 1234567
            </a>
          </div>

          <div>
            <span>Location</span>
            <p>Islamabad, Pakistan</p>
          </div>

          <p className="contact-demo-note">
            This contact form currently demonstrates
            frontend validation. Backend message delivery
            will be implemented later.
          </p>
        </aside>

        <form
          className="contact-form card"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="contact-full-name">
              Full name
            </label>

            <input
  id="contact-full-name"
  name="fullName"
  type="text"
  autoComplete="name"
  value={formValues.fullName}
  onChange={handleChange}
  aria-invalid={Boolean(errors.fullName)}
  aria-describedby={
    errors.fullName
      ? "contact-full-name-error"
      : undefined
  }
/>

           {errors.fullName && (
  <p
    id="contact-full-name-error"
    className="form-error"
    role="alert"
  >
    {errors.fullName}
  </p>
)}
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">
              Email address
            </label>

           <input
  id="contact-email"
  name="email"
  type="email"
  autoComplete="email"
  value={formValues.email}
  onChange={handleChange}
  aria-invalid={Boolean(errors.email)}
  aria-describedby={
    errors.email
      ? "contact-email-error"
      : undefined
  }
/>

           {errors.email && (
  <p
    id="contact-email-error"
    className="form-error"
    role="alert"
  >
    {errors.email}
  </p>
)}
          </div>

          <div className="form-group">
            <label htmlFor="contact-subject">
              Subject
            </label>

            <input
  id="contact-subject"
  name="subject"
  type="text"
  value={formValues.subject}
  onChange={handleChange}
  aria-invalid={Boolean(errors.subject)}
  aria-describedby={
    errors.subject
      ? "contact-subject-error"
      : undefined
  }
/>

        {errors.subject && (
  <p
    id="contact-subject-error"
    className="form-error"
    role="alert"
  >
    {errors.subject}
  </p>
)}
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">
              Message
            </label>

            <textarea
  id="contact-message"
  name="message"
  rows="7"
  value={formValues.message}
  onChange={handleChange}
  aria-invalid={Boolean(errors.message)}
  aria-describedby={
    errors.message
      ? "contact-message-error"
      : "contact-message-help"
  }
/>
<p
  id="contact-message-help"
  className="form-help-text"
>
  Enter at least 10 characters.
</p>

            {errors.message && (
  <p
    id="contact-message-error"
    className="form-error"
    role="alert"
  >
    {errors.message}
  </p>
)}
          </div>

          <button
            className="btn btn-primary"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}

export default ContactPage;