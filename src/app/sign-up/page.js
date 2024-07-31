'use client'

import { registerUserAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialSignUpFormData, registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
    const[signUpFormData,setSignUpFormData]=useState(initialSignUpFormData)
    const router=useRouter()

    function handleSubmitValid(){
        return Object.keys(signUpFormData).every(key=>signUpFormData[key].trim() !== "")
    }
    async function handleSignUp(){
        const result=await registerUserAction(signUpFormData);
        console.log(result);
        if(result?.data){
            router.push('/sign-in')
        }

    }

  return (
    <div>
        <h1>Registration</h1>
        <form action={handleSignUp}>
            {registrationFormControls.map((control,index)=>
                <div key={index}>
                    <Label>{control.label}</Label>
                    <Input
                        name={control.name}
                        id={control.name}
                        placeholder={control.placeholder}
                        value={signUpFormData[control.name]}
                        type={control.name}
                        onChange={(e)=>{
                            setSignUpFormData({...signUpFormData,[control.name]:e.target.value})
                        }}
                        
                    />
                    
                </div>
            )}
            <Button className="disabled:opacity-40" disabled={!handleSubmitValid()} type="submit">Sign Up</Button>
        </form>
    </div>
  );
}
export default SignUp