import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
  waitForAsync,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AppComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
      });

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular login'`, () => {
    expect(component.title).toEqual('angular-login');
  });

  it('should show message when clicked on forgot password', fakeAsync(() => {
    const buttonElem = fixture.nativeElement.querySelector('.forgotpass');
    const message = fixture.nativeElement.querySelector('.messages');

    spyOn(component, 'forgot'); // call the forgot method
    buttonElem.click(); //click button
    component.showMessage = true;
    component.messageText = 'Forgot password clicked!';
    fixture.detectChanges();

    expect(component.forgot).toHaveBeenCalled(); //forgot password clicked
    expect(message.textContent).toEqual('Forgot password clicked!'); //message show in dom
  }));

  it('should show message when clicked on sign up', fakeAsync(() => {
    const buttonElem = fixture.debugElement.query(By.css('a'));
    const message = fixture.nativeElement.querySelector('.messages');
    spyOn(component, 'signup');
    buttonElem.triggerEventHandler('click', null);
    component.showMessage = true;
    component.messageText = 'Sign up clicked!';
    fixture.detectChanges();

    expect(component.signup).toHaveBeenCalled(); //signup clicked
    expect(message.textContent).toEqual('Sign up clicked!'); //message show in dom
  }));

  it('should show message when clicked on login button without username or password', fakeAsync(() => {
    // const loginBtn = fixture.nativeElement.querySelector('.btn')
    const loginBtn = fixture.debugElement.query(By.css('.btn'));
    const message = fixture.nativeElement.querySelector('.messages');
    component.ngOnInit();
    loginBtn.triggerEventHandler('click', null);
    component.showMessage = true;
    component.messageText = 'You must enter a username or password';

    fixture.detectChanges();
    expect(message.textContent).toEqual(
      'You must enter a username or password'
    );
  }));

  it('should show json when clicked on login button WITH username or password', fakeAsync(() => {
    const loginBtn = fixture.debugElement.query(By.css('.btn'));
    const message = fixture.nativeElement.querySelector('.messages');
    component.ngOnInit();
    // setting form values
    component.loginForm.controls['username'].setValue('user');
    component.loginForm.controls['password'].setValue('pass');
    component.loginForm.controls['rememberMe'].setValue(true);

    const expectedObj = {
      username: 'user',
      password: 'pass',
      rememberMe: true,
    };
    loginBtn.triggerEventHandler('click', null);
    component.showLogindata = true;
    component.showMessage = false;

    fixture.detectChanges();
    expect(JSON.parse(message.textContent)).toEqual(expectedObj);
  }));
});
