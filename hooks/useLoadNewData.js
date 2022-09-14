export async function useLoadNewData(start, end, date = false){
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}&end_date=${end}&start_date=${start}`);
    const content = await res.json();
    return content;
}

export default useLoadNewData;