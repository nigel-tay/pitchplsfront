import React from 'react';
import styles from './About.module.css'

function About(props) {
    return (


        <div className={`${styles.aboutContainer}`}>
            <h1 className={`${styles.aboutTitle}`}>Throw your Pitch.<br/>Get discovered.</h1>
            <hr />

            <p className={`${styles.aboutBodyContent}`}>
                Unlike other job portals, we provide a platform for Job Seekers to sell themselves,
                without the need for photos or names.<br/>
                <br/>
                What this means is, Recruiters can connect with the person you truly are underneath,
                without any prejudice to your race, religion or gender.<br/>
                <br/>

                With our platform, we hope that Occupational Inequality will soon be a thing of the past.
            </p>
        </div>
    );
}

export default About;

