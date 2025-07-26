
fetch('https://www.swapi.tech/api/people')
    .then(response =>{
        if (response.ok) {
            return response.json();
        }
        else{
            throw new Error('Network response was not ok');
        }
    })

    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));


    fetch('https://www.swapi.tech/api/planets/1')
    .then(response =>{
        if (response.ok) {
           return response.json();
        }
        else{
            throw new Error('Network response was not ok');
        }
    })

    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    
     