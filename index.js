// -------------- Function to create elements -------------------------------

let ElementCreator = (elementName,elementType,classname,id,parentID) =>{
    elementName = document.createElement(elementType);
    if(classname) elementName.className = classname;
    if(id) elementName.id =id;
    if(!parentID){
        document.body.append(elementName);
    }else{
        document.getElementById(parentID).append(elementName);
    }
    return elementName;
}
//------------------------ navigation bar -----------------------------
ElementCreator("nav","nav","navbar navbar-expand-sm navbar-dark bg-dark","nav") //nav tag

ElementCreator("navFluidDiv","div","container-fluid","navFluidDiv","nav"); //nav div for styling

    //-------------------- Brand name ----------------------

    let brand = document.createElement('a');
    brand.className +="navbar-brand";
    brand.href="javascript:void(0)";
    brand.innerHTML ="Makeup";
    document.getElementById("navFluidDiv").append(brand);

    //--------------------------- Search Bar on navigator ------------------------------

    let navSearch = ElementCreator("searchbar","form","d-flex","search","navFluidDiv");
    document.getElementById("search").onsubmit = function(event){
            collectFormData();
            event.preventDefault();
        };

    //- Input field for text
    ElementCreator("inputSearch","input","form-control me-2","inputSearch","search");
    inputSearch.type ="text";
    inputSearch.placeholder="Search";
    inputSearch.style.borderRadius = 0;

    //button to trigger search
    ElementCreator("searchButton","button","btn btn-primary","searchButton","search");
    searchButton.type="button";
    searchButton.innerHTML=`<img src="Img/searchicon.png" height ="20" width="25" />`;
    searchButton.style.borderRadius = 0;
    document.getElementById("searchButton").addEventListener('click',() => collectFormData()); //Eventlistener for search button on navigation bar

//---------------------- Nav bar Ends here --------------------------------



//---------------------- Filter by category images --------------------------------

ElementCreator("filterdiv","div"," container-fluid","filterdiv");

filterdiv.style.marginTop="1%";

ElementCreator("filterCategory","form","filterCategory","filterCategory","filterdiv")

ElementCreator("filterdiv2","div","row text-center","filterdiv2","filterCategory")


//categories and their product images stored locally
    const categoriesmain = ["Eyebrow","Bronzer","Blush","Eyeliner","Eyeshadow","Foundation",'lip_liner',"Lipstick","Mascara","nail_polish"];
    const imageLinks = ["Img/eyebrows.jpeg","Img/bronzers.png","Img/blush.jpeg","Img/Eyeliner.png","Img/Eyeshadow.jpeg","Img/Foundation.jpeg","Img/Lip liner.jpeg","Img/Lipstick.jpeg","Img/Mascara.png","Img/Nail polish.jpeg"]

    // Temp dummy to occupy the space before the images to center them
    let dummy = ElementCreator("dummy","div","col-lg-1","dummy","filterdiv2");
    dummy.innerHTML ="Filter by <br> Product type";
    dummy.style.marginTop = "3%";


    for (let i =0;i<categoriesmain.length;i++){      //loop to create imae buttons
        
        let tempid = categoriesmain[i]; //assigning product name as temp id of elements
        ElementCreator("tempDiv","div","col-lg-1 col-offset-2",tempid,"filterdiv2"); // a div  to house image and button                    
        
        //--------Buttons with Image to filter the products ------------------------
        let img = document.createElement("input");
        img.type = "image";
        img.src=imageLinks[i];
        img.className +="rounded-circle img-thumbnail img-buttons";
        img.style.height="100px";
        img.style.width="100px";    
        document.getElementById(tempid).append(img);

        //-------Text to iedntify products easily
        let text = document.createElement("p");
        text.innerHTML=categoriesmain[i];
        document.getElementById(tempid).append(text);

        //disabling page reload on clicking image buttons with prevent default
        document.getElementById(tempid).addEventListener('click',function(event){
            imageFilter(this.id);
            event.preventDefault();
        }); 


    }

//---------------------- Filter by category images ends --------------------------------

//======================================== Main section ==========================================================

ElementCreator("Herodiv","div","container-fluid","Herodiv"); //main div hosuing sort and products

ElementCreator("herorow","div","row","herorow","Herodiv") //bootstrap row

//-----------------------------Left Filter by brands ---------------------------

