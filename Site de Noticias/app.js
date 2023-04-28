let qntNoticias = 5; // número de noticias exibidas por páginas
let pageFinal = qntNoticias; // índice
let pageInicial = 0;
let temaAtual = "tecnologia+inovação+informação"; // tema inicial

let noticias = {
    "apiKey":"935d00cb78c44f8291159e6807972c57",
    fetchNoticias:function(categoria){
        fetch(
            "https://newsapi.org/v2/everything?q=" // solicita noticias a API 
            +categoria+
            "&pais=br&apiKey="+this.apiKey
        )
        .then((response)=>response.json())
        .then((data)=>this.displayNoticias(data));
    },
    displayNoticias: function(data){
        if(pageInicial==0){
            document.querySelector(".container-noticias").textContent =""; // exibe as noticias na tela
        }

        for(i=pageInicial;i<=pageFinal;i++){
            const {title} = data.articles[i];     
            let h2 = document.createElement("h2"); // extrai o titulo da API e cria um h2 para exibir
            h2.textContent = title;
    
            const {urlToImage} = data.articles[i];
            let img = document.createElement("img"); // extrai a imagem da API e cria a imagem da noticia
            img.setAttribute("src", urlToImage);

            let info_item = document.createElement("div"); // cria uma div e define a class para poder manipular no css
            info_item.className = "info_item";
            const {publishedAt} = data.articles[i];
            let dia = document.createElement("span");
            let date = publishedAt;
            date=date.split("T")[0].split("-").reverse().join("-"); // formata a data
            dia.className = "dia";
            dia.textContent = date;

            const {name} = data.articles[i].source;
            let fonte = document.createElement("span");  // fonte da noticia
            fonte.className = "fonte";
            fonte.textContent = name;

            info_item.appendChild(dia);
            info_item.appendChild(fonte);

            const {url} = data.articles[i];

            let item = document.createElement("div");
            item.className = "item";
            item.appendChild(h2);
            item.appendChild(img);
            item.appendChild(info_item);
            item.setAttribute("onclick", "location.href='"+url+"'");
            document.querySelector(".container-noticias").appendChild(item);  // cria os itens a serem exibidos na tela
        }

        let btnproximo = document.createElement("span");
        btnproximo.id = "btnproximo";
        btnproximo.textContent = "Mais...";
        btnproximo.setAttribute("onclick","proximo()");
        document.querySelector(".container-noticias").appendChild(btnproximo);  // cria e configura o Mais...
    }
}

function buscar(cat){
    pageInicial = 0;
    pageFinal = qntNoticias;  // atualiza as variáveis de acordo com a categoria selecionada 
    temaAtual = cat;
    noticias.fetchNoticias(cat);
}

function buscarTema(){
    pageInicial = 0;
    pageFinal = qntNoticias;

    let tema = document.querySelector("#procurar").value;  // permite a busca por palavras chave
    temaAtual = tema;
    noticias.fetchNoticias(temaAtual);
}

function proximo(){
    pageInicial = pageFinal + 1;
    pageFinal = pageFinal + qntNoticias + 1;
    document.querySelector("#btnproximo").remove(); // exibe a próxima pagina de noticias
    noticias.fetchNoticias(temaAtual);

}

noticias.fetchNoticias(temaAtual);