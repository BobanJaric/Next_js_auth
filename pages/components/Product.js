
const Product = ({ item }) => {

    return (
        <>
            <div className='category-holder'>
                {item.category_name}
            </div>

            {item.items.map(item => (
                <div key={item.product_variant_id} className='product-holder'>
                    <div className='product-img'>
                        <img
                            src={`https://files.insby.tech/tap-dev-4/${item.product_variant_image_url}`}
                            alt="image"
                        />
                    </div>
                    <div className='product-name'>
                        {item.product_variant_name}
                    </div>
                    <div className='product-name'>
                        {item.product_variant_price.display_price}
                    </div>
                </div>
            )
            )
            }
        </>
    )
}

export default Product;