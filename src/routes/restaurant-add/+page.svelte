<script>
  import { onMount } from 'svelte';

  let menus = [];
  let dishes = [];
  let newMenuName = '';
  let newDishName = '';
  let isAddingMenu = false;
  let isAddingDish = false;

  onMount(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    // L'utilisateur n'est pas connecté, vous pouvez rediriger vers la page de connexion ou effectuer d'autres actions
    return;
  }

  let user = localStorage.getItem('user');
  user = JSON.parse(user);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("http://localhost:3000/api/restaurants/" + user.id, requestOptions)
    .then(response => response.json())
    .then(result => {
      menus = result.card.menu;
      dishes = result.card.dish;
      console.log(result);
    })
    .catch(error => console.error(error));
});


  async function addMenu() {
    isAddingMenu = true;
  }

  function cancelAddMenu() {
    isAddingMenu = false;
    newMenuName = '';
  }

  async function confirmAddMenu() {
    const token = localStorage.getItem('token');
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

const raw = JSON.stringify({
  "nom":  newMenuName 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

    try {
      const response = await fetch("http://localhost:3000/api/menus", requestOptions);
      if (response.ok) {
        // Mettre à jour l'affichage ou effectuer d'autres actions si nécessaire
        console.log("Menu ajouté avec succès");
      } else {
        console.error("Erreur lors de l'ajout du menu:", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la requête POST pour ajouter un menu:", error);
    }

    newMenuName = '';
    isAddingMenu = false;
  }

  async function addDish() {
    isAddingDish = true;
  }

  function cancelAddDish() {
    isAddingDish = false;
    newDishName = '';
  }

  async function confirmAddDish() {
    const token = localStorage.getItem('token');
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

const raw = JSON.stringify({
  "nom":  newDishName 
});


const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

    try {
      const response = await fetch("http://localhost:3000/api/dishes", requestOptions);
      if (response.ok) {
        // Mettre à jour l'affichage ou effectuer d'autres actions si nécessaire
        console.log("Plat ajouté avec succès");
      } else {
        console.error("Erreur lors de l'ajout du plat:", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la requête POST pour ajouter un plat:", error);
    }

    newDishName = '';
    isAddingDish = false;
  }
  async function deleteMenu(menuId) {
  const token = localStorage.getItem('token');
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(`http://localhost:3000/api/menus/${menuId}`, requestOptions);
    if (response.ok) {
      // Mettre à jour l'affichage ou effectuer d'autres actions si nécessaire
      console.log("Menu supprimé avec succès");
      
    } else {
      console.error("Erreur lors de la suppression du menu:", response.status);
    }
  } catch (error) {
    console.error("Erreur lors de la requête DELETE pour supprimer un menu:", error);
  }
}

async function deleteDish(dishId) {
  console.log(dishId)
  const token = localStorage.getItem('token');
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(`http://localhost:3000/api/dishes/${dishId}`, requestOptions);
    if (response.ok) {
      // Mettre à jour l'affichage ou effectuer d'autres actions si nécessaire
      console.log("Plat supprimé avec succès");
      
    } else {
      console.error("Erreur lors de la suppression du plat:", response.status);
    }
  } catch (error) {
    console.error("Erreur lors de la requête DELETE pour supprimer un plat:", error);
  }
}
  
</script>

<div class="container mx-auto p-8">
  <!-- Affichage des menus -->
  <h2 class="text-xl font-semibold mb-4">Menus</h2>
  <ul>
    {#each menus as menu}
      <li class="flex justify-between items-center border-b py-2">
        <span>{menu.nom}</span>
        <button class="bg-red-500 text-white px-4 py-2 rounded-md ml-4" on:click={() => deleteMenu(menu.id)}>Supprimer</button>
      </li>
    {/each}
    <button class="bg-green-500 text-white px-4 py-2 rounded-md mt-4" on:click={addMenu}>Ajouter Menu</button>
  </ul>

  <!-- Affichage des plats -->
  <h2 class="text-xl font-semibold mt-8 mb-4">Plats</h2>
  <ul>
    {#each dishes as dish}
      <li class="flex justify-between items-center border-b py-2">
        <span>{dish.nom}</span>
        <button class="bg-red-500 text-white px-4 py-2 rounded-md ml-4" on:click={() => deleteDish(dish.id)}>Supprimer</button>
      </li>
    {/each}
    <button class="bg-green-500 text-white px-4 py-2 rounded-md mt-4" on:click={addDish}>Ajouter Plat</button>
  </ul>
</div>


<!-- Modal d'ajout de menu -->
{#if isAddingMenu}
<div class="fixed inset-0 flex items-center justify-center z-50">
  <div class="fixed inset-0 bg-gray-800 opacity-50"></div>
  <div class="bg-white rounded-lg p-8 z-10">
    <h2 class="text-2xl font-bold mb-4">Ajouter un Menu</h2>
    <input type="text" class="border border-gray-400 px-4 py-2 rounded-md mb-4" placeholder="Nom du menu" bind:value={newMenuName} />
    <div class="flex justify-end">
      <button class="bg-red-500 text-white px-4 py-2 rounded-md mr-4" on:click={cancelAddMenu}>Annuler</button>
      <button class="bg-green-500 text-white px-4 py-2 rounded-md" on:click={confirmAddMenu}>Ajouter</button>
    </div>
  </div>
</div>
{/if}

<!-- Modal d'ajout de plat -->
{#if isAddingDish}
<div class="fixed inset-0 flex items-center justify-center z-50">
  <div class="fixed inset-0 bg-gray-800 opacity-50"></div>
  <div class="bg-white rounded-lg p-8 z-10">
    <h2 class="text-2xl font-bold mb-4">Ajouter un Plat</h2>
    <input type="text" class="border border-gray-400 px-4 py-2 rounded-md mb-4" placeholder="Nom du plat" bind:value={newDishName} />
    <div class="flex justify-end">
      <button class="bg-red-500 text-white px-4 py-2 rounded-md mr-4" on:click={cancelAddDish}>Annuler</button>
      <button class="bg-green-500 text-white px-4 py-2 rounded-md" on:click={confirmAddDish}>Ajouter</button>
    </div>
  </div>
</div>
{/if}
