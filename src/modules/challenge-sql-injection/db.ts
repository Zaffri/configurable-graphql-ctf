import options from "./knexfile";
import knex from "knex";
export default knex(options["development"]);