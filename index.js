console.log("Hello this is post website");

// Utility functions:
// 1. Utility Function to get DOM element
function getElementFromStr(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// Initialize parameter number
let addedParamsCount = 0;

// Hide the parameters box
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// if params is clicked, hide the JSON box
let paramsRadio = document.getElementById("custom");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

// if JSON is clicked, hide the params box
let jsonRadio = document.getElementById("json");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

// if user clicks on + button add more parameters
let addParams = document.getElementById("addParams");
addParams.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `
    <div class="form row my-3">
                <label for="inputPassword" class="col-sm-2 col-form-label">Parameter ${
                  addedParamsCount + 2
                }</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${
                      addedParamsCount + 2
                    }" placeholder="Enter Parameter ${
    addedParamsCount + 2
  } Key">
                    <!-- <input type="text" class="form-control" id="urlField"> -->
                </div>
                <div class="col-md-4" style="display: flex;">
                    <input type="text" class="form-control" id="parameterValue${
                      addedParamsCount + 2
                    }" placeholder="Enter Parameter ${
    addedParamsCount + 2
  } Value">
                    <!-- <input type="text" class="form-control" id="urlField"> -->
                    <button class="btn btn-primary" id="deleteParams" style="margin-left: 8px;">-</button>
                </div>
            </div>
    `;
  // Convert the element to DOM node
  let paramElement = getElementFromStr(string);
  // console.log(paramElement);
  params.appendChild(paramElement);
  addedParamsCount++;
});
