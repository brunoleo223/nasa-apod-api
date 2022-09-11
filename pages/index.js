import Sidebar from '../components/Sidebar';
import styles from '../styles/index.module.scss'

/*
  1. carregar dados do localstorage
  2. se não tiver os dados, carregar mes atual da api e salvar no localstorage
  3. listar de 1 em 1 mes a medida que se dá scroll
*/

export default function Home({data}) {
  const options = {  year: 'numeric', month: 'long', day: 'numeric' };
  console.log(data)
  return (
    <div className={styles.wrapper}>
      <Sidebar />
        <div className={styles.itens}>
        {[...data].reverse().map((item) => { const itemDate = new Date(item.date); return (
          <div key={item.date} className={styles.item}>
            <a className="venues-item" data-img={item.url}>
              <div className={styles.date}>{item.title}</div>
              <div className={styles.content}>
                <b>{itemDate.toLocaleDateString("en-US", options)}</b>
                <p>{item.explanation}</p>
                <span>{item.copyright ? `by ${item.copyright}` : ''}</span>
              </div>
            </a>
          </div>
          )})}
          <div className="venues-img-wrap">
            <div className="venues-img"></div>
          </div>
        </div>
    </div>
  );
};

export async function getServerSideProps() {
  
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}&start_date=2022-09-02&end_date=2022-09-11`);
  const data = await res.json();

  return { props: { data } };
}