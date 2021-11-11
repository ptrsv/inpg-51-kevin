// const tampil = bil => {
//   console.log("hasil perhitungan adalah", bil)
// }

// const jumlah = (angka1, angka2, fn) => {
//   let hasil = angka1 + angka2
//   fn(hasil)
// }

// jumlah(10, 20, tampil)

console.log("1")

function cetakDua(callback1, callback2) {
  setTimeout(() => {
    console.log("2")
    callback1(callback2)
  }, 500)
}

function cetakTiga(callback) {
  setTimeout(() => {
    console.log("3")
    callback()
  }, 1000)
}

const cetakEmpat = () => {
  console.log("4")
}

cetakDua(cetakTiga, cetakEmpat)