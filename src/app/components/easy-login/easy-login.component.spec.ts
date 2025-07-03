import { EasyLoginComponent } from './easy-login.component';

describe('EasyLoginComponent', () => {
  let component: EasyLoginComponent;
  let fixture: ComponentFixture<EasyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EasyLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
