//import mongo collections, bcrypt and implement the following data functions
import { checkNames, chekUserId, checkPassword, checkFavouriteQuote, checkThemePreference, checkRole } from "../helpers.js";
import bcrypt from 'bcryptjs';
import { users } from "../config/mongoCollections.js";

export const signUpUser = async (
  firstName,
  lastName,
  userId,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  checkNames(firstName, "First Name");
  checkNames(lastName, "Last Name");
  chekUserId(userId);
  checkPassword(password);
  checkFavouriteQuote(favoriteQuote);
  checkThemePreference(themePreference);
  checkRole(role);

  firstName = firstName.trim();
  lastName = lastName.trim();
  userId = userId.toLowerCase().trim();

  const saltRounds = 12;
  const hash = await bcrypt.hash(password, saltRounds);

  favoriteQuote = favoriteQuote.trim();
  themePreference.backgroundColor = themePreference.backgroundColor.trim();
  themePreference.fontColor = themePreference.fontColor.trim();
  role = role.trim();

  const enterUser = {
    firstName: firstName,
    lastName: lastName,  
    userId: userId, 
    password: hash,
    favoriteQuote: favoriteQuote,
    themePreference: themePreference,
    role: role
  }

  const userCollection = await users();

  const user = await userCollection.findOne({userId: userId.toLowerCase()});

  if(user){
    throw `An account with this UserId already exists. Please create a different userId.`;
  }

  const insertUser = await userCollection.insertOne(enterUser);
    if(!insertUser){
      throw `Could not Insert User Data.`;
    }
    return {registrationCompleted: true};
};

export const signInUser = async (userId, password) => {

  if(!userId || !password){
    throw 'UserId or Password not provided';
  }
  if(typeof userId!== 'string' || typeof password!=='string'){
    throw 'UserId or Password not provided';
  }
  if(userId.trim()=== "" || password.trim()===""){
    throw 'String should not contain only spaces';
  }

  userId = userId.toLowerCase().trim();
  password = password.trim();

  chekUserId(userId);
  checkPassword(password);

  const userCollection = await users();
  const user = await userCollection.findOne({userId: userId.toLowerCase()});

  if(!user){
    throw 'Either the userId or password is invalid.';
  }

  const passwordVerification = await bcrypt.compare(password, user.password);

  if(!passwordVerification){
    throw 'Either the userId or password is invalid.';
  }

  const returnUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    userId: user.userId,
    favoriteQuote: user.favoriteQuote,
    themePreference: user.themePreference,
    role: user.role
  }

  return returnUser;
};
