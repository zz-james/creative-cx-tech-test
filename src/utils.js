import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid';

export const getUserId = () => {
if(!Cookies.get('opty-cookie')){
    const id = uuidv4();
    Cookies.set('opty-cookie', id, { expires: 100, path: '/' });
} 
return Cookies.get('opty-cookie');
}