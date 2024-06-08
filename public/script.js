// script.js

function solve() {
    const a1 = Number(document.getElementById('a1').value);
    const b1 = Number(document.getElementById('b1').value);
    const c1 = Number(document.getElementById('c1').value);
    const i = Number(document.getElementById('i').value);
  
    const a2 = Number(document.getElementById('a2').value);
    const b2 = Number(document.getElementById('b2').value);
    const c2 = Number(document.getElementById('c2').value);
    const j = Number(document.getElementById('j').value);
  
    const a3 = Number(document.getElementById('a3').value);
    const b3 = Number(document.getElementById('b3').value);
    const c3 = Number(document.getElementById('c3').value);
    const k = Number(document.getElementById('k').value);
  
    const error = Number(document.getElementById('error').value);
  
    fetch('http://localhost:3000/api/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        a1: a1,
        b1: b1,
        c1: c1,
        i: i,
        a2: a2,
        b2: b2,
        c2: c2,
        j: j,
        a3: a3,
        b3: b3,
        c3: c3,
        k: k,
        error: error
      })
    })
    .then(response => response.json())
    .then(data => {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = `
        <h2>Results:</h2>
        <p>x = ${data.x}</p>
        <p>y = ${data.y}</p>
        <p>z = ${data.z}</p>
      `;
    })
    .catch(error => {
      console.error('Error:', error);
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = `
        <h2>Error:</h2>
        <p>An error occurred. Please try again.</p>
      `;
    });
  }

  