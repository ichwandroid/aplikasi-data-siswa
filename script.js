// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqbNiMv_9kJJdAhG_l7VsFnV2vvYGduck",
  authDomain: "cekdatasiswa.firebaseapp.com",
  projectId: "cekdatasiswa",
  storageBucket: "cekdatasiswa.firebasestorage.app",
  messagingSenderId: "634921873681",
  appId: "1:634921873681:web:dffcf034256eb463e8dcb0"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById("form");
const namaInput = document.getElementById("nama");
const umurInput = document.getElementById("umur");
const dataList = document.getElementById("data-list");

// Tambah Data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = namaInput.value;
  const umur = parseInt(umurInput.value);

  db.collection("users").add({ nama, umur }).then(() => {
    form.reset();
    loadData();
  });
});

// Tampilkan Data
function loadData() {
  dataList.innerHTML = "";
  db.collection("users").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `
        ${data.nama} (${data.umur} tahun)
        <button onclick="hapusData('${doc.id}')">Hapus</button>
        <button onclick="editData('${doc.id}', '${data.nama}', ${data.umur})">Edit</button>
      `;
      dataList.appendChild(li);
    });
  });
}

// Hapus Data
function hapusData(id) {
  db.collection("users").doc(id).delete().then(loadData);
}

// Edit Data
function editData(id, namaLama, umurLama) {
  const namaBaru = prompt("Nama baru:", namaLama);
  const umurBaru = prompt("Umur baru:", umurLama);

  if (namaBaru !== null && umurBaru !== null) {
    db.collection("users").doc(id).update({
      nama: namaBaru,
      umur: parseInt(umurBaru)
    }).then(loadData);
  }
}

loadData(); // pertama kali dijalankan
