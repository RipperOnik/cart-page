// delivery
const deliveryPopupContainer = document.getElementById("delivery-popup-container")
const deliveryPopupButton = document.getElementById("delivery-popup-button")
const deliveryCloseButton = document.getElementById("delivery-popup-close-button")
const tabIssue = document.getElementById("issue-points-tab")
const tabCourier = document.getElementById("courier-tab")
const addressField = document.getElementById("address")
const addressAllField = document.getElementById("address-all")
const ratingField = document.getElementById("rating")
const deliverybuttonOk = document.getElementById("delivery-button-ok")
// payment
const paymentPopupContainer = document.getElementById("payment-popup-container")
const paymentPopupButton = document.getElementById("payment-popup-button")
const paymentCloseButton = document.getElementById("payment-popup-close-button")
const paymentbuttonOk = document.getElementById("payment-button-ok")
const cardNumberField = document.getElementById("card-number")
const cardImg = document.getElementById("card-img")
const cardNumberAllField = document.getElementById("card-number-all")
const cardAllImg = document.getElementById("card-img-all")

function toggleDeliveryPopup() {
    deliveryPopupContainer.classList.toggle("show-popup");
}

function windowOnClick(event) {
    if (event.target === deliveryPopupContainer) {
        toggleDeliveryPopup()
    }
    else if (event.target === paymentPopupContainer) {
        togglePaymentPopup()
    }
}

function togglePaymentPopup() {
    paymentPopupContainer.classList.toggle("show-popup");
}



function chooseAddress() {
    toggleDeliveryPopup()
    let address
    if (document.querySelector(".bubble-tab--active") === tabIssue) {
        const radio = document.querySelector('input[name="issue-point"]:checked')
        const value = radio.value
        let [addressTemp, rating] = value.split("$$$")
        address = addressTemp.trim()
        rating = rating.trim()
        ratingField.innerText = rating
    }
    else {
        const radio = document.querySelector('input[name="courier-address"]:checked')
        const value = radio.value
        address = value.trim()
    }
    addressField.innerText = address
    addressAllField.innerText = address
}
function chooseCard() {
    togglePaymentPopup()
    const radio = document.querySelector('input[name="card"]:checked')
    const value = radio.value
    let [cardNumber, cardType] = value.split("$$$")
    cardNumber = cardNumber.trim()
    cardType = cardType.trim()
    cardNumberField.innerText = cardNumber
    cardImg.src = `images/payment/${cardType}.svg`
    cardNumberAllField.innerText = cardNumber
    cardAllImg.src = `images/payment/${cardType}.svg`
}


//delivery
deliveryPopupButton.addEventListener("click", toggleDeliveryPopup)
deliveryCloseButton.addEventListener("click", toggleDeliveryPopup)
deliverybuttonOk.addEventListener("click", chooseAddress)

//payment
paymentPopupButton.addEventListener("click", togglePaymentPopup)
paymentCloseButton.addEventListener("click", togglePaymentPopup)
paymentbuttonOk.addEventListener("click", chooseCard)


window.addEventListener("click", windowOnClick)