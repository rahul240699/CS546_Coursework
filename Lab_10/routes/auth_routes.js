//import express, express router as shown in lecture code
import { users } from "../config/mongoCollections.js";
import { error } from "console";
import {Router} from 'express';
import { signUpUser, signInUser } from "../data/users.js";
import { checkNames, chekUserId, checkPassword, checkFavouriteQuote, checkThemePreference, checkRole, checkStringParams } from "../helpers.js";

const router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/signupuser')
  .get(async (req, res) => {
    //code here for GET
    try{
      res.render('signupuser',{title:"Sign Up User"});
    }catch(e){
      res.status(500).render('error', {title:'Error Page', errors: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let newUser = req.body;
    let themePreference = {};
    try{
      checkStringParams(newUser.backgroundColor, "backgroundColor");
      checkStringParams(newUser.fontColor, "fontColor");
      themePreference = {"backgroundColor": newUser.backgroundColor, "fontColor": newUser.fontColor}
      checkNames(newUser.firstName, "First Name");
      checkNames(newUser.lastName, "Last Name");
      chekUserId(newUser.userId);
      checkPassword(newUser.password);
      checkFavouriteQuote(newUser.favoriteQuote);
      checkThemePreference(themePreference);
      checkRole(newUser.role);

      const userCollection = await users();

      const user = await userCollection.findOne({userId: newUser.userId.toLowerCase()});

      if(user){
        throw `An account with this UserId already exists. Please create a different userId.`;
      }

    }catch(e){
      // console.log(e);
      return res.status(400).render('error', {title:'Error Page',errors: e});
    }

    try{
      let user = await signUpUser(
        newUser.firstName,
        newUser.lastName,
        newUser.userId,
        newUser.password,
        newUser.favoriteQuote,
        themePreference,
        newUser.role
      )

      return res.redirect('/signinuser');
    }catch(e){
      // console.log(e);
      return res.status(500).render('error', {title:'Error Page', errors: e});
    }
  });

router
  .route('/signinuser')
  .get(async (req, res) => {
    //code here for GET
    try{
      res.render('signinuser',{title:"Sign In User"});
    }catch(e){
      res.status(500).json(e);
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let user = req.body;
    try{
      // console.log(user.user_id);
      // console.log(user.password);
      if(!user.user_id || !user.password){
        throw 'UserId or Password not provided';
      }
      if(typeof user.user_id!== 'string' || typeof user.password!=='string'){
        throw 'UserId or Password not provided';
      }
      if(user.user_id.trim()=== "" || user.password.trim()===""){
        throw 'String should not contain only spaces';
      }

      let userId = user.user_id.toLowerCase().trim();
      let password = user.password.trim();

      chekUserId(userId);
      checkPassword(password);

      const userSign = await signInUser(userId, password);

      if(!userSign){
        throw 'Either the userId or password is invalid.';
      }

      // const passwordVerification = await bcrypt.compare(password, user.password);

      // res.cookies("AuthenticationState", passwordVerification);

      // if(!passwordVerification){
      //   throw 'Either the userId or password is invalid.';
      // }

      req.session.user = userSign;

      if(userSign.role === "admin"){
        res.redirect("/administrator");
      }else if(userSign.role === "user"){
        res.redirect("/user");
      }
      

    }catch(e){
      // console.log(e);
      return res.status(400).render('error', {title:'Error Page', errors: e});
    }
  


  });

router.route('/user').get(async (req, res) => {
  //code here for GET
  try{
    if(req.session.user){
      const currentTime = new Date().toLocaleTimeString();
      const currentDate =  new Date();
      let admin = false;
      if(req.session.user.role === "admin"){
        admin = true;
      }

      res.render('user',{firstName:req.session.user.firstName, lastName: req.session.user.lastName, 
        favoriteQuote:req.session.user.favoriteQuote, currentTime: currentTime, currentDate: currentDate, 
        role: req.session.user.role, administrator: admin,
        themePreference:req.session.user.themePreference,title:"User Dashboard"})

    }
  }catch(e){
    res.status(500).json(e);
  }
});

router.route('/administrator').get(async (req, res) => {
  //code here for GET
  try{
    if(req.session.user && req.session.user.role === "admin"){
     
      const currentTime = new Date().toLocaleTimeString();
      const currentDate = new Date();
      res.render('administrator',{firstName:req.session.user.firstName,lastName: req.session.user.lastName, 
        favoriteQuote: req.session.user.favoriteQuote, currentTime: currentTime, currentDate: currentDate,
        role: req.session.user.role, themePreference:req.session.user.themePreference, title:"Admin Dashboard" })
    }
  }catch(e){
    res.status(500).render('error', {title:'Error Page', errors: "You do not have the access to this page!"});
  }
});

router.route('/signoutuser').get(async (req, res) => {
  //code here for GET
  try{
    req.session.destroy();
    res.redirect("/signinuser");
  }catch(e){
    return res.status(500).send('Internal Server Error');
  }
});

export {router as authRoutes};
