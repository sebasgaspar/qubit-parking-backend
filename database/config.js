const Sequelize = require('sequelize');

const connection= () =>{
    try{
        console.log('DB Connect');
        return new Sequelize(
            'qubit-parking',
            'postgres',
            'root',
            {
                host: 'localhost',
                dialect: 'postgres',
                pool: {
                    max: 5,
                    min: 0,
                    require: 3000,
                    idle: 10000
                },
                loging: false
            }
        );
    }catch(error){
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}
module.exports = {
    connection
}