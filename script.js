function generateVCardV4() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const organisation = document.getElementById("organisation").value.trim();
    const role = document.getElementById("role").value.trim();
    const url = document.getElementById("url").value.trim();

    const vcard = [
      "BEGIN:VCARD",
      "VERSION:4.0",
      `FN:${name}`
    ];

    if(phone) vcard.push(`TEL:${phone}`);
    if(email) vcard.push(`EMAIL:${email}`);
    if(address) vcard.push(`ADR:${address}`);
    if(organisation) vcard.push(`ORG:${organisation}`);
    if(role) vcard.push(`TITLE:${role}`);
    if(url) vcard.push(`URL:${url}`);

    vcard.push("END:VCARD");
    return vcard.join("\r\n");
}


function downloadAsPNG() {
  const fieldValue = document.getElementById("name").value.trim();
    if (!fieldValue) {
      alert("Name field is mandatory");
    }
    else {
      const vcard = generateVCardV4();
      console.log(vcard);
      var svgNode = new QRCode({msg:vcard,dim:1024});
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgNode);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image = new Image();

      image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const link = document.createElement("a");
        link.download = "vcard.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      image.src = "data:image/svg+xml;base64," + btoa(svgString);
    }
}
function downloadAsSVG() {
  if (!document.getElementById("name").value.trim()) {
    alert("Name field is mandatory");
    return;
  }
  const vcardData = generateVCardV4();
  const qrElement = new QRCode({ msg: vcardData, dim: 1024 });
  const svgContent = new XMLSerializer().serializeToString(qrElement);
  const blob = new Blob([svgContent], { type: "image/svg+xml" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "vcard.svg";
  link.click();
  URL.revokeObjectURL(link.href);
}

