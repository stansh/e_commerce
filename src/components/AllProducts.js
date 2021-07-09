
const url = 'https://fakestoreapi.com/products';




function AllProducts () {
    fetch(url)
    .then(res => res.json())
    .then(res => {   
        const products = res.map(product => {
            return (
                <div key ={product.id}>
                    <h3>{product.title}</h3>
                    <h3>{product.price}</h3>
                    <p>{product.description}</p>
                </div>
            );

        });
        return  {products}  
   

            
    });
         
        
}

export default AllProducts;
    

