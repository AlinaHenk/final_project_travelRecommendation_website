const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
// const patients = [];

// function addPatient() {
//     const name = document.getElementById("name").value;
//     const gender = document.querySelector('input[name="gender"]:checked');
//     const age = document.getElementById("age").value;
//     const condition = document.getElementById("condition").value;

//     if (name && gender && age && condition) {
//       patients.push({ name, gender: gender.value, age, condition });
//       resetForm();
//       generateReport();
//     }
//   }

//   function resetForm() {
//     document.getElementById("name").value = "";
//     document.querySelector('input[name="gender"]:checked').checked = false;
//     document.getElementById("age").value = "";
//     document.getElementById("condition").value = "";
//   }

//   function generateReport() {
//     const numPatients = patients.length;
//     const conditionsCount = {
//       Diabetes: 0,
//       Thyroid: 0,
//       "High Blood Pressure": 0,
//     };
//     const genderConditionsCount = {
//       Male: {
//         Diabetes: 0,
//         Thyroid: 0,
//         "High Blood Pressure": 0,
//       },
//       Female: {
//         Diabetes: 0,
//         Thyroid: 0,
//         "High Blood Pressure": 0,
//       },
//     };

//     for (const patient of patients) {
//       conditionsCount[patient.condition]++;
//       genderConditionsCount[patient.gender][patient.condition]++;
//     }

//     report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
//     report.innerHTML += `Conditions Breakdown:<br>`;
//     for (const condition in conditionsCount) {
//       report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
//     }

//     report.innerHTML += `<br>Gender-Based Conditions:<br>`;
//     for (const gender in genderConditionsCount) {
//       report.innerHTML += `${gender}:<br>`;
//       for (const condition in genderConditionsCount[gender]) {
//         report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
//       }
//     }
//   }

// addPatientButton.addEventListener("click", addPatient);

function searchRecomendation() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const matches = [];

        data.countries.forEach(country => {
            country.cities.forEach(city => {
              const nameMatch = city.name.toLowerCase().includes(input);
              const descMatch = city.description.toLowerCase().includes(input);
    
              if (nameMatch || descMatch) {
                matches.push(city);
              }
            });
          });
          if (matches.length > 0) {
            matches.forEach(city => {
              resultDiv.innerHTML += `
                <div>
                  <img src="${city.imageUrl}" alt="${city.name}">
                  <h2>${city.name}</h2>
                  <p>${city.description}</p>
                </div>
              `;
            });
          } else {
            resultDiv.innerHTML = '<p>No recommendations found.</p>';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          resultDiv.innerHTML = '<p>An error occurred while fetching data.</p>';
        });
    }
    
    document.getElementById('btnSearch').addEventListener('click', searchRecomendation);


    // function searchRecomendation() {
    //     const input = document.getElementById('searchInput').value.toLowerCase();
    //     const resultDiv = document.getElementById('result');
    //     resultDiv.innerHTML = '';
      
    //     fetch('travel_recommendation_api.json')
    //       .then(response => response.json())
    //       .then(data => {
    //         const matches = [];
      
    //         data.countries.forEach(country => {
    //           country.cities.forEach(city => {
    //             const nameMatch = city.name.toLowerCase().includes(input);
    //             const descMatch = city.description.toLowerCase().includes(input);
      
    //             if (nameMatch || descMatch) {
    //               matches.push(city);
    //             }
    //           });
    //         });
      
    //         if (matches.length > 0) {
    //           matches.forEach(city => {
    //             resultDiv.innerHTML += `
    //               <div style="margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
    //                 <img src="${city.imageUrl}" alt="${city.name}">
    //                 <h2>${city.name}</h2>
    //                 <p>${city.description}</p>
    //               </div>
    //             `;
    //           });
    //         } else {
    //           resultDiv.innerHTML = '<p>No recommendations found.</p>';
    //         }
    //       })
    //       .catch(error => {
    //         console.error('Error:', error);
    //         resultDiv.innerHTML = '<p>An error occurred while fetching data.</p>';
    //       });
    //   }
      
    //   document.getElementById('btnSearch').addEventListener('click', searchRecomendation);
      
      document.getElementById('btnReset').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('result').innerHTML = '';
      });