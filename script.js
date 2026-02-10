document.addEventListener('DOMContentLoaded', () => {
    // Load About Content
    const aboutContentDiv = document.getElementById('about-content');
    const aboutMdPath = 'about.md';

    fetch(aboutMdPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load markdown file: ${response.statusText}`);
            }
            return response.text();
        })
        .then(markdown => {
            // Use marked.js to parse markdown
            aboutContentDiv.innerHTML = marked.parse(markdown);
        })
        .catch(error => {
            console.error('Error loading markdown:', error);
            aboutContentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
        });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Adjust scroll position for sticky nav
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
