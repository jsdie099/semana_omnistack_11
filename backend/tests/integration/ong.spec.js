//testes de integração testam a aplicação como um todo, verificando as apis e fazendo todas as validações
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
describe('ONG',()=>{
    beforeEach(async()=>{
        await connection.migrate.rollback();//desfaz as migrations anteriores (apaga todos os dados do banco de testes)
        await connection.migrate.latest();
    });
    afterAll(async()=>{
        await connection.destroy();
    })
    it('should be able to create a new ONG',async()=>{
        
        const response = await request(app)
        .post('/ongs')
        .send({
            name:"Ong",
            email:"contato@apad.com.br",
            whatsapp:23945323432,
            city:"Rio do Sul",
            uf:"SC"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
});