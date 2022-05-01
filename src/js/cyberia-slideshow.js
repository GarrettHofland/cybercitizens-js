const showsmallestate = () => {
  document.getElementById("first").style.display = "block";
  document.getElementById("second").style.display = "none";
  document.getElementById("third").style.display = "none";
  document.getElementById("fourth").style.display = "none";
};

const showmediumestate = () => {
  document.getElementById("second").style.display = "block";
  document.getElementById("first").style.display = "none";
  document.getElementById("third").style.display = "none";
  document.getElementById("fourth").style.display = "none";
};

const showlargeestate = () => {
  document.getElementById("third").style.display = "block";
  document.getElementById("first").style.display = "none";
  document.getElementById("second").style.display = "none";
  document.getElementById("fourth").style.display = "none";
};
const showpenthouse = () => {
  document.getElementById("first").style.display = "none";
  document.getElementById("second").style.display = "none";
  document.getElementById("third").style.display = "none";
  document.getElementById("fourth").style.display = "block";
};
