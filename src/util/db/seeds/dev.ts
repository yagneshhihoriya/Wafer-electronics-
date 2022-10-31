import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    //truncate all existing data
    await knex.raw('TRUNCATE TABLE "customers" CASCADE')
    await knex.raw('TRUNCATE TABLE "admin" CASCADE')

    // Inserts seed entries
    await knex("customers").insert([
        {firstName: "rowValue1", lastName: "lastname1", phone: 1234567890, email: "demo1@gmail.com" },
        {firstName: "rowValue2", lastName: "lastname2", phone: 2345567889, email: "demo2@gmail.com" },
        {firstName: "rowValue3", lastName: "lastname3", phone: 8787687663, email: "demo3@gmail.com" }
    ]);
    await knex("admin").insert([
        {firstName: "admin1", lastName: "admin1", phone: 1234567890, email: "admin1@gmail.com" },
        {firstName: "admin2", lastName: "admin2", phone: 1234567892, email: "admin2@gmail.com" },
        {firstName: "admin3", lastName: "admin3", phone: 1234567893, email: "admin3@gmail.com" },
    ]);
};
