/* =====================================================================
   CONTACT FORM VALIDATION
   ICT114 Web Development - Assignment 2

   What this does:
   - When the user clicks "Send message", we check every field.
   - If a field is empty (or the email looks wrong), we show an error
     message on the screen next to that field and STOP the form from
     submitting.
   - If all fields are filled in correctly, we show a success message
     and let the form submit (the mailto: action opens the email client).

   No server-side code (PHP) is used - this is all client-side JavaScript.
   ===================================================================== */

// Wait until the whole page (HTML) has loaded before running our code,
// otherwise the form elements might not exist yet.
document.addEventListener("DOMContentLoaded", function () {

  // Grab the form and the success banner from the page using their IDs.
  var form = document.getElementById("contactForm");
  var successBox = document.getElementById("formSuccess");

  // Listen for the form being submitted (the Send button being clicked).
  form.addEventListener("submit", function (event) {

    // We assume the form is valid until a check fails.
    var isValid = true;

    // Hide the success banner each time we re-check.
    successBox.classList.remove("show");

    /* Helper function that checks one field.
       - id:    the id of the input/textarea
       - test:  a function that returns true if the value is OK
       It adds or removes the "invalid" class on the field's wrapper,
       which makes the red error message show or hide (see the CSS). */
    function checkField(id, test) {
      var input = document.getElementById(id);
      var wrapper = input.parentElement;          // the <div class="field">
      var value = input.value.trim();             // remove blank spaces

      if (test(value)) {
        wrapper.classList.remove("invalid");      // looks good
      } else {
        wrapper.classList.add("invalid");         // show the error message
        isValid = false;                          // remember the form failed
      }
    }

    // --- Run the checks on each required field ---

    // Name: must not be empty.
    checkField("name", function (value) {
      return value.length > 0;
    });

    // Email: must not be empty AND must look like an email address.
    // The pattern means: some characters, then @, then characters, a dot,
    // and more characters (e.g. name@example.com).
    checkField("email", function (value) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value);
    });

    // Subject: must not be empty.
    checkField("subject", function (value) {
      return value.length > 0;
    });

    // Message: must not be empty.
    checkField("message", function (value) {
      return value.length > 0;
    });

    // --- Decide what to do ---
    if (!isValid) {
      // Something failed: stop the form from submitting so the user can
      // see the error messages and fix them.
      event.preventDefault();
    } else {
      // Everything is valid. Show the success message.
      successBox.classList.add("show");
      // The form will now submit normally and open the email client.
      // (If you would rather NOT open the email client while testing,
      //  uncomment the next line to stop the real submit.)
      // event.preventDefault();
    }
  });
});
