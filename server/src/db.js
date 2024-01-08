require('dotenv').config()
import { Sequelize } from 'sequelize'
import { readdirSync } from 'fs'
import { basename as _basename, join } from 'path'
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

let sequelize =
    process.env.NODE_ENV === 'production'
        ? new Sequelize({
              database: DB_NAME,
              dialect: 'postgres',
              host: DB_HOST,
              port: 5432,
              username: DB_USER,
              password: DB_PASSWORD,
              pool: {
                  max: 3,
                  min: 1,
                  idle: 10000,
              },
              dialectOptions: {
                  ssl: {
                      require: true,
                      // Ref.: https://github.com/brianc/node-postgres/issues/2009
                      rejectUnauthorized: false,
                  },
                  keepAlive: true,
              },
              ssl: true,
          })
        : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
              logging: false,
              native: false,
          })
const basename = _basename(__filename)

const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
readdirSync(join(__dirname, '/models'))
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        modelDefiners.push(require(join(__dirname, '/models', file)))
    })

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize))
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])
sequelize.models = Object.fromEntries(capsEntries)

/* // En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  Style,
  Body,
  Look,
  Work,
  Study,
  Image,
  Ethnicity,
  Religion,
  Live,
  Drink,
  Smoke,
  Sexuality,
  Type,
  Status,
  Gender,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Style.hasMany(User);
Body.hasMany(User);
Look.hasMany(User);
Work.hasMany(User);
Study.hasMany(User);
Image.belongsTo(User);
Ethnicity.hasMany(User);
Religion.hasMany(User);
Live.hasMany(User);
Drink.hasMany(User);
Smoke.hasMany(User);
Sexuality.hasMany(User);
Type.hasMany(User);
Status.hasMany(User);
Gender.hasMany(User); */

export default {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}
