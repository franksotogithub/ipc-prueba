export class  Utils {
    
    
    static  getIdsNextPreview(array,id){
        let idPreview,idNext;
    
        
    
        let index = array.findIndex((e)=>{
          return e.id === id
          });
         
        if(array.length==0 ||array.length==1 )  {
          idPreview=id;idNext=id
        }
    
        else if ((index - 1 ) < 0 ){
          idPreview=id;
          idNext=array[index+1].id;
        }
    
        else if(array.length==(index+1)){
          idPreview=array[index-1].id;
          idNext=id;
        }
        else{
          idPreview=array[index-1].id;
          idNext=array[index+1].id;
        }
        
        return [idPreview,idNext];
    
      }
    
}