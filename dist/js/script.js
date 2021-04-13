console.log("hejjjj");

// ---------------------- SELECTORS FROM DOM ---------------------- //
const loginFormContainer = document.querySelector(".login-template");
const loggedInContainer = document.querySelector(".logged-in");

// ---------------------- Global Saved Themes Array ---------------------- //
//Initialize new empty array
let savedThemes = [];

//Check local storage in case there are themes saved
if (JSON.parse(localStorage.getItem("keySavedThemes"))) {
  //If there are themes , update global array
  savedThemes = JSON.parse(localStorage.getItem("keySavedThemes"));
} else {
  //Do nothing
  console.log("No themes saved");
}

// ----------------------  MY object array users ---------------------- //
let userDB = [
  { username: "anna", password: "admin" },
  { username: "kalle", password: "admin" },
  { username: "janne", password: "admin" },
];

// ---------------------- a databas where i have an object With "styles"-------- //
let themeDB = [
  {
    name: "theme-grey", // name:"theme-gray "is for comparison with the class on li in tamplate..
    TitelColor: "rgb(255, 255, 255)",
    backgroundColor: "rgb(36, 37, 37)",
    asideBackground: "rgb(92, 92, 92)",
    btnStyle: { btnBackgroundColor: "lightgrey", btnTextColor: "white" },
  },
  {
    name: "theme-blue",
    TitelColor: "rgb(248, 248, 250)",
    backgroundColor: "#006E8F",
    asideBackground: "rgb(91, 151, 151)",
    btnStyle: { btnBackgroundColor: "#28527a", btnTextColor: "white" },
  },
  {
    name: "theme-gold",
    TitelColor: "#615735",
    backgroundColor: "#736002",
    asideBackground: "#D7B136",
    btnStyle: { btnBackgroundColor: "#D49D42", btnTextColor: "white" },
  },
  {
    name: "theme-green",
    TitelColor: "rgb(37, 34, 5)",
    backgroundColor: " rgb(82, 119, 67)",
    asideBackground: "rgb(44, 82, 49)",
    btnStyle: { btnBackgroundColor: "rgb(15, 43, 6)", btnTextColor: "white" },
  },
];
// ----------------------  Global Eventlistener ---------------------- //
window.addEventListener("load", () => {
  console.log("loaded");
  // run my localstorage function at "load"
  checkLocalStorage();
});

