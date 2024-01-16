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

/*  ternary condition: se nella creazione dei post esiste un tags e questo tags ha un valore creo l'elemento button altrimenti no
    ${post.tags && post.tags[0] ? `<button type="button">${post.tags[0]}</button>` : ''}
    ${post.tags && post.tags[1] ? `<button type="button">${post.tags[1]}</button>` : ''}

*/

function generatePostMarkup(post) {
    return `
    <div class="col-5 ">
        <div class="card data-id="${post.id}">
            <div class="intestazione p05">
                <h3 class="title">${post.title}</h3>
                <a href="#"><i id="savedbookmark" data-id="${post.id}" class="fa-regular fa-bookmark"></i></a>
            </div>

            <h5 class="text-align-left p05">Pubblicato da: ${post.author} </h5>
            <p class="text-align-left p05">in data: ${post.published}</p>
            <p class="text-align-left p05">${post.content}</p>

            <img src="${post.immagine}" alt=""${post.title}"">

            <div class="text-align-left">
                ${post.tags && post.tags[0] ? `<button type="button">${post.tags[0]}</button>` : ''}
                ${post.tags && post.tags[1] ? `<button type="button">${post.tags[1]}</button>` : ''}
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

const postsRowEl = document.querySelector('.posts .row');

posts.forEach(post => {
    const markup = generatePostMarkup(post);
    postsRowEl.insertAdjacentHTML('beforeend', markup);
    console.log(markup);

});

//al click sul bookmark l'icona diventa piena e i dati di quella card vengono salvati in un nuovo array 
//quando seleziono il checkbox saranno stampati in pagina


const bookmarks = document.querySelectorAll('.fa-bookmark');
let chekboxSavedBookmark = document.getElementById('savedFilter');

// Array per memorizzare gli ID dei post aggiunti ai segnalibri
let bookmarkedIds = [];

bookmarks.forEach(bookmark => {
    bookmark.addEventListener("click", function (e) {
        e.preventDefault;
         
        bookmark.classList.add('fa-solid');
        const postId = this.getAttribute('data-id');
        if (!bookmarkedIds.includes(postId)) {
            bookmarkedIds.push(postId);
        } 
        console.log(bookmarkedIds);
    });
});

let filteredPosts = 0;

chekboxSavedBookmark.addEventListener('change', function (e) {

    e.stopPropagation();  // Stop propagazione dell'evento
    if (this.checked) {
        let filteredPosts = posts.filter(post => bookmarkedIds.includes(post.id));
        displayFilteredPosts(filteredPosts);
        console.log(filteredPosts);
    } else {
        // se checkbox non è selezionato, display all posts
        this.checked = false;
        displayFilteredPosts(posts);

        console.log(posts);
    }
});

function displayFilteredPosts(filteredPosts) {
    // Cancella tutti i post presenti
    postsRowEl.innerHTML = '';

    // Stampa i post filtrati
    filteredPosts.forEach(post => {
        const markup = generatePostMarkup(post);
        postsRowEl.insertAdjacentHTML('beforeend', markup);
    });
}

// funzione  legata al cambiamento della select
document.getElementById('filtertag').addEventListener('change', function(e) {
    
    e.stopPropagation();  
    const selectedTag = this.value;  // definizione variabile per ottenere il valore del tag selezionato

    // Filtro posts basato sul select tag
    let filteredPosts;
    if (selectedTag === 'all') {
        filteredPosts = posts;  // Display all posts
    } else {
        filteredPosts = posts.filter(post => post.tags.includes(selectedTag.toLowerCase()));  // Filtro dei post basato sulla select 
    }

    // Visualizza i post filtrati sulla pagina
    displayFilteredPosts(filteredPosts);
});







