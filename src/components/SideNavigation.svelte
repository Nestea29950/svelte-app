<script>
    import { cart } from '../store/CartStore';
    let cartlength;
  
    cart.subscribe(value => {
      cartlength = value.length;
    });
  </script>
  
  <footer class="block lg:hidden w-full flex justify-center z-10 bg-white shadow-md border-t" style="position: fixed; bottom: 0; left: 50%; transform: translate(-50%);">
      <div class="bg-blacklight py-2 px-2 rounded-full w-full flex justify-between items-center text-gray-700">
          <a href="/accueil" class="image-link flex items-center flex-col w-3/12" >
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Accueil
          </a>
          <a href="/accueil" class="image-link flex items-center flex-col w-3/12" >
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13301 17 3 13.866 3 10C3 6.13301 6.13301 3 10 3C13.866 3 17 6.13301 17 10Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Parcourir
          </a>
          <a href="/paniers" class="image-link flex items-center flex-col w-3/12 relative">
              <span class="bg-red-500 text-white rounded-full px-3 py-1 absolute top-0  transform translate-x-1/2 -translate-y-1/2" style="left: 40px;">{cartlength}</span>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M3 10H21M8 13V13.01M16 13V13.01M6 10L9 4M18 10L15 4" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Paniers
          </a>
          <a href="/compte" class="image-link flex items-center flex-col w-3/12" >
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 14C8.13301 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Compte
          </a>
      </div>
  </footer>
  