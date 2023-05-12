import { Router } from 'express';
import { database, path } from '../controller.mjs';
import { writeFileSync } from 'node:fs';
const publicapi = Router();

const todo_list = database.todo_list;

publicapi.get('/info', (req, res) => {
    return res.json({ error: false, data: [...todo_list].sort((a, b) => a.todo.localeCompare(b.todo)) });
});

publicapi.get('/info/:id', (req, res) => {
    const { id } = req.params;
    const todo = [...todo_list].find(t => t.id === +id);
    return res.json({ error: false, data: todo || [] });
});


publicapi.post('/add', (req, res) => {
    const data = req.body;
    data.id = Math.floor(Math.random(0) * 1000);

    const todo = [...todo_list];
    todo.push(data);

    database.todo_list = todo;
    writeFileSync(path, JSON.stringify(database), 'utf-8');
    return res.json({ error: false, data: 'เพิ่มเรียบร้อย' });
});


publicapi.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const todo = [...todo_list];

    const index = todo.findIndex(t => t.id == +id);
    if (index === -1) return res.status(500).json({ error: true, data: 'ไม่พบข้อมูล' });
    todo[index] = data;

    database.todo_list = todo;
    writeFileSync(path, JSON.stringify(database), 'utf-8');
    return res.json({ error: false, data: 'แก้ไขเรียบร้อย' });
});


publicapi.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const todo = [...todo_list];

    const index = todo.findIndex(t => t.id == +id);
    if (index === -1) return res.status(500).json({ error: true, data: 'ไม่พบข้อมูล' });
    todo.splice(index, 1);

    database.todo_list = todo;
    writeFileSync(path, JSON.stringify(database), 'utf-8');
    return res.json({ error: false, data: 'ลบเรียบร้อย' });
});

export default publicapi;