ElementCreator("sortDiv","div","col-lg-3 h-100","sortDiv","herorow"); //Main div for whole body without nav and imagebuttons
// left side
ElementCreator("leftCard","div","card  pull-left h-100","leftCard","sortDiv"); //left side housing div for filter
//card
ElementCreator("card-body","div","card-body","leftcardbody","leftCard");
    //title card for filter
    let title1 = ElementCreator("title1","p","card-title","title1","leftcardbody");
    title1.innerHTML ="Filter by Brands";

    let titleform = ElementCreator("titleform","form","titleform","titleform","leftcardbody"); //form to get input
    let formdiv = ElementCreator("formdiv","div","form-check","formdiv","titleform");

    // function to find unique brands triggered by filter and clear buttons 
    let findUniqueBrands = (resultObj) => {
        let brands =[];    
        for(let i =0; i<resultObj.length;i++){
            brands.push(resultObj[i].brand);
        }
        let uBrands = brands.filter((item,index) => brands.indexOf(item) === index);
        console.log(uBrands);
        filterElementBuilder(uBrands);
    }

    // funtion to build filter checkboxes triggered by findUniqueBrands to build the checkboxes
    let filterElementBuilder = (items) =>{
        for(let i in items){

            let tempCheckbox  = ElementCreator(items[i],"input","form-check-input",items[i],"formdiv");
            tempCheckbox.type="checkbox";
            tempCheckbox.name ="brandschecked";

            let templabel = ElementCreator(items[i],"label","form-check-label",0,"formdiv");
            templabel.for = items[i];
            templabel.innerHTML = items[i];
            //break to seperate check boxes line by line
            document.getElementById("formdiv").append(document.createElement("br"));
        }

        
        
    }
    //---------filter button which triggers leftsortCboxes with array of checked boxes--------
    ElementCreator("buttondiv","div","row","buttondiv","titleform");
    let leftsubmit = ElementCreator("leftsubmit","button","btn btn-primary col-lg-4","leftsubmit","buttondiv");
    leftsubmit.type='button';
    leftsubmit.innerHTML = "Filter";
        
    //adding event listner and true check boxes check function
    document.getElementById("leftsubmit").addEventListener('click',() => {
            
        let checkboxes = document.getElementsByName('brandschecked');
        let checkedboxes = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkedboxes.push(checkboxes[i].id);
            }
                        
        }
        leftsortCboxes(checkedboxes);  
    });

    //------------------------ clear button for clearing selection -------------------------------

    let leftclear = ElementCreator("leftclear","button","btn btn-primary col-lg-4 offset-2","leftclear","buttondiv");
    leftclear.type='button';
    leftclear.innerHTML = "Clear";

    document.getElementById("leftclear").addEventListener('click',() => {
        
        let checkboxes = document.getElementsByName('brandschecked');
        
        for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkboxes[i].checked = false;
                }
                showallproducts();
                
        }
        
    });


// ----------------------- left filter ends here ---------------------------

//------------------------ right side starts here --------------------------

let productdiv = ElementCreator("productdiv","div","col-lg-9","productdiv","herorow")
//productcard
let buildProducts = (products) =>{
    for(let i =0; i<products.length;i++){
        let productcard = ElementCreator("productcard","div","card col-lg-12","card"+i,"productdiv");
        document.getElementById("card"+i).style.marginTop = "1%";
        ElementCreator("temprow","div","row","temprow"+i,"card"+i);
        ElementCreator("imgcol","div","col-lg-3","imgcol"+i,"temprow"+i);

        //--Product Image
        let tempimg = ElementCreator("tempimg","img","img-fluid rounded-start","img"+i,"imgcol"+i);
        tempimg.src = products[i].image_link;
        document.getElementById("img"+i).style.marginLeft = "-15px";
        document.getElementById("img"+i).style.height = "250px";
        
        //card body part
        ElementCreator("bodycol","div","col-lg-7","bodycol"+i,"temprow"+i);        
        ElementCreator("cardbody","div","card-body","body"+i,"bodycol"+i);
        
        // title
        let tempTitle = ElementCreator("productTitle","h5","card-text title","prodtitle"+i,"body"+i);
        tempTitle.innerHTML= products[i].name;

        //Brand
        let brandName = ElementCreator("brandName","p","card-text","brandname"+i,"body"+i);
        brandName.innerHTML ="by " + products[i].brand;

        //description
        let description = ElementCreator("desc","p","card-text","desc"+i,"body"+i);
        description.innerHTML = products[i].description;

        //Price
        ElementCreator("pricecol","div","col-lg-2","pricecol"+i,"temprow"+i);
        let tempPrice  = ElementCreator("price","h3","card-text ","priceof"+i,"pricecol"+i);
        let string ='';
        if(!products[i].price_sign){
            string =products[i].price;
        }else{
            string = products[i].price + " "+products[i].price_sign;
        }
        tempPrice.innerHTML = string;

        // visit site button
        let VisitSite = ElementCreator("VisitSite","button","btn btn-primary ","VisitSite"+i,"pricecol"+i);
        VisitSite.innerHTML ="Know more";
        document.getElementById("VisitSite"+i).style.maginTop = "30%";

        let button = document.getElementById("VisitSite"+i);

        button.onclick = function(e) {
            e.preventDefault();
            location.href = products[i].website_link;
        }


    }
    
}

    


