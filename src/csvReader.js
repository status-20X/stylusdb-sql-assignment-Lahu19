// src/csvReader.js

const fs = require('fs');
const { parse } = require('json2csv');
const csv = require('csv-parser');

function readCSV(filePath) {
    const results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

async function writeCSV(filename, data) {
    try {
        const csvData = parse(data);
        fs.writeFileSync(filename, csvData);
    } catch (error) {
        throw error;
    }
}

module.exports = { readCSV, writeCSV };