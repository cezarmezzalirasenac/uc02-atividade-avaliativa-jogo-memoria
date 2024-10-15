const languages = [
    {languageName: "Python", path: "/python/python-original-wordmark.svg"},
    {languageName: "Java", path: "/java/java-original-wordmark.svg"},         
    {languageName: "JavaScript", path: "/javascript/javascript-original.svg"},          
    {languageName: "C#", path: "/csharp/csharp-original.svg"},
    {languageName: "C/C++", path: "/cplusplus/cplusplus-original.svg"},          
    {languageName: "PHP", path: "/php/php-original.svg"},          
    {languageName: "Swift", path: "/swift/swift-original-wordmark.svg"},          
    {languageName: "Rust", path: "/rust/rust-original.svg"}
]


const divRoot = document.getElementById("root");
const cdnImageURL = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"

function addCards(items){
    for (let item of items) {
        const div = document.createElement("div");
        div.classList.add("piece");
        div.id = item.languageName;
        div.innerHTML = `
          <h3>${item.languageName}</h3>
          <img src="${cdnImageURL}${item.path}"/>
        `;
        divRoot.appendChild(div);
    }
}

addCards(languages.sort(()=> Math.random() - 0.5));
addCards(languages.sort(()=> Math.random() - 0.5));   