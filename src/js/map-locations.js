function aptnumsearch() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('aptnums');
    filter = input.value.toUpperCase();
    ul = document.getElementById("aptUL");
    li = ul.getElementsByTagName('li');
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (filter !== "" && txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "block";
      } else {
        li[i].style.display = "none";
      }
    }
  }

 function showapt0() {
    document.getElementById("cyberia-map").style.display = "none",
    document.getElementById("showapt0").style.display = "block"
    document.getElementById("showapt1").style.display = "none"
 }
 function showapt1() {
  document.getElementById("cyberia-map").style.display = "none",
  document.getElementById("showapt1").style.display = "block"
  document.getElementById("showapt0").style.display = "none"
}
 


