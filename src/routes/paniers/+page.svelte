<script>
  import ProtectedRoute from "../../components/ProtectedRoute.svelte";
  import { cart } from '../../store/CartStore.js';
  import { onMount } from 'svelte';

  let deliverymen = [];
  let selectedDeliveryManId;
  let cartItems = [];
  let user = null;

  // Check if localStorage is available
  if (typeof localStorage !== 'undefined') {
    user = JSON.parse(localStorage.getItem('user'));
  }

  // Subscribe to the cart store to update the cart items list
  cart.subscribe(value => {
    cartItems = value;
    console.log(cartItems); 
  });

  // Function to remove an item from the cart
  function removeFromCart(item) {
    cart.update(items => items.filter(i => i !== item));
  }

  // Function to group items by restaurantId
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
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
      };

      // Call the API to fetch deliverymen data
      fetch("https://delivrpasapi.duckdns.org/api/deliveryman" , requestOptions)
          .then(response => response.json())
          .then(result => {
            deliverymen = result;
          })
          .catch(error => console.error(error));
    }
  });

  async function purchase(restaurantId) {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
      const filteredCartItems = cartItems.filter(item => item.restaurantId == restaurantId);
      console.log('Filtered cart items for restaurant', restaurantId, ':', filteredCartItems);


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
          // Remove only the purchased items from the cart
          cart.set(cartItems.filter(item => !filteredCartItems.includes(item)));
          console.log("Purchase successful!");
        } else {
          console.error("Error during purchase:", response.status);
        }
      } catch (error) {
        console.error("An error occurred during the request:", error);
      }
    }
  }
</script>

<ProtectedRoute>
  <div class="container mx-auto p-8">
    <!-- Display the cart content -->
    <h2 class="text-xl font-semibold mb-4">Your Cart</h2>
    {#each Object.entries(groupItemsByRestaurant(cartItems)) as [restaurantId, items]}
      <div>
        <h3 class="text-lg font-semibold mb-2">Restaurant ID: {restaurantId}</h3>
        <ul>
          {#each items as item}
            <li class="flex justify-between items-center border-b py-2">
              <span>{item.nom}</span>
              <div>
                <!-- Button to remove item from cart -->
                <button class="bg-red-500 text-white px-4 py-1 rounded mr-2" on:click={() => removeFromCart(item)}>Remove</button>
                <!-- Button to modify item (add functionalities as needed) -->
                <button class="bg-blue-500 text-white px-4 py-1 rounded">Modify</button>
              </div>
            </li>
          {/each}
        </ul>
        <!-- Deliveryman selection -->
        <select bind:value={selectedDeliveryManId} class="bg-white border border-gray-300 rounded px-4 py-2 mt-4">
          {#each deliverymen as deliveryman}
            <option value={deliveryman.id}>{deliveryman.name}</option>
          {/each}
        </select>
        <!-- Button to make purchase -->
        <button class="bg-green-500 text-white px-4 py-2 rounded-md mt-4" on:click={() => purchase(parseInt(restaurantId))}>Make Purchase</button>
      </div>
    {/each}
  </div>
</ProtectedRoute>
