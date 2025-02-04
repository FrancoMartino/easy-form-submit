/**
 * Handles the submission of a form with custom validation and event handling.
 *
 * @param {string} formID - The ID of the form to be handled.
 * @param {Object} options - Configuration options for form submission.
 * @param {string} options.submitURL - Custom URL to submit the form. Defaults to FormSubmit.
 * @param {string} options.key - Key to use with FormSubmit (if submitURL is not provided).
 * @param {Object} options.data - Additional data to send with the form.
 * @param {Function} options.validate - Custom validation function that should return a boolean.
 * @param {Function} options.onSuccess - Callback function executed if the submission is successful.
 * @param {Function} options.onError - Callback function executed if an error occurs.
 */
function easyFormSubmit(formID, options = {}) {
  const form = document.getElementById(formID);

  // Check if the form exists
  if (!form) {
    console.error(`Form with ID "${formID}" not found.`);
    return;
  }

  // Add a listener for the 'submit' event
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Custom validation
    if (options.validate && !options.validate(form)) {
      console.error("Form validation failed.");
      return;
    }

    try {
      // Configure the submission URL
      const submitURL =
        options.submitURL || `https://formsubmit.co/ajax/${options.key}`;

      // Perform the fetch request
      const response = await fetch(submitURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(options.data || {}),
      });

      // Handle the response
      if (response.ok) {
        console.log("Form submitted successfully");
        if (options.onSuccess) {
          options.onSuccess(response);
        }
      } else {
        console.error("Form submission failed");
        if (options.onError) {
          options.onError(response);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      if (options.onError) {
        options.onError(error);
      }
    }
  });
}
