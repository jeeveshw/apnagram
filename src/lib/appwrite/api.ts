import { ID } from "appwrite"
import { INewUser } from "@/types";
import { error } from "console";
import { account, avatars } from "./config";

export async function createUserAccount(user: INewUser) {
    
    try {
        const newAccount = await account.create (
                ID.unique(),
                user.email,
                user.password,
                user.name
        )
        if(!newAccount) throw error;
        
        const avatarUrl = avatars.getInitials(user.name);
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            userName: user.username,
            imageUrl: avatarUrl,
        })


        return newUser;

    } catch(error) {
        console.log(error)
        return error;

    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    userName?: string;

}) {
    
}