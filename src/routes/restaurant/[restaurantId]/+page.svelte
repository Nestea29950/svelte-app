<script>
	export let data;
  
  import { onMount } from 'svelte';
 // Stockage des menus et des plats
 import { cart } from '../../../../src/store/CartStore';


 let menus = [];
  let dishes = [];
  function addToCart(item) {
    item.restaurantId = data.post.id;
    cart.update(items => [...items, item]);
  }
    // Récupération du token depuis le localStorage
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

  onMount(() => {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
        // Appel à l'API pour récupérer les données des restaurants
        fetch("http://localhost:3000/api/restaurants/" + data.post.id, requestOptions)
            .then(response => response.json())
            .then(result => {
              menus = result.card.menu;
        dishes = result.card.dish;
                
               
            })
            .catch(error => console.error(error));
    });
</script>

<div class="container mx-auto p-8">
  <!-- Affichage des menus -->
  <h2 class="text-xl font-semibold mb-4">Menus</h2>
  <ul>
    {#each menus as menu}
      <li class="flex justify-between items-center border-b py-2">
        <span>{menu.nom}</span>
        <button class="bg-blue-500 text-white px-4 py-1 rounded" on:click={() => addToCart(menu)}>Ajouter au panier</button>
      </li>
    {/each}
  </ul>

  <!-- Affichage des plats -->
  <h2 class="text-xl font-semibold mt-8 mb-4">Plats</h2>
  <ul>
    {#each dishes as dish}
      <li class="flex justify-between items-center border-b py-2">
        <span>{dish.nom}</span>
        <button class="bg-blue-500 text-white px-4 py-1 rounded" on:click={() => addToCart(dish)}>Ajouter au panier</button>
      </li>
    {/each}
  </ul>
</div>