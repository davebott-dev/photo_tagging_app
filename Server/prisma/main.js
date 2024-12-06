const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const main = async() => {
    // const gb = await prisma.gameboard.create({
    //     data: {
    //         name:'beach',
    //         imgURL: "https://where-is-waldo-kc.netlify.app/assets/waldo-1-CnK-GoU-.webp",
    //         characters: {
    //             create: [
    //                 {
    //                 name: 'Waldo',
    //                 xCoord: 715.0,
    //                 yCoord: 375.0,

    //             },
    //             {
    //                 name: 'Odwal',
    //                 xCoord: 130.0,
    //                 yCoord: 355.0,
    //             },
    //             {
    //                 name:'Wizard Whitebeard',
    //                 xCoord: 315.0,
    //                 yCoord: 360.0,
    //             }
    //         ]
    //         }
    //     }
    // });

    const gb = await prisma.gameboard.findMany({
        include:{
            characters: true,
        }
    })
    // const c = await prisma.character.deleteMany({})
    // const gb = await prisma.gameboard.deleteMany({})
    console.dir(gb, {depth:null});
}

main();

//finish adding data manually -- make multipe maps?
// front end must get user info first and select a map

//figure out coordinate data
//use backend data to load front end instead...make routes and controllers to prisma