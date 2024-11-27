
var currentTab = 0; // Current tab for the first form
var currentTab1 = 0; // Current tab for the second form
var currentTab2 = 0; // Current tab for the third form

// Display the current tab for the first form
showTab(currentTab);

// Display the current tab for the second form
showTab1(currentTab1);

// Display the current tab for the third form
showTab2(currentTab2);

function showTab(n) {
  var x = document.querySelectorAll("#Form .tab");
  x[n].style.display = "block";

  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Next";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }

  if (n == 0) {
    document.getElementById("skipBtn").style.display = "none";
  } else {
    document.getElementById("skipBtn").style.display = "inline";
  }
}

updateProgress();

function showTab1(n) {
  var x = document.querySelectorAll("#Form1 .tab");
  x[n].style.display = "block";

  if (n == 0) {
    document.getElementById("prevBtn1").style.display = "none";
  } else {
    document.getElementById("prevBtn1").style.display = "inline";
  }

  if (n == (x.length - 1)) {
    document.getElementById("nextBtn1").innerHTML = "Next";
  } else {
    document.getElementById("nextBtn1").innerHTML = "Next";
  }

  if (n == 0) {
    document.getElementById("skipBtn1").style.display = "none";
  } else {
    document.getElementById("skipBtn1").style.display = "inline";
  }
}

updateProgress();

function showTab2(n) {
  var x = document.querySelectorAll("#Form2 .tab");
  x[n].style.display = "block";

  if (n == 0) {
    document.getElementById("prevBtn2").style.display = "none";
  } else {
    document.getElementById("prevBtn2").style.display = "inline";
  }

  if (n == (x.length - 1)) {
    document.getElementById("nextBtn2").innerHTML = "Next";
  } else {
    document.getElementById("nextBtn2").innerHTML = "Next";
  }

  if (n == 0) {
    document.getElementById("skipBtn2").style.display = "none";
  } else {
    document.getElementById("skipBtn2").style.display = "inline";
  }
}

function nextPrev(n, formId) {
  if (formId === 'Form') {
    var x = document.querySelectorAll("#Form .tab");
    if (n == 1 && !validateForm(x[currentTab])) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;

    if (currentTab >= x.length) {
      document.getElementById("Form").style.display = "none";
      document.getElementById("Form1").style.display = "block";
      showTab1(0);
      return false;
    }

    showTab(currentTab);
  } else if (formId === 'Form1') {
    var x = document.querySelectorAll("#Form1 .tab");
    if (n == 1 && !validateForm(x[currentTab1])) return false;
    x[currentTab1].style.display = "none";
    currentTab1 = currentTab1 + n;

    if (currentTab1 >= x.length) {
      document.getElementById("Form1").style.display = "none";
      document.getElementById("Form2").style.display = "block";
      showTab2(0);
      return false;
    }

    showTab1(currentTab1);
  } else if (formId === 'Form2') {
    var x = document.querySelectorAll("#Form2 .tab");
    if (n == 1 && !validateForm(x[currentTab2])) return false;
    x[currentTab2].style.display = "none";
    currentTab2 = currentTab2 + n;

    if (currentTab2 >= x.length) {
      document.getElementById("Form2").style.display = "none";
      document.getElementById("summary").style.display = "block";
      displaySummary(); // Call displaySummary() here
      return false;
    }

    showTab2(currentTab2);
  }
  updateProgress();
}


  
function validateForm(tab) {
    var inputs = tab.querySelectorAll("input");
    var isValid = true;
  
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "" && !inputs[i].classList.contains("skip")) {
        inputs[i].classList.add("invalid");
        isValid = false;
      } else {
        inputs[i].classList.remove("invalid");
      }
    }
  
    return isValid;
  }
  


function displaySummary() {
    var summaryDiv = document.getElementById("summary");
    summaryDiv.style.display = "block";
    var summaryContent = "<h1>Profile:</h1>";

    var forms = document.querySelectorAll('.Form, .Form1, .Form2');

    forms.forEach(form => {
        var formTitle = form.querySelector('h1').textContent;
        summaryContent += "<h2>" + formTitle + "</h2>";

        var tabs = form.querySelectorAll('.tab');

        tabs.forEach(tab => {
            var inputs = tab.querySelectorAll('input');

            inputs.forEach(input => {
                if (!input.classList.contains('skip')) {
                    var question = input.closest('.tab').textContent.trim().split('\n')[0];
                    var value = input.value.trim();
                    if (question && value) {
                        summaryContent += "<p><strong>" + question + "</strong> " + value + "</p>";
                    }
                }
            });
        });
    });

    summaryDiv.innerHTML = summaryContent;
}


  

// Function to update the progress bar
function updateProgress() {
    var totalSteps = document.querySelectorAll('.Form .tab, .Form1 .tab, .Form2 .tab').length;
    var completedSteps = 0;

    // Loop through each form step
    document.querySelectorAll('.Form .tab, .Form1 .tab, .Form2 .tab').forEach(tab => {
        var inputs = tab.querySelectorAll('input');
        var stepCompleted = true;

        // Check if all inputs in the step are filled
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                stepCompleted = false;
            }
        });

        // Increment completedSteps if the step is completed
        if (stepCompleted) {
            completedSteps++;
        }
    });

    // Calculate progress percentage
    var progress = Math.round((completedSteps / totalSteps) * 100);

    // Update the progress bar width and text
    document.getElementById("progress").style.width = progress + "%";
    document.getElementById("progress").textContent = progress + "%";
}

// Call updateProgress() whenever an input field is filled
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updateProgress);
});

// Call updateProgress() whenever a tab is shown or hidden
document.querySelectorAll('.Form .tab, .Form1 .tab, .Form2 .tab').forEach(tab => {
    tab.addEventListener('transitionend', updateProgress);
});


  
  

function skipQuestion() {
  // Determine the current active form
  var activeFormId = '';
  if (document.getElementById('Form').style.display !== 'none') {
    activeFormId = 'Form';
  } else if (document.getElementById('Form1').style.display !== 'none') {
    activeFormId = 'Form1';
  } else if (document.getElementById('Form2').style.display !== 'none') {
    activeFormId = 'Form2';
  }

  // Advance to the next tab of the active form
  nextPrev(1, activeFormId);
}
