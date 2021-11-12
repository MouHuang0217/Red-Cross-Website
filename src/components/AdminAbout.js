import React from 'react'
import AdminNavigation from './AdminNavagationBar';

export const AdminAbout = () => (
    <div>
        <AdminNavigation />
        <React.Fragment>
            <main>

                <section class="py-5 text-center container">
                    <div class="row py-lg-5">
                        <div class="col-lg-6 col-md-8 mx-auto">
                            <h1 class="fw-light">About Red Cross CSULB</h1>
                            <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                            <p>
                                <a href="#" class="btn btn-primary mx-2">Check Events</a>
                                <a href="#" class="btn btn-secondary my-2">Log In to Register for Events</a>
                            </p>
                        </div>
                    </div>
                </section>

                <div class="album py-5 bg-light">
                    <div class="container">

                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            <div class="col">
                                <div class="card shadow-sm">
                                    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Club" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Club member photo</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Club member photo</text></svg>

                                    <div class="card-body">
                                        <p class="card-text">Abbas</p>

                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card shadow-sm">
                                    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Club member photo</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Club member photo</text></svg>
                                    <div class="card-body">
                                        <p class="card-text">Abbas</p>
                                        <div class="d-flex justify-content-between align-items-center">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card shadow-sm">
                                    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Club member photo</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Club member photo</text></svg>

                                    <div class="card-body">
                                        <p class="card-text">Abbas</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </main>

        </React.Fragment>
    </div>
)