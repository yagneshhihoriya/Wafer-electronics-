import Knex from 'knex'
import {Model} from 'objection'
import knexConfig from './knexfile'
const connectionType = process.env.dbConType || 'development'


const databaseCon = () =>{
    const knex = Knex(knexConfig[connectionType])
    Model.knex(knex)
}

export = databaseCon