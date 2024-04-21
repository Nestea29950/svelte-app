<script>
  import ProtectedRoute from "../../components/ProtectedRoute.svelte";
  import { goto } from '$app/navigation';

  let user = localStorage.getItem('user');
  user = JSON.parse(user);

  function signOut() {
    localStorage.removeItem('token');
    goto('/');
  }
</script>

<div class="p-4">
  <ProtectedRoute>
    <div class="bg-white rounded-md ">
      <!-- Header -->
      <div class=" py-4 px-6 rounded-t-md">
        <h1 class="text-2xl font-semibold text-center">Profil</h1>
      </div>

      <!-- User Info -->
      <div class="p-6">
        <div class="flex items-center justify-center space-x-4">
          <div class="flex-shrink-0">
            <!-- Placeholder Avatar -->
            <div class="w-12 h-12 bg-gray-400 rounded-full"></div>
          </div>
          <div>
            <h2 class="text-lg font-semibold">{user.name}</h2>
            <!-- Email -->
            <p class="text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class=" border-gray-200 p-4 flex justify-center">
        <button class="text-red-500 font-semibold" on:click={signOut}>Se déconnecter</button>
      </div>
    </div>
  </ProtectedRoute>
</div>
