function sendMail(){
  let parms = {
    name : document.getElementById("name").value,
    message : document.getElementById("message").value
  }

  emailjs.send("service_h8n4lsw", "template_1pi2m8k", parms).then(alert("Email Sent!"))
}
