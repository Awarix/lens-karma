function getYesterdayDate() {
    const today = new Date();
    const yesterday = new Date(today);
  
    yesterday.setDate(yesterday.getDate() - 1);
  
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
  
    const yesterdayDate = `${year}-${month}-${day}`;
    return yesterdayDate;
  }
  
  const yesterdayDate = getYesterdayDate();
  export default yesterdayDate;