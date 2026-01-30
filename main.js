const mysql2 = require("mysql2/promise")
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;
async function connectDB() {
    try {
            const connection = await mysql2.createConnection({
            host: '127.0.0.1',
            port: 3306,
            database: 'small_retail_store',
            user: 'root',
            password: ''
        });
        console.log('DB connected successfully');
        return connection;        
    } catch (error) {
        console.error('Failed to connect to DB:', error.message);
        throw error;
    }
}

    connectDB();
    app.get('/', async (req, res) => {
    try {
        const db = await connectDB();
        const [result, fields] = await db.query('SELECT 1 + 1 AS result');
        await db.end();        
        return res.status(200).json({ message: "done", result: result});
    } catch(error) {
        return res.status(500).json({message: "server error",  error: error.message});
    }
})