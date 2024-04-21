<script>
  import ProtectedRoute from "../../components/ProtectedRoute.svelte";
  import { goto } from '$app/navigation';
function signOut(){
  console.log("oui")
  localStorage.removeItem('token');
  goto('/')
}
</script>

<div>
  <ProtectedRoute>
    <button on:click={signOut}>Se déconnecter</button>
  </ProtectedRoute>
  
</div>