import Image from 'next/image';
import styles from './style.module.scss'

export function Sidebar(){
    let maxYear = new Date().getFullYear();
    let minYear = 1995;

    const years = []

    while(maxYear > minYear){
        years.push(maxYear)
        maxYear--;
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <Image src='/logo.webp' width={200} height={170} alt="Logo Nasa" />
            </div>

            <p>
                Select the month and year to see all photos. You can also see your birthday photo.
            </p>

            <form className={styles.form}>
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
                <div className={styles.group}>
                    <label htmlFor="day">Day</label>
                    <select name="day" id='day'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>
                </div>
                <button>GO!</button>
            </form>
        </div>
    )
}

export default Sidebar;