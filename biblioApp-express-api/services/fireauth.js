import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { SignJWT, jwtVerify } from "jose";
import { jwtSecret } from "../secrets.js"
import firebaseApp from './firebaseApp.js'

const firebaseAuthService = {
    criarUsuarioComEmailSenha(email, password) {
        return new Promise((resolve, reject) => {
            const auth = getAuth(firebaseApp);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    resolve(userCredential);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    loginUsuarioComEmailSenha(email, password) {
        return new Promise((resolve, reject) => {
            const auth = getAuth(firebaseApp);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    resolve(userCredential);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    createJWT(payload) {
        return new Promise((resolve, reject) => {
            new SignJWT(payload)
            .setIssuedAt()
            .setSubject("User API Login")
            .setProtectedHeader({alg: "HS256"})
            .setExpirationTime("36000s")
            .sign(jwtSecret)
            .then((jwt) => resolve(jwt))
            .catch((error) => reject(error))
        });
    },

    validateJWT(jwt) {
        return new Promise((resolve, reject) => {
            jwtVerify(jwt, jwtSecret, {algorithms:["HS256"]})
            .then((payload)=> {resolve(payload)})
            .catch((error)=> {reject(error)})
        })
    },
}

export default firebaseAuthService;