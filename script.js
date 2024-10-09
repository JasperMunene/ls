const tweetFeed = document.getElementById('tweet-feed');
const postTweetBtn = document.getElementById('post-tweet');
const tweetInput = document.getElementById('tweet-input');

// JSON Server URL (replace with the correct port if needed)
const API_URL = 'http://localhost:3000/tweets';

// Load Tweets from JSON Server
function loadTweets() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tweets => {
            tweetFeed.innerHTML = ''; // Clear the current tweet feed
            tweets.forEach(tweet => {
                renderTweet(tweet);
            });
        });
}

// Render a Tweet to the DOM
function renderTweet(tweet) {
    const tweetElement = document.createElement('div');
    tweetElement.classList.add('tweet');
    tweetElement.innerHTML = `
        <p>${tweet.content}</p>
        <button class="edit-btn" data-id="${tweet.id}">Edit</button>
        <button class="delete-btn" data-id="${tweet.id}">Delete</button>
    `;
    
    tweetFeed.appendChild(tweetElement);

    // Add event listeners to the edit and delete buttons
    tweetElement.querySelector('.edit-btn').addEventListener('click', () => editTweet(tweet));
    tweetElement.querySelector('.delete-btn').addEventListener('click', () => deleteTweet(tweet.id));
}

// Post a new Tweet
postTweetBtn.addEventListener('click', () => {
    const tweetContent = tweetInput.value.trim();
    if (tweetContent) {
        const newTweet = { content: tweetContent };
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTweet)
        })
        .then(response => response.json())
        .then(tweet => {
            renderTweet(tweet);
            tweetInput.value = ''; // Clear input field after posting
        });
    }
});

// Edit an existing tweet
function editTweet(tweet) {
    const updatedContent = prompt("Edit your tweet:", tweet.content);
    if (updatedContent) {
        fetch(`${API_URL}/${tweet.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: updatedContent })
        })
        .then(() => {
            loadTweets(); // Reload the tweet feed after editing
        });
    }
}

// Delete a Tweet
function deleteTweet(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        loadTweets(); // Reload the tweet feed after deleting
    });
}

// Initial Load
loadTweets();
