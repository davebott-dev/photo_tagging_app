const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getGB: async (req, res) => {
    const gb = await prisma.gameboard.findMany({
      include: {
        characters: true,
      },
    });
    res.json(gb);
  },
  createUser: async (req, res) => {

    try{
        const map = await prisma.gameboard.findFirst({
            where: {
                name:req.body.selected,
            },
        });

    
    if(!map) {
        return res.status(404).json({
            success:false,
            msg:'gameboard not found',
        });
    }
       
        const user = await prisma.user.create({
            data:{
                username:req.body.username,
                mapChoice: {
                    connect: {
                        id:map.id
                    },
                },
            },
        });

        res.json({
            success:true,
            data:user,
            msg:'user created successfully'
        })
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success:false,
            msg:'could not create user',
        });
    }
    },
    startGame: async(req,res)=> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    id:req.params.userId,
                }
            });
            const map = await prisma.gameboard.findFirst({
                where:{
                    id: user.gameboardId,
                },
                include:{
                    characters:true,
                }
            })
            res.json({
                success:true,
                user:user,
                game:map,
                msg:'success'
            })
        } catch(err) {
            console.error(err);
            res.status(500).json({
                success:false,
                msg: 'could not start game'
            })
        }
      
    }
};