//---------------------- Request for data ---------------------------------
let url = "https://makeup-api.herokuapp.com/api/v1/products.json";

let productsdup ={}; //duplicate product to refer outside fetch
let currentProdList =[]; //current items list after filtering by category and name

let resstatus = '';
let fetchItems = async (url) =>{
    const response = await fetch(url);
    if(response.ok){
        return response.json();
    }else{
         console.log(response.status);
         resstatus  = response.status;
         throw new Error(`Error! status: ${response.status}`);
    }   
}

// Main fetch 
fetchItems(url)
    .then(products =>{
        //  console.log(JSON.stringify(products[0]),JSON.stringify(products[1]));
        console.log("completed");
        findUniqueBrands(products); // find unique brands
        buildProducts(products);
        productsdup = products;

    }).catch((error) => {
        console.log(error);
        window.location = 'https://makeup-api.herokuapp.com/api/v1/products.json';
        window.addEventListener("load",alert(`Makeup API responded with: 503 please try again afer some time or click ok to visit api site`));
        
    });



// --------------------- Form submit functions ------------------------------


let imageFilter =(clickedid)=>{   //triggered by  product type image filter
    // console.log(clickedid);
    categorySelected = clickedid;
    findProducts(categorySelected);
    // return clickedid;

}

let collectFormData = () =>{     //triggerd by search box search icon
    //Value of input box
    var imputbox = document.getElementById('inputSearch');
    // console.log(imputbox.value);
    // return( imputbox.value);
    searchkey = imputbox.value;
    let results =[];
    for(let i in productsdup){
        if(productsdup[i].name.toLowerCase().includes(searchkey.toLowerCase())){
            results.push(productsdup[i]);
            if(!(searchkey=="")){
                let name = results[results.length-1].name;
                let newstr  = name.toLowerCase().split(searchkey.toLowerCase()).join(`<mark style="background-color: yellow;">${searchkey}</mark>`);
                // let re ="/"+searchkey+"/gi";
                // let newstr = name.replace(re,`<mark>${searchkey}</mark>`)
                console.log(newstr);
                results[results.length-1].name = newstr;
            }
        }
    }
    currentProdList = results;
    document.getElementById("productdiv").innerHTML = "";
    buildProducts(results);
    document.getElementById("formdiv").innerHTML = "";
    findUniqueBrands(results);

}

let leftsortCboxes =(boxArray)=>{
    
    let result =[];
    let selectedbrands = boxArray.toString(); //converting to string for ease
    if(currentProdList.length ==0){
        for( let i in productsdup){
        if(selectedbrands.includes(productsdup[i].brand)){
            result.push(productsdup[i]);
        }
        document.getElementById("productdiv").innerHTML = "";
        buildProducts(result);
    }
    }else{
        for( let i in currentProdList){
        if(selectedbrands.includes(currentProdList[i].brand)){
            result.push(currentProdList[i]);
        }
        document.getElementById("productdiv").innerHTML = "";
        buildProducts(result);
    }
    }
}

let showallproducts = () =>{
    document.getElementById("productdiv").innerHTML = "";
    if(currentProdList.length ==0){
        buildProducts(productsdup);
    }else{
        buildProducts(currentProdList);
    }
}

let findProducts =(categorySelected)=>{
       let resultobj  =[];
       for (i in productsdup){
            if(categorySelected.toLowerCase() == productsdup[i].product_type.toLowerCase ()){
                resultobj.push(productsdup[i]);
            }
       }
       currentProdList = resultobj;
       document.getElementById("productdiv").innerHTML = "";
       buildProducts(resultobj);
       document.getElementById("formdiv").innerHTML = "";
       findUniqueBrands(resultobj);
}



