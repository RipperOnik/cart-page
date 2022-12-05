let opened = true
let openedMissing = true
let openedButton
let closedButton
const openedHeader = document.getElementById("cart__items__header--opened")
const closedHeader = document.getElementById("cart__items__header--closed")

const steppers = document.querySelectorAll(".incrementor-input")

const itemsNumber = document.getElementById("items-number")
const itemsNumberAll = document.getElementById("items-number-all")
const itemsBill = document.getElementById("items-bill")
const itemsBillAll = document.getElementById("items-bill-all")

const checkboxes = document.querySelectorAll('input[name="checkbox-item"]')

const checkboxAll = document.getElementById("checkbox-items-All")

const items = document.querySelectorAll(".cart-item")

const decrementButtons = document.querySelectorAll(".decrement-button")

const incrementButtons = document.querySelectorAll(".increment-button")

const deleteCartItemButtons = document.querySelectorAll(".delete-cart-item")

const initialPriceTags = document.querySelectorAll(".cart-item__price .initial-price")
const priceTags = document.querySelectorAll(".cart-item__price .price")
const initialPriceTagsMobile = document.querySelectorAll(".cart-item__price--mobile .initial-price")
const priceTagsMobile = document.querySelectorAll(".cart-item__price--mobile .price")
const initialPriceTagAll = document.getElementById("initial-price-all")

const orderBtn = document.getElementById("order-button-ok")
const totalDiscountTag = document.getElementById("total-discount")
const payBeforeCheckbox = document.getElementById("pay-before-checkbox")

const tooltips = [...document.querySelectorAll(".tooltip")].filter(item => item.style.display !== "none")

const discountPercentageTags = [...document.querySelectorAll(".tooltip-content--discount .discount-percentage")]
const discountNumberTags = [...document.querySelectorAll(".tooltip-content--discount .discount-number")]
const personalDiscountPercentageTags = [...document.querySelectorAll(".tooltip-content--discount .personal-discount-percentage")]
const personalDiscountNumberTags = [...document.querySelectorAll(".tooltip-content--discount .personal-discount-number")]










function calculatePriceAndAmount() {
    const nums = []
    const prices = []
    for (let i = 0; i < items.length; i++) {
        nums.push((checkboxes[i].checked && items[i].style.display !== "none") ? parseInt(steppers[i].getAttribute("value")) : 0)
        prices.push((checkboxes[i].checked && items[i].style.display !== "none") ? parseInt(priceTags[i].innerText) : 0)
    }

    let itemsNumberValue = 0, itemsBillValue = 0
    for (let i = 0; i < items.length; i++) {
        itemsNumberValue += nums[i]
        itemsBillValue += prices[i]
    }

    itemsNumber.innerText = itemsNumberValue
    itemsNumberAll.innerText = itemsNumberValue
    itemsBill.innerText = itemsBillValue
    itemsBillAll.innerText = itemsBillValue

    if (payBeforeCheckbox.checked) {
        orderBtn.innerText = `Оплатить ${itemsBillAll.innerText} сом`
    }
}

function calculateDiscount() {
    const prices = []
    const initialPrices = []

    for (let i = 0; i < items.length; i++) {
        prices.push((checkboxes[i].checked && items[i].style.display !== "none") ? parseInt(priceTags[i].innerText) : 0)
        initialPrices.push((checkboxes[i].checked && items[i].style.display !== "none") ? parseInt(initialPriceTags[i].innerText) : 0)
    }

    const discounts = []


    for (let i = 0; i < items.length; i++) {
        discounts.push(initialPrices[i] - prices[i])

        let discountPercentage = (1 - prices[i] / initialPrices[i]) * 100

        const personalDiscountPercentage = discountPercentage > 10 ? 10 : discountPercentage

        const personalDiscount = initialPrices[i] * personalDiscountPercentage / 100

        discountPercentage = discountPercentage > 10 ? discountPercentage - 10 : discountPercentage

        discountPercentage = discountPercentage == personalDiscountPercentage ? 0 : discountPercentage

        discountPercentageTags[i].innerText = discountPercentage > 0 ? Math.round(discountPercentage) : 0


        discountNumberTags[i].innerText = discountPercentage > 0 ? Math.round(initialPrices[i] * discountPercentage / 100) : 0

        personalDiscountPercentageTags[i].innerText = Math.round(personalDiscountPercentage)
        personalDiscountNumberTags[i].innerText = Math.round(personalDiscount)
    }
    let discountValue = 0, initialPriceValue = 0
    for (let i = 0; i < items.length; i++) {
        discountValue += discounts[i]
        initialPriceValue += initialPrices[i]

    }
    totalDiscountTag.innerText = discountValue
    initialPriceTagAll.innerText = initialPriceValue



}

calculatePriceAndAmount()
calculateDiscount()


tooltips.forEach(tooltip => {
    tooltip.addEventListener("mouseover", () => {
        calculateDiscount()
    })
})



checkboxAll.addEventListener('change', function () {
    if (this.checked) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = true
        })
    }
    calculatePriceAndAmount()
    calculateDiscount()
});

payBeforeCheckbox.addEventListener('change', (event) => {
    const hintText = document.getElementById("hint")

    if (event.target.checked) {
        hintText.style.display = "none"
        orderBtn.innerText = `Оплатить ${itemsBillAll.innerText} сом`

    }
    else {
        hintText.style.display = "block"
        orderBtn.innerText = "Заказать"
    }

})

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        calculatePriceAndAmount()
        calculateDiscount()
    });
})

incrementButtons.forEach(incrementBtn => {
    incrementBtn.addEventListener("click", () => {
        calculatePriceAndAmount()
        calculateDiscount()
    })
})


decrementButtons.forEach(decrementBtn => {
    decrementBtn.addEventListener("click", () => {
        calculatePriceAndAmount()
        calculateDiscount()
    })
})

deleteCartItemButtons.forEach(deleteCartItemButton => {
    deleteCartItemButton.addEventListener("click", () => {
        calculatePriceAndAmount()
        calculateDiscount()
    })
})





function collapse(btn) {
    const cartItems = btn.getAttribute("data-for")
    const items = document.getElementById(cartItems)
    // cart items
    if (cartItems !== "cart-items--missing") {
        openedButton = document.getElementById("opened")
        closedButton = document.getElementById("closed")
        opened = !opened
        if (opened) {
            openedHeader.style.display = "flex"
            closedHeader.style.display = "none"
            closedButton.style.display = "none"
            openedButton.style.display = "inline"
            items.style.display = "flex"
        }
        else {
            openedHeader.style.display = "none"
            closedHeader.style.display = "block"
            closedButton.style.display = "inline"
            openedButton.style.display = "none"
            items.style.display = "none"
        }
    }
    // missing items
    else {
        openedButton = document.getElementById("opened-missing")
        closedButton = document.getElementById("closed-missing")
        openedMissing = !openedMissing
        if (openedMissing) {
            closedButton.style.display = "none"
            openedButton.style.display = "inline"
            items.style.display = "flex"
        }
        else {
            closedButton.style.display = "inline"
            openedButton.style.display = "none"
            items.style.display = "none"
        }
    }
}