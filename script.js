const apiKey = "pub_dd47de95ff594796a9d90b83ab104e76";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Fetch random news
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&size=10`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        return data.results || [];

    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}

// Fetch news by search query
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=${query}&size=10`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        return data.results || [];

    } catch (error) {
        console.error("Error fetching news by query:", error);
        return [];
    }
}

// Search button click
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();

    if (query !== "") {
        const articles = await fetchNewsQuery(query);
        displayBlogs(articles);
    }
});

// Display news
function displayBlogs(articles) {
    blogContainer.innerHTML = "";

    if (articles.length === 0) {
        blogContainer.innerHTML = "<h2>No results found.</h2>";
        return;
    }

    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.image_url || "https://placehold.co/600x400";

        const title = document.createElement("h2");
        title.textContent = article.title;

        const desc = document.createElement("p");
        desc.textContent = article.description || "No description available";

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(desc);

        blogCard.addEventListener("click", () => {
            window.open(article.link, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
}

// Load random news on page start
(async () => {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
})();
