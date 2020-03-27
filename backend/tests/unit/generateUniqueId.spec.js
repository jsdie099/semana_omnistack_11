//testes unitários revisam partes muito específicas do projeto, geralmente uma função que 
//vai ser usada em vários lugares, mas que não tem uma conexão com o banco de dados ou algo
//exterior

const generateUniqueId = require('../../src/utils/generateUniqueId');
describe('Generate Unique ID',()=>{
    it('should generate an unique ID',()=>{
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    })
});
