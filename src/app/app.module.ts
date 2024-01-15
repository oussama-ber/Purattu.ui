import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MovieService } from './services/movie.service';
import { CreateMovieComponent } from './components/Admin/manage-movies/create-movie/create-movie.component';
import { LoginComponent } from './components/Admin/auth/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/auth-interceptor';
import { SignupComponent } from './components/Admin/auth/signup/signup.component';
import { ManageMoviesComponent } from './components/Admin/manage-movies/movies-list/movies-list.component';
import { EditMovieComponent } from './components/Admin/manage-movies/edit-movie/edit-movie.component';
import { BlogsListComponent } from './components/Admin/manage-blogs/blogs-list/blogs-list.component';
import { BlogService } from './services/blog.service';
import { CreateBlogComponent } from './components/Admin/manage-blogs/create-blog/create-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    LayoutComponent,
    AboutUsComponent,
    BlogsComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    HeaderComponent,
    FooterComponent,
    CreateMovieComponent,
    LoginComponent,
    SignupComponent,
    ManageMoviesComponent,
    EditMovieComponent,
    BlogsListComponent,
    CreateBlogComponent,
  ],
  imports: [
    RouterLink,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MovieService,
    BlogService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
