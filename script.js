document.addEventListener("DOMContentLoaded", function() {
    const applyBtn = document.querySelector(".apply");
    applyBtn.addEventListener("click", function() {
        const fontSize = document.getElementById("sizelist").value;
        const fontFamily = document.getElementById("fontlist").value;
        const selectedColor = document.querySelector(".dropdown-menu .active").textContent.trim().toLowerCase();
        const themecolor=document.getElementById("modelist").value;
        
        document.body.style.fontSize = fontSize;
        document.body.style.fontFamily = fontFamily; // Correctly set font family
        document.body.style.backgroundColor=themecolor;
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

    const searchBtn = document.querySelector(".searchBtn");
    searchBtn.addEventListener("click", function(event) {
        event.preventDefault();
        const searchInput = document.getElementById("searchInput").value;
        if (searchInput.trim() !== "") {
            fetchSearchResults(searchInput);
        }
    });

    function fetchSearchResults(query) {
        const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1&no_html=1&skip_disambig=1`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => displayResults(data))
            .catch(error => console.error('Error fetching search results:', error));
    }

    function displayResults(data) {
        const searchResults = document.getElementById("searchResults");
        searchResults.innerHTML = "";

        if (!data.AbstractText) {
            searchResults.innerHTML = "<p>No results found.</p>";
            return;
        }

        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item", "mb-3", "p-3", "border", "rounded");

        const title = document.createElement("h5");
        title.innerHTML = data.Heading;

        const snippet = document.createElement("p");
        snippet.innerHTML = data.AbstractText;

        resultItem.appendChild(title);
        resultItem.appendChild(snippet);

        if (data.RelatedTopics && data.RelatedTopics.length > 0) {
            const relatedTitle = document.createElement("h5");
            relatedTitle.innerHTML = "Related Topics:";
            resultItem.appendChild(relatedTitle);

            const relatedList = document.createElement("ul");
            data.RelatedTopics.forEach(topic => {
                if (topic.Text) {
                    const listItem = document.createElement("li");
                    listItem.textContent = topic.Text;
                    relatedList.appendChild(listItem);
                }
            });
            resultItem.appendChild(relatedList);
        }

        searchResults.appendChild(resultItem);
    }
});
