// Movie Search App JavaScript

class MovieSearchApp {
    constructor() {
        this.movies = this.getMovieData();
        this.filteredMovies = [...this.movies];
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderMovies();
    }

    bindEvents() {
        // Get search elements
        const smallSearchInput = document.querySelector('.search-input-small');
        const largeSearchInput = document.querySelector('.large-search-input');
        const searchButton = document.querySelector('.search-button');

        // Bind search events
        if (smallSearchInput) {
            smallSearchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            smallSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value);
                }
            });
        }

        if (largeSearchInput) {
            largeSearchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            largeSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value);
                }
            });
        }

        if (searchButton) {
            searchButton.addEventListener('click', () => {
                const searchTerm = largeSearchInput?.value || smallSearchInput?.value || '';
                this.handleSearch(searchTerm);
            });
        }

        // Sync search inputs
        if (smallSearchInput && largeSearchInput) {
            smallSearchInput.addEventListener('input', (e) => {
                largeSearchInput.value = e.target.value;
            });

            largeSearchInput.addEventListener('input', (e) => {
                smallSearchInput.value = e.target.value;
            });
        }

        // Movie card click events
        document.addEventListener('click', (e) => {
            const movieCard = e.target.closest('.movie-card');
            if (movieCard) {
                this.handleMovieClick(movieCard);
            }
        });
    }

    handleSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();

        if (!term) {
            this.filteredMovies = [...this.movies];
        } else {
            this.filteredMovies = this.movies.filter(movie =>
                movie.title.toLowerCase().includes(term) ||
                movie.year.toString().includes(term)
            );
        }

        this.renderMovies();
    }

    handleMovieClick(movieCard) {
        const title = movieCard.querySelector('.movie-title')?.textContent;
        if (!title) return;

        // Use the movie title to search TMDB API
        showMovieDetails(title);
    }

    renderMovies() {
        const moviesSection = document.querySelector('.movies-section');
        if (!moviesSection) return;

        // Clear existing content
        moviesSection.innerHTML = '';

        if (this.filteredMovies.length === 0) {
            moviesSection.innerHTML = `
                <div style="text-align: center; color: rgb(156, 163, 175); padding: 40px;">
                    <h3>No movies found</h3>
                    <p>Try searching for a different title or year.</p>
                </div>
            `;
            return;
        }

        // Group movies into rows of 5
        const moviesPerRow = 5;
        const rows = [];
        for (let i = 0; i < this.filteredMovies.length; i += moviesPerRow) {
            rows.push(this.filteredMovies.slice(i, i + moviesPerRow));
        }

        // Render each row
        rows.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'movies-row';

            row.forEach(movie => {
                const movieCard = this.createMovieCard(movie);
                rowElement.appendChild(movieCard);
            });

            moviesSection.appendChild(rowElement);
        });
    }

    createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';

        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-meta">${movie.year} · ${movie.rating}</div>
            </div>
        `;

        return card;
    }

    getMovieData() {
        return [
            { "title": "Tourist Family", "year": "2025", "rating": "8.3", "poster": "https://upload.wikimedia.org/wikipedia/en/7/75/Tourist_Family.jpg" },
            { "title": "Dragon", "year": "2025", "rating": "7.9", "poster": "https://upload.wikimedia.org/wikipedia/en/0/0f/Dragon_2025_poster.jpg" },
            { "title": "Veera Dheera Sooran: Part 2", "year": "2025", "rating": "6.9", "poster": "https://upload.wikimedia.org/wikipedia/en/5/5e/Veera_Dheera_Sooran.jpg" },
            { "title": "Kudumbasthan", "year": "2025", "rating": "7.3", "poster": "https://upload.wikimedia.org/wikipedia/en/d/d9/Kudumbasthan.jpg" },
            { "title": "Retro", "year": "2025", "rating": "6.9", "poster": "https://upload.wikimedia.org/wikipedia/en/d/df/Retro_film_poster.jpg" },
            { "title": "Kaadhal Enbadhu Podhu Udamai", "year": "2025", "rating": "6.0", "poster": "https://upload.wikimedia.org/wikipedia/en/9/9f/Kaadhal_Enbadhu_Podhu_Udamai_poster.jpg" },
            { "title": "Good Bad Ugly", "year": "2025", "rating": "7.1", "poster": "https://upload.wikimedia.org/wikipedia/en/8/83/Good_Bad_Ugly_poster.jpg" },
            { "title": "Thug Life", "year": "2025", "rating": "4.3", "poster": "https://upload.wikimedia.org/wikipedia/en/9/95/Thug_Life_2025.jpg" },
            { "title": "Devil's Double Next Level", "year": "2025", "rating": "5.0", "poster": "https://upload.wikimedia.org/wikipedia/en/e/eb/DD_Next_Level_Poster.jpg" },
            { "title": "ACE", "year": "2025", "rating": "8.6", "poster": "https://upload.wikimedia.org/wikipedia/en/4/40/Ace_film_poster.jpg" },
            { "title": "Jora Kaiya Thattunga", "year": "2025", "rating": "5.4", "poster": "https://upload.wikimedia.org/wikipedia/en/f/f5/Jora_Kaiya_Thattunga.jpg" },
            { "title": "Lal Salaam", "year": "2025", "rating": "4.5", "poster": "https://upload.wikimedia.org/wikipedia/en/3/35/Lal_Salaam_2024_poster.jpg" },
            { "title": "Padai Thalaivan", "year": "2025", "rating": "7.4", "poster": "https://upload.wikimedia.org/wikipedia/en/e/e7/Padai_Thalaivan.jpg" },
            { "title": "Madras Matinee", "year": "2025", "rating": "9.0", "poster": "https://upload.wikimedia.org/wikipedia/en/4/45/Madras_Matinee.jpg" },
            { "title": "Chennai City Gangsters", "year": "2025", "rating": "4.9", "poster": "https://upload.wikimedia.org/wikipedia/en/e/e2/Chennai_City_Gangsters.jpg" },
            { "title": "Kannappa", "year": "2025", "rating": "9.2", "poster": "https://upload.wikimedia.org/wikipedia/en/e/ed/Kannappa_%28film%29.jpg" },
            { "title": "Amaran", "year": "2024", "rating": "8.1", "poster": "https://upload.wikimedia.org/wikipedia/en/5/54/Amaran_2024_poster.jpg" },
            { "title": "Kanguva", "year": "2024", "rating": "4.5", "poster": "https://upload.wikimedia.org/wikipedia/en/e/e8/Kanguva_poster.jpg" },
            { "title": "Aranmanai 4", "year": "2024", "rating": "5.0", "poster": "https://upload.wikimedia.org/wikipedia/en/c/cf/Aranmanai_4.jpg" },
            { "title": "Raayan", "year": "2024", "rating": "6.5", "poster": "https://upload.wikimedia.org/wikipedia/en/e/e4/Raayan_poster.jpg" },
            { "title": "Demonte Colony 2", "year": "2024", "rating": "6.6", "poster": "https://upload.wikimedia.org/wikipedia/en/5/5c/Demonte_Colony_2.jpg" },
            { "title": "Sorgavaasal", "year": "2024", "rating": "6.6", "poster": "https://upload.wikimedia.org/wikipedia/en/6/6f/Sorgavaasal.jpg" },
            { "title": "Neela Nira Sooriyan", "year": "2024", "rating": "8.1", "poster": "https://upload.wikimedia.org/wikipedia/en/9/9c/Neela_Nira_Sooriyan.jpg" },
            { "title": "Kadaisi Ulaga Por", "year": "2024", "rating": "6.1", "poster": "https://upload.wikimedia.org/wikipedia/en/8/82/Kadaisi_Ulaga_Por_poster.jpg" },
            { "title": "Lubber Pandhu", "year": "2024", "rating": "8.2", "poster": "https://upload.wikimedia.org/wikipedia/en/9/91/Lubber_Pandhu.jpg" },
            { "title": "Maharaja", "year": "2024", "rating": "8.4", "poster": "https://upload.wikimedia.org/wikipedia/en/8/82/Maharaja_2024_film_poster.jpg" },
            { "title": "Vettaiyan", "year": "2024", "rating": "6.9", "poster": "https://upload.wikimedia.org/wikipedia/en/6/68/Vettaiyan_poster.jpg" },
            { "title": "The Greatest of All Time", "year": "2024", "rating": "5.7", "poster": "https://upload.wikimedia.org/wikipedia/en/1/1e/The_Greatest_of_All_Time.jpg" },
            { "title": "Indian 2", "year": "2024", "rating": "3.8", "poster": "https://upload.wikimedia.org/wikipedia/en/6/6f/Indian_2_poster.jpg" },
            { "title": "Eleven", "year": "2025", "rating": "7.8", "poster": "https://upload.wikimedia.org/wikipedia/en/f/f3/Eleven_film_poster.jpg" }
        ];
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// TMDB API function - Fixed and improved
function showMovieDetails(movieTitle) {
    const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual TMDB API key
    
    // Show loading state
    const modal = document.getElementById('movieModal');
    if (modal) {
        document.getElementById('modalTitle').innerText = 'Loading...';
        document.getElementById('modalOverview').innerText = 'Fetching movie details...';
        modal.classList.remove('hidden');
    }

    // Step 1: Search for the movie by title
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(searchData => {
            if (searchData.results.length === 0) {
                throw new Error("Movie not found in TMDB database.");
            }

            const movie = searchData.results[0]; // Get the top match
            const movieId = movie.id;

            // Step 2: Get full details using the movie ID
            return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Step 3: Populate the modal with movie details
            document.getElementById('modalTitle').innerText = data.title || 'Unknown Title';
            document.getElementById('modalOverview').innerText = data.overview || 'No overview available.';
            document.getElementById('modalRelease').innerText = data.release_date || 'Unknown';
            document.getElementById('modalRating').innerText = data.vote_average ? data.vote_average.toFixed(1) : 'N/A';
            document.getElementById('modalGenres').innerText = data.genres && data.genres.length > 0 
                ? data.genres.map(g => g.name).join(', ') 
                : 'No genres available';
                
            const posterElement = document.getElementById('modalPoster');
            if (data.poster_path) {
                posterElement.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
                posterElement.alt = data.title;
            } else {
                posterElement.src = 'https://via.placeholder.com/500x750?text=No+Poster+Available';
                posterElement.alt = 'No poster available';
            }
        })
        .catch(error => {
            console.error("Error fetching movie data:", error);
            
            // Show error in modal
            if (modal) {
                document.getElementById('modalTitle').innerText = 'Error';
                document.getElementById('modalOverview').innerText = `Failed to load movie details: ${error.message}`;
                document.getElementById('modalRelease').innerText = '';
                document.getElementById('modalRating').innerText = '';
                document.getElementById('modalGenres').innerText = '';
                document.getElementById('modalPoster').src = 'https://via.placeholder.com/500x750?text=Error+Loading+Movie';
            } else {
                alert(`Failed to load movie details: ${error.message}`);
            }
        });
}

function closeModal() {
    const modal = document.getElementById('movieModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MovieSearchApp();
    
    // Add loading animation for images
    const images = document.querySelectorAll('.movie-poster, .icon-image, .search-icon, .large-search-icon');

    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        img.addEventListener('error', function() {
            this.style.backgroundColor = '#374151';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#9CA3AF';
            this.style.fontSize = '12px';
            this.textContent = 'Image not found';
        });

        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && !e.target.matches('input')) {
            e.preventDefault();
            const largeSearchInput = document.querySelector('.large-search-input');
            if (largeSearchInput) {
                largeSearchInput.focus();
            }
        }

        if (e.key === 'Escape') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.matches('input')) {
                activeElement.blur();
            }
            // Also close modal if open
            closeModal();
        }
    });

    // Add smooth scrolling for better UX
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }

        .movie-poster {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .movie-card:hover .movie-poster {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .search-input-small,
        .large-search-input {
            transition: background-color 0.2s ease;
        }
    `;
    document.head.appendChild(style);
});

