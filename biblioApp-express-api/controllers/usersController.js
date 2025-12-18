import firebaseAuthService from "../services/fireauth.js";

const usersController = {
    criarUsuarioFirebase(email, password) {
        return new Promise((resolve, reject) => {
            firebaseAuthService.criarUsuarioComEmailSenha(email, password)
                .then(
                    (credencial) => {
                        resolve(credencial);
                    }
                )
                .catch(
                    (erro) => {
                        reject(erro);
                    }
                )
        })
    },
    
    fazerLoginFirebase(email, password) {
        return new Promise((resolve, reject) => {
            firebaseAuthService.loginUsuarioComEmailSenha(email, password)
                .then(
                    (credencial) => {
                        let payload = {
                            user: credencial.user.uid,
                            email: credencial.user.email,
                            level: 2
                        }
                        firebaseAuthService.createJWT(payload)
                        .then((jwt) => {resolve(jwt)})
                        .catch((error) => {reject(error)})
                    }
                )
                .catch(
                    (erro) => {
                        reject(erro);
                    }
                )
        })
    },
}

export default usersController