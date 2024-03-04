import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CreateMovieDTO, Movie } from '../../../../models/movie.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MovieService } from '../../../../services/movie.service';
import { country } from '../../../../models/shared.models';
// import * as fileSaver from 'file-saver';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Route, Router } from '@angular/router';
import { appConstants } from '../../../../constants/storageConstants';
import { SaveMovieAwardImage } from '../../../../models/RequestOutput/saveMovieAwards.model';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss',
})
export class CreateMovieComponent implements OnInit {
  @Output() closeOuput = new EventEmitter();
  enteredTitle = '';
  enteredContent = '';
  movie: Movie = new Movie();
  isLoading = false;
  public form: FormGroup;
  imagePreview: string | undefined;
  private mode = 'create';
  private movieId: string = '';
  public moviesStatus: string[] = ['Released', 'Coming soon', 'In Development'];
  public coProducers: string[] = [];
  public casts: string[] = [];
  public contriesOfOrigin: string[] = [];
  public producers: string[] = [];
  public associateProducers: string[] = [];
  public selectedCountries: string[] = [];
  public allCountries: country[] = [];

  uploadedAwardFiles: File[] = [];
  uploadedAwardFileNames: string[] = [];
  public moviesImagesCnst: string = appConstants.MOVIESIMAGES;
  public awardsImagesCnst: string = appConstants.AWARDSIMAGES;

  public manageMovieRoute: string = appConstants.MANAGEMOVIES;

