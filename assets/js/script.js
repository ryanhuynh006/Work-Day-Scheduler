$(function () {
  // Listener for click events on the save button
  $(".saveBtn").on("click", function () {
      // Get the user input from the textarea
      var userInput = $(this).siblings(".description").val();
      // Get the id of the containing time-block
      var timeBlockId = $(this).parent().attr("id");
      // Save the user input in local storage using the time block id as the key
      localStorage.setItem(timeBlockId, userInput);
  });

  // Function to apply past, present, or future classes to each time block
  function updateHourClasses() {
      // Get the current hour using Day.js
      var currentHour = dayjs().hour();

      // Loop through each time block
      $(".time-block").each(function () {
          // Get the hour from the id of the time block
          var blockHour = parseInt($(this).attr("id").split("-")[1]);

          // Remove all classes related to time (past, present, future)
          //$(this).removeClass("past present future");

          // Add appropriate class based on the comparison of blockHour and currentHour
          if (blockHour < currentHour) {
              $(this).addClass("past");
          } else if (blockHour === currentHour) {
              $(this).addClass("present");
          } else {
              $(this).addClass("future");
          }
      });
  }

  // Call the function to update hour classes
  updateHourClasses();

  // Function to get user input from local storage and set textarea values
  function getUserInputFromLocalStorage() {
      // Loop through each time block
      $(".time-block").each(function () {
          // Get the id of the time block
          var timeBlockId = $(this).attr("id");
          // Get the user input saved in local storage using the time block id
          var userInput = localStorage.getItem(timeBlockId);
          // Set the value of the textarea with the retrieved user input
          $(this).find(".description").val(userInput);
      });
  }

  // Call the function to get user input from local storage
  getUserInputFromLocalStorage();

  // Display the current date in the header of the page
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});