const container = document.querySelector(".posts-grid");
const loadMoreBtn = document.querySelector(".load-more");
const request = new XMLHttpRequest();
let count = 5;
let preCount = 0;
let posts = [];

request.open("GET", "https://jsonplaceholder.org/posts");
request.send();

request.onload = () => {
    posts = JSON.parse(request.responseText);
    renderPosts(0, count);

    loadMoreBtn.addEventListener('click', () => {
        if (count >= posts.length) {
            loadMoreBtn.style.display = "none";
            return;
        }
        preCount = count;
        count += 5;
        renderPosts(preCount, count);
    });
};

function renderPosts(start, end) {
    for (let i = start; i < end && i < posts.length; i++) {
        const post = `
        <div class="post">
            <img src="${posts[i].image}" alt="${posts[i].title}" class="post-image">
            <h2 class="post-title">${posts[i].title}</h2>
            <p class="post-date">Posted on: ${posts[i].updatedAt}</p>
            <p class="post-content">${posts[i].content.slice(0, 100)}</p>
            <a href="#" class="read-more">Read More</a>
        </div>
        `;
        container.innerHTML += post;
    }
}



