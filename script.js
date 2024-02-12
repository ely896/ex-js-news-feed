let posts = [
    {
        id: '1',
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Scoperta di una nuova specie di papera di gomma.',
        immagine: 'img/rubber-duck.jpg',
        tags: ['geo', 'tech'],
        author: 'Diana Rossi',
        published: '2023-02-11'
    },
    {
        id: '2',
        title: 'Esplorando le profondità marine: il mistero degli abissi',
        content: 'Esplorando le profondità marine: il mistero degli abissi.',
        immagine: 'img/deep-sea.jpg',
        tags: ['geo', 'viaggi'],
        author: 'Fabio Mari',
        published: '2023-03-14'
    },
    {
        id: '3',
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        immagine: 'img/kitchen-food.jpg',
        tags: ['cucina'],
        author: 'Marta Bianchi',
        published: '2023-04-20',
    },
    {
        id: '4',
        title: 'Arte moderna: oltre i confini convenzionali',
        content: `Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.`,
        immagine: 'img/modern-art.jpg',
        tags: ['arte', 'tech'],
        author: 'Gabriele Neri',
        published: '2023-05-29',
    }
];

console.log(posts);

function generatePostMarkup(post) {
    let tagsMarkup = '';
    if (post.tags) {
        for (let i = 0; i < post.tags.length; i++) {
            tagsMarkup += `<button type="button" style="background-color: var(--post-${post.tags[i]}); color: white; border-radius: 0.5rem; border: none; width: 50px; height: 30px; margin-right: 10px;">${post.tags[i]}</button>`;

        }
    }

    return `
    <div class="col-5">
        <div class="card" data-id="${post.id}">
            <div class="intestazione p05">
                <h3 class="title">${post.title}</h3>
                <a href="#"><i id="savedbookmark" data-id="${post.id}" class="fa-regular fa-bookmark"></i></a>
            </div>

            <h5 class="text-align-left p05">Pubblicato da: ${post.author}</h5>
            <p class="text-align-left p05">in data: ${post.published}</p>
            <p class="text-align-left p05">${post.content}</p>

            <img src="${post.immagine}" alt="${post.title}">

            <div class="text-align-left">
                ${tagsMarkup}
            </div>
            
        </div>
    </div>`;
}



function reversePublishedDate(array) {
    return array.map(post => {
        // dichiarazione variabile per scrivere la data nel formato italiano
        const reversedDate = post.published.split('-').reverse().join('-');

        // genera un nuovo array di oggetti con la chiave published nel formato italiano (reversedDate)
        return {
            ...post,
            published: reversedDate
        };
    });
}
// Chiama la funzione e memorizza l'array dei post aggiornati
posts = reversePublishedDate(posts);

// Log dei post aggiornati per vedere le modifiche
console.log(posts);

function renderPosts(postsToRender) {
    const postsContainer = document.querySelector('.posts .row');
    postsContainer.innerHTML = ''; // Pulisce i post esistenti

    postsToRender.forEach(post => {
        const postMarkup = generatePostMarkup(post);
        postsContainer.innerHTML += postMarkup;
    });

    // Evento Listener sul bookmark 
    document.querySelectorAll('.fa-bookmark').forEach(bookmark => {
        bookmark.addEventListener('click', function() {
            this.classList.toggle('fa-solid');
            this.classList.toggle('fa-regular');
        });
    });
}


document.getElementById('filtertag').addEventListener('change', function() {
    updatePosts();
});

document.getElementById('savedFilter').addEventListener('change', function() {
    updatePosts();
});

//funzione legata al filtro della select e a quello del checkbox
function updatePosts() {
    const selectedTag = document.getElementById('filtertag').value;
    const bookmarkFilter = document.getElementById('savedFilter').checked;
    
    let filteredPosts = posts.filter(post => {
        let tagMatch = selectedTag === 'all' || post.tags.includes(selectedTag.toLowerCase());
        return tagMatch;
    });

    if (bookmarkFilter) {
        filteredPosts = filteredPosts.filter(post => {
            const postElement = document.querySelector(`.card[data-id="${post.id}"] .fa-bookmark`);
            return postElement && postElement.classList.contains('fa-solid');
        });
    }

    renderPosts(filteredPosts);
}

updatePosts();

























