import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.videorn",
  projectId: "6784e8ae002d130d4cd7",
  databaseId: "6784ea8c0015b6a7500e",
  userCollectionId: "6784eaec0035219dcbe9",
  videoCollectionId: "6784eb07001bbd944055",
  storageId: "6784ebfd001a6f7d9da7",
};

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
 async function createAccount(email, password, name) {
  try {
    const newUserForm = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    const avatar = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newUserForm.$id,
        email,
        username,
        avatar,
      }
    );
    return newUser;
  } catch (error) {
    console.log(" błąd w appconfig", error);
  }
}

async function signInApp(email, password) {
  try {
    await account.createEmailPasswordSession(email, password);
    console.log("zalogowano");
  } catch (error) {
    console.log("appConfig" ,error);
  }
}

async function getCurrentUser() {
  try{
    const currentAccount = await account.get();
    if(!currentAccount){
      throw new Error("nie zalogowano");
    }
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    )
    if(!currentUser){
      throw new Error("nie zalogowano");
    }

    return currentUser;
  } catch (error) {
    
  }
}

export {  signInApp,createAccount, getCurrentUser };