import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';

export const path = './database/todo_list_db.json';

const default_todo = {
    todo_list: [
        {
            id: 1,
            todo: 'I working write code'
        }
    ]
}

if (!existsSync('./database')) mkdirSync('./database');
if (!existsSync(path)) writeFileSync(path, JSON.stringify(default_todo), 'utf-8')

const data = readFileSync(path, 'utf-8');
export const database = JSON.parse(data);