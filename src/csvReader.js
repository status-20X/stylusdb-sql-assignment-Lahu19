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
function readCSVForHLL(filePath, bitSampleSize = 12, digestSize = 128) {
    const results = [];
    var h = hll({ bitSampleSize: bitSampleSize, digestSize: digestSize });

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => h.insert(JSON.stringify(data)))
            .on('end', () => {
                resolve(h);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = { readCSV, writeCSV ,readCSVForHLL};