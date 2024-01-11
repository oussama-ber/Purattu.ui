export class Movie {
  public id: string = '';
  public title: string = '';
  public story: string = '';
  public director: string = '';
  public mainCast: string [] = [];
  public language: string = '';
  public awards: string [] = [];
  public status: string = '';
  public imagePath: string = '';
  // public category: string = ''; // to ask
}
export class CreateMovieDTO extends Movie {
  public imageFile!: File;
  // public category: string = ''; // to ask
}
export class UpdateMovieDTO {
  public title: string = '';
  public story: string = '';
  public director: string = '';
  public mainCast: string [] = [];
  public language: string = '';
  public awards: string [] = [];
  public status: string = '';
}
export class UpdateMovieWithFileDTO extends UpdateMovieDTO {
  public imageFile!: File;

}

