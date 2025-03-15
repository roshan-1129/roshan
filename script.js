// script.js

document.getElementById("get-joke").addEventListener("click", fetchJoke);

// Function to fetch a random joke
function fetchJoke() {
  fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart') // Joke API URL
    .then(response => response.json())
    .then(data => {
      const setupElement = document.getElementById("setup");
      const punchlineElement = document.getElementById("punchline");

      // Check if the joke is a programming joke with setup and punchline
      if (data.type === 'twopart') {
        setupElement.textContent = data.setup;  // Display setup
        punchlineElement.textContent = data.delivery;  // Punchline (hidden initially)
        punchlineElement.classList.add("hidden");

        // Show punchline after a short delay
        setTimeout(() => {
          punchlineElement.classList.remove("hidden");
        }, 1000); // Delay of 1 second
      } else {
        setupElement.textContent = "Sorry, something went wrong. Try again.";
        punchlineElement.textContent = '';
      }
    })
    .catch(error => {
      console.error("Error fetching joke:", error);
      document.getElementById("setup").textContent = "Oops! There was an error fetching the joke.";
    });
}

// Initial joke fetch
fetchJoke();
