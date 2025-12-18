import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';
import oracledb from '../services/oracledb.js';

const dbname = "emprestimos_emprestimo";

const emprestimosController = {
    async getAllEmprestimos(authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            let emprestimos = await oracledb.getAllFromTable(dbname);
            return responsesService.createOkResponse(emprestimos);
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },
    
    async getAllItensEmprestimos(authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            let emprestimos = await oracledb.getAllFromTable("emprestimos_itememprestimo");
            return responsesService.createOkResponse(emprestimos);
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },
    
    async getItensEmprestimoByID(authJWT, id) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            let emprestimos = await oracledb.getAllFromTableWhere("emprestimos_itememprestimo", "EMPRESTIMO_ID", id);
            return responsesService.createOkResponse(emprestimos);
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },
    
    async deleteEmprestimoByID(authJWT, id) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            await oracledb.deleteFromTableWhere("emprestimos_itememprestimo", "EMPRESTIMO_ID", id)
            let emprestimos = await oracledb.deleteFromTableWhere(dbname, "ID", id);
            return responsesService.createOkResponse(emprestimos);
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },

    async getEmprestimosByClientID(authJWT, id) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            let emprestimos = await oracledb.getAllFromTableWhere(dbname, "CLIENTE_ID", id);
            return responsesService.createOkResponse(emprestimos);
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },

    async addEmprestimo(body, authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            const result = await oracledb.addToTable(dbname, body, "ID");
            return responsesService.createOkResponse({response: "criado", id: result.id});
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },

    async addItemEmprestimo(body, authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();
    
        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            await oracledb.addToTable("emprestimos_itememprestimo", body);
            return responsesService.createOkResponse({response: "criado"});
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },
}

export default emprestimosController;