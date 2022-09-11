import styles from '../styles/index.module.scss'

/*
  1. carregar dados do localstorage
  2. se não tiver os dados, carregar mes atual da api e salvar no localstorage
  3. listar de 1 em 1 mes a medida que se dá scroll
*/

export default function Home({data}) {


  const allVenues = gsap.utils.toArray(".venues-item");
  const venueImageWrap = document.querySelector(".venues-img-wrap");
  const venueImage = document.querySelector(".venues-img");

  function initVenues() {
    allVenues.forEach((link) => {
      link.addEventListener("mouseenter", venueHover);
      link.addEventListener("mouseleave", venueHover);
      link.addEventListener("mousemove", moveVenueImage);
    });
  }

  function moveVenueImage(e) {
    let xpos = e.clientX;
    let ypos = e.clientY;
    const tl = gsap.timeline();
    tl.to(venueImageWrap, {
      x: xpos,
      y: ypos
    });
  }

  function venueHover(e) {
    if (e.type === "mouseenter") {
      const targetImage = e.target.dataset.img;

      const t1 = gsap.timeline();
      t1.set(venueImage, {
        backgroundImage: `url(${targetImage})`
      }).to(venueImageWrap, {
        duration: 0.5,
        autoAlpha: 1
      });
    } else if (e.type === "mouseleave") {
      const tl = gsap.timeline();
      tl.to(venueImageWrap, {
        duration: 0.5,
        autoAlpha: 0
      });
    }
  }

  function init() {
    initVenues();
  }

  init();



  const options = {  year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <>
      <div class="section section-3 venues">
        <div class="grid">
          <div class="venues-items">
          {data.map((item) => { const itemDate = new Date(item.date); return (
            <div key={item.date} className={styles.item}>
              <a class="grid-item venues-item" data-img={item.url}>
                <div className={styles.date}>{itemDate.toLocaleDateString("en-US", options)}</div>
                <div className={styles.content}>
                  <b>{item.title}</b>
                  <p>{item.explanation}</p>
                  <span>{item.copyright}</span>
                </div>
              </a>
            </div>
            )})}
            <div class="venues-img-wrap">
              <div class="venues-img"></div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="lista">
        {data.map((item) => { const itemDate = new Date(item.date); return (
          <div key={item.date} className={styles.item}>
            <div className={styles.date}>{itemDate.toLocaleDateString("en-US", options)}</div>
            <div className={styles.content}>
              <b>{item.title}</b>
              <p>{item.explanation}</p>
              <span>{item.copyright}</span>
            </div>
          </div>
        )})}
      </div>   */}
    </>
  );
};

export async function getServerSideProps() {
  
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}&start_date=2022-09-01&end_date=2022-09-10`);
  const data = await res.json();

  return { props: { data } };
}