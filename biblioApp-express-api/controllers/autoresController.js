import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';
import oracledb from '../services/oracledb.js';

const dbname = "autores_autor";

const autoresController = {
    async getAllAutores(authJWT) {
        let autores = await oracledb.getAllFromTable(dbname);
        if (autores) {
            return responsesService.createOkResponse(autores);
        } else {
            return responsesService.createUnProcessableResponse("ERRO ");
        }
    },
    
    async getAutorByID(id) {
        let autor = await oracledb.getFromTableWhere(dbname, "ID", id);
        if (autor) {
            return responsesService.createOkResponse(autor);
        } else {
            return responsesService.createUnProcessableResponse("ERRO ");
        }
    },

    async addAutor(body, authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            await oracledb.addToTable(dbname, body);
            return responsesService.createOkResponse({response: "criado"});
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },
}

export default autoresController;