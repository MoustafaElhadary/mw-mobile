import {configureStore} from '@reduxjs/toolkit'
import tabReducer from './tabSlice'
// import rootReducer from './rootReducer'


export default configureStore({
    reducer: {
        store: tabReducer
    }
})