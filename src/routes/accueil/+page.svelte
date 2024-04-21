<script>
  import ProtectedRoute from "../../components/ProtectedRoute.svelte";
  import { goto } from '$app/navigation';
  import TableHeader from "../../components/TableHeader.svelte";
  import Maps from "../../components/Maps.svelte";
function signOut(){
  console.log("oui")
  localStorage.removeItem('token');
  goto('/')
}
</script>

<div>
  <ProtectedRoute>
    <TableHeader>
      
    </TableHeader>
  </ProtectedRoute>
  
</div>