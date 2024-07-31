'use client'

import { loginUserAction } from "@/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { initialSignInFormData, loginFormControls } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"


const SignIn = () => {
    const[signInFormData,setSignInFormData]=useState(initialSignInFormData);
    const router=useRouter();
    function handleSubmitValid() {
      return Object.keys(signInFormData).every(
        (key) => signInFormData[key].trim() !== ""
      );
    }
    async function handleSignIn(){
        const result=await loginUserAction(signInFormData);
        console.log(result);
        if(result?.success){
            router.push('/')
        }
    }

  return (
    <div>
        <h1>Login</h1>
        <form action={handleSignIn}>
            {
                loginFormControls.map((control,index)=>(
                    <div key={index}>
                        <Label>{control.label}</Label>
                        <Input
                            name={control.name}
                            id={control.name}
                            placeholder={control.placeholder}
                            type={control.name}
                            value={signInFormData[control.name]}
                            onChange={(e)=>{
                                setSignInFormData({
                                    ...signInFormData,
                                    [control.name]:e.target.value
                                })
                            }}
                        />
                    </div>
                ))
            }
            <Button className="disabled:opacity-30" disabled={!handleSubmitValid()} type="submit">Sign In</Button>
        </form>
    </div>
  )
}
export default SignIn