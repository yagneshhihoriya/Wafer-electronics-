import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('customers',(table)=>{
       table.increments();
       table.string('firstName').notNullable();
       table.string('lastName').notNullable();
       table.bigint('phone').notNullable().unique().notNullable()
       table.string('email').unique().notNullable()
       table.string('address')
       table.integer('age',2)
       table.enu('gender',['Male','Female'])
       table.boolean('isVerified')
       table.string('password').notNullable()
       table.decimal('workExperience')
       table.string('presentCompany')
       table.bigint('currentCTC')
       table.enu('employmentStatus',['Employed','UnEmployed'])
       table.boolean('availableToHire')
       table.boolean('availableToFreelance')
       table.timestamps(true,true)
    })
    .createTable('admin',(table)=>{
        table.increments();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.bigint('phone').notNullable().unique()
        table.string('password').notNullable()
        table.string('email').unique().notNullable()
        table.boolean('isVerified')
        table.timestamps(true,true)
     })
    .createTable('otpVerification',(table)=>{
        table.increments();
        table.bigint('phone').notNullable().unique()
        table.string('email').unique().notNullable()
        table.string('otp').notNullable()
        table.timestamps(true,true)
    })
    .createTable('profile',(table)=>{
        table.increments();
        table.bigint('phone').notNullable().unique()
        table.string('email').unique().notNullable()
        table.string('filename').notNullable()
        table.timestamps(true,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('customers')
                      .dropTableIfExists('admin')
                      .dropTableIfExists('otpVerification')
                      .dropTableIfExists('profile')
}

