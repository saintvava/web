
const products = [
    {
        name: "Сыворотка для лица",
        description: "SKIN 1004 MADAGASCAR CENTELLA TONE BRIGHTENING CAPSULE AMPOULE",
        price: 2777,
        image: "images/serum.jpg",
        category: "face"
    },
    {
        name: "Крем для лица",
        description: "Увлажняющий крем для ежедневного ухода",
        price: 1890,
        image: "images/serum.jpg",
        category: "face"
    },
    {
        name: "Тоник для лица",
        description: "Тоник для очищения и увлажнения кожи",
        price: 1450,
        image: "images/serum.jpg",
        category: "face"
    },
    {
        name: "Средство для ухода за телом",
        description: "Увлажнение и уход за кожей тела",
        price: 1500,
        image: "images/body.jpg",
        category: "body"
    },
    {
        name: "Крем для тела",
        description: "Питательный крем для мягкости кожи",
        price: 1750,
        image: "images/body.jpg",
        category: "body"
    },
    {
        name: "Лосьон для тела",
        description: "Увлажняющий лосьон для ежедневного ухода",
        price: 1250,
        image: "images/body.jpg",
        category: "body"
    },
    {
        name: "Шампунь",
        description: "Шампунь для бережного очищения волос",
        price: 1200,
        image: "images/hair.jpg",
        category: "hair"
    },
    {
        name: "Маска для волос",
        description: "Маска для питания и восстановления волос",
        price: 2100,
        image: "images/hair.jpg",
        category: "hair"
    },
    {
        name: "Бальзам для волос",
        description: "Бальзам для гладкости и лёгкого расчёсывания",
        price: 1600,
        image: "images/hair.jpg",
        category: "hair"
    }
];

const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Определяем категорию по имени HTML-файла
let currentCategory = "face";

if (window.location.pathname.endsWith("body-care.html")) {
    currentCategory = "body";
} else if (window.location.pathname.endsWith("hair-care.html")) {
    currentCategory = "hair";
}

// Создаём карточки товаров
function renderProducts(productList) {
    if (!productsContainer) return;

    if (productList.length === 0) {
        productsContainer.innerHTML =
            '<p class="no-products">Товары не найдены.</p>';
        return;
    }

    productsContainer.innerHTML = productList.map(product => `
        <article class="product-card">
            <a href="product.html" class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </a>

            <h3>${product.name}</h3>

            <p class="product-description">
                ${product.description}
            </p>

            <p class="product-price">
                ${product.price.toLocaleString("ru-RU")} ₽
            </p>
        </article>
    `).join("");
}

// Находим товары текущей категории по поисковому запросу
function getFilteredProducts() {
    const query = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    return products.filter(product => {
        const matchesCategory = product.category === currentCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });
}

// Обновляем список товаров
function updateProducts() {
    renderProducts(getFilteredProducts());
}

// Показываем товары при открытии страницы
if (productsContainer) {
    updateProducts();
}

// Обрабатываем нажатие кнопки поиска
if (searchButton && searchInput) {
    searchButton.addEventListener("click", updateProducts);

    // Запускаем поиск при нажатии Enter
    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            updateProducts();
        }
    });
}

/* Проверка формы регистрации */

const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;
        const passwordRepeat = document.getElementById("register-password-repeat").value;

        if (!name || !email || !password || !passwordRepeat) {
            alert("Заполните все поля!");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Введите корректный адрес электронной почты!");
            return;
        }

        if (password.length < 8) {
            alert("Пароль должен содержать не менее 8 символов!");
            return;
        }

        if (password !== passwordRepeat) {
            alert("Пароли не совпадают!");
            return;
        }

        alert("Проверка пройдена! Форма заполнена правильно.");
    });
}
