let urls = ['https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'];

document.querySelector('button').onclick = async () => {
  let promises = urls.map(async url => {
    let res = await fetch(url);
    let blob = await res.blob();
    return blob;
  });
  let res = await Promise.all(promises);
  let zip = new JSZip();
  res.forEach((blob, i) => {
    zip.file(i + '.jpg', blob);
  });
  let zipFile = await zip.generateAsync({ type: 'blob' });
  downloadFile(zipFile);
};

function downloadFile(file) {
  let url = URL.createObjectURL(file),
      a = document.createElement('a');
  a.href = url;
  a.download = 'images.zip';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}