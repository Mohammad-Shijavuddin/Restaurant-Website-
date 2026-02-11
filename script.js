document.addEventListener("DOMContentLoaded", function () {

    function formatTime12Hour(time24) {
        let [hours, minutes] = time24.split(":");
        hours = parseInt(hours);
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return hours + ":" + minutes + " " + ampm;
    }
let cart = {};
    const menuData = {
        "Veg Starters": [
            "Veg Manchuria - ₹200",
            "Paneer 65 - ₹240",
            "Chilli Paneer - ₹240"
        ],
        "Non-Veg Starters": [
            "Chilli Chicken - ₹250",
            "Chicken 65 - ₹250",
            "Apollo Fish - ₹290"
        ],
        "Biryani": [
            "Veg Biryani - ₹200",
            "Chicken Dum Biryani - ₹270",
            "Mutton Dum Biryani - ₹400",
            "Prawn Biryani - ₹320"
        ],
        "Fried Rice": [
            "Veg Fried Rice - ₹180",
            "Chicken Fried Rice - ₹220"
        ],
        "Noodles": [
            "Veg Noodles - ₹160",
            "Chicken Noodles - ₹220"
        ]
    };
    // LOAD MENU ITEMS
    document.getElementById("menuCategory").addEventListener("change", function () {
        let category = this.value;
        let menuDiv = document.getElementById("menuItems");
        menuDiv.innerHTML = "";

        if (menuData[category]) {
            menuData[category].forEach(item => {
                let row = document.createElement("div");
                row.className = "menu-item";

                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.className = "item-check";
                checkbox.dataset.category = category; // IMPORTANT

                let name = document.createElement("span");
                name.textContent = item;

                let qty = document.createElement("input");
                qty.type = "number";
                qty.min = 1;
                qty.value = 1;
                qty.className = "item-qty";

                row.appendChild(checkbox);
                row.appendChild(name);
                row.appendChild(qty);

                menuDiv.appendChild(row);
            });
        }
    });
document.addEventListener("change", function (e) {
    if (e.target.classList.contains("item-check")) {

        let checkbox = e.target;
        let row = checkbox.parentElement;
        let itemName = row.querySelector("span").textContent.trim();
        let qty = row.querySelector(".item-qty").value;
        let category = checkbox.dataset.category;

        if (!cart[category]) {
            cart[category] = [];
        }

        if (checkbox.checked) {
            cart[category].push(itemName + " x " + qty);
        } else {
            cart[category] = cart[category].filter(i => !i.startsWith(itemName));
            if (cart[category].length === 0) {
                delete cart[category];
            }
        }
    }
});

    // FORM SUBMIT
    document.getElementById("reserveForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let mobile = document.getElementById("mobile").value;
        let date = document.getElementById("date").value;
        let time24 = document.getElementById("bookingTime").value;
        let table = document.getElementById("table").value;
        let time = formatTime12Hour(time24);

        let selectedItems = {};

        document.querySelectorAll("#menuItems .menu-item").forEach(row => {
            let checkbox = row.querySelector(".item-check");
            let qty = row.querySelector(".item-qty").value;
            let itemName = row.querySelector("span").textContent.trim();
            let category = checkbox.dataset.category;

            if (checkbox.checked) {
                if (!selectedItems[category]) {
                    selectedItems[category] = [];
                }
                selectedItems[category].push(itemName + " x " + qty);
            }
        });

       let itemsText = "";

if (Object.keys(cart).length === 0) {
    itemsText = "No items selected";
} else {
    for (let category in cart) {
        itemsText += category + ":\n";
        cart[category].forEach(item => {
            itemsText += "- " + item + "\n";
        });
        itemsText += "\n";
    }
}


        let phoneNumber = "919247473397";

        let message =
            "Hello Adda The Restaurant,\n\n" +
            "I would like to book a table.\n\n" +
            "Name: " + name + "\n" +
            "Mobile: " + mobile + "\n" +
            "Email: " + email + "\n" +
            "Date: " + date + "\n" +
            "Time: " + time + "\n" +
            "Table: " + table + "\n\n" +
            "Items Ordered:\n" +
            itemsText;

        let whatsappURL =
            "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

        window.open(whatsappURL, "_blank");
    });
});
function openModal(img) {
    document.getElementById("imageModal").style.display = "flex";
    document.getElementById("modalImg").src = img.src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}
