export const dateConverter = (date)=>{
    const testDate = date*1000
    const dateConverted = new Date(testDate);
    return dateConverted.toLocaleDateString()

}