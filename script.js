// this executes when the browser finishes loading the html
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  //    use getElementById() when selecting a single element by its unique ID for better performance and code clarity. Use querySelector() when you need the flexibility of CSS selectors to select elements by class, tag, attribute, or a combination.
  const statsContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const cardStateContainer = document.querySelector(".stats-cards");
  // here we have grabbed all the elements that we would interact with

  async function fetchUserDetails(username) {
    //does one job → fetch user data
    const targetUrl=`https://leetcode.com/graphql/`;
   
    try {
      searchButton.textContent = "Searching..";
      searchButton.disabled = true;
      const targetUrl=`https://leetcode.com/graphql/`;
      const myHeaders=new Headers();
      myHeaders=new Headers();
      myHeaders.append("content-type", "application/json");
      const graphql= JSON.stringify({
        query: "\n query userSessionProgress($username: String!) {\n allQuestionsCount {\n difficulty\n count\n }\n matchedUser (username:$username){\n submitStats {\n acSubmissionNum \n totalSubmissionNum {\n diificulty\n count\n submissions\n }\n }\n}\n ", variables: {"username": `${username}`}
      })
      const requestOptions={
        method:"POST",
        headers: myHeaders,
        body:graphql,
        redirect: "follow"
      };
      //Fetching from an API takes time. JavaScript does not block execution while waiting.
      const response = await fetch(targetUrl, requestOptions);
      //fetch(url) → Sends a request to the server.
      //   await → Waits until the server responds.
      //response → Stores the server's response object.
      //async tells JS: this function contains asynchronous operations.
      // await pauses inside that function until fetch completes.
      if (!response.ok) {
        //Checks if the HTTP response was successful.
        // response.ok is true for status codes 200–299.

        // If it’s false (404, 500, etc.), we treat it as an error.

        throw new Error("Unable to fetch the user details");
        // fetch() does NOT automatically throw an error for bad status codes. Even if API returns 404, fetch still resolve
      }
      const data = await response.json();
      //   Converts the response body into JavaScript object form
      // The server returns JSON text, .json() parses it.

      console.log("Logging data: ", data);
      //   Prints the parsed data to the browser console.Used for debugging.
    } catch (error) {
      // Catch
      // Handle failure gracefully.
      // Instead of crashing the app, update UI:
      statsContainer.innerHTML = "<p>No data found</p>";
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  //   return tru eor false based on  RE
  function validateUsername(username) {
    if (username.trim() === "") {
      // trim() removes spaces from both ends.
      alert("Username should not be empty");
      return false;
    }
    // Instead of multiple if statements: check letters check numbers check length
    // Regex compresses validation rules into one pattern.

    // It enforces:Allowed characters Allowed length Entire string must match It’s compact and precise.
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    // Tests whether the username matches the pattern.Returns true or false.
    if (!isMatching) {
      alert("Inavalid Username");
    }
    return isMatching;
  }

  searchButton.addEventListener("click", function () {
    const username = usernameInput.value;
    console.log("logging username:", username);
    if (validateUsername(username)) {
    }
  });
});
