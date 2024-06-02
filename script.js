document.addEventListener("DOMContentLoaded", function() {
    const applyBtn = document.querySelector(".apply");
    applyBtn.addEventListener("click", function() {
        const fontSize = document.getElementById("sizelist").value;
        const selectedColor = document.querySelector(".dropdown-menu .active").textContent.trim().toLowerCase();
        
        document.body.style.fontSize = fontSize;
        document.body.style.color = selectedColor;
    });
        
    const colorButtons = document.querySelectorAll(".dropdown-menu .btn");
    colorButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            colorButtons.forEach(function(btn) {
                btn.classList.remove("active");
            });
            button.classList.add("active");
        });
    });

    let searchBtn = document.querySelector(".searchBtn");
    searchBtn.addEventListener("click", function(event) {
        event.preventDefault();
        const searchInput = document.getElementById("searchInput").value;
        if (searchInput.trim() !== "") {
            fetchSearchResults(searchInput);
        }
    });

    function fetchSearchResults(query) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => displayResults(data.query.search))
            .catch(error => console.error('Error fetching search results:', error));
    }

    function displayResults(results) {
        const searchResults = document.getElementById("searchResults");
        searchResults.innerHTML = "";

        if (results.length === 0) {
            searchResults.innerHTML = "<p>No results found.</p>";
            return;
        }

        results.forEach(result => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("result-item", "mb-3", "p-3", "border", "rounded");

            const title = document.createElement("h5");
            title.innerHTML = result.title;

            const snippet = document.createElement("p");
            snippet.innerHTML = result.snippet;

            const link = document.createElement("a");
            link.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;
            link.target = "_blank";
            link.textContent = "Read more";

            resultItem.appendChild(title);
            resultItem.appendChild(snippet);
            resultItem.appendChild(link);

            searchResults.appendChild(resultItem);
        });
    }
});





let searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", function() {
    console.log("I am clicked");
});

