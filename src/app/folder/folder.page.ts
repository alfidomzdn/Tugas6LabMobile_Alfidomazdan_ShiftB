import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public items: { id: number; name: string; image: string; details: string }[] = [];
  private activatedRoute = inject(ActivatedRoute);
  private toastController = inject(ToastController);
  private alertController = inject(AlertController);
  private nextId = 1; // Unique ID counter for items

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  // Method to handle image selection
  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string; // URL of the uploaded image
        // Add item with the uploaded image
        this.items.push({
          id: this.nextId++,
          name: file.name,
          image: imageUrl,
          details: 'Uploaded image'
        });
      };
      reader.readAsDataURL(file); // Convert the image to a base64 URL
    }
  }

  // Method to Add New Item
  async addItem() {
    const alert = await this.alertController.create({
      header: 'Add Item',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Enter item name' },
        { name: 'details', type: 'textarea', placeholder: 'Enter item details' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
            if (data.name && data.details) {
              this.items.push({
                id: this.nextId++, 
                name: data.name, 
                image: '',  // Assuming image can be optional
                details: data.details
              });
              this.presentToast('Item added successfully');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Method to Edit Existing Item
  async editItem(item: { id: number; name: string; image: string; details: string }) {
    const alert = await this.alertController.create({
      header: 'Edit Item',
      inputs: [
        { name: 'name', type: 'text', value: item.name, placeholder: 'Edit item name' },
        { name: 'image', type: 'url', value: item.image, placeholder: 'Edit image URL' },
        { name: 'details', type: 'textarea', value: item.details, placeholder: 'Edit item details' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            if (data.name && data.details) {
              item.name = data.name;
              item.image = data.image; // Use updated image from the input
              item.details = data.details;
              this.presentToast('Item updated successfully');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Method to Delete Item
  async deleteItem(item: { id: number; name: string }) {
    const alert = await this.alertController.create({
      header: 'Delete Item',
      message: `Are you sure you want to delete ${item.name}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            this.items = this.items.filter((i) => i.id !== item.id);
            this.presentToast('Item deleted successfully');
          },
        },
      ],
    });
    await alert.present();
  }

  // Show Toast Message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  // Show Alert Message
  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important Notice',
      message: 'This is an alert message.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Display Info Toast
  async showToast() {
    const toast = await this.toastController.create({
      message: 'This is an informative toast!',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
