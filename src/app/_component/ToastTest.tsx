'use client'
import {useToast} from "@/components/Toast/useToast";

export function ToastTest(){
    const {success} = useToast()
    return <button onClick={()=>{
        success("테스트")
    }}>버튼</button>
}
