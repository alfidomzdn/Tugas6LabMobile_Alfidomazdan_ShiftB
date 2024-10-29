Nama : Alfido Mazdan Marsyadi 
NIM  : H1D022084
Shift B 
## Penjelasan
Membuat Komponen Visual di Halaman (HTML):

Di file template (folder.page.html), kamu bisa menambahkan komponen-komponen Ionic seperti <ion-card>, <ion-list>, <ion-item>, dll., dan menyesuaikan propertinya.
Pada contoh di atas, komponen-komponen ini digunakan untuk menampilkan informasi ion-card dan list ion-list yang berisi ion-item dengan thumbnail, tombol edit, dan delete di slot start dan end.
Gunakan atribut dan binding Angular seperti *ngFor, [slot], [src], dll., untuk mengontrol tampilan dan data dari komponen.
Pengaturan Gaya (CSS):

Tambahkan gaya di file SCSS (folder.page.scss) untuk mengubah tampilan komponen.
Di sini, kamu bisa menggunakan ID atau kelas CSS untuk memodifikasi warna, padding, bayangan, border-radius, dan animasi seperti hover.
Contoh di atas menggunakan #container dan ion-card untuk mengatur padding, warna latar belakang, warna teks, dan efek hover pada ion-item.
Mengelola Logika di Komponen (TypeScript):

Di file folder.page.ts, buat fungsi yang menangani aksi pengguna, seperti addItem(), editItem(), dan deleteItem().
Gunakan Angular Dependency Injection untuk memanfaatkan layanan seperti ToastController dan AlertController dari Ionic.
Pastikan kamu menginisialisasi variabel yang diperlukan, seperti items, untuk menyimpan daftar item yang akan ditampilkan, serta nextId sebagai penghitung ID unik untuk item baru.
Menghubungkan Event dengan Fungsi TypeScript:

Di dalam template, gunakan binding Angular (click) untuk menghubungkan tombol dengan fungsi di file TypeScript.
Misalnya, <ion-button (click)="addItem()"> akan memanggil fungsi addItem() ketika tombol diklik.
Mengatur Aksi Lanjutan (Seperti Toast dan Alert):

Dalam fungsi addItem, editItem, dan deleteItem, gunakan AlertController untuk menampilkan dialog input atau konfirmasi.
Fungsi presentToast dan showToast dipakai untuk menampilkan pesan kepada pengguna melalui toast notifikasi.
![Cuplikan layar 2024-10-29 201750](https://github.com/user-attachments/assets/2a9b636e-72c4-4ee9-bb75-11923038bfcd)
![Cuplikan layar 2024-10-29 201735](https://github.com/user-attachments/assets/653c27ba-09ad-43c6-bb54-6f09ff1a7691)
![Cuplikan layar 2024-10-29 201650](https://github.com/user-attachments/assets/b155b0f3-4305-4501-b123-b4bae4ae2921)
