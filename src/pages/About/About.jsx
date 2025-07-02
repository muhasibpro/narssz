import React from 'react';
import './About.css';
import { teamMembers } from '../../data';

const About = () => {
    return (
        <div className="about-page">
            <div className="about-header" data-aos="fade-in">
                <h1>Biz Faqat Mebel Sotmaymiz, Biz San'at Yaratamiz</h1>
            </div>

            <section className="mission-section">
                <div className="container">
                    <div className="mission-content" data-aos="fade-up">
                        <div className="mission-text">
                            <h2>Bizning Falsafamiz</h2>
                            <p>FELT da bizning asosiy maqsadimiz - bu shunchaki mebel ishlab chiqarish emas, balki sizning uyingizga iliqlik, qulaylik va go'zallik olib kirishdir. Biz har bir detalga e'tibor beramiz, eng sifatli materiallarni tanlaymiz va zamonaviy dizaynni klassik qulaylik bilan uyg'unlashtiramiz.</p>
                        </div>
                        <div className="mission-image">
                            <img src="http://93.188.83.2:8088/mixinfo/2025-07-02 21.33.00.jpg/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80" alt="Interior Design" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="team-section">
                <div className="container">
                    <h2 className="section-title" data-aos="fade-up">Bizning Jamoamiz</h2>
                    <div className="team-grid">
                        {teamMembers.map(member => (
                            <div key={member.id} className="team-member" data-aos="zoom-in" data-aos-delay={member.id * 100}>
                                <img src={member.img} alt={member.name} />
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;