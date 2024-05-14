<script>
  import ProtectedRoute from "../../components/ProtectedRoute.svelte";
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { MapLibre } from 'svelte-maplibre';
  
  let courses = [];
  let selectedDelivery = null;
  const dispatcher = createEventDispatcher();

  let token = null;
  const myHeaders = new Headers();

  // Check if localStorage is available
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token');
  }

  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  onMount(() => {
    let user = null;

    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      user = localStorage.getItem('user');
      user = JSON.parse(user);
    }

    if (user && token) {
      const url = `https://delivrpasapi.duckdns.org/api/deliveries?userType=deliveryMan&userid=${user.id}`;

      const requestOptions = {
          method: "GET", 
          headers: myHeaders
      };

      fetch(url, requestOptions)
          .then(response => response.json())
          .then(result => {
              courses = result;
          })
          .catch(error => console.error(error));
    }
  });

  function finishOrDeleteDelivery(delivery) {
    selectedDelivery = delivery;
    dispatcher('openModal');
  }

  async function confirmFinishOrDeleteDelivery(finish) {
    if (finish) {
      // Put your logic here to mark delivery as finished
      console.log("Delivery finished!", selectedDelivery.id);
    } else {
      try {
        const response = await fetch(`https://delivrpasapi.duckdns.org/api/deliveries/${selectedDelivery.id}`, {
          method: 'DELETE',
          headers: myHeaders
        });
        
        if (response.ok) {
          const index = courses.findIndex(delivery => delivery.id === selectedDelivery.id);
          if (index !== -1) {
            courses.splice(index, 1);
          }
          dispatcher('closeModal');
        } else {
          console.error('Failed to delete delivery');
        }
      } catch (error) {
        console.error('Error deleting delivery:', error);
      }
    }
  }
</script>


<div class="container mx-auto p-8">
  <ProtectedRoute>
    <h1 class="text-2xl font-bold mb-4">Livraison list</h1>
    {#if courses.length === 0}
      <p class="text-gray-600">Pas de livraison disponible</p>
    {:else}
      {#each courses as item}
        <div class="bg-white rounded-lg shadow-md p-4 mb-4">
          <p class="text-lg font-bold mb-2">Delivery ID: {item.id}</p>
          <p class="text-sm text-gray-600">Customer Name: {item.customer.name}</p>
          <p class="text-sm text-gray-600">Delivery Man Name: {item.deliveryMan.name}</p>
          <p class="text-sm text-gray-600">Restaurant Name: {item.restaurant.name}</p>
          <button class="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" on:click={() => finishOrDeleteDelivery(item)}>Finish/Delete Delivery</button>
        </div>
      {/each}
    {/if}
  </ProtectedRoute>

  {#if selectedDelivery !== null}
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div class="bg-white rounded-lg p-8 z-10">
        
        <p class="text-gray-600 mb-4">Are you sure you want to {selectedDelivery ? "finish/delete" : ""} delivery ID: {selectedDelivery.id}?</p>
        <div class="flex justify-end">
          <button class="bg-red-500 text-white px-4 py-2 rounded-md mr-4" on:click={() => selectedDelivery = null}>Annuler</button>
          <button class="bg-green-500 text-white px-4 py-2 rounded-md" on:click={() => confirmFinishOrDeleteDelivery(true)}>Finir la livraison</button>
           </div>
      </div>
    </div>
  {/if}
</div>

<MapLibre
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  class="relative aspect-[9/16] max-h-[70vh] w-full sm:aspect-video sm:max-h-full"
  standardControls
/>