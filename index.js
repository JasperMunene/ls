// Get Request
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  // Parse the JSON from the response
  })
  .then(data => {
    console.log(data);  // Handle the response data
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// POST REQUEST
fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  // Telling the server we're sending JSON
    },
    body: JSON.stringify({
      name: 'John',
      age: 30
    })
  })
    .then(response => response.json())  // Parse the JSON from the response
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    
//PUT / DELETE REQUEST
fetch('https://api.example.com/data/1', {
    method: 'PUT',  // or 'DELETE'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'John',
      age: 31
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Updated:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
