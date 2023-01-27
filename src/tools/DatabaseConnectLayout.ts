interface requestInt{
    callback: () => any
}

class DatabaseConnectLayout{
    request(callback: requestInt){
        try{
            const returnValue: any = callback;
            return returnValue;
        }
        catch(e){
            console.error(e);
            return new Error(`Error`);
        }
    }
}

export default new DatabaseConnectLayout;