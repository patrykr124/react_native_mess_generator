import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

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

async function createAccount(email, password, username) {
  try {
    const newUserForm = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    const avatar = avatars.getInitials(username);
    await signInApp(email, password);
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
    console.log("appConfig SignIn", error);
  }
}

async function logOut() {
  try {
    const session = await account.deleteSessions();
    return session;
  } catch (error) {
    console.log("appConfig SignIn", error);
  }
}

async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw new Error("nie zalogowano");
    }
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) {
      throw new Error("nie zalogowano");
    }

    return currentUser;
  } catch (error) {}
}

async function getVideos() {
  try {
    const videoPost = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return videoPost.documents;
  } catch (error) {
    throw new Error(error);
  }
}

async function getLatestVideos() {
  try {
    const videoPost = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return videoPost.documents;
  } catch (error) {
    throw new Error(error);
  }
}

async function searchPosts(query) {
  try {
    const videoPost = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );
    return videoPost.documents;
  } catch (error) {
    throw new Error(error);
  }
}

async function getUserVideo(userId) {
  try {
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    return user.documents;
  } catch (error) {
    throw new Error(error);
  }
}

async function createVideo(title,prompt,video,thumbnail) {
  try{
    const currentUser = await getCurrentUser();
    const userId = currentUser.documents[0].$id;
    const videoPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title,
        prompt,
        video,
        thumbnail,
        creator: userId
      }
    )
    return videoPost
  } catch (error) {
    throw new Error(error);
  }
}



export {
  createAccount,
  createVideo,
  getCurrentUser,
  getLatestVideos,
  getUserVideo,
  getVideos,
  logOut,
  searchPosts,
  signInApp,
};
