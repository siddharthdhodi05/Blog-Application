import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client =  new Client();
  account;

  constructor(){
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({email, password, name}){

    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // another method to get logged in
        this.login({email,password});
        
      } else {
        return userAccount;
        
      }

    } catch (error) {
      throw error;
    }

  }

   async login({email,password}){
        try {

          const session = await this.account.createEmailPasswordSession(email, password);
          return session
          
        } catch (error) {
          throw error
        }
  }

   async getCurrentUser(){
    try {
    const user = await this.account.get();
    return user
    // Logged in
      } catch (err) {
    // Not logged in
        throw err
      }
      return null;

   }

   async logout(){
    try {
      await this.account.deleteSessions()
      
    } catch (error) {
      throw error
      
    }
   }

}

const authservice = new AuthService();

export default authservice