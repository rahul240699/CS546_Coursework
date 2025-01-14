//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

export const checkStringParams = (param, paramName) => {
    if(!param){
      throw `The ${paramName} is an empty paramter.`;
    }
    if(typeof param !== 'string'){
      throw `The ${paramName} is not a string.`;
    }
    
    if(param.trim() === ''){
      throw `The ${paramName} is an empty string.`;
    }
    
}

export const checkNames = (param, paramName) => {
  checkStringParams(param, paramName);

  if(param.trim().length < 2 || param.trim().length > 25){
    throw `${paramName} should be more than 2 characters and less than 25 characters.`;
  }

  if(/\d/.test(param)){
    throw 'Firstname, Lastname, UserId should not contain numbers.';
  }
}

export const chekUserId = (param) => {
  checkStringParams(param, "UserId");

  if(param.trim().length < 5 || param.trim().length > 10){
    throw `UserId should be more than 5 characters and less than 10 characters.`;
  }

  if(/\d/.test(param)){
    throw 'Firstname, Lastname, UserId should not contain numbers.';
  }
  
}

export const checkPassword = (password) => {
  checkStringParams(password, "Password");

  if(password.trim().length < 8){
    throw 'Password must be minimum 8 characters';
  }

  for(let i=0;i<password.length;i++){
    if(password[i] == ' '){
      throw 'Password Must not contain a space';
    }
  }

  if(!/[A-Z]/.test(password) || !/\d/.test(password)){
      throw 'Password should contain atleast one uppercase character and one number';
  }

  if(!/[^a-zA-Z0-9\s]/.test(password)){
    throw 'Password Should contain atleast one special character';
  }
}

export const checkFavouriteQuote = (param) => {
  checkStringParams(param, "Favourite Quote");

  if(param.trim().length < 20 || param.trim().length > 255){
    throw 'Favourite Quote should contain more than 20 and less than 255 characters';
  }
}

export const checkThemePreference = (themePref) => {
  if(Array.isArray(themePref) || themePref === null || themePref === undefined){
    throw `The Theme Preference input should be an object.`;
  }

  if(typeof themePref !== 'object'){
    throw `The Theme Preference input should be an object.`;
  }

  if(Object.keys(themePref).length !== 2){
    throw `The Theme Preference Object should have exactly two keys.`;
  }

  if(!Object.keys(themePref).includes('backgroundColor') || !Object.keys(themePref).includes('fontColor')){
    throw `The Theme Preference Object should contain backgroundColor and fontColor keys.`;
  }

  checkStringParams(themePref.backgroundColor, "backgroundColor");
  checkStringParams(themePref.fontColor, "fontColor");

  const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if(!hexPattern.test(themePref.backgroundColor.trim()) || !hexPattern.test(themePref.fontColor.trim())){
    throw `Background Color or Font color are not the valid hex codes.`
  }

  if(themePref.backgroundColor.toLowerCase().trim() === themePref.fontColor.toLowerCase().trim()){
    throw `Background Color and Font Color cannot be the same.`;
  }
}

export const checkRole = (role) => {
  checkStringParams(role, "Role");

  let roles = ['admin','user'];
    if(!roles.includes(role.toLowerCase().trim())){
      throw 'Role can only be admin or user'
    }
}
