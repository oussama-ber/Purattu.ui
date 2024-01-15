import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './components/blogs/blogs.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { CreateMovieComponent } from './components/Admin/manage-movies/create-movie/create-movie.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/Admin/auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './components/Admin/auth/signup/signup.component';
import { ManageMoviesComponent } from './components/Admin/manage-movies/movies-list/movies-list.component';
import { EditMovieComponent } from './components/Admin/manage-movies/edit-movie/edit-movie.component';
import { BlogsListComponent } from './components/Admin/manage-blogs/blogs-list/blogs-list.component';
import { CreateBlogComponent } from './components/Admin/manage-blogs/create-blog/create-blog.component';

const routes: Routes = [
  // {path: '', component: LayoutComponent},
  {path: '', component: LandingpageComponent},
  {path: 'projects', component: MoviesListComponent},
  {path: 'blog', component: BlogsComponent},
  {path: 'about', component: AboutUsComponent},

  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupComponent},

  {path: 'manageMovies', component: ManageMoviesComponent, canActivate: [AuthGuard]},
  {path: 'createMovie', component: CreateMovieComponent, canActivate: [AuthGuard]},
  {path: 'editMovie/:movieid', component: EditMovieComponent, canActivate: [AuthGuard]},

  {path: 'manageBlogs', component: BlogsListComponent, canActivate: [AuthGuard]},
  {path: 'createBlog', component: CreateBlogComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
