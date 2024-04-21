// Dans le fichier où le magasin est défini (par exemple, CartStore.js)
import { writable } from 'svelte/store';

// Création du store pour le panier
export const cart = writable([]);
