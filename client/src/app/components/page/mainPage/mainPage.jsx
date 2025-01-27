import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "../../../styles/pages/mainPage.scss";

const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };
  return (
    <div className="main-page">
      <div className="main-img">
        <div className="main-content">
          <div className="descript-img">
            КОМФОРТ И УЮТ В ОТЕЛЕ <br /> SNOW PEAK
          </div>
          <div className="address">
            Красная Поляна, Краснодарский край, 354392
          </div>
        </div>
      </div>
      <div className="section section-hotel" id="targetSection">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/80/6f/85/caption.jpg?w=1200&h=-1&s=1"
          alt=""
        />
        <p className="description">
          Отель Snow peak, это новый семиэтажный отель, располагающий 42
          номерами разной категории, SPA-центром с подогреваемым бассейном под
          открытым небом, сауной, а также рестораном с вкуснейшими блюдами.
        </p>
      </div>
      <div className="section section-pool">
        <p>
          В отеле есть современный фитнес-центр и ресторан, где подают
          изысканные блюда горной кухни. Искателям приключений понравится
          близость многочисленных пешеходных маршрутов и горнолыжных курортов.
        </p>
        <img
          src="https://s5.stc.all.kpcdn.net/russia/wp-content/uploads/2021/09/greenflow.ru_.jpg"
          alt=""
        />
      </div>
      <div className="section section-restaurant">
        <img
          src="https://laprovincia.ru/images/slides/04_IMG_5397.jpeg"
          alt=""
        />
        <p>
          В отеле есть современный фитнес-центр и ресторан, где подают
          изысканные блюда горной кухни. Искателям приключений понравится
          близость многочисленных пешеходных маршрутов и горнолыжных курортов.
        </p>
      </div>
      {/* <div className="section section-reviews">
        <div className="reviews-yandex">
          <iframe src="https://yandex.ru/maps-reviews-widget/13840917962?comments"></iframe>
          <a
            href="https://yandex.ru/maps/org/apartamenty_panorama_park/13840917962/"
            target="_blank"
          >
            Апартаменты Панорама парк на карте Сочи — Яндекс Карты
          </a>
        </div>
        <div className="reviews"></div>
      </div> */}
      <div className="map-contact">
        <div className="contact" id="contact">
          <div className="test">
            <div className="contact-address">
              Краснодарский край п. г. т. Красная Поляна <br /> этаж 1, ул.
              Защитников Кавказа, 29
            </div>
            <div className="index">354392</div>
            <div className="contact-phone">
              <div className="contact">
                <button onClick={handleCall} className="btn-call">
                  +7 800 888 88 88
                </button>
              </div>
            </div>
            <div className="contact-email">KakoytoEmail@mail.ru</div>
          </div>
        </div>
        <div className="map">
          <a
            href="https://yandex.ru/maps/239/sochi/?utm_medium=mapframe&utm_source=maps"
            className="a-one"
          >
            Сочи
          </a>
          <a
            href="https://yandex.ru/maps/239/sochi/?ll=40.202845%2C43.677776&mode=whatshere&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=40.206172%2C43.677069&whatshere%5Bzoom%5D=18.4&z=15.6"
            className="a-two"
          >
            А-149, 41-й километр — Яндекс Карты
          </a>
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=40.202845%2C43.677776&mode=whatshere&whatshere%5Bpoint%5D=40.206172%2C43.677069&whatshere%5Bzoom%5D=18.4&z=15.6"
            // width="670"
            // height="430"
            // frameBorder="1"
            // allowFullScreen="true"
            // className="iframe"
            width="670"
            height="430"
            allowFullScreen={true}
            className="iframe"
            title="Yandex Map"
          ></iframe>
        </div>
      </div>

      {/* <div className="block"></div> */}
    </div>
  );
};

export default MainPage;
