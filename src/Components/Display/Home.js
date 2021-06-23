import React from 'react';
import {Col, Row} from "react-bootstrap";
import ScrollSnap from "scroll-snap";
import styles from "./Home.module.css";

function Home(props) {

    return (
        <div className={`${styles.homeBody}`}>
            <section className={`${styles.section} ${styles.hero}`}>
                <h1 className={`${styles.mainTitle}`}>Pitch Please</h1>
                <p>Job searching without the fluff</p>

                <div className={`${styles.scrollArrows}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
            </section>

            <section className={`${styles.aboutUs} ${styles.section}`}>
                <header className={`${styles.aboutUsIntro}`}>
                    <h2 className={`${styles.sectionTitle}`}>Recognising Talent</h2>
                    <p>
                        Searching for a job is tough<br/>
                        Trust us, we know
                    </p>
                </header>
                <div className={`${styles.aboutUsBody}`}>
                    <p className={`${styles.aboutUsText}`}>
                        Rejection is part and parcel of a job search. Ever got rejected but was completely qualified for the job? By eliminating the need for names, photos and resumes, we hope to introduce a new job search culture only with pitches.
                    </p>
                </div>
            </section>

            <section className={`${styles.section}`}>
                <h2 className={`${styles.sectionTitle}`}>Testimonials</h2>

                <Row>
                    <Col md={4} className={`${styles.testimonial}`}>
                        <h3 className={`${styles.testimonialTitle}`}>"Approaching the one year mark in my dream job!"</h3>
                        <img src="" alt="" className="product__img"/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Alias architecto cupiditate, dicta explicabo molestiae mollitia
                            optio porro quo recusandae sint.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Alias, placeat!</p>
                    </Col>
                    <Col md={4} className={`${styles.testimonial}`}>
                        <h3 className={`${styles.testimonialTitle}`}>"Shocking first meets"</h3>
                        <img src="" alt="" className="product__img"/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Doloribus facilis iste laboriosam libero sunt totam!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Blanditiis, debitis.</p>
                    </Col>
                    <Col md={4} className={`${styles.testimonial}`}>
                        <h3 className={`${styles.testimonialTitle}`}>"Diverse Workspace"</h3>
                        <img src="" alt="" className="product__img"/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Cumque deleniti ea explicabo perspiciatis.
                            Accusantium doloribus eos est non odio officia perferendis
                            quasi rerum!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorem, ullam.</p>
                    </Col>
                </Row>

            </section>

            <section className={`${styles.section} ${styles.teamContainer}`}>
                <h2 className={`${styles.sectionTitle}`}>Meet the Team</h2>
                <Row>
                    <Col className={`${styles.teamPerson} gx-5`} md={3}>
                        <img className={`${styles.memberPhoto}`} src="http://placehold.it/150x150" alt="Photo of Benedict"/>
                        <div className={`${styles.teamName}`}>Benedict</div>
                        <a href="" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnPrimary}`}>Connect</a>
                    </Col>
                    <Col className={`${styles.teamPerson} gx-5`} md={3}>
                        <img className={`${styles.memberPhoto}`} src="http://placehold.it/150x150" alt="Photo of Jerald"/>
                        <div className={`${styles.teamName}`}>Jerald</div>
                        <a href="" className={`${styles.btn} ${styles.btnPrimary}`}>Connect</a>
                    </Col>
                    <Col className={`${styles.teamPerson} gx-5`} md={3}>
                        <img className={`${styles.memberPhoto}`} src="http://placehold.it/150x150" alt="Photo of Kimberly"/>
                        <div className={`${styles.teamName}`}>Kimberly</div>
                        <a href="" className={`${styles.btn} ${styles.btnPrimary}`}>Connect</a>
                    </Col>
                    <Col className={`${styles.teamPerson} gx-5`} md={3}>
                        <img className={`${styles.memberPhoto}`} src="http://placehold.it/150x150" alt="Photo of Nigel"/>
                        <div className={`${styles.teamName}`}>Nigel</div>
                        <a href="" className={`${styles.btn} ${styles.btnPrimary}`}>Connect</a>
                    </Col>

                </Row>

            </section>

        </div>
    );
}

export default Home;