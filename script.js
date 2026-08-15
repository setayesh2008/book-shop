// ===============================
// منوی موبایل
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}


// ===============================
// سبد خرید
// ===============================

const cartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector(".cart-count");
const cartIcon = document.querySelector(".cart-icon");
const cartPanel = document.querySelector(".cart-panel");
const cartItemsContainer = document.querySelector(".cart-items");
const totalPrice = document.querySelector(".total-price");

let cartItems = 0;
let total = 0;


// ===============================
// پنل سبد خرید
// ===============================

if (cartPanel) {
    cartPanel.style.display = "none";
}


// ===============================
// افزودن کتاب
// ===============================

cartButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();

        const card = button.closest(".book-card");

        if (!card || !cartItemsContainer) {
            return;
        }

        const bookName = card.querySelector("h3").textContent;
        const priceText = card.querySelector("span").textContent;
        const priceNumber = parseInt(
            priceText.replace(/[^\d]/g, "")
        );


        // بررسی اینکه کتاب قبلاً در سبد هست یا نه

        let item = [...cartItemsContainer.querySelectorAll(".cart-item")]
            .find(cartItem => cartItem.dataset.name === bookName);


        if (item) {

            // کتاب قبلاً وجود دارد
            const quantityElement = item.querySelector(".quantity");

            let quantity = Number(quantityElement.textContent);

            quantity++;

            quantityElement.textContent = quantity;

        } else {

            // ساخت کتاب جدید

            item = document.createElement("div");

            item.classList.add("cart-item");
            item.dataset.name = bookName;
            item.dataset.price = priceNumber;

            item.innerHTML = `
                <span>${bookName}</span>
                <span>${priceText}</span>
                <span>تعداد: <span class="quantity">1</span></span>
                <button class="remove-item">حذف</button>
            `;

            cartItemsContainer.appendChild(item);

            // دکمه حذف

            const removeButton = item.querySelector(".remove-item");

            removeButton.addEventListener("click", event => {

                event.stopPropagation();

                const quantityElement = item.querySelector(".quantity");

                let quantity = Number(
                    quantityElement.textContent
                );


                if (quantity > 1) {

                    quantity--;

                    quantityElement.textContent = quantity;

                } else {

                    item.remove();

                }


                // تعداد کل کتاب‌ها

                cartItems--;

                // کم کردن قیمت

                total -= priceNumber;


                if (cartCount) {
                    cartCount.textContent = cartItems;
                }


                if (totalPrice) {
                    totalPrice.textContent =
                        total.toLocaleString("fa-IR") + " تومان";
                }

            });

        }


        // افزایش تعداد کل

        cartItems++;

        // افزایش قیمت کل

        total += priceNumber;


        if (cartCount) {
            cartCount.textContent = cartItems;
        }


        if (totalPrice) {
            totalPrice.textContent =
                total.toLocaleString("fa-IR") + " تومان";
        }


        // تغییر متن دکمه

        button.textContent = "به سبد اضافه شد ✓";


        setTimeout(() => {

            button.textContent = "افزودن به سبد خرید";

        }, 1500);

    });

});


// ===============================
// باز و بسته شدن سبد
// ===============================

if (cartIcon && cartPanel) {

    cartIcon.addEventListener("click", event => {

        event.preventDefault();
        event.stopPropagation();

        if (cartPanel.style.display === "block") {

            cartPanel.style.display = "none";

        } else {

            cartPanel.style.display = "block";

        }

    });


    // کلیک داخل پنل

    cartPanel.addEventListener("click", event => {
        event.stopPropagation();
    });


    // کلیک بیرون پنل

    document.addEventListener("click", () => {
        cartPanel.style.display = "none";
    });

}
const continueShopping = document.querySelector(".continue-shopping");

if (continueShopping && cartPanel) {
    continueShopping.addEventListener("click", () => {
        cartPanel.style.display = "none";
    });
}
const navLinks = document.querySelectorAll(
    'nav a[href^="#"]'
);

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});
const aboutLinks = document.querySelectorAll('a[href="#about"]');
const aboutPanel = document.querySelector(".about-panel");
const closeAbout = document.querySelector(".close-about");

if (aboutPanel) {
    aboutPanel.style.display = "none";
}

aboutLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        if (aboutPanel) {
            aboutPanel.style.display = "block";
        }
    });
});

if (closeAbout && aboutPanel) {
    closeAbout.addEventListener("click", event => {
        event.stopPropagation();
        aboutPanel.style.display = "none";
    });
}
const bookSearch = document.querySelector("#book-search");
const bookCards = document.querySelectorAll(".book-card");

bookSearch.addEventListener("input", function () {
    const searchText = bookSearch.value.trim().toLowerCase();

    bookCards.forEach(function (card) {
        const bookName = card
            .querySelector("h3")
            .textContent
            .trim()
            .toLowerCase();

        if (bookName.includes(searchText)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});
const searchButton = document.querySelector("#searchbutton");
const productsSection = document.querySelector("#products");

searchButton.addEventListener("click", function () {
    productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    bookSearch.focus();
});

