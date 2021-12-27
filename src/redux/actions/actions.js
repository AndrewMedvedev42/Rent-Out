export const loadHouse = (id) => async (dispatch) => {
    dispatch({
        type:"LOAD_HOUSE",
        payload:{
            houseId: id,
        }
    })
}

export const deleteHouse = () => async (dispatch) => {
    dispatch({
        type:"DELETE_HOUSE"
    })
}