<script>
  import { Section, Register } from "flowbite-svelte-blocks";
  import { Button, Checkbox, Label, Input } from "flowbite-svelte";
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  const dispatch = createEventDispatcher();

  let formData = {
    email: '',
    password: ''
  };

  let token = ''; // Variable pour stocker le token récupéré
  let loginSuccess = null; // Variable pour indiquer si la connexion a réussi

  function goToRegister() {
    dispatch('goToRegister');
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch('https://delivrpasapi.duckdns.org/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la requête.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Réponse du serveur :', data);
      token = data.token;
      let user = data.user; 
      let payload = data.payload;
      
      localStorage.setItem('token', token);
      sessionStorage.setItem('token', token);
     
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('payload', JSON.stringify(payload));
      
      loginSuccess = true;
      if(loginSuccess == true && payload.userType == 'customer'){
        goto('/accueil');
      }
      else if (payload.userType == 'deliveryMan'){
        goto('/suivilivraison');
      }
      else{
        goto('/restaurant-add');
      }
      
    })
    .catch(error => {
      console.error('Erreur :', error);
      loginSuccess = false; // La connexion a échoué
      dispatch('loginError');
    });
  }
</script>

<Section name="login">
  <Register href="/">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form on:submit={handleSubmit}>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Connexion</h3>
        <Label class="space-y-2">
          <span>Votre email</span>
          <Input type="email" name="email" placeholder="nom@entreprise.com" required bind:value={formData.email} />
        </Label>
        <Label class="space-y-2">
          <span>Votre mot de passe</span>
          <Input type="password" name="password" placeholder="•••••" required bind:value={formData.password} />
        </Label>
        <Button type="submit" class="w-full1 my-2">Se connecter</Button>
        {#if loginSuccess}
          <div class="text-green-500">Connexion réussie!</div>
        {:else if loginSuccess == false}
          <div class="text-red-500">La connexion a échoué. Veuillez réessayer.</div>
        {/if}
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Pas encore de compte? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={goToRegister}>Inscrivez-vous ici</a>
        </div>
      </form>
    </div>
  </Register>
</Section>
