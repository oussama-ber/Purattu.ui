export class Blog {
  public id: string = '';
  public title: string = '';
  public description: string = '';
  public link: string = '';
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
  public description: string = '';
  public link: string = '';
  public createdby: string = '';
}
export class UpdateBlogWithFileDTO extends UpdateBlogDTO {
  public imageFile!: File;
}

