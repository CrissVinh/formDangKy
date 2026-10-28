import { useState } from "react"

function Error32(props){
    //      NẾU NHƯ LÀ OBJECT
    function RenderError(){
        let {errors} = props

        if(Object.keys(errors).length > 0){
            return Object.keys(errors).map((key, index) =>{
                return(
                    <li key = {index}>{errors[key]}</li>
                )
            })
        }
    }

    //      NẾU NHƯ LÀ ARRAY
    // function renderError() {
    //     let {errors} = props

    //     if(errors.length > 0){
    //         return errors.map((value, index) => {
    //             return (
    //                 <li key={index}>{value}</li>
    //             )
    //         })
    //     }
    // }

    return(
        <ul>
            {RenderError()}
        </ul>
    )
}export default Error32;