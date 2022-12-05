const itemImg1 = document.getElementById("item-img1")
const itemImg2 = document.getElementById("item-img2")
const itemImg21 = document.getElementById("item-img2(1)")
const itemImg3 = document.getElementById("item-img3")
const dateDeliveryItem1 = document.getElementById("date-delivery-item1")
const dateDeliveryItem2 = document.getElementById("date-delivery-item2")




function checkCartItems() {

    const nums = []
    for (let i = 0; i < items.length; i++) {
        nums.push((checkboxes[i].checked && items[i].style.display !== "none") ? parseInt(steppers[i].getAttribute("value")) : 0)
    }

    if (nums[0] === 0) {
        itemImg1.style.display = "none"
    }
    else {
        itemImg1.style.display = "block"
    }
    if (nums[1] === 0) {
        itemImg2.style.display = "none"
        itemImg21.style.display = "none"
    }
    else {
        itemImg2.style.display = "block"
        itemImg21.style.display = "block"
    }

    if (nums[2] === 0) {
        itemImg3.style.display = "none"
    }
    else {
        itemImg3.style.display = "block"
    }

    if (itemImg1.style.display === "none" && itemImg2.style.display === "none" && itemImg3.style.display === "none") {
        dateDeliveryItem1.style.display = "none"
    }
    else {
        dateDeliveryItem1.style.display = "flex"
    }
    if (itemImg21.style.display === "none") {
        dateDeliveryItem2.style.display = "none"
    }
    else {
        dateDeliveryItem2.style.display = "flex"
    }

}
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        checkCartItems()
    });
})

checkboxAll.addEventListener('change', function () {
    checkCartItems()
});
