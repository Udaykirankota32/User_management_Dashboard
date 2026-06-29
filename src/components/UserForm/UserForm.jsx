// UserForm.jsx
// Handles both Add and Edit user operations in a single modal.
// When editingUser is passed in, fields are pre-populated and
// the form switches to edit mode automatically.

import { useState, useEffect } from "react";
import { DEPARTMENTS } from "../../utils/constants";
import { validateUserForm } from "../../utils/validators";
import styles from "./UserForm.module.css";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
};

const UserForm = ({ editingUser, onSubmit, onClose, apiError }) => {

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = Boolean(editingUser);

  // Pre-populate fields when editing an existing user
  useEffect(() => {
    if (editingUser) {
      setFormData({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        email: editingUser.email,
        department: editingUser.department,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
    // Clear any stale errors when the form opens
    setErrors({});
  }, [editingUser]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear the error for this field as soon as the user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    // Run client-side validation before firing any API call
    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >

        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEditMode ? "Edit user" : "Add new user"}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        <div className={styles.body}>

          {/* API-level error shown below the header if the request fails */}
          {apiError && (
            <div className={styles.apiError}>{apiError}</div>
          )}

          <div className={styles.row}>

            <div className={styles.field}>
              <label className={styles.label}>First name</label>
              <input
                type="text"
                className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                placeholder="e.g. Leanne"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              {errors.firstName && (
                <span className={styles.errorMsg}>{errors.firstName}</span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Last name</label>
              <input
                type="text"
                className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
                placeholder="e.g. Graham"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              {errors.lastName && (
                <span className={styles.errorMsg}>{errors.lastName}</span>
              )}
            </div>

          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              placeholder="e.g. leanne@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <span className={styles.errorMsg}>{errors.email}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Department</label>
            <select
              className={`${styles.select} ${errors.department ? styles.inputError : ""}`}
              value={formData.department}
              onChange={(e) => handleChange("department", e.target.value)}
            >
              <option value="">Select a department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && (
              <span className={styles.errorMsg}>{errors.department}</span>
            )}
          </div>

        </div>

        <div className={styles.footer}>
          <button
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : isEditMode
              ? "Save changes"
              : "Add user"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserForm;