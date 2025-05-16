const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');

function searchRecomendation() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.style.display = 'none';

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
            resultDiv.style.display = 'block';
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
            resultDiv.style.display = 'block';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          resultDiv.style.display = 'block';
          resultDiv.innerHTML = '<p>An error occurred while fetching data.</p>';
        });
    }
    
    document.getElementById('btnSearch').addEventListener('click', searchRecomendation);


   document.getElementById('btnReset').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('result').innerHTML = '';
        resultDiv.style.display = 'none';
      });