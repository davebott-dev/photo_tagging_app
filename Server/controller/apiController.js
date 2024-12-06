const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    getGB: async(req,res)=> {
        const gb = await prisma.gameboard.findMany({
            include:{
                characters:true,
            }
        });
        res.json(gb);
    }
}