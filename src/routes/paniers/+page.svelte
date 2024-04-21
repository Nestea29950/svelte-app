<script>
  import ProtectedRoute from "../../components/ProtectedRoute.svelte";
  import { cart } from '../../store/CartStore.js';

  let cartItems = [];

  // Abonnez-vous au magasin de panier pour mettre à jour la liste des éléments du panier
  cart.subscribe(value => {
    cartItems = value;
    console.log(cartItems); // Affichez le contenu du panier dans la console
  });

  // Fonction pour supprimer un article du panier
  function removeFromCart(item) {
    cart.update(items => items.filter(i => i !== item));
  }
</script>

<ProtectedRoute>
  <div class="container mx-auto py-12">
    <!-- Affichage du contenu du panier -->
    <h2 class="text-xl font-semibold mb-4">Votre panier</h2>
    <ul>
      {#each cartItems as item}
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
  </div>
</ProtectedRoute>
