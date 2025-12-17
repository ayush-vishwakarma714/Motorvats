function showNotification(message) {
  const notificationContainer = document.getElementById('notification-container');
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;

  notificationContainer.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.add('show');
  }, 10); // small delay to allow CSS transition

  // Animate out and remove
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 500); // Wait for animation to finish
  }, 3000); // Display for 3 seconds
}

document.addEventListener("DOMContentLoaded", function () {
  const companySelect = document.getElementById("companySelect");
  const carSelect = document.getElementById("carSelect");
  const modelSelect = document.getElementById("carmodel");

  // Load JSON file
  fetch("carData.json")
    .then(response => response.json())
    .then(data => {

      // When company changes → load car names
      companySelect.addEventListener("change", function () {
        const company = this.value;

        carSelect.innerHTML = '<option value="">Select car name</option>';
        modelSelect.innerHTML = '<option value="">Select car model</option>';

        if (data[company]) {
          Object.keys(data[company]).forEach(car => {
            const option = document.createElement("option");
            option.value = car;
            option.textContent = car;
            carSelect.appendChild(option);
          });
        }
      });

      // When car name changes → load car models
      carSelect.addEventListener("change", function () {
        const company = companySelect.value;
        const car = this.value;

        modelSelect.innerHTML = '<option value="">Select car model</option>';

        if (data[company] && data[company][car]) {
          data[company][car].forEach(model => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
          });
        }
      });

    })
    .catch(err => {
        console.error("JSON Load Error:", err)
        showNotification("Error: Could not load car data.");
    });
});

document.getElementById("submitBtn").addEventListener("click", () => {
    const company = document.getElementById("companySelect").value;
    const car = document.getElementById("carSelect").value;
    const model = document.getElementById("carmodel").value;
    const problem = document.getElementById("problem").value.trim();

    if (!company || !car || !model || !problem) {
       showNotification("Please fill all fields");
        return;
    }

    showNotification("Problem submitted for analysis.");
    
    // Here you would typically send the data to a backend or AI service
    console.log("Company:", company);
    console.log("Car:", car);
    console.log("Model:", model);
    console.log("Problem:", problem);
});
