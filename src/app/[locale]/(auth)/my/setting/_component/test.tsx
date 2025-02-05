'use client'
import useUserStore from "@/store/userStore";

export default function Test(){
  const {user} = useUserStore()
  return <div>test {JSON.stringify(user)}</div>
}