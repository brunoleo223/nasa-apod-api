import Image from 'next/image';
import { useState } from 'react';
import styles from './style.module.scss'
import { GithubLogo } from "phosphor-react";

export function Sidebar({data, setData, setLoading, loading}){
    let maxYear = new Date().getFullYear();
    let minYear = 1995;
    const [validDate, setValidDate] = useState(false);

    const years = []

    while(maxYear > minYear){
        years.push(maxYear)
        maxYear--;
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        
        setLoading(false)
        setValidDate(false)
        const year = e.target.year.value;
        const month = e.target.month.value;
        const day = 1;
        
        const date = `${year}-${month}-${day}`;

        if(new Date(date) > new Date()){
            setLoading(true)
            setValidDate(true)
            return;
        }
        
        const start = new Date(date).toISOString().split('T')[0];
        const end = new Date(`${year}-${month}-${new Date(year, month, 0).getDate()}`).toISOString().split('T')[0];
        
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=uVdyx0oLdTBzwrKV7T3UQ4ZHgPLr3jiRr9vVEaDY&start_date=${start}&end_date=${end}`);
        console.log(res.body)
        const content = await res.json();

        setData(content)
        setLoading(true)
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <Image src='/logo.webp' width={200} height={170} alt="Logo Nasa" />
            </div>

            <p>
                Select the month and year to see all photos. You can also see your birthday photo.
            </p>

            {validDate && <span>Select a valid date</span>}

            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.group}>
                    <label htmlFor="year">Year*</label>
                    <select id="year" name='year'>
                        {years.map((i) => <option value={i} key={i}>{i}</option>)}
                    </select>
                </div>
                <div className={styles.group}>
                    <label htmlFor="month">Mounth*</label>
                    <select name="month" id="month">
                        <option value="01">Jan</option>
                        <option value="02">Feb</option>
                        <option value="03">Mar</option>
                        <option value="04">Apr</option>
                        <option value="05">May</option>
                        <option value="06">Jun</option>
                        <option value="07">Jul</option>
                        <option value="08">Aug</option>
                        <option value="09">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                    </select>
                </div>
                {loading && <button>GO!</button>}
            </form>
            <footer>
                <a href="https://github.com/brunoleo223/nasa-apod-api" target="_blank" rel="noreferrer"><GithubLogo /> Github Repository</a>
            </footer>
        </div>
    )
}

export default Sidebar;