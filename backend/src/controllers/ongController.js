const crypto = require('crypto');
const connection = require("../database/connection");
const generateId = require('../utils/generateUniqueId');
module.exports = {
    async index(request,response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    async create(request,response){
        //const params = request.query; //ex: /users= http://localhost:3333/users/name=juliano&idade=21
        //const params = request.params; //ex: /users/:id = http://localhost:3333/users/1
        //const params = request.body;
        //console.log(params)
        const {name, email, whatsapp, city, uf} = request.body;
        const id = generateId();
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        return response.json({ id });
    }
};