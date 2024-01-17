import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toppings: ['pepperoni'],
    gluten: true
}
export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        addTopping: (state, action) => {
            state.toppings = [...state.toppings, action.payload]
        },
        toggleGluten: (state) => {
            state.gluten = !state.gluten
        }
    }
})

export const { addTopping, toggleGluten } = pizzaSlice.actions

export default pizzaSlice.reducer 