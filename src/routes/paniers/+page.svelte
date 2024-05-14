<script>
  import ProtectedRoute from "../../components/ProtectedRoute.svelte";
  import { cart } from '../../store/CartStore.js';
  import { onMount } from 'svelte';

  let deliverymen = [];
  let selectedDeliveryManId;
  let cartItems = [];
  let user = JSON.parse(localStorage.getItem('user'));

  // Abonnez-vous au magasin de panier pour mettre à jour la liste des éléments du panier
  cart.subscribe(value => {
    cartItems = value;
    console.log(cartItems); 
  });

  // Fonction pour supprimer un article du panier
  function removeFromCart(item) {
    cart.update(items => items.filter(i => i !== item));
  }

  // Fonction pour regrouper les articles par restaurantId
  function groupItemsByRestaurant(items) {
    const groupedItems = {};
    items.forEach(item => {
      if (!groupedItems[item.restaurantId]) {
        groupedItems[item.restaurantId] = [];
      }
      groupedItems[item.restaurantId].push(item);
    });
    return groupedItems;
  }

  onMount(() => {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    // Appel à l'API pour récupérer les données des livreurs
    fetch("https://delivrpasapi.duckdns.org/api/deliveryman" , requestOptions)
        .then(response => response.json())
        .then(result => {
          deliverymen = result;
        })
        .catch(error => console.error(error));
  });

  async function purchase(restaurantId) {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const filteredCartItems = cartItems.filter(item => item.restaurantId == restaurantId);
    console.log('Contenu du panier filtré pour le restaurant', restaurantId, ':', filteredCartItems);


    const raw = JSON.stringify({
      "deliveryManId": selectedDeliveryManId,
      "restaurantId": restaurantId,
      "customerId": user.id,
      "orderItem": {
        cartItems: filteredCartItems
      }
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("https://delivrpasapi.duckdns.org/api/deliveries", requestOptions);
      if (response.ok) {
        // Supprimer uniquement les articles achetés du panier
        cart.set(cartItems.filter(item => !filteredCartItems.includes(item)));
        console.log("Achat effectué avec succès !");
      } else {
        console.error("Erreur lors de l'achat:", response.status);
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la requête:", error);
    }
  }
</script>

<ProtectedRoute>
  <div class="container mx-auto p-8">
    <!-- Affichage du contenu du panier -->
    <h2 class="text-xl font-semibold mb-4">Votre panier</h2>
    {#each Object.entries(groupItemsByRestaurant(cartItems)) as [restaurantId, items]}
      <div>
        <h3 class="text-lg font-semibold mb-2">Restaurant ID: {restaurantId}</h3>
        <ul>
          {#each items as item}
            <li class="flex justify-between items-center border-b py-2">
              <span>{item.nom}</span>
              <div>
                <!-- Bouton pour supprimer l'article du panier -->
                <button class="bg-red-500 text-white px-4 py-1 rounded mr-2" on:click={() => removeFromCart(item)}>Supprimer</button>
                <!-- Bouton pour modifier l'article (ajouter des fonctionnalités selon vos besoins) -->
                <button class="bg-blue-500 text-white px-4 py-1 rounded">Modifier</button>
              </div>
            </li>
          {/each}
        </ul>
        <!-- Sélection du livreur -->
        <select bind:value={selectedDeliveryManId} class="bg-white border border-gray-300 rounded px-4 py-2 mt-4">
          {#each deliverymen as deliveryman}
            <option value={deliveryman.id}>{deliveryman.name}</option>
          {/each}
        </select>
        <!-- Bouton pour effectuer l'achat -->
        <button class="bg-green-500 text-white px-4 py-2 rounded-md mt-4" on:click={() => purchase(parseInt(restaurantId))}>Effectuer l'achat</button>
      </div>
    {/each}
  </div>
</ProtectedRoute>
