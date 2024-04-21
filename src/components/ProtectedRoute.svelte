<!-- ProtectedRoute.svelte -->
<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  
    let isAuthenticated = false; // Initial state
  
    onMount(() => {
      // Check if user is authenticated (e.g., by checking token in local storage)
      const token = localStorage.getItem('token');
      isAuthenticated = token ? true : false;
  
      // If not authenticated, redirect to login page
      if (!isAuthenticated) {
        goto('/');
      }
    });
  </script>
  
  {#if isAuthenticated}
    <slot /> <!-- Display protected content -->
  {/if}