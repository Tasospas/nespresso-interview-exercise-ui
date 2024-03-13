const capsule = document.querySelector('.capsule');
const coffeeSpecs = document.querySelector('.coffee-specs');
const fetchedData = document.getElementById('fetched-data');
const overlay = document.querySelector('.overlay');
let lastFetchTime = 0;

async function fetchData() {
    try {
        const randomId = Math.floor(Math.random() * 50) + 1;
        const response = await fetch(`https://dummyjson.com/products/${randomId}`);
        const data = await response.json();
        updateFetchedData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateFetchedData(data) {
    const htmlContent = `
        <div><strong>ID:</strong> ${data.id}</div>
        <div><strong>Title:</strong> ${data.title}</div>
        <div><strong>Description:</strong> ${data.description}</div>
        <div><strong>Price:</strong> ${data.price}</div>
        <div><strong>Discount Percentage:</strong> ${data.discountPercentage}</div>
        <div><strong>Rating:</strong> ${data.rating}</div>
        <div><strong>Stock:</strong> ${data.stock}</div>
        <div><strong>Brand:</strong> ${data.brand}</div>
        <div><strong>Category:</strong> ${data.category}</div>
    `;
    fetchedData.innerHTML = htmlContent;
}

capsule.addEventListener('click', () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastFetchTime >= 1000) {
        fetchData();
        lastFetchTime = currentTime;
    }
});

capsule.addEventListener('mouseenter', () => {
    coffeeSpecs.style.display = 'flex';
    overlay.style.display = 'flex';
});

capsule.addEventListener('mouseleave', () => {
    if (fetchedData.innerHTML.trim() === '') {
        coffeeSpecs.style.display = 'none';
        overlay.style.display = 'none';
    }
});

capsule.addEventListener('touchstart', () => {
    coffeeSpecs.style.display = 'flex';
    overlay.style.display = 'flex';
});

overlay.addEventListener('touchstart', () => {
    if (fetchedData.innerHTML.trim() === '') {
        coffeeSpecs.style.display = 'none';
        overlay.style.display = 'none';
    }
});

document.addEventListener('click', function(event) {
    if (!coffeeSpecs.contains(event.target) && !capsule.contains(event.target)) {
        coffeeSpecs.style.display = 'none';
        overlay.style.display = 'none';
    }
});
