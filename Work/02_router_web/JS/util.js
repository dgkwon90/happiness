var current_page_aricle_link;
var current_menu_name="basic";

function select_menu_set_color(new_menu_name) {
  var old_menu_name = current_menu_name;
  //old black.
  document.getElementById("menu_"+old_menu_name).style.borderBottomColor="black";
  //new red
  document.getElementById("menu_"+new_menu_name).style.borderBottomColor="red";
}

function newImportHtmlFile(httpFilePath, saveContentID) {
  var new_link=document.createElement('link');
  new_link.rel='import';
  new_link.href=httpFilePath;
  new_link.onload=function(e) {
    var loadNode = new_link.import.querySelector("html");
    var viewNode = document.querySelector(saveContentID);
    viewNode.appendChild(loadNode.cloneNode(true));
    if(saveContentID == "#page-article")
    {
        select_menu_set_color(current_menu_name);
        current_page_aricle_link = new_link;
    }
  };
  document.head.appendChild(new_link);
}

function reImportHtmlFile(new_menu_name, page_name, saveContentID) {
  document.head.removeChild(current_page_aricle_link);
  var httpFilePath = "/Work/02_router_web/"+new_menu_name+"-"+page_name+".html";
  var new_link=document.createElement('link');
  new_link.rel='import';
  new_link.href=httpFilePath;

  new_link.onload=function(e) {
    var newNode = new_link.import.querySelector("html");
    var viewNode = document.querySelector(saveContentID);

    while(viewNode.firstChild) {
          viewNode.removeChild(viewNode.firstChild);
    }
    viewNode.appendChild(newNode.cloneNode(true));
    select_menu_set_color(new_menu_name);
    current_menu_name = new_menu_name;
    current_page_aricle_link = new_link;
  };
  document.head.appendChild(new_link);

}
