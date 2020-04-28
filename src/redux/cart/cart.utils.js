export const addItemToCart=(cartItems, itemToAdd)=>{
const existingCartItem= cartItems.find(cartItem => cartItem.id === itemToAdd.id
)

if(existingCartItem){
    return cartItems.map(cartItem=>

        cartItem.id=== itemToAdd.id?
        {...cartItem, quantity:cartItem.quantity+1}
        :cartItem

    )
}
else{
    return [...cartItems,{...itemToAdd, quantity:1}]
}

}

export const removeItemFromCart=(cartItem, itemToRemove)=>{
    const existingCartItem = cartItem.find(
        cartItem=> cartItem.id===itemToRemove.id
        );


if(existingCartItem.quantity===1){
    return cartItem.filter(cartItem=> cartItem.id !== itemToRemove.id)
}

return cartItem.map(cartItem=> cartItem.id===itemToRemove.id?{...cartItem, quantity:cartItem.quantity-1}:cartItem)


}
