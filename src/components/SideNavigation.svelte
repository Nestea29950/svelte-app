<script>
    import ProtectedRoute from "../components/ProtectedRoute.svelte";
    import { cart } from '../store/CartStore';
    import { goto } from '$app/navigation';
    let cartlength;
    let payload;
    let userType;
    if (typeof localStorage !== 'undefined') {
    
    if (localStorage.getItem('user')) {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        console.log(user);
        payload = localStorage.getItem('payload');
        payload = JSON.parse(payload)
        userType = payload.userType;
        console.log(userType)
    }
} else {
    
    console.error('localStorage is not available in this environment.');
}
    

    function refreshdata(){
        console.log('oui')
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        payload = localStorage.getItem('payload');
        payload = JSON.parse(payload)
        userType = payload.userType;
    
    }


    cart.subscribe(value => {
      cartlength = value.length;
    });
  </script>
  <ProtectedRoute>
  <footer class="block lg:hidden w-full flex justify-center z-10 bg-white shadow-md border-t" style="position: fixed; bottom: 0; left: 50%; transform: translate(-50%);">
      <div class="bg-blacklight py-2 px-2 rounded-full w-full flex justify-between items-center text-gray-700">
        
      

        {#if userType === 'customer'}
        <a href="/accueil" class="image-link flex items-center flex-col w-3/12" on:click={() => {refreshdata();}}>
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Accueil
          </a>
          {:else if userType === 'restaurant'}
          <a href="/restaurant-add" class="image-link flex items-center flex-col w-3/12" on:click={() => {refreshdata();}}>
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6.00008V4.2844C16 3.51587 16 3.13161 15.8387 2.88321C15.6976 2.66587 15.4776 2.5118 15.2252 2.45345C14.9366 2.38677 14.5755 2.51809 13.8532 2.78073L6.57982 5.4256C6.01064 5.63257 5.72605 5.73606 5.51615 5.91845C5.33073 6.07956 5.18772 6.28374 5.09968 6.51304C5 6.77264 5 7.07546 5 7.6811V12.0001M9 17.0001H15M9 13.5001H15M9 10.0001H15M8.2 21.0001H15.8C16.9201 21.0001 17.4802 21.0001 17.908 20.7821C18.2843 20.5903 18.5903 20.2844 18.782 19.9081C19 19.4802 19 18.9202 19 17.8001V9.20008C19 8.07997 19 7.51992 18.782 7.0921C18.5903 6.71577 18.2843 6.40981 17.908 6.21807C17.4802 6.00008 16.9201 6.00008 15.8 6.00008H8.2C7.0799 6.00008 6.51984 6.00008 6.09202 6.21807C5.71569 6.40981 5.40973 6.71577 5.21799 7.0921C5 7.51992 5 8.07997 5 9.20008V17.8001C5 18.9202 5 19.4802 5.21799 19.9081C5.40973 20.2844 5.71569 20.5903 6.09202 20.7821C6.51984 21.0001 7.07989 21.0001 8.2 21.0001Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            Accueil
        </a>
          {:else if userType === 'deliveryMan'}
          <a href="/suivilivraison" class="image-link flex items-center flex-col w-3/12" on:click={() => {refreshdata();}}>
<svg width="25px" height="25px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="5" stroke="#000000" fill="none"><path d="M19.55,43.93H38.1a2,2,0,0,0,2-2V16.28a2,2,0,0,0-2-2H8.68a2,2,0,0,0-2,2V41.91a2,2,0,0,0,2,2h2.6"/><path d="M44.33,43.93H40.19V23.23H50a1,1,0,0,1,.76.35l6.3,7.55a1,1,0,0,1,.23.64V43.93H53"/><ellipse cx="15.53" cy="45.23" rx="4.44" ry="4.5"/><ellipse cx="48.58" cy="45.23" rx="4.44" ry="4.5"/></svg>
            Accueil
        </a>
        
          {/if}
          {#if userType === 'customer'}
          <a href="/accueil" class="image-link flex items-center flex-col w-3/12" on:click={() => {refreshdata();}}>
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13301 17 3 13.866 3 10C3 6.13301 6.13301 3 10 3C13.866 3 17 6.13301 17 10Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Parcourir
          </a>
          {/if}
          
          {#if userType === 'customer'}
          <a href="/paniers" class="image-link flex items-center flex-col w-3/12 relative" on:click={() => {refreshdata();}}>
            <span class="bg-red-500 text-white rounded-full px-3 py-1 absolute top-0  transform translate-x-1/2 -translate-y-1/2" style="left: 40px;">{cartlength}</span>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M3 10H21M8 13V13.01M16 13V13.01M6 10L9 4M18 10L15 4" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Paniers
        </a>
          {/if}
          
          <a href="/compte" class="image-link flex items-center flex-col w-3/12" on:click={() => {refreshdata();}}>
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 14C8.13301 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Compte
          </a>
      </div>
  </footer>
</ProtectedRoute>