const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const posts = require('./posts/posts.js');

// Store newsletter subscribers
const subscribers = [];

// Helper function to read and modify the main HTML template
function getMainHTML(content, title = 'CodeNPixel - Game Dev & Graphics Programming') {
    const htmlPath = path.join(__dirname, 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // Update title if needed
    if (title !== 'CodeNPixel - Game Dev & Graphics Programming') {
        html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    }
    
    // Replace the main content
    html = html.replace(
        /<div id="main-content">[\s\S]*?<\/div>\s*<!-- Footer -->/,
        `<div id="main-content">${content}</div>\n\n    <!-- Footer -->`
    );
    
    return html;
}

// Helper function to generate home content
function getHomeContent() {
    return `
        <!-- Hero Section -->
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <h1>CodeNPixel</h1>
                    <p>Dive into Game Development & Graphics Programming</p>
                    <button class="cta-button" hx-get="/posts" hx-target="#main-content" hx-push-url="/posts">Explore Posts</button>
                </div>
            </div>
        </section>

        <!-- Newsletter Section -->
        <section class="newsletter">
            <div class="container">
                <h2>Stay Updated</h2>
                <p>Get the latest insights on Unreal Engine, OpenGL, and game development straight to your inbox</p>
                <form class="newsletter-form" hx-post="/newsletter" hx-swap="outerHTML">
                    <input type="email" name="email" placeholder="Enter your email address" required>
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </section>

        <!-- Posts Section -->
        <section class="posts" id="posts">
            <div class="container">
                <h2>Latest Posts</h2>
                <div class="posts-grid" hx-get="/api/posts" hx-trigger="load" hx-swap="innerHTML">
                    <!-- Posts will be loaded here -->
                    <div class="htmx-indicator">
                        <div class="spinner"></div>
                        <p>Loading posts...</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Helper function to generate posts page content
function getPostsContent(category = 'all') {
    const filteredPosts = category === 'all' 
        ? posts 
        : posts.filter(post => post.category.toLowerCase() === category.toLowerCase());

    const postsHTML = filteredPosts.map(post => `
        <article class="post-card">
            <div class="post-image">${post.image}</div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <div class="post-meta">${post.date} • ${post.category}</div>
                <p class="post-excerpt">${post.excerpt}</p>
                <a class="read-more" hx-get="/post/${post.id}" hx-target="#main-content" hx-push-url="/post/${post.id}">Read More →</a>
            </div>
        </article>
    `).join('');

    const categories = [...new Set(posts.map(post => post.category))];
    const filterButtons = categories.map(cat => `
        <button class="filter-btn ${category === cat.toLowerCase() ? 'active' : ''}" 
                hx-get="/posts?category=${cat.toLowerCase()}" 
                hx-target="#main-content" 
                hx-push-url="/posts?category=${cat.toLowerCase()}">${cat}</button>
    `).join('');

    return `
        <div class="posts-page">
            <div class="container">
                <h1>All Posts</h1>
                
                <div class="posts-filter">
                    <button class="filter-btn ${category === 'all' ? 'active' : ''}" 
                            hx-get="/posts" 
                            hx-target="#main-content" 
                            hx-push-url="/posts">All</button>
                    ${filterButtons}
                </div>

                <div class="posts-grid">
                    ${postsHTML}
                </div>
            </div>
        </div>
    `;
}

// Helper function to generate individual post content
function getPostContent(postId) {
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        return null;
    }

    return `
        <div class="post-page">
            <div class="container">
                <a class="back-to-posts" hx-get="/posts" hx-target="#main-content" hx-push-url="/posts">← Back to Posts</a>
                
                <div class="post-header">
                    <h1>${post.title}</h1>
                    <div class="post-meta">By ${post.author} • ${post.date}</div>
                    <div class="post-category">${post.category}</div>
                </div>
                
                <div class="post-image-full">${post.image}</div>
                
                <div class="post-content-full">
                    ${post.content}
                </div>
            </div>
        </div>
    `;
}

// Routes

// Serve the main HTML file (home page)
app.get('/', (req, res) => {
    // Check if this is an HTMX request
    if (req.headers['hx-request']) {
        res.send(getHomeContent());
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

// HTMX Routes - these return HTML fragments for HTMX
app.get('/home', (req, res) => {
    res.send(getHomeContent());
});

// Posts page - handles both full page requests and HTMX requests
app.get('/posts', (req, res) => {
    const category = req.query.category || 'all';
    const content = getPostsContent(category);
    
    // Check if this is an HTMX request
    if (req.headers['hx-request']) {
        res.send(content);
    } else {
        // Full page request - return complete HTML
        const title = category === 'all' ? 'All Posts - CodeNPixel' : `${category} Posts - CodeNPixel`;
        res.send(getMainHTML(content, title));
    }
});

// Individual post page - handles both full page requests and HTMX requests
app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const content = getPostContent(postId);
    
    if (!content) {
        return res.status(404).send(getMainHTML('<h1>Post not found</h1>', 'Post Not Found - CodeNPixel'));
    }

    const post = posts.find(p => p.id === postId);
    
    // Check if this is an HTMX request
    if (req.headers['hx-request']) {
        res.send(content);
    } else {
        // Full page request - return complete HTML with proper title and meta
        const title = `${post.title} - CodeNPixel`;
        res.send(getMainHTML(content, title));
    }
});

// API endpoint for posts (used by HTMX)
app.get('/api/posts', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const recentPosts = posts.slice(0, limit);
    
    const postsHTML = recentPosts.map(post => `
        <article class="post-card">
            <div class="post-image">${post.image}</div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <div class="post-meta">${post.date} • ${post.category}</div>
                <p class="post-excerpt">${post.excerpt}</p>
                <a class="read-more" hx-get="/post/${post.id}" hx-target="#main-content" hx-push-url="/post/${post.id}">Read More →</a>
            </div>
        </article>
    `).join('');
    
    res.send(postsHTML);
});

// Newsletter subscription
app.post('/newsletter', (req, res) => {
    const email = req.body.email;
    
    if (!email || !email.includes('@')) {
        return res.status(400).send('<p style="color: red;">Please enter a valid email address</p>');
    }
    
    if (subscribers.includes(email)) {
        return res.send('<p style="color: orange;">You are already subscribed!</p>');
    }
    
    subscribers.push(email);
    console.log(`New subscriber: ${email}`);
    
    res.send('<p style="color: #ff6b35; font-weight: bold;">Thank you for subscribing!</p>');
});

// API endpoint to get all posts (JSON)
app.get('/api/posts/json', (req, res) => {
    res.json(posts);
});

// API endpoint to get a single post (JSON)
app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send(getMainHTML('<h1>Page not found</h1>', 'Page Not Found - CodeNPixel'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Available routes:`);
    console.log(`  GET  /                    - Main page`);
    console.log(`  GET  /posts              - Posts page`);
    console.log(`  GET  /post/:id           - Individual post`);
    console.log(`  GET  /api/posts          - Posts HTML (for HTMX)`);
    console.log(`  GET  /api/posts/json     - Posts JSON`);
    console.log(`  GET  /api/posts/:id      - Single post JSON`);
    console.log(`  POST /newsletter         - Newsletter subscription`);
});

module.exports = app;