// -------- function that check my LS ... if there is nothing in LS. then I want to run my function that prints "login page" -------- //
function checkLocalStorage() {
  if (!localStorage.getItem("userLoggedIn")) {
    // localStorage = null
    console.log(localStorage.getItem("userLoggedIn"));
    console.log("no user found in LS");
    // my function that prints "login page"
    renderLoginTemplate();
  } else {
    // else, IF there is, then get it from  LS and put them in a variabel! "savedUser" .is also the plasecolder in my function, "renderUserLoggedInTemplate"

    let savedUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    console.log(savedUser);
    // renderUserLoggedInTemplate(JSON.parse(localStorage.getItem("userLoggedIn")));
    renderUserLoggedInTemplate(savedUser);

    //Check if there are themes in LS
    let savedTheme = JSON.parse(localStorage.getItem("keySavedThemes"));
    if (savedTheme) {
      //on refresh last theme from LS in saved array shows
      savedThemeHandler(savedTheme[savedTheme.length - 1]);
    }
  }
}
// ----------------------  Global Eventlistener ---------------------- //
// Need a Global eventlistener, eftersom my Buttons or all other thing I want to click doens not yet exists//
// Look for an event.target that matches a class in the conditional statement
// Calling the functions that exists lower down in script
document.querySelector("body").addEventListener("click", (event) => {
  //  handel the click on my Login Button
  if (event.target.matches(".login-btn")) {
    // lokal scoope
    // select
    const inputUsername = document.querySelector("#input-name");
    const inputPassword = document.querySelector("#input-password");
    console.log("loginbtn clicked");

    userDB.forEach((user) => {
      //desructering
      const { username, password } = user;
      console.log(user);

      if (inputUsername.value == username && inputPassword.value == password) {
        localStorage.setItem("userLoggedIn", JSON.stringify(user));
        const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
        console.log("lsUser", lsUser);

        loginFormContainer.innerHTML = "";
        renderUserLoggedInTemplate(lsUser);
        //Apply last theme in saved themes array from LS
        let savedTheme = JSON.parse(localStorage.getItem("keySavedThemes"));
        if (savedTheme) {
          //on refresh last theme in saved array shows
          savedThemeHandler(savedTheme[savedTheme.length - 1]);
        }
      } else {
        console.log("sorry mate!");
      }
    });
  }

  //handel the LogOut btn
  if (event.target.matches("#logout")) {
    console.log("logout btn works ");

    localStorage.removeItem("userLoggedIn");
    loggedInContainer.innerHTML = "";
    renderLoginTemplate();
  }

  // handel the slide from edis mode to user mode
  if (event.target.matches(".slider")) {
    const editMenu = document.querySelector(".aside");
    editMenu.classList.toggle("active"); // added a class active om my aside...
  }
  // handel the themes
  if (event.target.matches(".theme-changer")) {
    console.log("japp");
    let themeSelected = event.target; // the one we click on = themeSelected
    console.log(themeSelected);
    themeDB.forEach((theme) => {
      //loopa themeDB...
      if (themeSelected.classList.contains(theme.name)) {
        //compairing class of themeSelected with object themeDB name vaule.
        console.log(theme);
        themeChangerHandler(theme); // then run the function
      }
    });
  }
  //handle the fonts.
  if (event.target.matches(".font-li")) {
    fontChangerHandler(event.target.style.fontFamily);
  }
  // handle the title content
  if (event.target.matches("#save-titel")) {
    if (document.querySelector("#welcomeTitel").value !== "") {
      titleChangerHandler(document.querySelector("#welcomeTitel").value);
      document.querySelector("#welcomeTitel").value = "";
    }
  }
  // handle the title color
  if (event.target.matches(".color-title-btn")) {
    console.log(event.target.innerHTML);
    titleColorChangerHandler(event.target.innerHTML);
  }
  // handle the welcome text
  if (event.target.matches("#save-text")) {
    if (document.querySelector("#welcomeText").value !== "") {
      textChangerHandler(document.querySelector("#welcomeText").value);
      document.querySelector("#welcomeText").value = ""; // empty input
    }
  }
  // handle the welcome text color
  if (event.target.matches(".color-text-btn")) {
    console.log(event.target.innerHTML);
    textColorChangerHandler(event.target.innerHTML);
  }
  // handle the backround Color
  if (event.target.matches(".color-background-btn")) {
    console.log(event.target.innerHTML);
    backgroundColorChangerHandler(event.target.innerHTML);
  }
  // handle the save teme btn
  if (event.target.matches("#save-current-theme")) {
    saveThemeLocalStorage();
  }

  //handle the clear LS Btn ( clear saved themes)
  if (event.target.matches("#clear-local-storage")) {
    localStorage.removeItem("keySavedThemes");
    savedThemes.length = 0; //empty
  }
  // handle new theme li
  if (event.target.matches(".theme-li")) {
    //
    console.log(event.target.innerHTML);
    savedThemes.forEach((theme) => {
      if (theme.name === event.target.innerHTML) {
        savedThemeHandler(theme);
      }
    });
    console.log("CLICKED");
  }
});
// ---------------------- TAMPLATES ---------------------- //

// -------- my function that holds my login page  -------- //
function renderLoginTemplate() {
  let loginTemplate = `
  <header class="header">
  
   <div class="loginform">
    <h2 id="titel"> login</h2>
     <p>Login to access style you userpage </p>
     <input type="text" id="input-name" placeholder="ditt namn" />
      <input type="password" id="input-password" placeholder="password" />
       <button class="login-btn">Logga in</button>
   </div>
   <div class="titel-text">
   <h2 class="main-title"> - Title </h2>
</div>
 </header>

 <div class="content">
  <p id="content-text"> WELCOME <br>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis quod iure culpa odit alias enim optio omnis iste, architecto animi consequuntur consequatur unde placeat atque voluptates quaerat explicabo, accusamus eaque?
  </p> 
 </div>
`;
  loginFormContainer.innerHTML = loginTemplate;
}

