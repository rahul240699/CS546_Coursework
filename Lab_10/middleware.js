/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/

export const firstMiddleware = (req, res, next) => {
    const current_timestamp = new Date().toUTCString();
    const request_method = req.method;
    const request_route = req.originalUrl;

    let isAuthenticated;
    if(req.session.user){
        if(req.session.user.role === "admin"){
            isAuthenticated = "Authenticated User";
        }else{
            isAuthenticated = "Authenticated User";
        }
    }else{
        isAuthenticated = "Non-Authenticated";
    }

    console.log(`[${current_timestamp}] :${request_method} / ${request_route} ${isAuthenticated}`);

    if(request_route =="/"){
        if(isAuthenticated === "Authenticated User"){
          if(req.session.user.role === "admin"){
            return res.redirect("/administrator")
          }else if(req.session.user.role === "user"){
            return res.redirect("/user")
          }
        }
        else{
          return res.redirect('/signinuser');
        }
      }

      next();
}

export const secondMiddleware = (req, res, next) => {
    let isAuthenticated;
    if(req.session.user){
        isAuthenticated = "Authenticated User";
    }else{
        isAuthenticated = "Non-Authenticated";
    }
    const request_route = req.originalUrl
    if(request_route === "/signinuser"){
        if(isAuthenticated === "Authenticated User"){
        if(req.session.user.role =="user"){
            res.redirect("/user")
        }else if(req.session.user.role =="admin"){
            res.redirect("/administrator")
        }
        }
        else{
        return next();
        }
    }else{
        return next();
    }
}

export const thirdMiddleware = (req, res, next) => {
    let isAuthenticated;
    if(req.session.user){
        isAuthenticated = "Authenticated User";
    }else{
        isAuthenticated = "Non-Authenticated";
    }
    const request_route = req.originalUrl
    if(request_route === "/signupuser"){
        if(isAuthenticated === "Authenticated User"){
        if(req.session.user.role =="user"){
            res.redirect("/user")
        }else if(req.session.user.role =="admin"){
            res.redirect("/administrator")
        }
        }
        else{
        return next();
        }
    }else{
        return next();
    }
}

export const fourthMiddleware = (req, res, next) => {
  let isAuthenticated;
  if(req.session.user){
    isAuthenticated = "Authenticated User";
  }else{
    isAuthenticated = "Non-Authenticated";
  }
    if(isAuthenticated === "Non-Authenticated"){
        res.redirect("/signinuser")
      }
      else{
        return next()
    }
}

export const fifthMiddleware = (req, res, next) => {
    let isAuthenticated;
    if(req.session.user){
      isAuthenticated = "Authenticated User";
    }else{
      isAuthenticated = "Non-Authenticated";
    }
      if(isAuthenticated === "Non-Authenticated"){
          res.redirect("/signinuser")
      }else{
        if(req.session.user.role === "user"){
          res.status(403).render("error",{title:'Error Page', "errors": "You do not have the access to this page!!"})
        }else{
          return next();
        }
      }
}

export const sixthMiddleware = (req, res, next) => {
    let isAuthenticated;
    if(req.session.user){
        isAuthenticated = "Authenticated User";
    }else{
        isAuthenticated = "Non-Authenticated";
    }
        if(isAuthenticated === "Non-Authenticated"){
            res.redirect("/signinuser")
        }else{
        return next();
        }
}