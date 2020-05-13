console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '';
    // const url = 'http://localhost:3000/weather?address=' + search.value;
    const url = '/weather?address=' + search.value;

    fetch(url).then((response) => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = ""
                messageTwo.textContent = 'Forcast: '+ data.forecast + 'Location : '+ data.location+ 'Address : '+ data.address ;
            }
        });
    });

});