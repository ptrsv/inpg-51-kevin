let janjian = new Promise((resolve, reject) => {
  console.log("Janji dimulai")
  
  setTimeout(() => {
    // sebuah / serangkaian proses yang dikerjakan
    let isSuccess = true

    // jika hasil proses nya berhasil, maka panggil resolve
    // dan panggil rejek jika sebaliknya
    if (isSuccess) {
      resolve([200, '>> PROSES BERHASIL'])
    } else {
      reject('!! PROSES GAGAL')
    }
  }, 2000)
})

janjian
  .then(response => `Kode ${response[0]}, ${response[1]}`)
  .then(res => {
    console.log(res)
    throw('!! something happen')
  })
  .catch(error => { console.error(error) })