let prompt;
let context;
// Function to display the API response in the console
let showAnswer = (response) => {
  // Hide loading message
  document.getElementById("guidelinesOutput").innerText = response.data.answer;
};

// Function to handle any errors during the API request
let handleError = (error) => {
  console.error("Error during API request:", error);
};

let handleFormSubmit = (event) => {
  event.preventDefault();
  let selectedCategory = document.querySelector(
    'input[name="category"]:checked'
  ).value;
  makeAPIRequest(selectedCategory);
};

let makeAPIRequest = (category) => {
  let prompt = `Please provide three accessibility guidelines related to ${category} in the format: 'Guideline: . Explanation: . WCAG 2.2 Reference with Compliance Level: .'`;
  let context = `Focus on providing structured and concise responses for three guidelines. Include for each guideline its explanation and the corresponding WCAG 2.2 reference, specifying whether it falls under Level A, AA, or AAA compliance.`;
  let apiKey = "tc77416a9a6oe00ff484244bdff2d3b1";
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  // Show loading message
  document.getElementById("guidelinesOutput").innerText =
    "Loading Accessibility Guidelines...";

  axios.get(apiURL).then(showAnswer).catch(handleError);
};

document
  .getElementById("guidelineForm")
  .addEventListener("submit", handleFormSubmit);
