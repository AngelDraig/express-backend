const { format } = require('date-fns');
import { Request } from "express";

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

import { LoggerInt } from "./Interfaces";

class Logger{
    static async log(params: LoggerInt){
        try{
            const time = `${format(new Date(), 'dd.MM.yyyy\tHH:mm:ss')}`;
            
            const currentDayFile = `log-${format(new Date(), 'dd-MM-yyyy')}.txt`;

            if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
            }

            // if (!fs.existsSync(path.join(__dirname, '..', 'logs', currentDayFile))){
            
            // }
    
            await fsPromises.appendFile(path.join(__dirname, '..', 'logs', currentDayFile), `${time}\t${params.host}\t${params.url}\t${params.method}\n`);
        }
        catch(e){
            console.error(e);
        }
    }
}

export default Logger;