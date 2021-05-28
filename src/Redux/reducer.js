import * as getActions from './actionTypes'

const initState = {
    data : [],
    person : {}
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
                ...state,
                data : payload
            }
            
        }
        case getActions.GET_FAILURE :{
            return{
                ...state
            }
        }
        case getActions.GET_PERSON_REQUEST :{
            return{
                ...state
            }
        }
        case getActions.GET_PERSON_SUCCESS :{
            return{
                ...state,
                person : payload
            }
            
        }
        case getActions.GET_PERSON_FAILURE :{
            return{
                ...state
            }
        }
        default :
        return state
    }
}