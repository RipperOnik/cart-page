const nums = []
const prices = []
const initialPrices = []
const stepperIds = ["stepper1", "stepper2", "stepper3"]
for (let i = 0; i < items.length; i++) {
    nums.push((checkboxes[i].checked && items[i].style.display !== "none") ? parseInt(steppers[i].getAttribute("value")) : 0)
    prices.push((checkboxes[i].checked && items[i].style.display !== "none") ? parseInt(priceTags[i].innerText) : 0)
    initialPrices.push((checkboxes[i].checked && items[i].style.display !== "none") ? parseInt(initialPriceTags[i].innerText) : 0)
}





function manageButtons() {

    for (let i = 0; i < steppers.length; i++) {
        if (steppers[i].value === steppers[i].min) {
            decrementButtons[i].style.opacity = 0.2
            decrementButtons[i].style.cursor = "default"
            incrementButtons[i].style.opacity = 1
            incrementButtons[i].style.cursor = "pointer"
        }
        else if (steppers[i].value === steppers[i].max) {
            incrementButtons[i].style.opacity = 0.2
            incrementButtons[i].style.cursor = "default"
            decrementButtons[i].style.opacity = 1
            decrementButtons[i].style.cursor = "pointer"
        }
        else {
            decrementButtons[i].style.opacity = 1
            decrementButtons[i].style.cursor = "pointer"
            incrementButtons[i].style.opacity = 1
            incrementButtons[i].style.cursor = "pointer"
        }
    }
}

manageButtons()




function stepper(btn) {
    const inputId = btn.getAttribute("data-for");
    const myInput = document.getElementById(inputId);
    const id = btn.getAttribute("class");
    const min = myInput.getAttribute("min");
    const max = myInput.getAttribute("max");
    const step = myInput.getAttribute("step");
    const val = myInput.getAttribute("value");
    const calcStep = (id == "increment-button") ? (step * 1) : (step * -1);
    const newValue = parseInt(val) + calcStep;

    // if the number of items is within boundaries, then set the new value and manage buttons 
    // if not, return, don't calculate the price 
    if (newValue >= min && newValue <= max) {
        myInput.setAttribute("value", newValue);
        manageButtons()
    }
    else {
        return
    }
    let priceStep, priceTag, initialPriceStep, initialPriceTag, initialPriceTagMobile, priceTagMobile

    for (let i = 0; i < items.length; i++) {
        if (inputId === stepperIds[i]) {
            priceStep = prices[i] / nums[i]
            priceTag = priceTags[i]
            priceTagMobile = priceTagsMobile[i]
            initialPriceStep = initialPrices[i] / nums[i]
            initialPriceTag = initialPriceTags[i]
            initialPriceTagMobile = initialPriceTagsMobile[i]
            break
        }
    }
    priceStep = (id == "increment-button") ? (priceStep * 1) : (priceStep * -1);
    priceTag.innerText = Math.round(parseInt(priceTag.innerText) + priceStep)
    priceTagMobile.innerText = Math.round(parseInt(priceTagMobile.innerText) + priceStep)
    initialPriceStep = (id == "increment-button") ? (initialPriceStep * 1) : (initialPriceStep * -1);
    initialPriceTag.innerText = Math.round(parseInt(initialPriceTag.innerText) + initialPriceStep)
    initialPriceTagMobile.innerText = Math.round(parseInt(initialPriceTagMobile.innerText) + initialPriceStep)

}