  constructor(
    private fb: FormBuilder,
    private fireStorage: AngularFireStorage,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      story: new FormControl(null, { validators: [Validators.required] }),
      director: new FormControl(null, { validators: [Validators.required] }),
      coProducer: new FormControl(null, { validators: [Validators.required] }),
      associateProducer: new FormControl(null, {
        validators: [Validators.required],
      }),
      writer: new FormControl(null, { validators: [Validators.required] }),
      cast: new FormControl(null, { validators: [Validators.required] }),
      contriesOfOrigin: new FormControl(null, {
        validators: [Validators.required],
      }),
      dop: new FormControl(null, { validators: [Validators.required] }),
      releaseDate: new FormControl(null, { validators: [Validators.required] }),
      music: new FormControl(null, { validators: [Validators.required] }),
      runningTime: new FormControl(null, { validators: [Validators.required] }),
      producer: new FormControl(null, { validators: [Validators.required] }),
      mainCast: new FormControl(null, { validators: [Validators.required] }),
      language: new FormControl(null, { validators: [Validators.required] }),
      awards: new FormControl(null, { validators: [Validators.required] }),
      status: new FormControl('Released', {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  _movieService = inject(MovieService);

  ngOnInit() {
    this.mode = 'create';
    this.movieId = '';
    this.getCountries();
  }

  getCountries() {
    this._movieService.getCountries().subscribe((res) => {
      this.allCountries = res;
    });
  }

  onAddCoProducer() {
    if (
      this.form.value.coProducer == null ||
      this.form.value.coProducer.length == 0
    ) {
      return;
    }
    this.coProducers = [...this.coProducers, this.form.value.coProducer];
    this.form.get('coProducer')?.setValue(null);
  }

  onAddCast() {
    if (this.form.value.cast == null || this.form.value.cast.length == 0) {
      return;
    }
    this.casts = [...this.casts, this.form.value.cast];
    this.form.get('cast')?.setValue(null);
  }

  onAddCoundtryOfOrigin() {
    if (
      this.form.value.contriesOfOrigin == null ||
      this.form.value.contriesOfOrigin.length == 0
    ) {
      return;
    }
    this.selectedCountries = [
      ...this.selectedCountries,
      this.form.value.contriesOfOrigin,
    ];
    this.form.get('contriesOfOrigin')?.setValue(null);
  }

  onAddCountriesOfOrigin() {
    if (
      this.form.value.contriesOfOrigin == null ||
      this.form.value.contriesOfOrigin.length == 0
    ) {
      return;
    }
    this.contriesOfOrigin = [
      ...this.contriesOfOrigin,
      this.form.value.contriesOfOrigin,
    ];
    this.form.get('contriesOfOrigin')?.setValue(null);
  }

  onAddProducers() {
    if (
      this.form.value.producer == null ||
      this.form.value.producer.length == 0
    ) {
      return;
    }
    this.producers = [...this.producers, this.form.value.producer];
    this.form.get('producer')?.setValue(null);
  }

  onAddAssociateProducer() {
    if (
      this.form.value.associateProducer == null ||
      this.form.value.associateProducer.length == 0
    ) {
      return;
    }
    this.associateProducers = [
      ...this.associateProducers,
      this.form.value.associateProducer,
    ];
    this.form.get('associateProducer')?.setValue(null);
  }

  onAddItem(listName: string) {
    switch (listName) {
      case 'coproducers':
        this.onAddCoProducer();
        break;
      case 'cast':
        this.onAddCast();
        break;
      case 'contriesOfOrigin':
        this.onAddCountriesOfOrigin();
        break;
      case 'producers':
        this.onAddProducers();
        break;
      case 'associateProducer':
        this.onAddAssociateProducer();
        break;

      default:
        break;
    }
  }

  onDeleteItem(listName: string, indexItem: number) {
    switch (listName) {
      case 'coproducers':
        this.onDeleteCoProducer(indexItem);
        break;
      case 'cast':
        this.onDeleteCast(indexItem);
        break;
      case 'contriesOfOrigin':
        this.onDeleteContriesOfOrigin(indexItem);
        break;
      case 'producers':
        this.onDeleteProducers(indexItem);
        break;
      case 'associateProducers':
        this.onDeleteAssociateProducers(indexItem);
        break;

      default:
        break;
    }
  }

  onDeleteCoProducer(indexCoProducer: number) {
    this.coProducers.splice(indexCoProducer, 1);
  }

  onDeleteCast(indexCast: number) {
    this.casts.splice(indexCast, 1);
  }

  onDeleteContriesOfOrigin(indexCountry: number) {
    this.contriesOfOrigin.splice(indexCountry, 1);
  }

  onDeleteProducers(indexProducer: number) {
    this.producers.splice(indexProducer, 1);
  }

  onDeleteAssociateProducers(indexAssociateProducer: number) {
    this.associateProducers.splice(indexAssociateProducer, 1);
  }

  onImagePicked(event: any) {
    const file = (File = event.target.files[0]);
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async onAwardImagePicked(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedAwardFileNames = [...this.uploadedAwardFileNames, file.name];
      this.uploadedAwardFiles = [...this.uploadedAwardFiles, file];
    }
  }

  deleteAwardFileItem(awardItemIndex: number) {
    this.uploadedAwardFileNames = this.uploadedAwardFileNames.filter(
      (awardFile, index) => index != awardItemIndex
    );
    this.uploadedAwardFiles = this.uploadedAwardFiles.filter(
      (awardFile, index) => index != awardItemIndex
    );
  }

  async onSaveMovie() {
    let state = 'onSavePost';
    // if (this.form.invalid) {
    //   alert('form not valid')
    //   return;
    // }
    this.isLoading = true;
    if (this.mode === 'create') {
      let createMovieDto = new CreateMovieDTO();
      createMovieDto.title = this.form.value.title;
      createMovieDto.story = this.form.value.story;
      createMovieDto.director = this.form.value.director;
      createMovieDto.coProducer = this.coProducers;
      createMovieDto.writer = this.form.value.writer;
      createMovieDto.associateProducer = this.associateProducers;
      createMovieDto.cast = this.casts;
      createMovieDto.contriesOfOrigin = this.contriesOfOrigin;
      createMovieDto.dop = this.form.value.dop;
      createMovieDto.releaseDate = this.form.value.releaseDate;
      createMovieDto.music = this.form.value.music;
      createMovieDto.runningTime = this.form.value.runningTime;
      createMovieDto.producer = this.producers;
      createMovieDto.awards = this.form.value.awards;
      createMovieDto.status = this.form.value.status;
      // createMovieDto.imageFile = this.form.value.image;

      await this._movieService
        .insertMovie(createMovieDto)
        .subscribe(async (res) => {
          this.isLoading = false;
          if (this.form.value.image != null) {
            //insert movie poster into firebase and update the image url on our db
            let movieImgPath = `${this.moviesImagesCnst}/${this.form.value.image.name}`;
            let copyMovieImgPath = movieImgPath;
            copyMovieImgPath = copyMovieImgPath + new Date();
            const uploadTask = await this.fireStorage.upload(
              copyMovieImgPath,
              this.form.value.image
            );
            const url = await uploadTask.ref.getDownloadURL();

            await this._movieService
              .insertMovieImage(res.createdMovieId, url)
              .subscribe(async (rs) => {
                if (this.uploadedAwardFiles.length > 0) {
                  let createAwardImageUrls: string[] = [];
                  for ( let awardFileIndex = 0; awardFileIndex < this.uploadedAwardFiles.length; awardFileIndex++) {
                    const awardFileName = this.uploadedAwardFiles[awardFileIndex].name;
                    let path = `${this.awardsImagesCnst}/${awardFileName}`;
                    let copyAwardPath = path;
                    copyAwardPath = copyAwardPath + new Date();
                    const uploadTask = await this.fireStorage.upload(copyAwardPath, this.uploadedAwardFiles[awardFileIndex]);
                    const url = await uploadTask.ref.getDownloadURL();
                    createAwardImageUrls = [...createAwardImageUrls, url];
                  }
                  let createMovieImages = new SaveMovieAwardImage(res.createdMovieId, createAwardImageUrls);
                  await this._movieService.saveMovieAwardImage(createMovieImages).subscribe(
                    (saveMovieAwardImageResponse) => {
                      console.log(saveMovieAwardImageResponse);
                    },
                    (error) => {
                      console.log('something went wrong', error);
                    }
                  );
                } else {
                  this.closeComponent();
                }
              });
          } else {
            this.closeComponent();
          }
        });
    } else {
    }
  }

  closeComponent() {
    this.form.reset();
    this.router.navigate([`/${this.manageMovieRoute}`]);
  }

  onCancel() {
    this.closeOuput.emit({});
  }

  onResetArrays() {
    this.coProducers = [];
    this.associateProducers = [];
    this.casts = [];
    this.contriesOfOrigin = [];
    this.producers = [];
  }

}
