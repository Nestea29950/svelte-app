<script>
  import { Section, Register } from "flowbite-svelte-blocks";
  import { Button, Checkbox, Label, Input } from "flowbite-svelte";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let selectedOption = 'Customers';
  let successAlert = false;
  let errorAlert = false;

  function goToLogin() {
    dispatch('goToLogin');
  }

  function handleSelection(event) {
    selectedOption = event.target.value;
  }

  let formData = {
    email: '',
    password: '',
    name: '',
    adressePostal: 0
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData)
    fetch('http://localhost:3000/api/' + selectedOption, {
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
      successAlert = true;
      errorAlert = false;
      dispatch('registrationSuccess');
    })
    .catch(error => {
      console.error('Erreur :', error);
      successAlert = false;
      errorAlert = true;
      dispatch('registrationError');
    });
  }
</script>

<Section name="register">
  <Register href="/">
    <svelte:fragment slot="top">
      DelivrPas
    </svelte:fragment>
    {#if errorAlert}
      <div class="p-2 bg-red-100 text-red-700">Erreur lors de la création du compte. Veuillez réessayer.</div>
    {/if}
    {#if successAlert}
      <div class="p-2 bg-green-100 text-green-700">Compte créé avec succès!</div>
    {/if}
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form on:submit={handleSubmit}>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Créer un compte</h3>
        <Label class="space-y-2">
          <span>Votre email</span>
          <Input type="email" name="email" placeholder="nom@entreprise.com" required bind:value={formData.email} />
        </Label>
        <Label class="space-y-2">
          <span>Votre mot de passe</span>
          <Input type="password" name="password" placeholder="•••••" required bind:value={formData.password} />
        </Label>
        <Label class="space-y-2">
          <span>Nom</span>
          <Input type="text" name="name" placeholder="John Doe" required bind:value={formData.name} />
        </Label>
        <Label class="space-y-2">
          <span>Code Postal</span>
          <Input type="number" name="adressePostal" placeholder="29000" required bind:value={formData.adressePostal} />
        </Label>
        <select class="space-y-2 my-4" bind:value={selectedOption} on:change={handleSelection}>
          <option value="Restaurants">Restaurants</option>
          <option value="Customers">Customers</option>
          <option value="Deliveryman">Deliveryman</option>
        </select>
        <div class="flex items-start my-2">
          <Checkbox>J'accepte les <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">Termes et Conditions</a></Checkbox>
        </div>
        <Button type="submit" class="w-full1 my-2">Créer un compte</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Déjà un compte? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={goToLogin}>Connectez-vous ici</a>
        </div>
      </form>
    </div>
  </Register>
</Section>
