export class Blog {
  public id: string = '';
  public title: string = '';
  public description: string = '';
  public status: string = '';

  public tag: string = '';

  public createdBy: string = '';
  public createdDate: Date = new Date();
  public updatedBy: string = '';
  public updatedDate: Date = new Date();

  public imagePath: string = '';
}
export class CreateBlogDTO extends Blog {
  public imageFile!: File;
}
export class UpdateBlogDTO {
  public title: string = '';
  public story: string = '';
  public director: string = '';
  public mainCast: string [] = [];
  public language: string = '';
  public awards: string [] = [];
  public status: string = '';
}
export class UpdateBlogWithFileDTO extends UpdateBlogDTO {
  public imageFile!: File;
}

