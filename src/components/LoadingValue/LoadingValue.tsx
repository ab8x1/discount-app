import { ReactNode } from "react"
// import ReactLoading from "react-loading"

export default function Name({isLoading, value, loaderHeight ,loaderColor, loaderWidth} : {
    isLoading: boolean,
    value: number | string | ReactNode,
    loaderHeight?: number,
    loaderWidth?: number,
    loaderColor?: string
}){

    return(
        <>
            {/* <> </>
            {
                isLoading ?
                <ReactLoading type='bubbles' width={loaderWidth} height={loaderHeight} color={loaderColor}/>
                : value
            }
            <> </> */}
        </>
    )
}
