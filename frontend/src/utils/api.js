// ../utils/api.js


export async function fetchProducts(queryString) {
  try {
    const response = await fetch(`/backend/products/filter?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Propagate the error up to be handled by the caller if necessary
  }
}