import React from 'react'
import Navigation from './MainNavigation';
import Footer from './Footer';
import abbas from '../images/Abbas.png'
import Ana from '../images/Ana.png'
import Nicholas from '../images/Nicholas.png'
import Dang from '../images/Dang.png'
import Lauren from '../images/Lauren.png'
import Youstina from '../images/Youstina.png'
import ppt from '../files/Tutorial.pptx'
export const About = () => (
    <div>
        <Navigation />
        <React.Fragment>
            <main>
                <section class="py-5 text-center container">
                    <div class="row py-lg-5">
                        <div class="col-lg-6 col-md-8 mx-auto">
                            <h1 class="fw-light">About Red Cross CSULB</h1>
                            <p class="lead text-muted">To assist CSULB and the American Red Cross in instituting, encouraging, unifying,
                                and executing projects and services in cooperation with the American Red Cross of Greater Los Angeles.
                                To facilitate the cooperation of our membership; to promote unity of action in projects and to discover the needs for and stimulate service to our school, community,
                                the nation and to develop better human relations by worldwide services</p>
                            <p>
                                <a href="/" class="btn btn-danger mx-2">Check Events</a>
                                <a href="/Login" class="btn btn-secondary my-2">Log In to Register for Events</a>
                            </p>
                        </div>
                        <div>
                            <a href={ppt} download>How to sign up for the official national ARC account for volunteering</a>
                        </div>
                    </div>
                </section>
                <body>

                    <div class="album py-5 bg-light">

                        <div class="py-2 text-center container">
                            <h1 class="fw-light">Red Cross CSULB Members</h1>
                        </div>
                        <div class="container">

                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                <div class="col">
                                    <div class="card shadow-sm">
                                        <img src={abbas} className="card__image" />
                                        {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Club" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Club member photo</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Club member photo</text></svg> */}
                                        <div class="card-body">
                                            <p class="card-text"><strong>Name:</strong> President</p>
                                            <p class="card-text"><strong>Position:</strong> President</p>
                                            <p class="card-text"><strong>Major:</strong> Molecular Cell Biology</p>
                                            <p class="card-text"><strong>School year:</strong> Senior</p>
                                            <p class="card-text"><strong>Future Plans:</strong> Physician</p>
                                            <p class="card-text"><strong>Email:</strong> abbas.abdulhasan@student.csulb.edu</p>
                                        </div>

                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card shadow-sm">
                                        {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Club member photo</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Club member photo</text></svg> */}
                                        <img src={Ana} width="100%" height="225" className="card__image" />
                                        <div class="card-body">
                                            <p class="card-text"><strong>Name:</strong> Ana Maria Baustista</p>
                                            <p class="card-text"><strong>Position:</strong> Vice President</p>
                                            <p class="card-text"><strong>Major:</strong> Molecular Cell Biology</p>
                                            <p class="card-text"><strong>School year:</strong> Freshman</p>
                                            <p class="card-text"><strong>Future Plans:</strong> EMT liscence & Trauma Surgery PA</p>
                                            <p class="card-text"><strong>Email:</strong> anamaria.bautistaardila@student.csulb.edu</p>

                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card shadow-sm">
                                        {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Club member photo</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Club member photo</text></svg> */}
                                        <img src={Nicholas} width="100%" height="225" className=" card__image" />
                                        <div class="card-body">
                                            <p class="card-text"><strong>Name:</strong> Nicholas Demmler</p>
                                            <p class="card-text"><strong>Position:</strong> Treasurer</p>
                                            <p class="card-text"><strong>Major:</strong> Pre-Nursing</p>
                                            <p class="card-text"><strong>School year:</strong> Sophomore</p>
                                            <p class="card-text"><strong>Future Plans:</strong> EMT and Nurse Practitioner</p>
                                            <p class="card-text"><strong>Email:</strong> nicholas.demmler@student.csulb.edu</p>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="album py-5 bg-light">
                        <div class="container">
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                <div class="col">
                                    <div class="card shadow-sm">
                                        <img src={Dang} className="card__image" />
                                        {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Club" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Club member photo</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Club member photo</text></svg> */}
                                        <div class="card-body">
                                            <p class="card-text"><strong>Name:</strong> Dang Duong</p>
                                            <p class="card-text"><strong>Position:</strong> President</p>
                                            <p class="card-text"><strong>Major:</strong> Molecular Cell Biology</p>
                                            <p class="card-text"><strong>School year:</strong> Senior</p>
                                            <p class="card-text"><strong>Future Plans:</strong> Physician</p>
                                            <p class="card-text"><strong>Email:</strong> dang.duong@student.csulb.edu</p>

                                        </div>

                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card shadow-sm">
                                        <img src={Lauren} className="card__image" />
                                        {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Club" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Club member photo</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Club member photo</text></svg> */}
                                        <div class="card-body">
                                            <p class="card-text"><strong>Name:</strong> Lauren Ribancos</p>
                                            <p class="card-text"><strong>Position:</strong> Historian</p>
                                            <p class="card-text"><strong>Major:</strong> History & Criminal Justice</p>
                                            <p class="card-text"><strong>School year:</strong> Sophmore</p>
                                            <p class="card-text"><strong>Future Plans:</strong> Teacher/Join AF</p>
                                            <p class="card-text"><strong>Email:</strong>  lauren.ribancos01@student.csulb.edu</p>

                                        </div>

                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card shadow-sm">
                                        <img src={Youstina} className="card__image" />
                                        {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Club" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Club member photo</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Club member photo</text></svg> */}
                                        <div class="card-body">
                                            <p class="card-text"><strong>Name:</strong> Youstina Girgis</p>
                                            <p class="card-text"><strong>Position:</strong> Publicitiy Officer</p>
                                            <p class="card-text"><strong>Major:</strong> Biology</p>
                                            <p class="card-text"><strong>School year:</strong> Sophmore</p>
                                            <p class="card-text"><strong>Future Plans:</strong> Dentist</p>
                                            <p class="card-text"><strong>Email:</strong>  youstina.girgis@student.csulb.edu</p>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </body>
                <Footer />
            </main>
        </React.Fragment>

    </div >
)