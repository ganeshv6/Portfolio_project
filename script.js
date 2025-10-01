document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('current-year').textContent = new Date().getFullYear();

    checkDarkModePreference();

    showProjectTab('content-todo', 'tab-todo');
});

const darkModeToggle = document.getElementById('darkModeToggle');

const checkDarkModePreference = () => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-sun text-xl text-yellow-500"></i>';
    } else {
        document.body.classList.remove('dark');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-moon text-xl text-gray-700"></i>';
    }
};

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-sun text-xl text-yellow-500"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-moon text-xl text-gray-700"></i>';
    }
});


const navbar = document.getElementById('navbar');
const heroHeight = document.getElementById('home').offsetHeight;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-xl', 'bg-white/95', 'backdrop-blur-sm', 'dark:bg-gray-900/95');
        navbar.classList.remove('shadow-md');
    } else {
        navbar.classList.remove('shadow-xl', 'bg-white/95', 'backdrop-blur-sm', 'dark:bg-gray-900/95');
        navbar.classList.add('shadow-md');
    }
    
    highlightActiveSection();
});


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const highlightActiveSection = () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight - 50; 
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'font-bold');
        link.classList.add('text-gray-700', 'dark:text-gray-300');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('text-indigo-600', 'dark:text-indigo-400', 'font-bold');
            link.classList.remove('text-gray-700', 'dark:text-gray-300');
        }
    });
};


const tabTodo = document.getElementById('tab-todo');
const tabProducts = document.getElementById('tab-products');
const contentTodo = document.getElementById('content-todo');
const contentProducts = document.getElementById('content-products');

const allTabs = document.querySelectorAll('.project-tab');
const allContents = document.querySelectorAll('.project-content');

const showProjectTab = (contentId, tabId) => {
    allContents.forEach(content => content.classList.add('hidden'));
    allTabs.forEach(tab => {
        tab.classList.remove('bg-indigo-600', 'text-white');
        tab.classList.add('bg-gray-300', 'dark:bg-gray-700', 'text-gray-900', 'dark:text-gray-300');
    });

    document.getElementById(contentId).classList.remove('hidden');
    const activeTab = document.getElementById(tabId);
    activeTab.classList.add('bg-indigo-600', 'text-white');
    activeTab.classList.remove('bg-gray-300', 'dark:bg-gray-700', 'text-gray-900', 'dark:text-gray-300');
};

tabTodo.addEventListener('click', () => showProjectTab('content-todo', 'tab-todo'));
tabProducts.addEventListener('click', () => showProjectTab('content-products', 'tab-products'));


const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const renderTasks = () => {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow flex justify-between items-center transition duration-300 hover:shadow-md';
        li.innerHTML = `
            <span class="${task.completed ? 'line-through text-gray-500' : ''}">${task.text}</span>
            <div>
                <button data-index="${index}" class="complete-btn text-green-500 hover:text-green-700 mr-3">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button data-index="${index}" class="delete-btn text-red-500 hover:text-red-700">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        todoList.appendChild(li);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => deleteTask(e.currentTarget.dataset.index));
    });
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => toggleComplete(e.currentTarget.dataset.index));
    });
};

const addTask = () => {
    const text = todoInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        todoInput.value = '';
        saveTasks();
        renderTasks();
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};

const toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
};

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

renderTasks();


const products = [
    { id: 1, name: "Wireless Keyboard", price: 1999, category: "tech", rating: 4.5, image: "https://images.unsplash.com/photo-1722710386521-887b9b9e88f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdpcmVsZXNzJTIwa2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D" },
    { id: 2, name: "Noise-Cancelling Headphones", price: 2490, category: "tech", rating: 4.8, image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZCUyMHBob25lfGVufDB8fDB8fHww" },
    { id: 3, name: "Summer Linen Shirt", price: 550, category: "fashion", rating: 3.9, image: "https://plus.unsplash.com/premium_photo-1718913931807-4da5b5dd27fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww" },
    { id: 4, name: "The Modern Developer Book", price: 999, category: "books", rating: 5.0, image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D" },
];

const productGrid = document.getElementById('product-grid');
const categoryFilter = document.getElementById('category-filter');
const sortOption = document.getElementById('sort-option');

const renderProducts = (productsToRender) => {
    productGrid.innerHTML = ''; 
    productsToRender.forEach(product => {
        const ratingStars = '<i class="fa-solid fa-star"></i>'.repeat(Math.floor(product.rating)) + 
                            (product.rating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : '') +
                            '<i class="fa-regular fa-star"></i>'.repeat(5 - Math.ceil(product.rating));

        const card = document.createElement('div');
        card.className = 'product-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition duration-300 transform hover:scale-[1.02] hover:shadow-xl';
        card.setAttribute('data-category', product.category);
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h4 class="text-xl font-semibold mb-1">${product.name}</h4>
                <p class="text-indigo-600 dark:text-indigo-400 font-bold mb-2">₹${product.price.toFixed(2)}</p>
                <div class="flex items-center text-yellow-500 text-sm mb-3">
                    ${ratingStars} (${product.rating.toFixed(1)})
                </div>
                <button class="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">View Details</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
};

const filterAndSortProducts = () => {
    let filteredProducts = [...products];
    const category = categoryFilter.value;
    const sort = sortOption.value;

    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    filteredProducts.sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        if (sort === 'rating-desc') return b.rating - a.rating;
        return 0; 
    });

    renderProducts(filteredProducts);
};

categoryFilter.addEventListener('change', filterAndSortProducts);
sortOption.addEventListener('change', filterAndSortProducts);

renderProducts(products);


const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formStatus.classList.remove('hidden', 'text-green-600', 'text-red-600');
    formStatus.classList.add('text-gray-500');
    formStatus.textContent = "Sending...";
    
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            formStatus.classList.remove('text-gray-500');
            formStatus.classList.add('text-green-600');
            formStatus.textContent = "Message sent successfully! 🎉";
            contactForm.reset();
        }, (error) => {
            formStatus.classList.remove('text-gray-500');
            formStatus.classList.add('text-red-600');
            formStatus.textContent = `Failed to send the message. Please try again. Error: ${error.text}`;
        })
        .finally(() => {
             formStatus.classList.remove('hidden');
        });
});