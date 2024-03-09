import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../../services/movie.service';
import { Movie, UpdateMovieDTO, UpdateMovieWithFileDTO } from '../../../../models/movie.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { appConstants } from '../../../../constants/storageConstants';
import { SaveMovieAwardImage } from '../../../../models/RequestOutput/saveMovieAwards.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss',
})
export class EditMovieComponent implements OnInit {
  //#region variables
  private routeSub: Subscription;
  currentMovie: Movie = new Movie();
  currentMovieId: string = '';
  imagePreview: string = '';
  public awards: string [] = [];
  public updateMovieform!: FormGroup;

  public producers: string[] = [];
  public coProducers: string [] = [];
  public associateProducers: string [] = [];
  public casts: string [] = [];
  public contriesOfOrigins: string [] = [];
  public moviesStatus: string[] = ['Released', 'Coming soon', 'In Development'];
  public uploadedAwardFilesUrls: string[] = [];

  public uploadedAwardFilesUrlsToDelete: string[] = [];
  public uploadedAwardFilesUrlsToAdd: File[] = [];
  public updatedAwardUrls: string[] = [];
  //constants
  public moviesImagesCnst: string = appConstants.MOVIESIMAGES;
  public awardsImagesCnst: string = appConstants.AWARDSIMAGES;
  public manageMovieRoute: string = appConstants.MANAGEMOVIES;
  //#endregion variables

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private fireStorage:AngularFireStorage, private router: Router) {
    this.buildForm();
    this.routeSub = this.route.params.subscribe(async (params) => {
      this.currentMovieId = params['movieid'];
      await this.getMovie(this.currentMovieId);
    });
  }
  _movieService = inject(MovieService);

  async ngOnInit(): Promise<void> {

  }

  async getMovie(movieId: string) {
    await this._movieService.getMovie(movieId).subscribe(async (res) => {
      this.currentMovie = res.movie;

      this.coProducers = this.currentMovie.coProducer
      this.associateProducers = this.currentMovie.associateProducer;
      this.contriesOfOrigins = this.currentMovie.contriesOfOrigin;
      this.casts = this.currentMovie.cast;
      this.producers = this.currentMovie.producer;
      this.uploadedAwardFilesUrls = this.currentMovie.awardsUrls;
      this.updatedAwardUrls = this.currentMovie.awardsUrls;
      this.setFormValues(this.currentMovie);

    });
  }

  setFormValues(currentMovie: Movie) {

    this.imagePreview = currentMovie.imagePath;
    this.updateMovieform.setValue({
      title: currentMovie.title,
      story: currentMovie.story,
      director: currentMovie.director,
      // coProducer: currentMovie.coProducer?.toString(),
      coProducer: '',
      // associateProducer: currentMovie.associateProducer?.toString(),
      associateProducer: '',
      writer: currentMovie.writer,
      // cast: currentMovie.cast?.toString(),
      cast: '',
      // contriesOfOrigin: currentMovie.contriesOfOrigin?.toString(),
      contriesOfOrigin: '',
      dop: currentMovie.dop,
      releaseDate: currentMovie.releaseDate,
      music: currentMovie.music,
      runningTime: currentMovie.runningTime,
      // producer: currentMovie.producer?.toString(),
      producer: '',
      status: currentMovie.status,
      // awards: currentMovie.awards?.toString(),
      awards: '',
      imagePath: currentMovie.imagePath,
      image: null
    });
  }

  buildForm() {
    this.updateMovieform = this.fb.group({
      title: new FormControl('', { validators: [Validators.required] }),
      story: new FormControl('', { validators: [Validators.required] }),
      director: new FormControl('', { validators: [Validators.required] }),
      coProducer: new FormControl('', { validators: [Validators.required] }),
      associateProducer: new FormControl('', { validators: [Validators.required] }),
      writer: new FormControl('', { validators: [Validators.required] }),
      cast: new FormControl('', { validators: [Validators.required] }),
      contriesOfOrigin: new FormControl('', { validators: [Validators.required] }),
      dop: new FormControl('', { validators: [Validators.required] }),
      releaseDate: new FormControl('', { validators: [Validators.required] }),
      music: new FormControl('', { validators: [Validators.required] }),
      runningTime: new FormControl('', { validators: [Validators.required] }),
      producer: new FormControl('', { validators: [Validators.required] }),
      awards: new FormControl('', { validators: [Validators.required] }),
      status: new FormControl('', { validators: [Validators.required] }),
      imagePath: new FormControl(this.currentMovie.imagePath),
      image: new FormControl(null),
    });
  }

  async onUpdateMovie() {
    const movietoUpdate: UpdateMovieWithFileDTO = new UpdateMovieWithFileDTO();
    movietoUpdate.title = this.updateMovieform.value.title;
    movietoUpdate.story = this.updateMovieform.value.story;
    movietoUpdate.director = this.updateMovieform.value.director;
    movietoUpdate.coProducer = this.coProducers;
    movietoUpdate.associateProducer = this.associateProducers;
    movietoUpdate.writer = this.updateMovieform.value.writer;
    movietoUpdate.cast = this.casts;
    movietoUpdate.contriesOfOrigin = this.contriesOfOrigins;
    movietoUpdate.dop = this.updateMovieform.value.dop;
    movietoUpdate.releaseDate = this.updateMovieform.value.releaseDate;
    movietoUpdate.music = this.updateMovieform.value.music;
    movietoUpdate.runningTime = this.updateMovieform.value.runningTime;
    movietoUpdate.producer = this.updateMovieform.value.runningTime;
    movietoUpdate.awards = this.awards;
    movietoUpdate.status = this.updateMovieform.value.status;
    await this._movieService.updateMovie(this.currentMovieId ,movietoUpdate).subscribe(async res=>{
        if(this.updateMovieform.value.image != null && this.currentMovie.imagePath.length > 0 ){
          let exsitingImageTask = await this.fireStorage.refFromURL(this.currentMovie.imagePath);
          exsitingImageTask.delete().subscribe(async () =>  {
              let movieImgPath = `${this.moviesImagesCnst}/${this.updateMovieform.value.image.name}`;
              let copyMovieImgPath = movieImgPath;
              copyMovieImgPath = copyMovieImgPath + new Date();
              const uploadTask = await this.fireStorage.upload(copyMovieImgPath, this.updateMovieform.value.image);
              const url = await uploadTask.ref.getDownloadURL()
              await this._movieService.insertMovieImage(res.updatedMovieId, url).subscribe(async (rs)=>{

              });
          });
        }
        if(this.uploadedAwardFilesUrlsToDelete.length > 0 || this.uploadedAwardFilesUrlsToAdd.length > 0){
          await this.deleteMovieAwardFirebaseStorage();
          await this.addMovieAwardFileBaseStorage();
          await this.addMovieAward();
        }else{
          await this.onCloseComponent();

        }
    });
    // await this.onCloseComponent();
  }

  async deleteMovieAwardFirebaseStorage(){
    if(this.uploadedAwardFilesUrlsToDelete.length > 0){
      //delete awards from file storage
      for (let awardToDeleteIndex = 0; awardToDeleteIndex < this.uploadedAwardFilesUrlsToDelete.length; awardToDeleteIndex++) {
        let exsitingImageTask = await this.fireStorage.refFromURL(this.uploadedAwardFilesUrlsToDelete[awardToDeleteIndex]);
        await exsitingImageTask.delete().subscribe(async (storageResponse) => {
        });
      }
    }
  }

  async addMovieAwardFileBaseStorage(){
    if (this.uploadedAwardFilesUrlsToAdd.length > 0) {
      //add award to file storage
      for (let awardToAddIndex = 0; awardToAddIndex < this.uploadedAwardFilesUrlsToAdd.length; awardToAddIndex++) {
        let awardImgPath = `${this.awardsImagesCnst}/${this.uploadedAwardFilesUrlsToAdd[awardToAddIndex].name}`;
        let copyAwardImgPath = awardImgPath;
        copyAwardImgPath = copyAwardImgPath + new Date();
        const uploadTask = await this.fireStorage.upload(copyAwardImgPath, this.uploadedAwardFilesUrlsToAdd[awardToAddIndex]);
        const url = await uploadTask.ref.getDownloadURL();
        this.updatedAwardUrls.push(url);
      }

    }
  }

  async addMovieAward(){
    let saveMovieAwardImage = new  SaveMovieAwardImage(this.currentMovieId, this.updatedAwardUrls);
    this._movieService.saveMovieAwardImage(saveMovieAwardImage).subscribe((updateMovieAwards)=>{
      this.onCloseComponent();
    })
  }

  onImagePicked(event: any) {
    const file = (File = event.target.files[0]);
    this.updateMovieform.patchValue({ image: file });
    this.updateMovieform.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async onAwardImagePicked(event: any) {
    const file = event.target.files[0];
    if (file) {
      const file = (File = event.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedAwardFilesUrlsToAdd = [...this.uploadedAwardFilesUrlsToAdd, file];
        this.uploadedAwardFilesUrls= [...this.uploadedAwardFilesUrls, reader.result as string];
      };
      reader.readAsDataURL(file);
    }
  }

  onDeleteAwardImg(fileUrlIndex: number, fileUrl: string){
    let awardImgToDelete : string = this.uploadedAwardFilesUrls[fileUrlIndex];
    if(awardImgToDelete.includes('https://firebasestorage')){
      this.uploadedAwardFilesUrlsToDelete = [...this.uploadedAwardFilesUrlsToDelete, ...this.uploadedAwardFilesUrls.filter((el, index)=> index == fileUrlIndex)];
      this.updatedAwardUrls = this.updatedAwardUrls.filter((el)=> el != fileUrl);
    }
    this.uploadedAwardFilesUrls = this.uploadedAwardFilesUrls.filter((el, index)=> index != fileUrlIndex);

  }

  onCloseComponent(){
    this.onResetArrays();
    this.router.navigate([`/${this.manageMovieRoute}`]);
  }

  onResetArrays(){
    this.coProducers = [];
    this.associateProducers = [];
    this.casts = [];
    this.contriesOfOrigins = [];
    this.producers = [];
    this.awards = [];
    this.uploadedAwardFilesUrlsToDelete = [];
    this.uploadedAwardFilesUrlsToAdd = [];
    this.updatedAwardUrls = [];
    this.updateMovieform.reset();
  }

  onAddItem(listName: string){
    switch (listName) {
      case "coproducers":
        this.onAddCoProducer();
        break;
      case "cast":
        this.onAddCast();
        break;
      case "contriesOfOrigin":
        this.onAddCoundtryOfOrigin();
        break;
      case "producers":
        this.onAddProducers();
        break;
      case "associateProducer":
        this.onAddAssociateProducer();
        break;

      default:
        break;
    }

  }

  onDeleteItem(listName: string, indexItem: number){
    switch (listName) {
      case "coproducers":
        this.onDeleteCoProducer(indexItem);
        break;
      case "cast":
        this.onDeleteCast(indexItem);
        break;
      case "contriesOfOrigin":
        this.onDeleteContriesOfOrigin(indexItem);
        break;
      case "producers":
        this.onDeleteProducers(indexItem);
        break;
      case "associateProducers":
        this.onDeleteAssociateProducers(indexItem);
        break;

      default:
        break;
    }
  }

  onAddCoProducer(){
    if(this.updateMovieform.value.coProducer == null || this.updateMovieform.value.coProducer.length == 0){
      return
    }
    this.coProducers = [...this.coProducers, this.updateMovieform.value.coProducer]
    this.updateMovieform.get('coProducer')?.setValue(null);
  }

  onAddCast(){
    if(this.updateMovieform.value.cast == null || this.updateMovieform.value.cast.length == 0){
      return;
    }
    this.casts = [...this.casts, this.updateMovieform.value.cast]
    this.updateMovieform.get('cast')?.setValue(null);
  }

  onAddCoundtryOfOrigin(){
    if(this.updateMovieform.value.contriesOfOrigin == null || this.updateMovieform.value.contriesOfOrigin.length == 0){
      return
    }
    this.contriesOfOrigins = [...this.contriesOfOrigins, this.updateMovieform.value.contriesOfOrigin]
    this.updateMovieform.get('contriesOfOrigin')?.setValue(null);
  }

  onAddProducers(){
    if(this.updateMovieform.value.producer == null || this.updateMovieform.value.producer.length == 0){
      return
    }
    this.producers = [...this.producers, this.updateMovieform.value.producer]
    this.updateMovieform.get('producer')?.setValue(null);
  }

  onAddAssociateProducer(){
    if(this.updateMovieform.value.associateProducer == null || this.updateMovieform.value.associateProducer.length == 0){
      return
    }
    this.associateProducers = [...this.associateProducers, this.updateMovieform.value.associateProducer]
    this.updateMovieform.get('associateProducer')?.setValue(null);
  }

  onDeleteCoProducer(indexCoProducer: number){
    this.coProducers.splice(indexCoProducer, 1);
  }

  onDeleteCast(indexCast: number){
    this.casts.splice(indexCast, 1);
  }

  onDeleteContriesOfOrigin(indexCountry: number){
    this.contriesOfOrigins.splice(indexCountry, 1);
  }

  onDeleteProducers(indexProducer: number){
    this.producers.splice(indexProducer, 1);
  }

  onDeleteAssociateProducers(indexAssociateProducer: number){
    this.associateProducers.splice(indexAssociateProducer, 1);
  }


}
