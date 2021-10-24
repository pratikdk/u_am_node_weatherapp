const weatherForm = document.querySelector("#weather-form");
const weatherFormInput = document.querySelector("#weather-form #location-input");
const message1Element = document.querySelector("#message-1");
const message2Element = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();

    message1Element.textContent = 'Loading message..';
    message2Element.textContent = '';

    fetch(`/weather?address=${weatherFormInput.value}`).then((response) => [
        response.json().then((data) => {
            if (data.errorText) {
                message1Element.textContent = data.errorText;
            } else {
                message1Element.textContent = data.location;
                message2Element.textContent = data.forecast;
            }
        })
    ])
})
