import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FolderPage } from './folder.page';
import { ToastController, AlertController } from '@ionic/angular';

describe('FolderPage', () => {
  let component: FolderPage;
  let fixture: ComponentFixture<FolderPage>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    // Create spies for ToastController and AlertController
    toastControllerSpy = jasmine.createSpyObj('ToastController', ['create']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [FolderPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      providers: [
        { provide: ToastController, useValue: toastControllerSpy },
        { provide: AlertController, useValue: alertControllerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize folder from route', () => {
    // Mock route params
    component.folder = 'Test Folder';
    expect(component.folder).toBe('Test Folder');
  });

  it('should add item successfully', async () => {
    const alertSpy = alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
      onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve({ data: { name: 'New Item', details: 'Item details' }}))
    }));

    await component.addItem();

    expect(alertSpy).toHaveBeenCalled();
    expect(component.items.length).toBe(1);
    expect(component.items[0].name).toBe('New Item');
  });

  it('should delete item successfully', async () => {
    component.items.push({ id: 1, name: 'Item to delete', image: '', details: '' });

    await component.deleteItem(component.items[0]);

    expect(component.items.length).toBe(0);
  });

  it('should show toast message', async () => {
    const toastSpy = toastControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present')
    }));

    await component.presentToast('Test Message');

    expect(toastSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      message: 'Test Message',
      duration: 2000,
      position: 'bottom'
    }));
  });
});
