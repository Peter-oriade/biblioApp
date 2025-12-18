import firebaseAuthServices from "./fireauth.js"

firebaseAuthServices.createJWT({name: "luis", type: "aluno"})
.then((jwt)=> {console.log(jwt);})
.catch((erro)=> {console.log(erro);})