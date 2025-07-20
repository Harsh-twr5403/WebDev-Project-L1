const input = document.getElementById("search");
const button = document.getElementById("submit");
const imageDiv = document.getElementById("gallery");

let errorMsg = document.createElement("p");
errorMsg.style.color = "red";
errorMsg.style.marginTop = "10px";
errorMsg.style.fontSize = "14px";
errorMsg.id = "error";
input.parentNode.appendChild(errorMsg);

const API_KEY = "79HzLwnvkiastlm1iHtnHxhQaFYVRXoD";

// Allow only alphabetic characters and spaces
const isValidTag = (tag) => /^[a-zA-Z\s]+$/.test(tag);

async function fetchRandomGif(tag = "") {
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}&rating=pg`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const imageUrl = data.data.images.downsized_large.url;
    displayGif(imageUrl);
  } catch (error) {
    console.error("Error fetching GIF:", error);
  }
}

function displayGif(url) {
  imageDiv.innerHTML = "";
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Random GIF";
  imageDiv.appendChild(img);
}

// Search button handler
button.addEventListener("click", () => {
  const tag = input.value.trim();

  if (tag === "") {
    errorMsg.textContent = " First enter the type of GIF you want";
    imageDiv.style.display = "none";
    return;
  }

  if (!isValidTag(tag)) {
    errorMsg.textContent = " Enter a valid GIF tag (letters only)";
    imageDiv.style.display = "none";
    return;
  }

  errorMsg.textContent = "";
  fetchRandomGif(tag);
  imageDiv.style.display = "block";
});

// Category button handlers
const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tag = btn.getAttribute("data-tag");
    errorMsg.textContent = "";
    fetchRandomGif(tag);
    imageDiv.style.display = "block";
  });
});