// ---------------------- my function that holds my LOGEDIN page  ---------------------- //
// I created all my templates in my HTML file, and then comypastade them in here instade..
function renderUserLoggedInTemplate(savedUser) {
  const { username } = savedUser;
  let userLoggedIn = `
  <header class="header">
      
      </div>
      <div class="loginform">
       <h2 id="titel"> Admin ${username} </h2>
        <input type="text" id="input-name" placeholder="ditt namn" disabled />
         <input type="password" id="input-password" placeholder="password" disabled/>
          <button class="login-btn" disabled>Logga in</button>
      </div>
      <div class="titel-text">
          <h2 class="main-title">- Title </h2>
           <label class="switch">
             <input type="checkbox">
             <span class="slider round"></span>
          </label>
          <div id="logOutDiv">
           <button id="logout"> Log Out</button>
          </div>
  </header>

    <div class="content">
      <p id="content-text">WELCOME <br>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis quod iure culpa odit alias enim optio omnis iste, architecto animi consequuntur consequatur unde placeat atque voluptates quaerat explicabo, accusamus eaque?
      </p> 
    </div>

    <aside class="aside">
      <div class="aside-menu">
          <h4> Change Theme </h4>
           <div class="aside-style">
            <ul class="header-ul">
            <li class="theme-changer theme-grey style-li"> tema-Grey <i class="fas fa-stop"></i></i></li>
            <li class="theme-changer theme-blue style-li"> tema-Blue <i class="fal fa-pen-square"></i></li>
            <li class="theme-changer theme-gold style-li"> tema-Gold <i class="fad fa-square"></i></li>
            <li class="theme-changer theme-green style-li"> tema-green <i class="far fa-pen-square"></i></li>
            </ul>
          </div>
      </div>

      <div class="aside-menu">
          <h4> Choose font </h6>
           <div class="aside-style">
              <ul class="header-ul">
                  <li id="li-font-1" class="style-li font-li" style="font-family:'Courier New', Courier, monospace;"> Courier New, Courier, monospace 
                  </li> 
                  <li id="li-font-2" class="style-li font-li" style="font-family: 'Times New Roman', Times, serif;">Times New Roman, Times, serif</li>
                  <li id="li-font-3" class="style-li font-li" style="font-family: Arial, Helvetica, sans-serif;">Arial, Helvetica,</li>
                  <li id="li-font-4" class="style-li font-li" style="font-family: fantasy;">fantasy</li> 
              </ul>
           </div>
      </div>

      <div class="aside-menu">
        <h4> Change Title </h4>
        <div class="aside-style">
            <ul class="header-ul">
            <li class="style-li">  <input id="welcomeTitel"type="text" placeholder="Hello.." />
              <button id=save-titel>save</button></li>
                <li class="style-li"> Change color: <br>
                <button class="color-title-btn">blue</button>
                <button class="color-title-btn">red</button>
                <button class="color-title-btn">black</button>
                <button class="color-title-btn">white</button>
                </li>
            </ul>
        </div>
      </div>

      <div class="aside-menu">
        <h4> Change Welcome </h4>
        <div class="aside-style">
          <ul class="header-ul">
            <li class="style-li">  <input id="welcomeText"type="text" placeholder="Hello.." />
              <button id=save-text>save</button></li>
              <li class="style-li"> change color: <br>
                <button class="color-text-btn">blue</button>
                <button class="color-text-btn">red</button>
                <button class="color-text-btn">black</button>
                <button class="color-text-btn">white</button>
              </li>
          </ul>
        </div>
      </div>

      <div class="aside-menu">
        <h4> Change Background </h4>
        <div class="aside-style">
          <ul class="header-ul">
              <li class="style-li"> 
                <button id="b1" class="color-background-btn">#6D8C8C</button>
                <button id="b2" class="color-background-btn">#A8BFBF</button>
                <button id="b3" class="color-background-btn">#8C7C68</button>
                <button id="b4" class="color-background-btn">#D98982</button>
                <button id="b5" class="color-background-btn">#736363</button>
              </li>
          </ul>
        </div>
      </div>

      <div class="aside-menu">
      <div style="display: flex; align-items:center;">
          <h4 style="margin-right: 10px;"> Saved changes </h4> 
          <button id="save-current-theme"> save </button> 
          <button id="clear-local-storage"> clear </button> 
          </div>
          <input type="text" id="theme-name-input" name="theme name" placeholder="theme name">
          <div class="aside-style">
            <ul class="header-ul">
            ${
              !savedThemes
                ? `<li>NOTHING SAVED</li>`
                : savedThemes.map((theme, index) => {
                    return `<li class="theme-li theme-li_${index}">${theme.name}</li>`;
                  })
            }

            </ul>
          </div>
      </div>

    </aside>
    `;

  loggedInContainer.innerHTML = userLoggedIn;
}

// ---------------------- function , select theme ---------------------- //

