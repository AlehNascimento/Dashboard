const connection = require('../config/connection');

module.exports = {
    async maquinas(req, res) {
        const maquina = await connection.raw(`select id, Nome_maquina,CpuPorcent,
        CpuMaximo, MediaCpu, RamUsada, RamDisponivel,Ramporcentagem, discoTotal, discoDisponi,Discoporcentagem,Statusrede, dataConsulta
        from dadosMaquinas order by id desc;`);
        return res.json(maquina);
    }
};