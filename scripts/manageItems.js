function deleteItem(btn) {
    const itemId = btn.getAttribute("data-for")
    const item = document.getElementById(itemId)
    item.style.display = "none"
    checkCartItems()
}