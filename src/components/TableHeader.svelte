<script>
    import { onMount } from 'svelte';

    // Récupération du token depuis le localStorage
    const token = localStorage.getItem('token');

    // Construction de l'en-tête de la requête avec le token
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const restaurantImages = [
        "https://tb-static.uber.com/prod/image-proc/processed_images/2b8fda165b89f534efd8b7de7a5c1ffa/c9252e6c6cd289c588c3381bc77b1dfc.jpeg",
        "https://tb-static.uber.com/prod/image-proc/processed_images/350eab0284fc6c141fae992810a9039b/c9252e6c6cd289c588c3381bc77b1dfc.jpeg",
        "https://tb-static.uber.com/prod/image-proc/processed_images/21f5f32040e3d8efab167c26f351bc35/c9252e6c6cd289c588c3381bc77b1dfc.jpeg",
        "https://tb-static.uber.com/prod/image-proc/processed_images/58893a5d87e14ed325d4954649a864d7/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg"
    ];

    // Fonction pour choisir aléatoirement un élément d'un tableau
    const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

    // Options de la requête
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    let restaurants = [];
    let filteredRestaurants = []; // Initialisation avec tous les restaurants
    let postalCode = ''; // Initialisation du champ de recherche

    // Fonction pour filtrer les restaurants par code postal
    const filterRestaurants = () => {
        if (postalCode.trim() === '') {
            // Si le champ de recherche est vide, afficher tous les restaurants
            filteredRestaurants = restaurants;
        } else {
            // Sinon, filtrer les restaurants par code postal
            filteredRestaurants = restaurants.filter(restaurant => restaurant.adressePostal.toString().includes(postalCode));
        }
    };

    onMount(() => {
        // Appel à l'API pour récupérer les données des restaurants
        fetch("http://localhost:3000/api/restaurants", requestOptions)
            .then(response => response.json())
            .then(result => {
                // Stockage des données des restaurants dans les deux variables
                restaurants = result;
                filteredRestaurants = result;
               
            })
            .catch(error => console.error(error));
    });
</script>

<section class="p-4">
    
    <div class="relative bg-gray-200 rounded-full p-1 mb-4 w-full">
  
        <svg class="absolute top-1/2 transform -translate-y-1/2 left-4" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13301 17 3 13.866 3 10C3 6.13301 6.13301 3 10 3C13.866 3 17 6.13301 17 10Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
       
        <input type="text"  placeholder="Entrez un code postal" bind:value={postalCode} on:input={filterRestaurants} class="w-full pl-10 outline-none border-none bg-gray-200 rounded-full" />
    </div>
    
   
    <!-- Affichage des restaurants filtrés -->
{#each filteredRestaurants as restaurant (restaurant.id)}
<a href={`restaurant/${restaurant.id}`} class="block">
    <div class="mt-4 rounded-md w-full h-24 overflow-hidden">
        <img src="{getRandomElement(restaurantImages)}" alt="Restaurant Image" class="w-full h-full object-cover" />
    </div>
    <div class="mb-4 p-4">
        <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">{restaurant.name}</h2>
            <p class="text-gray-500">{restaurant.adressePostal}</p>
        </div>
        <p class="text-gray-600 mt-2">{restaurant.email}</p>
    </div>
</a>
{/each}

</section>

<style>
    /* Styles CSS pour correspondre au design mobile d'UberEats */
    /* Vous pouvez ajouter d'autres styles selon vos préférences */
</style>
