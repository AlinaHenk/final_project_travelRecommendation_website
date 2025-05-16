document.getElementById('btnSearch').addEventListener('click', searchRecommendation);
document.getElementById('searchInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    searchRecommendation();
  }
});

document.getElementById('btnReset').addEventListener('click', () => {
  const input = document.getElementById('searchInput');
  const resultDiv = document.getElementById('result');
  input.value = '';  
  resultDiv.innerHTML = '';
  resultDiv.style.display = 'none'; });


function searchRecommendation() {
  const input = document.getElementById('searchInput').value.toLowerCase().trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  resultDiv.style.display = 'none';

  if (input === '') return;

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      const matches = [];

 data.countries.forEach(country => {
        const countryName = country.name.toLowerCase();
        if (countryName.includes(input)) {
          country.cities.forEach(city => matches.push(city));
        } else {
          country.cities.forEach(city => {
            if (
              city.name.toLowerCase().includes(input)
              ||
              city.description.toLowerCase().includes(input)
            ) {
              matches.push(city);
            }
          });
        }
      });

 if (input.includes('temple') || input === 'temples') {
        data.temples.forEach(temple => matches.push(temple));
      }

 if (input.includes('beach') || input === 'beaches') {
        data.beaches.forEach(beach => matches.push(beach));
      }

  if (matches.length > 0) {
        resultDiv.style.display = 'flex';
        matches.forEach(item => {
          resultDiv.innerHTML += `
            <div class="card">
              <img src="${item.imageUrl}" alt="${item.name}" />
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            </div>
          `;
        });
      } else {
        resultDiv.style.display = 'flex';
        resultDiv.innerHTML = `<p>No recommendations found.</p>`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
      resultDiv.style.display = 'flex';
    });
}