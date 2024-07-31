"use client";

import { logoutUserAction } from "@/actions";
import { Button } from "../ui/button";

const Logout = () => {



    const handleLogout=async()=>{
        await logoutUserAction();
    }
    
    return (
        <Button onClick={handleLogout}>Logout</Button >
    )
}
export default Logout