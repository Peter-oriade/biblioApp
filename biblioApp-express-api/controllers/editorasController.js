import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';
import oracledb from '../services/oracledb.js';

const dbname = "editoras_editora";

const editorasController = {
    async getAllEditoras(authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            let editoras = await oracledb.getAllFromTable(dbname);
            return responsesService.createOkResponse(editoras);
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },

    async getEditoraByID(id) {
        let editora = await oracledb.getFromTableWhere(dbname, "ID", id);
        if (editora) {
            return responsesService.createOkResponse(editora);
        } else {
            return responsesService.createUnProcessableResponse("ERRO ");
        }
    },

    async addEditora(body, authJWT) {
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

export default editorasController;