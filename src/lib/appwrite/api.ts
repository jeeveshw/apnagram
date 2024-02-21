import { ID,Query } from "appwrite"
import { INewUser } from "@/types";
import { error } from "console";
import { account, appwriteConfig, avatars, databases } from "./config";
//import { Query } from "@tanstack/react-query";

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
    try{
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )
    } catch(error){
        console.log(error);
    }
    
}

export async function signInAccount (user:{email:string; password:string}){
    try {
        const session = await account.createEmailSession(user.email , user.password);
        return session;

    } catch(error){
        console.log(error);
    }
}
export async function getCurrentUser (){
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal ('accountId', currentAccount.$id) ] 
        )
        if (!currentUser)throw Error;
            currentUser.documents[0];
    } catch(error){
        console.log(error);
    }

}
