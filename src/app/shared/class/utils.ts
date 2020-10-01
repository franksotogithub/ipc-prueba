export class  Utils {
    
    
    static  getIdsNextPreview(array,id,key){
        let idPreview,idNext;
    
        
    
        let index = array.findIndex((e)=>{
          return e[key] === id
          });
         
        if(array.length==0 ||array.length==1 )  {
          idPreview=id;idNext=id
        }
    
        else if ((index - 1 ) < 0 ){
          idPreview=id;
          idNext=array[index+1][key];
        }
    
        else if(array.length==(index+1)){
          idPreview=array[index-1][key];
          idNext=id;
        }
        else{
          idPreview=array[index-1][key];
          idNext=array[index+1][key];
        }
        console.log('idPreview,idNext>>>',idPreview,idNext);
        return [idPreview,idNext];
    
      }

}