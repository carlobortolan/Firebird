const MAX_ITEMS = 5;

function sorter(array) {
  return Object.keys(array).sort((a, b) => {
    return array[a] <= array[b];
  });
}

function addElements(element, array, callback) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }

  for (let i=0; i < array.length; i++) {
    if (i >= MAX_ITEMS) {
      break;
    }

    const listItem = document.createElement("li");
    listItem.textContent = callback(array[i]);
    element.appendChild(listItem);
  }
}

let gettingStoredStats = browser.storage.local.get();
gettingStoredStats.then(results => {
  if (results.type.length === 0 || results.host.length === 0) {
    return;
  }

  let hostElement = document.getElementById("hosts");
  let sortedHosts = sorter(results.host);
  addElements(hostElement, sortedHosts, (host) => {
    return `${host}: ${results.host[host]} visit(s)`;
  });

  let typeElement = document.getElementById("types");
  let sortedTypes = sorter(results.type);
  addElements(typeElement, sortedTypes, (type) => {
    return `${type}: ${results.type[type]} use(s)`;
  });

});


function showStats(tabs) {
    //get the first tab object in the array
    let tab = tabs.pop();
  
    //get all cookies in the domain
    let gettingAllCookies = browser.cookies.getAll({url: tab.url});
    gettingAllCookies.then((cookies) => {
  
      //set the header of the panel
      let activeTabUrl = document.getElementById('cookie-title');
      let text = document.createTextNode("Cookies at: "+tab.title);
      let cookieList = document.getElementById('cookie-list');
      activeTabUrl.appendChild(text);
  
      if (cookies.length > 0) {
        //add an <li> item with the name and value of the cookie to the list
        for (let cookie of cookies) {
          let li = document.createElement("li");
          let content = document.createTextNode(cookie.name + ": "+ cookie.value);
          li.appendChild(content);
          cookieList.appendChild(li);
        }
      } else {
        let p = document.createElement("p");
        let content = document.createTextNode("No cookies in this tab.");
        let parent = cookieList.parentNode;
  
        p.appendChild(content);
        parent.appendChild(p);
      }
    });
  }
  
  //get active tab to run an callback function.
  //it sends to our callback an array of tab objects
  function getActiveTab() {
    return browser.tabs.query({currentWindow: true, active: true});
  }
  getActiveTab().then(showStats);
  