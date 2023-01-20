import { QueryResult } from "pg";

import database from "../database/database.js";

function getAll(): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM projects`,
  );
}

function get(id: number): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM projects
    WHERE id=$1`,
    [id]
  );
}

function create(name: string): Promise<QueryResult> {
  return database.query(`
    INSERT INTO projects("name")
    VALUES ($1)
    RETURNING "id", "name", "createdAt";`,
    [name]
  );
}

function findByName(name: string): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM projects
    WHERE name=$1`,
    [name]
  );
}

function update(id: number, name: string): Promise<QueryResult> {
  return database.query(`
    UPDATE projects
    SET name=$2
    WHERE id=$1`,
    [id, name]
  );
}

const projectRepository = {
  getAll,
  get,
  create,
  findByName,
  update,
};


export default projectRepository;