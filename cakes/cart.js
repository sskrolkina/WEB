document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("search");
    const results = document.getElementById("results");
    const cartContainer = document.getElementById("cartContainer");

    const cakes = [
        "Наполеон",
        "Чизкейк",
        "Медовик",
        "Красный Бархат",
        "Шоколадный торт",
        "Тирамису",
        "Фруктовый торт",
        "Негр в пене",
        "Поцелуй негра",
        "Улыбка негра",
        "10 нигритят"
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updateCart = () => {
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.textContent = "Ваша корзина пуста.";
            return;
        }

        const list = document.createElement("ul");
        list.classList.add("cart-list");

        cart.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("cart-item");
            listItem.textContent = item;

            const removeButton = document.createElement("button");
            removeButton.classList.add("button", "button--remove");
            removeButton.textContent = "Удалить";
            removeButton.addEventListener("click", () => {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });

            listItem.appendChild(removeButton);
            list.appendChild(listItem);
        });

        cartContainer.appendChild(list);
    };

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        results.innerHTML = "";

        if (!query) {
            return;
        }

        const filteredCakes = cakes.filter((cake) =>
            cake.toLowerCase().includes(query)
        );

        filteredCakes.forEach((cake) => {
            const listItem = document.createElement("li");
            listItem.classList.add("result-item");
            listItem.textContent = cake;

            listItem.addEventListener("click", () => {
                cart.push(cake);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
                results.innerHTML = "";
                searchInput.value = "";
            });

            results.appendChild(listItem);
        });
    });

    updateCart();
});
