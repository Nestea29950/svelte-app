<!-- index.svelte -->
<script>
    import { onMount } from 'svelte';
    import RegisterForm from '../components/RegisterForm.svelte';
    import LoginForm from '../components/LoginForm.svelte';
    import { goto } from '$app/navigation';
    let showRegisterForm = false;
  
    function goToRegisterForm() {
      showRegisterForm = true;
    }
  
    function backToLogin() {
      showRegisterForm = false;
    }

    onMount(() => {
      // Check if user is authenticated (e.g., by checking token in local storage)
      const token = localStorage.getItem('token');
      let isAuthenticated = token ? true : false;
  
      // If not authenticated, redirect to login page
      if (isAuthenticated == true) {
        let payload = localStorage.getItem('payload');
        payload = JSON.parse(payload)
        let userType = payload.userType;
        if(userType == 'customer'){
          goto('/accueil');
        }
        else if(userType == 'deliveryMan'){
          goto('/suivilivraison');
        }
        else{
          goto('/restaurant-add');
        }
        
      }
    });
  </script>
  
  <div class="p-8">
    {#if showRegisterForm}
      <RegisterForm on:goToLogin={backToLogin} />
    {:else}
      <LoginForm on:goToRegister={goToRegisterForm} /><!-- Add a button to show the register form -->
    {/if}
  </div>
  