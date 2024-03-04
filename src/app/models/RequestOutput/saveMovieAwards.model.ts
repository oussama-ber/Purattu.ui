export class SaveMovieAwardImage{
  constructor(movieId: string, awardImageUrls: string[] ){
    this.movieId = movieId;
    this.awardImageUrls = awardImageUrls;
  }
  movieId: string = '';
  awardImageUrls: string [] = [];
}
