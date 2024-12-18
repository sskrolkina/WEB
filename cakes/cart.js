document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("search");
    const results = document.getElementById("results");
    const cartContainer = document.getElementById("cartContainer");
    const dynamicData = document.getElementById("dynamicData");
    const preloader = document.getElementById("preloader");

    let cakes = [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const showPreloader = () => (preloader.style.display = "block");
    const hidePreloader = () => (preloader.style.display = "none");

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

    const loadCakes = async (filterType = "greater") => {
        showPreloader();
        try {
            const response = await fetch("cakes.json");
            if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
            const data = await response.json();

            cakes = data.filter((album) =>
                filterType === "greater" ? album.id >= 1 : album.id <= 3
            );

            renderDynamicData();
        } catch (error) {
            dynamicData.innerHTML = `<p class="error">⚠ Что-то пошло не так: ${error.message}</p>`;
        } finally {
            hidePreloader();
        }
    };

    const renderDynamicData = () => {
        dynamicData.innerHTML = "";
        cakes.forEach((cake) => {
            const card = document.createElement("div");
            card.classList.add("cake-card");
            card.innerHTML = `
      <h4>${cake.title}</h4>
      <img src="${cake.image}" alt="${cake.title}" class="cake-image">
      <button class="button button--add" data-title="${cake.title}">Добавить в корзину</button>
    `;
            dynamicData.appendChild(card);
            dynamicData.appendChild(card);
        });

        const addButtons = document.querySelectorAll(".button--add");
        addButtons.forEach((button) =>
            button.addEventListener("click", () => {
                const title = button.getAttribute("data-title");
                cart.push(title);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            })
        );
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
            listItem.textContent = cake.title;

            listItem.addEventListener("click", () => {
                cart.push(cake.title);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
                results.innerHTML = "";
                searchInput.value = "";
            });

            results.appendChild(listItem);
        });
    });

    loadCakes("greater");

    updateCart();
});
