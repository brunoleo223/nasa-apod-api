export const submitHandler = async (e, setValidDate, setData, setLoading) => {
    e.preventDefault();

    setLoading(false)
    setValidDate(false)

    const year = e.target.year.value;
    const month = e.target.month.value;
    const day = 1;
    const currentMonth = new Date().getMonth() + 1;
    
    const date = `${year}-${month}-${day}`;

    // If date is invalid
    if(new Date(date) > new Date()){
        setLoading(true);
        setValidDate(true);
        return;
    }

    // Verify if data is saved in cache
    if(localStorage.getItem(`NASA-APOD-API-${year}-${month}`)){
        setData(JSON.parse(localStorage.getItem(`NASA-APOD-API-${year}-${month}`)))
        setLoading(true);
        return;
    }

    // Verify if current month is selected
    if(month ==  currentMonth){
        setData(currentMonthData)
        setLoading(true);
        return;
    }
    
    const start = new Date(date).toISOString().split('T')[0];
    const end = new Date(`${year}-${month}-${new Date(year, month, 0).getDate()}`).toISOString().split('T')[0];
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=uVdyx0oLdTBzwrKV7T3UQ4ZHgPLr3jiRr9vVEaDY&start_date=${start}&end_date=${end}`);
    const content = await res.json();

    localStorage.setItem(`NASA-APOD-API-${year}-${month}`, JSON.stringify(content));
    setData(content)
    setLoading(true)
};

export default submitHandler;