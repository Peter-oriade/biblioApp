import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';
import oracledb from '../services/oracledb.js';

const dbname = "categorias_categoria";

const categoriasController = {
    async getAllCategorias(authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            let categorias = await oracledb.getAllFromTable(dbname);
            return responsesService.createOkResponse(categorias);
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },

    async getCategoriaByID(id) {
        let categoria = await oracledb.getFromTableWhere(dbname, "ID", id);
        if (categoria) {
            return responsesService.createOkResponse(categoria);
        } else {
            return responsesService.createUnProcessableResponse("ERRO ");
        }
    },

    async addCategoria(body, authJWT) {
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

export default categoriasController;