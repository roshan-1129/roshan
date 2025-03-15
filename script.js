// script.js

document.getElementById("get-joke").addEventListener("click", fetchJoke);

// Function to fetch a random joke
function fetchJoke() {
  const difficulty = document.getElementById("joke-difficulty").value.toLowerCase();
  const setupElement = document.getElementById("setup");
  const punchlineElement = document.getElementById("punchline");

  // Apply fade-out effect on the joke content
  const jokeContainer = document.getElementById("joke-container");
  jokeContainer.classList.remove("fade-in");
  jokeContainer.classList.add("fade-out");

  setTimeout(() => {
    // Fetch joke from JokeAPI based on difficulty
    fetch(`https://v2.jokeapi.dev/joke/Programming?difficulty=${difficulty}&type=twopart`)
      .then(response => response.json())
      .then(data => {
        // Clear previous joke and add new content
        setupElement.textContent = "";
        punchlineElement.textContent = "";

        // Check if the joke has setup and punchline
        if (data.type === 'twopart') {
          setupElement.textContent = data.setup;
          punchlineElement.textContent = data.delivery;

          // Hide punchline initially
          punchlineElement.classList.add("hidden");

          // After a short delay, reveal the punchline with slide-in effect
          setTimeout(() => {
            punchlineElement.classList.remove("hidden");
            punchlineElement.classList.add("slide-in");
          }, 1000); // Delay before showing punchline
        } else {
          setupElement.textContent = "Sorry, something went wrong. Try again.";
        }

        // Add fade-in effect to the new joke content
        jokeContainer.classList.remove("fade-out");
        jokeContainer.classList.add("fade-in");
      })
      .catch(error => {
        console.error("Error fetching joke:", error);
        setupElement.textContent = "Oops! There was an error fetching the joke.";
        punchlineElement.textContent = '';
      });
  }, 1000); // Wait for fade-out animation to finish before fetching new joke
}

// Share on Twitter
document.getElementById("share-twitter").addEventListener("click", function () {
  const jokeText = document.getElementById("setup").textContent + " " + document.getElementById("punchline").textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(jokeText)}`;
  window.open(twitterUrl, '_blank');
});

// Share on Facebook
document.getElementById("share-facebook").addEventListener("click", function () {
  const jokeText = document.getElementById("setup").textContent + " " + document.getElementById("punchline").textContent;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jokeText)}`;
  window.open(facebookUrl, '_blank');
});

// Copy Joke to Clipboard
document.getElementById("copy-joke").addEventListener("click", function () {
  const jokeText = document.getElementById("setup").textContent + " " + document.getElementById("punchline").textContent;
  navigator.clipboard.writeText(jokeText).then(() => {
    alert("Joke copied to clipboard!");
  });
});

// Initial joke fetch
fetchJoke();
