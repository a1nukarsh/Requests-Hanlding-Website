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

// if user clicks on + button add more parameters or - button to delete parameters
let addParams = document.getElementById("addParams");
addParams.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `
    <div class="form row my-3">
      <label for="inputPassword" class="col-sm-2 col-form-label">
        Parameter ${addedParamsCount + 2}
      </label>
      <div class="col-md-4">
          <input type="text" class="form-control" id="parameterKey${
            addedParamsCount + 2
          }" placeholder="Enter Parameter ${addedParamsCount + 2} Key">
          <!-- <input type="text" class="form-control" id="urlField"> -->
      </div>
      <div class="col-md-4" style="display: flex;">
          <input type="text" class="form-control" id="parameterValue${
            addedParamsCount + 2
          }" placeholder="Enter Parameter ${addedParamsCount + 2} Value">
            <button class="btn btn-primary remove deleteParams" style="margin-left: 8px;"> - </button>
      </div>
    </div>
    `;
  // Convert the element to DOM node
  let paramElement = getElementFromStr(string);
  // console.log(paramElement);
  params.appendChild(paramElement);

  // Add an event listener to remove the parameter on clicking the - button
  let deleteParams = document.getElementsByClassName("deleteParams");
  for (item of deleteParams) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
    });
  }
  addedParamsCount++;
});

// If the user clicks on Submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  // Show please wait in the response box
  document.getElementById("responseText").value =
    "Please Wait, Fetching Response...";

  // Fetch all the values user has entered
  let url = document.getElementById("urlField").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  // if user selects params option insead of JSON, collect all the parameters in an object
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < addedParamsCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined){
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
      data = JSON.stringify(data); //Data is a json string
    }
  } else {
    data = document.getElementById("requestJsonText").value;
  }
  // Logging the values in console
  console.log("Url = ", url);
  console.log("rType = ", requestType);
  console.log("ctype = ", contentType);
  console.log("data = ", data);

// if the req type is post, invoke fetch api to create post request
  if (requestType=='GET'){
    fetch(url, {
      method: 'GET',
    })
    .then(response=>response.text())
    .then((text) =>{
      document.getElementById("responseText").value = text
    })
  }
  else{
    fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(response=>response.text())
    .then((text) =>{
      document.getElementById("responseText").value = text
    })
  }
});
