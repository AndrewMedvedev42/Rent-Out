const HouseState = {id:"-MrX3Xu7t1mD4VLfbrPD"}

export const houseReducer = (state=HouseState, action) => {
    switch (action.type){
        case "LOAD_HOUSE":
            return {...state, id:action.payload.houseId}
        default:
            return {...state}
    }
}