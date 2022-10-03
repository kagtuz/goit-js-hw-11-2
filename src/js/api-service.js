import axios from "axios";
import getRefs from "./getRefs";

const refs = getRefs()
console.log(refs.infoEnd)

export default class ApiService {
    constructor (){
        this.q = '';
        this.page = 1;
    }   

     async fetchImage() {
        const options = {
        key: `30111501-80dfaf6bf0e872b32b653e61a`,
      
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: true
        };
        const BASE_URL = `https://pixabay.com/api/`
        let  {key, image_type, orientation} = options;
      
         const response  = await axios.get(`${BASE_URL}?key=${key}&q=${this.q}&image_type=${image_type}&orientation=${orientation}&page=${this.page}&per_page=40`)
          const data = response.data; 
         
            this.page += 1;
             const countPage = (data.totalHits / (40 * (this.page - 1)) ) ;
            const endImages = `<p class="info-end">
            <b>"We're sorry, but you've reached the end of search results."</b>
          </p>`
        //   const countPage = (data.totalHits / (40 * (this.page - 1)) ) ;

            if (countPage <=  1 && countPage > 0)  {
                refs.moreBtn.classList.add('is-hidden');                

                refs.imageGallery.insertAdjacentHTML("afterend", endImages);

               
            }
          
            return data;
         }; 
      
    forEnd() {
        if (document.querySelector(`.info-end`)) {
            
            document.querySelector(`.info-end`).remove();
        }
    }
     clearForm() {
        this.page = 1;
    }

    get searchQuery() {
        return this.q;
    }
    set searchQuery(newSearchQuery){
        this.q = newSearchQuery;
    }
    
};
