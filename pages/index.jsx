import Sidebar from '../components/Sidebar';
import styles from '../styles/index.module.scss'

import { TwitterLogo, Download, YoutubeLogo } from "phosphor-react";
import { useState } from 'react';

export default function Home({content}) {
  const options = {  year: 'numeric', month: 'long', day: 'numeric' };
  const [data, setData] = useState(content);
  const [loading, setLoading] = useState(true);

  function imageUrl(type, url){
    if(type === 'image') return url;
    return `https://img.youtube.com/vi/${url.split('embed/')[1].split('?')[0]}/0.jpg`;
  }
  
  return (
    <div className={styles.wrapper}>
      <Sidebar data={data} setData={setData} setLoading={setLoading} loading={loading} />
      {!loading ? 

      <div className={styles.loading}>Loading...</div>

      :
      
      <div className={styles.itens}>
      {[...data].reverse().map((item) => { 
        
      const itemDate = new Date(item.date); 
    
      return (
        <div key={item.date} className={styles.item}>
          <a className="venues-item" data-img={imageUrl(item.media_type, item.url)}>
            <div className={styles.date}>
              <span><b>{itemDate.toLocaleDateString("en-US", options)}</b></span>
              {item.title}
            </div>
            <div className={styles.content}>
              <p>{item.explanation}</p>
              <span>{item.copyright ? `by ${item.copyright}` : ''}</span>
              <ul className={styles.share}>
                <li><TwitterLogo />
                <a href={`https://twitter.com/intent/tweet?text=${item.media_type === 'video' ? 'Watch this video' : 'See this photo'} from ${itemDate.toLocaleDateString("en-US", options)}&url=${item.url}`}> Twitter</a></li>
                <li><a href={item.url} target="_blank" rel="noreferrer">
                  { item.media_type === 'video' ? <><YoutubeLogo /> Watch video</> : <><Download /> Download</>}  
                </a></li>
              </ul>
            </div>
          </a>
        </div>
        )})}

        <div className="venues-img-wrap">
          <div className="venues-img"></div>
        </div>
      </div>

      }
    </div>
  );
};

export async function getServerSideProps() {
  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - 30));
  
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}&end_date=${today.toISOString().split('T')[0]}&start_date=${priorDate.toISOString().split('T')[0]}`);
  const content = await res.json();

  return { props: { content } };
}