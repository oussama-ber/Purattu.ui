export class Movie {
  public id: string = '';
  public title: string = '';
  public story: string = '';
  public director: string = '';

  public coProducer: string [] = [];
  public writer: string = '';
  public associateProducer: string [] = [];
  public cast: string [] = [];
  public contriesOfOrigin: string [] = [];
  public dop: string = '';
  public releaseDate: number = 0;
  public music: string = '';
  public runningTime: number = 0;
  public producer: string[] = [];
  public awards: string [] = [];
  public awardsUrls: string[] = [];
  public status: string = '';
  public imagePath: string = '';
  public imageUrl: string = '';
}
export class CreateMovieDTO extends Movie {
  public imageFile!: File;
  // public category: string = ''; // to ask
}
export class UpdateMovieDTO {
  public title: string = '';
  public story: string = '';
  public director: string = '';
  public coProducer: string [] = [];
  public associateProducer: string []= [];
  public writer: string = '';
  public cast: string [] = [];
  public contriesOfOrigin: string [] = [];
  public dop: string = '';
  public releaseDate: number = 0;
  public music: string = '';
  public runningTime: number = 0;
  public producer: string [] = [];
  public awards: string [] = [];
  public status: string = '';
}
export class UpdateMovieWithFileDTO extends UpdateMovieDTO {
  public imageFile!: File;

}

