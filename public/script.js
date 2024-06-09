document.getElementById('gaussForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = parseFloat(value); // Convert values to floats still 0.001 is not conveted idkh
    });

    try {
        const response = await fetch('/api/gauss', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const outputElement = document.getElementById('output');
        outputElement.innerHTML = `
            <p>x is ${data.x}</p>
            <p>y is ${data.y}</p>
            <p>z is ${data.z}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        const outputElement = document.getElementById('output');
        outputElement.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
