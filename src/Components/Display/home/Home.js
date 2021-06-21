import React from 'react';
import styles from "./Home.module.css";

function Home(props) {
    return (
        <div className={`${styles.homeBody}`}>
            <section>
                <h1 className={`${styles.mainTitle}`}>Pitch Please</h1>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aut blanditiis debitis dignissimos dolor dolores ea et, expedita
                in laudantium magni minus nemo nesciunt placeat possimus quae quasi
                sit soluta voluptas.
            </section>

            <section>
                <h2 className={`${styles.sectionTitle}`}>Recognising Talent</h2>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aut blanditiis debitis dignissimos dolor dolores ea et, expedita
                in laudantium magni minus nemo nesciunt placeat possimus quae quasi
                sit soluta voluptas.
            </section>

            <section>
                <h2 className={`${styles.sectionTitle}`}>Testimonials</h2>
                <div className="product">
                    <h3 className={`${styles.testimonialTitle}`}>Approaching the one year mark in my dream job!</h3>
                    <img src="" alt="" className="product__img"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Alias architecto cupiditate, dicta explicabo molestiae mollitia
                        optio porro quo recusandae sint.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Alias, placeat!</p>
                </div>
                <div className="product">
                    <h3 className={`${styles.testimonialTitle}`}>Shocking first meets</h3>
                    <img src="" alt="" className="product__img"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Doloribus facilis iste laboriosam libero sunt totam!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Blanditiis, debitis.</p>
                </div>
                <div className="product">
                    <h3 className={`${styles.testimonialTitle}`}>Diverse Workspace</h3>
                    <img src="" alt="" className="product__img"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Cumque deleniti ea explicabo perspiciatis.
                        Accusantium doloribus eos est non odio officia perferendis
                        quasi rerum!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Dolorem, ullam.</p>
                </div>
            </section>

            <section>
                <h2 className={`${styles.sectionTitle}`}>Meet the Team</h2>
            </section>
            <div>Benedict</div>
            <div>Jerald</div>
            <div>Kimberly</div>
            <div>Nigel</div>
        </div>
    );
}

export default Home;