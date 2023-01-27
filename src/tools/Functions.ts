export const defineModel = (model: Array<string>) => {

    const result: Record<string, boolean> = {};
    for (let item of model){
        result[item as keyof typeof result] = true;
    }

    console.log(result);

    return result;
}