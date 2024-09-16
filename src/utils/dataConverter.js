export const dateConverter = (date)=>{
    const testDate = date*1000
    const dateConverted = new Date(testDate);
    return dateConverted.toLocaleDateString()

}

export const getMonth = (month)=>{
    const test = month*1000;
    const dateConverted = new Date(test);
    return dateConverted.getMonth()+1;
}
