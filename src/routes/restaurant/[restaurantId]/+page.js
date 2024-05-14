
export async function load( { params }) {
   
	return {
		post: {
			id: params.restaurantId
		}
	};
}

export const prerender = true;