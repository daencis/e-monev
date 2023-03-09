const Program = require('../models').program;

exports.getListProgram =  async function (req, res, next) {
    try {
        const {count, rows} = await Program.findAndCountAll({
            offset: Number(req.query.offset) || 0,
            limit: Number(req.query.limit) || 10,
        });
        
        res.status(200).json({
            statusCode: 200,
            message: "Pengambilan data berhasil",
            data: {
                total: count,
                result: rows
            }
        });
    } catch (error) {
      next(error)
    }
}

exports.getDetailProgram =  async function (req, res, next) {
    try {
        const programDetail = await Program.findByPk(req.params.id);

        if(!programDetail){
            next("NotFound")
        }

        res.status(200).json({
            statusCode: 200,
            message: "Pengambilan data berhasil",
            data: {
                result: programDetail
            }
        });
    } catch (error) {
      next(error)
    }
}
exports.createProgram =  async function (req, res, next) {
    try {
        const newProgram = await Program.create(req.body);

        res.status(201).json({
            statusCode: 200,
            message: "Pembuatan data berhasil",
            data: newProgram
        });
    } catch (err) {
        next(err);
    }
}

exports.updateProgram =  async function (req, res, next) {
    try {
        const program = await Program.create(req.body);

        if(!program){
            next("NotFound")
        }
    
        await program.update(req.body)
        await program.save()

        res.status(201).json({
            statusCode: 200,
            message: "Pengkinian data berhasil",
            data: program
        });
    } catch (err) {
        next(err); 
    }
}

exports.deleteProgram =  async function (req, res, next) {
    try {
        const program = await Program.findByPk(req.body.program_id);

        if(!program){
            next("NotFound")
        }

        await program.destroy()

        res.status(200).json({
            statusCode: 200,
            message: "Penghapusan data berhasil",
        });
    } catch (err) {
        next(err); 
    }
}