// Movie Modal JavaScript

// Function to show movie details in modal
function showMovieDetails(movieTitle) {
    const apiKey = "f16c845cf9msh2a9d4aa5aca636fp16a829jsn4869f35a0336"; // Replace with your actual TMDB API key
    
    // Show loading state
    const modal = document.getElementById('movieModal');
    if (modal) {
        document.getElementById('modalTitle').innerText = 'Loading...';
        document.getElementById('modalOverview').innerText = 'Fetching movie details...';
        document.getElementById('modalRelease').innerText = '';
        document.getElementById('modalRating').innerText = '';
        document.getElementById('modalGenres').innerText = '';
        document.getElementById('modalPoster').src = 'https://via.placeholder.com/300x450?text=Loading...';
        modal.classList.remove('hidden');
    }

    // Step 1: Search for the movie by title
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(searchData => {
            if (!searchData.results || searchData.results.length === 0) {
                throw new Error("Movie not found in TMDB database");
            }

            // Get the best match (first result)
            const movie = searchData.results[0];
            const movieId = movie.id;

            // Step 2: Get detailed movie information
            return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(movieData => {
            // Populate modal with movie details
            populateModal(movieData);
        })
        .catch(error => {
            console.error("Error fetching movie data:", error);
            showErrorInModal(error.message);
        });
}

// Function to populate modal with movie data
function populateModal(movieData) {
    // Set movie title
    document.getElementById('modalTitle').innerText = movieData.title || 'Unknown Title';
    
    // Set movie overview
    document.getElementById('modalOverview').innerText = movieData.overview || 'No overview available for this movie.';
    
    // Set release date
    const releaseDate = movieData.release_date;
    document.getElementById('modalRelease').innerText = releaseDate ? formatDate(releaseDate) : 'Unknown';
    
    // Set genres
    const genres = movieData.genres;
    document.getElementById('modalGenres').innerText = genres && genres.length > 0 
        ? genres.map(genre => genre.name).join(', ') 
        : 'No genres available';
    
    // Set rating
    const rating = movieData.vote_average;
    document.getElementById('modalRating').innerText = rating ? rating.toFixed(1) : 'N/A';
    
    // Set poster image
    const posterElement = document.getElementById('modalPoster');
    if (movieData.poster_path) {
        posterElement.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
        posterElement.alt = `${movieData.title} Poster`;
    } else {
        posterElement.src = 'https://via.placeholder.com/300x450?text=No+Poster+Available';
        posterElement.alt = 'No poster available';
    }
    
    // Handle poster loading errors
    posterElement.onerror = function() {
        this.src = 'https://via.placeholder.com/300x450?text=Poster+Not+Found';
        this.alt = 'Poster not found';
    };
}

// Function to show error message in modal
function showErrorInModal(errorMessage) {
    document.getElementById('modalTitle').innerText = 'Error Loading Movie';
    document.getElementById('modalOverview').innerText = `Sorry, we couldn't load the movie details. ${errorMessage}`;
    document.getElementById('modalRelease').innerText = '';
    document.getElementById('modalRating').innerText = '';
    document.getElementById('modalGenres').innerText = '';
    document.getElementById('modalPoster').src = 'https://via.placeholder.com/300x450?text=Error+Loading';
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('movieModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Function to format date nicely
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Close modal when clicking outside of it
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('movieModal');
        const modalContent = modal?.querySelector('.modal-content');
        
        if (modal && !modal.classList.contains('hidden')) {
            // Check if click is outside modal content
            if (event.target === modal && !modalContent?.contains(event.target)) {
                closeModal();
            }
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('movieModal');
            if (modal && !modal.classList.contains('hidden')) {
                closeModal();
            }
        }
    });
    
    // Handle close button click
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
});

// Optional: Function to show modal with custom data (without API call)
function showCustomMovieModal(movieData) {
    const modal = document.getElementById('movieModal');
    if (modal) {
        populateModal(movieData);
        modal.classList.remove('hidden');
    }
}

// Export functions if using modules (optional)
// export { showMovieDetails, closeModal, showCustomMovieModal };