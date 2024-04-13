// Changing year in footer to current years
const currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;

// Function to handle any errors during the API request
let handleError = (error) => {
  console.error("Error during API request:", error);
  document.getElementById("guidelinesOutput").innerText =
    "Error loading guidelines, please try again.";
};

let handleFormSubmit = (event) => {
  event.preventDefault();
  let selectedCategoryElement = document.querySelector(
    'input[name="category"]:checked'
  );
  // Get the value of the selected radio button
  let selectedCategory = selectedCategoryElement.value;

  // Make the API request
  makeAPIRequest(selectedCategory);
};

let makeAPIRequest = (category) => {
  let prompt = `Please provide two accessibility guidelines related to ${category}. Format each guideline on its own separate line like this:
  Guideline: [Guideline text here].
  Explanation: [Explanation text here].
  WCAG 2.2 Reference with Compliance Level: [Reference and level here].`;
  let context = `Focus on providing structured and concise responses for two guidelines. Include for each guideline its explanation and the corresponding WCAG 2.2 reference, specifying whether it falls under Level A, AA, or AAA compliance.`;
  let apiKey = "tc77416a9a6oe00ff484244bdff2d3b1";
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  // Remove the "d-none" class to make the content visible
  const aiGeneratedContent = document.getElementById("aiGeneratedContent");
  aiGeneratedContent.classList.remove("d-none");

  // Show loading message and set focus to it
  const loadingMessage = document.getElementById("guidelinesOutput");
  loadingMessage.innerText = "Loading accessibility guidelines...";
  loadingMessage.scrollIntoView({ behavior: "smooth" });

  axios.get(apiURL).then(showAnswer).catch(handleError);
};

// Function to display the API response in the console
let showAnswer = (response) => {
  // Hide loading message
  document.getElementById("guidelinesOutput").innerText = response.data.answer;
};

document
  .getElementById("guidelineForm")
  .addEventListener("submit", handleFormSubmit);

// let prompt = `Please provide two accessibility guidelines related to ${category} in the format: 'Guideline: . Explanation: . WCAG 2.2 Reference with Compliance Level: .'`;
// let context = `Focus on providing structured and concise responses for two guidelines. Include for each guideline its explanation and the corresponding WCAG 2.2 reference, specifying whether it falls under Level A, AA, or AAA compliance.`;
