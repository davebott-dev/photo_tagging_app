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
    //                 characterURL:"https://www.giantbomb.com/a/uploads/scale_small/0/5973/545186-waldo2.jpg",
    //                 xCoord: 715.0,
    //                 yCoord: 375.0,

    //             },
    //             {
    //                 name: 'Odwal',
    //                 characterURL: "https://www.giantbomb.com/a/uploads/scale_small/4/46311/1333591-200px_character.odlaw.jpg",
    //                 xCoord: 130.0,
    //                 yCoord: 355.0,
    //             },
    //             {
    //                 name:'Wizard Whitebeard',
    //                 characterURL: "https://www.giantbomb.com/a/uploads/scale_small/4/46311/1341868-wizard.gif",
    //                 xCoord: 315.0,
    //                 yCoord: 360.0,
    //             }
    //         ]
    //         }
    //     }
    // });
    const gb = await prisma.gameboard.create({
        data: {
            name:'city',
            imgURL: "https://i.pinimg.com/1200x/86/b9/b1/86b9b1e83140b935031a7c7b0ebf0170.jpg",
            characters: {
                create: [
                    {
                    name: 'Waldo',
                    characterURL:"https://www.giantbomb.com/a/uploads/scale_small/0/5973/545186-waldo2.jpg",
                    xCoord: 775.0,
                    yCoord: 1000.0,

                },
                {
                    name: 'Wenda',
                    characterURL: "https://www.giantbomb.com/a/uploads/scale_small/4/46311/1333585-150px_character.wenda.jpg",
                    xCoord: 785.0,
                    yCoord: 840.0,
                },
                {
                    name:'Wizard Whitebeard',
                    characterURL: "https://www.giantbomb.com/a/uploads/scale_small/4/46311/1341868-wizard.gif",
                    xCoord: 1165.0,
                    yCoord: 1025.0,
                }
            ]
            }
        }
    });

    // const gb = await prisma.gameboard.findMany({
    //     include:{
    //         characters: true,
    //     }
    // })
    // const c = await prisma.character.deleteMany({})
    // const user = await prisma.user.deleteMany({})
    // const gb = await prisma.gameboard.deleteMany({})
    console.dir(gb, {depth:null});
}

main();

//finish adding data manually -- make multipe maps?
// front end must get user info first and select a map

//figure out coordinate data
//use backend data to load front end instead...make routes and controllers to prisma