# easyFormSubmit

`easyFormSubmit` is a JavaScript function designed to simplify form validation and submission handling in HTML forms. It supports custom validation, additional data submission, and advanced features when used with services like [FormSubmit.co](https://formsubmit.co/). This function is highly customizable and integrates seamlessly with modern web applications.

---

## Installation

No special installation is required. Simply include the `easyFormSubmit` function from CDN.

```javascript
<script src="https://cdn.jsdelivr.net/gh/FrancoMartino/easy-form-submit@main/easy-form-submit.min.js"></script>
```

---

## Usage

### Syntax

```javascript
easyFormSubmit(formID, options);
```

### Parameters

- **`formID`** (String): The ID of the form you want to handle.
- **`options`** (Object): A configuration object with the following optional properties:
  - **`key`** (String): Your FormSubmit.co email address or key.
  - **`submitURL`** (String): A custom URL for form submission. Defaults to `https://formsubmit.co/ajax/{key}`.
  - **`data`** (Object): Additional data to send with the form. This can include advanced FormSubmit.co parameters like `_cc`, `_subject`, `_next`, etc.
  - **`validate`** (Function): A custom validation function that returns a boolean.
  - **`onSuccess`** (Function): A callback function executed on successful form submission.
  - **`onError`** (Function): A callback function executed if an error occurs during submission.

---

## Examples

### Basic Example

This example submits a form to FormSubmit.co with a custom success message.

```javascript
easyFormSubmit("myForm", {
  key: "your@email.com", // Your FormSubmit.co email
  onSuccess: (response) => {
    alert("Form submitted successfully!");
  },
  onError: (error) => {
    alert("An error occurred while submitting the form.");
  },
});
```

---

### Example with Advanced FormSubmit.co Features

This example uses advanced FormSubmit.co features like `_cc`, `_subject`, `_next`, and `_template`.

```javascript
easyFormSubmit("myForm", {
  key: "your@email.com", // Your FormSubmit.co email
  data: {
    _cc: "another@email.com,yetanother@email.com", // CC additional emails
    _subject: "New Form Submission", // Custom email subject
    _next: "https://yourdomain.com/thank-you.html", // Redirect after submission
    _template: "table", // Use the "table" email template
  },
  onSuccess: (response) => {
    console.log("Form submitted successfully:", response);
  },
  onError: (error) => {
    console.error("Error submitting form:", error);
  },
});
```

---

### Example with Custom Validation

This example adds custom validation to ensure the email field is valid.

```javascript
easyFormSubmit("myForm", {
  key: "your@email.com", // Your FormSubmit.co email
  validate: (form) => {
    const email = form.querySelector("input[name='email']").value;
    return email.includes("@") && email.includes("."); // Validate email format
  },
  onSuccess: (response) => {
    alert("Form submitted successfully!");
  },
  onError: (error) => {
    alert("Form submission failed.");
  },
});
```

---

### Example with Webhook and Autoresponse

This example uses a webhook to receive form data in real-time and sends an autoresponse to the user.

```javascript
easyFormSubmit("myForm", {
  key: "your@email.com", // Your FormSubmit.co email
  data: {
    _webhook: "https://yourdomain.com/webhook", // Webhook URL
    _autoresponse: "Thank you for contacting us! We will get back to you soon.", // Autoresponse message
  },
  onSuccess: (response) => {
    console.log("Form submitted successfully:", response);
  },
  onError: (error) => {
    console.error("Error submitting form:", error);
  },
});
```

---

### Example with Blacklist and Disabled CAPTCHA

This example filters out spam submissions and disables the CAPTCHA.

```javascript
easyFormSubmit("myForm", {
  key: "your@email.com", // Your FormSubmit.co email
  data: {
    _blacklist: "spam, badword, phishing", // Filter out spammy content
    _captcha: "false", // Disable CAPTCHA
  },
  onSuccess: (response) => {
    console.log("Form submitted successfully:", response);
  },
  onError: (error) => {
    console.error("Error submitting form:", error);
  },
});
```

---

## Advanced Features

### Supported FormSubmit.co Parameters

You can include the following advanced parameters in the `options.data` object:

| Parameter        | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `_replyto`       | Sets the Reply-To email address.                                            |
| `_next`          | Redirects the user to a custom URL after submission.                        |
| `_subject`       | Sets a custom subject for the email.                                        |
| `_cc`            | Sends a copy of the submission to additional email addresses.               |
| `_bcc`           | Sends a blind copy of the submission to additional email addresses.         |
| `_template`      | Sets the email template (`basic`, `table`, or `box`).                       |
| `_autoresponse`  | Sends an autoresponse email to the user.                                    |
| `_blacklist`     | Filters out submissions containing specific phrases.                        |
| `_captcha`       | Enables or disables CAPTCHA (`true` or `false`).                            |
| `_webhook`       | Sends form data to a webhook URL in real-time.                              |

---

## Function Details

### Custom Validation

You can provide a custom validation function in the `validate` option. This function receives the form element as a parameter and must return `true` if the validation passes or `false` if it fails.

```javascript
validate: (form) => {
  const email = form.querySelector("input[name='email']").value;
  return email.includes("@") && email.includes(".");
}
```

### Event Handling

- **`onSuccess`**: Executed when the form is submitted successfully. Receives the server response as a parameter.
- **`onError`**: Executed if an error occurs during submission. Receives the error as a parameter.

### Additional Data

You can include additional data in the `options.data` object. This data will be sent along with the form data.

```javascript
data: {
  userId: 123,
  timestamp: new Date().toISOString(),
}
```

---

## Notes

- Ensure the form has a unique ID.
- If no `submitURL` is provided, the function defaults to `https://formsubmit.co/ajax/{key}`.
- The function uses `fetch` for submissions, so it is compatible with modern browsers.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

We hope `easyFormSubmit` makes form handling easier and more efficient for your projects! If you have any questions or suggestions, please open an issue in the repository.