"use server"

import connectDB from "@/database"
import User from "@/models";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function registerUserAction(formData){
    try {
        await connectDB();
        const{userName,email,password}=formData;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return {
                success:false,
                message:"User already exists"
            }
        }
        const hashedPassword=await bcryptjs.hash(password,12);
        const newUser=new User({
            userName,
            email,
            password:hashedPassword
        })
        const savedUser=await newUser.save()
        if(savedUser){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(savedUser))
            }
        }else{
            return {
                success:false,
                message:"User registration failed"
            }
        }

    } catch (error) {
        console.log(error);
        return {
            success:false,
            message:"User registration failed"
        }
    }
}

export async function loginUserAction(formData){
    try {
        await connectDB();
        const{email,password}=formData;
        const existingUser=await User.findOne({email});
        if(!existingUser){
            return {
                success:false,
                message:"User does not exist"
            }
        }
        const isPasswordCorrect=await bcryptjs.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return {
                success:false,
                message:"Invalid password"
            }
        }
        const createToken={
            id:existingUser._id,
            userName:existingUser.userName,
            email:existingUser.email
        }
        const token = jwt.sign(createToken, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        const getCookies=cookies();
        getCookies.set('token',token)
        return{
            success:true,
            message:'User Login Successful'
        }
    } catch (error) {
        console.log(error);
        return {
            success:false,
            message:"User login failed"
        }
    }
}

export async function fetchAuthUserAction(){
    try {
        await connectDB();
        const getCookies=cookies();
        const token=getCookies.get("token")?.value || "";
        if(!token){
            return {
                success:false,
                message:"User not authenticated"
            }
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const getUserInfo=await User.findOne({_id:decodedToken.id})  
        if(getUserInfo){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(getUserInfo))
            }
        }else{
            return {
                success:false,
                message:"User not authenticated"
            }
        }  
    } catch (error) {
        console.log(error);
        return {
            success:false,
            message:"User not authenticated"
        }
    }
}


export async function logoutUserAction(){
    const getCookies=cookies()
    getCookies.set('token','')
}
    