function themeChangerHandler(theme) {
  //select elements
  const aside = document.querySelector(".aside");
  const header = document.querySelector(".header");
  const content = document.querySelector(".content");
  const slider = document.querySelector(".slider");
  const mainTitle = document.querySelector(".main-title");
  const logoutBtn = document.querySelector("#logout");
  const styleLi = document.querySelectorAll(".style-li");

  //style elements = styles from themeDB ( tema DataBas )
  aside.style.backgroundColor = theme.asideBackground;
  header.style.backgroundColor = theme.backgroundColor;
  content.style.backgroundColor = theme.backgroundColor;
  slider.style.backgroundColor = theme.asideBackground;
  mainTitle.style.color = theme.TitleColor;
  logoutBtn.style.backgroundColor = theme.btnStyle.btnBackgroundColor;
  logoutBtn.style.color = theme.btnStyle.btnTextColor;

  styleLi.forEach((li) => {
    li.style.backgroundColor = theme.backgroundColor;
  });
}
// ---------------------- function , saved theme ---------------------- //
//Shows latest theme taken from localstorage (which comes in as a parameter "theme")
function savedThemeHandler(theme) {
  //select elements
  const aside = document.querySelector(".aside");
  const header = document.querySelector(".header");
  const content = document.querySelector(".content");
  const slider = document.querySelector(".slider");
  const mainTitle = document.querySelector(".main-title");
  const logoutBtn = document.querySelector("#logout");
  const styleLi = document.querySelectorAll(".style-li");
  const contentText = document.querySelector("#content-text");

  //style elements = styles from themeDB ( tema DataBas )
  aside.style.backgroundColor = theme.asideBackground;
  header.style.backgroundColor = theme.backgroundColor;
  content.style.backgroundColor = theme.backgroundColor;
  slider.style.backgroundColor = theme.backgroundColor;
  mainTitle.style.color = theme.TitelColor;
  mainTitle.innerHTML = theme.TitelText;
  mainTitle.style.fontFamily = theme.TitelFont;
  logoutBtn.style.backgroundColor = theme.btnStyle.btnBackgroundColor;
  logoutBtn.style.color = theme.btnStyle.btnTextColor;
  contentText.style.color = theme.contentTextColor;
  contentText.innerHTML = theme.contentNewText;
  contentText.style.fontFamily = theme.contentNewTextFont;

  styleLi.forEach((li) => {
    li.style.backgroundColor = theme.backgroundColor;
  });
}
// ---------------------- functions for other manual changes  ---------------------- //
function fontChangerHandler(font) {
  //select elements
  let mainTitle = document.querySelector(".main-title");
  let contentText = document.querySelector("#content-text");

  mainTitle.style.fontFamily = font;
  contentText.style.fontFamily = font;
}
function titleChangerHandler(newValue) {
  let mainTitle = document.querySelector(".main-title");
  mainTitle.innerHTML = newValue;
}
function titleColorChangerHandler(color) {
  let mainTitle = document.querySelector(".main-title");
  mainTitle.style.color = color;
}
function textChangerHandler(newValue) {
  let contentText = document.querySelector("#content-text");
  contentText.innerHTML = newValue;
}
function textColorChangerHandler(color) {
  let contentText = document.querySelector("#content-text");
  contentText.style.color = color;
}
function backgroundColorChangerHandler(color) {
  const header = document.querySelector(".header");
  const content = document.querySelector(".content");
  header.style.backgroundColor = color;
  content.style.backgroundColor = color;
}

// this function select elements  AND creates an object AND push that object to my empty array. And saveing to LS
function saveThemeLocalStorage() {
  const aside = document.querySelector(".aside");
  const header = document.querySelector(".header");
  const mainTitle = document.querySelector(".main-title");
  const logoutBtn = document.querySelector("#logout");
  const contentText = document.querySelector("#content-text");
  const inputThemeName = document.querySelector("#theme-name-input");

  let inputValue = inputThemeName.value === "" ? "EMPTY" : inputThemeName.value;

  let themeToBeSaved = {
    name: inputValue,
    TitelColor: mainTitle.style.color,
    contentTextColor: contentText.style.color,
    backgroundColor: header.style.backgroundColor,
    asideBackground: aside.style.backgroundColor,
    btnStyle: {
      btnBackgroundColor: logoutBtn.style.backgroundColor,
      btnTextColor: logoutBtn.style.color,
    },
    TitelText: mainTitle.innerHTML,
    contentNewText: contentText.innerHTML,
    TitelFont: mainTitle.style.fontFamily,
    contentNewTextFont: contentText.style.fontFamily,
  };

  savedThemes.push(themeToBeSaved);
  console.log(savedThemes);
  inputThemeName.value = "";

  localStorage.setItem("keySavedThemes", JSON.stringify(savedThemes));
}
