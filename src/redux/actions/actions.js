export const loadHouse = (id) => async (dispatch) => {
    dispatch({
        type:"LOAD_HOUSE",
        payload:{
            houseId: id,
        }
    })
}