const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getGB: async (req, res) => {
    const guess = await prisma.guess.deleteMany({});

    const gb = await prisma.gameboard.findMany({
      include: {
        characters: {
            include: {
                Guess:true,
            }
        }
      },
    });
    res.json(gb);
  },
  createUser: async (req, res) => {
    try {
      const map = await prisma.gameboard.findFirst({
        where: {
          name: req.body.selected,
        },
      });
      if (!map) {
        return res.status(404).json({
          success: false,
          msg: "gameboard not found",
        });
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          username: req.body.username,
        },
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          msg: "username already taken",
        });
      }

      const user = await prisma.user.create({
        data: {
          username: req.body.username,
          mapChoice: {
            connect: {
              id: map.id,
            },
          },
        },
      });
      res.json({
        success: true,
        data: user,
        msg: "user created successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        msg: "could not create user",
      });
    }
  },
  startGame: async (req, res) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: req.params.userId,
        },
      });
      const map = await prisma.gameboard.findFirst({
        where: {
          id: user.gameboardId,
        },
        include: {
          characters: {
            include: {
                Guess:true,
            }
          }
        },
      });
      res.json({
        success: true,
        user: user,
        game: map,
        msg: "success",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        msg: "could not start game",
      });
    }
  },
  guess: async (req, res) => {
    try {
      const guess = await prisma.guess.create({
        data: {
          xCoord: req.body.xCoord,
          yCoord: req.body.yCoord,
          isCorrect: req.body.correct,
          userId: req.body.userId,
          characterId: req.body.characterId,
        },
      });

      const user = await prisma.user.findUnique({
        where: {
          id: req.body.userId,
        },
        include:{
          mapChoice: {
            include: {
              characters:true,
            },
          },
          guesses: true,
        },
      });

      const totalChar = user.mapChoice.characters.length;
      const correctGuesses = user.guesses.filter((g)=> g.isCorrect).length;

      const hasWon = totalChar ===correctGuesses;

      console.log(guess);
      res.json({
        success:true,
        guess,
        hasWon,
        msg: hasWon ? "You Win" : "Keep Trying!",
      });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success:false,
        msg: 'error processing guess'
      })
    }
  },
  addLeader: async(req,res)=> {
    try{
      const newScore = await prisma.leaderboard.create({
        data:{
          userId: req.body.userId,
          gameboardId: req.body.gameboardId,
          time: req.body.timeVal,
        }
      });

      const user = await prisma.user.findUnique({
        where:{
          id: req.body.userId,
        }
      });

      const gb = await prisma.gameboard.findUnique({
        where:{
          id: req.body.gameboardId,
        }
      });

      console.log(newScore);

      res.json({
        success:true,
        newScore,
        user,
        gb,
      });
    }catch(err) {
      console.error(err);
      res.status(500).json({
        success:false,
        msg:'error posting to leaderboard'
      });
    }
  }

};

