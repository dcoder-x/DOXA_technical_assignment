import { createSlice } from "@reduxjs/toolkit";
import { productType } from '../../types/product';

const initialproduct:productType = {
    name:"",
    price:0,
    quantity:0,
    category:"",
    units_available:0,
}

const productSlice = createSlice({
    name:"product",
    initialState:{product:initialproduct},
    reducers:{
        setProduct(state,{payload,type}:{payload:productType,type:string}){
            state.product=payload
        }
}
})

export const productActions = productSlice.actions
export default productSlice