export default function(num: number | string, showAll = false, decimals = 5): string{
    try{
        return showAll ? Number(num).toFixed(decimals) : Number(Number(num).toFixed(decimals)).toString();
    }
    catch(e){
        console.log(e);
        return "0";
    }
}