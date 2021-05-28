import * as getActions from './actionTypes'

const initState = {
    data : []
}

export const reducer = (state = initState , {type, payload})=>{
    switch(type){
        case getActions.GET_REQUEST :{
            return{
                ...state
            }
        }
        case getActions.GET_SUCCESS :{
            return{
                data : payload
            }
            
        }
        case getActions.GET_FAILURE :{
            return{
                ...state
            }
        }
        default :
        return state
    }
}